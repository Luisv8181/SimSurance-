"""Replicated runs, summaries, and run manifests (roadmap M5/M6/M7).

A run manifest records everything another researcher needs to reproduce a
summary: configuration id and hash, scenario overrides, seeds, capacity
multiplier, code version, and Python version.
"""

from __future__ import annotations

import platform
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable, Sequence

from .county import CountyConfig, generate_county
from .simulator import RunResult, simulate

CODE_VERSION = "0.2.0"

SUMMARY_METRICS = (
    "arrivals", "started_care", "completed", "left_waitlist", "stopped_care_early",
    "still_waiting_at_end", "in_care_at_end", "attended_sessions", "missed_sessions",
    "mean_wait_weeks", "p90_wait_weeks", "share_started_within_4_weeks", "unmet_need_share",
    "service_payments_cents", "coordinator_cost_cents", "capitation_transfers_cents",
    "system_cost_cents", "system_cost_per_completed_episode_cents", "weekly_slots",
)


def _quantile(values: Sequence[float], q: float) -> float:
    ordered = sorted(values)
    if not ordered:
        return 0.0
    position = (len(ordered) - 1) * q
    low = int(position)
    high = min(low + 1, len(ordered) - 1)
    return ordered[low] + (ordered[high] - ordered[low]) * (position - low)


def summarize(values: Sequence[float]) -> dict[str, float]:
    """Mean plus 10th/50th/90th percentiles across replications."""
    return {
        "mean": sum(values) / len(values) if values else 0.0,
        "p10": _quantile(values, 0.10),
        "p50": _quantile(values, 0.50),
        "p90": _quantile(values, 0.90),
    }


def git_commit(repo_root: Path | None = None) -> str | None:
    try:
        out = subprocess.run(["git", "rev-parse", "--short", "HEAD"], cwd=repo_root,
                             capture_output=True, text=True, timeout=5, check=True)
        return out.stdout.strip() or None
    except Exception:  # git absent or not a repository: record as unknown
        return None


def run_replications(config: CountyConfig, scenario_id: str, seeds: Iterable[int], *,
                     capacity_multiplier: float = 1.0) -> list[RunResult]:
    results = []
    for seed in seeds:
        county = generate_county(config, seed, capacity_multiplier=capacity_multiplier)
        results.append(simulate(config, county, scenario_id, capacity_multiplier=capacity_multiplier))
    return results


def summarize_runs(results: Sequence[RunResult]) -> dict[str, Any]:
    if not results:
        raise ValueError("no runs to summarize")
    weeks = len(results[0].weekly_waitlist)
    return {
        "replications": len(results),
        "metrics": {name: summarize([r.metrics[name] for r in results]) for name in SUMMARY_METRICS},
        "weekly_waitlist_mean": [sum(r.weekly_waitlist[w] for r in results) / len(results) for w in range(weeks)],
        "weekly_in_care_mean": [sum(r.weekly_active[w] for r in results) / len(results) for w in range(weeks)],
    }


def build_manifest(config: CountyConfig, *, seeds: Sequence[int], scenarios: Sequence[str],
                   capacity_multipliers: Sequence[float], repo_root: Path | None = None) -> dict[str, Any]:
    return {
        "config_id": config.config_id,
        "config_sha256": config.sha256,
        "scenarios": {sid: dict(config.scenarios[sid]) for sid in scenarios},
        "seeds": list(seeds),
        "capacity_multipliers": list(capacity_multipliers),
        "weeks": config.weeks,
        "code_version": CODE_VERSION,
        "git_commit": git_commit(repo_root),
        "python_version": platform.python_version(),
        "generated_at_utc": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
    }
