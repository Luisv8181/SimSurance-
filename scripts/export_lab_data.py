#!/usr/bin/env python3
"""Run the fictional county grid and export results for the Learning Lab.

Usage (from the repository root):
    PYTHONPATH=src python scripts/export_lab_data.py

Writes learning-lab/data/county-sim.json. The Learning Lab's Virtual County
lesson reads this file, so numbers shown to learners come from the tested Python
simulator rather than from a separate JavaScript re-implementation.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from simsurance.county import load_config  # noqa: E402
from simsurance.runner import build_manifest, run_replications, summarize_runs  # noqa: E402

SEEDS = list(range(1, 31))
CAPACITY_MULTIPLIERS = [0.75, 1.0, 1.25, 1.5]
SCENARIOS = ["baseline", "care_coordination_pilot"]


def main() -> int:
    config = load_config(ROOT / "config" / "toy_county.json")
    runs = []
    for multiplier in CAPACITY_MULTIPLIERS:
        for scenario_id in SCENARIOS:
            results = run_replications(config, scenario_id, SEEDS, capacity_multiplier=multiplier)
            summary = summarize_runs(results)
            runs.append({"scenario_id": scenario_id, "capacity_multiplier": multiplier, **summary})
            m = summary["metrics"]
            print(f"{scenario_id:<26} x{multiplier:<5} wait={m['mean_wait_weeks']['mean']:.1f}w "
                  f"unmet={m['unmet_need_share']['mean']:.0%} completed={m['completed']['mean']:.0f}")

    payload = {
        "schema_version": "1.0",
        "label": config.label,
        "disclaimer": json.loads((ROOT / "config" / "toy_county.json").read_text(encoding="utf-8"))["disclaimer"],
        "manifest": build_manifest(config, seeds=SEEDS, scenarios=SCENARIOS,
                                   capacity_multipliers=CAPACITY_MULTIPLIERS, repo_root=ROOT),
        "parameters": config.parameters,
        "runs": runs,
    }
    out = ROOT / "learning-lab" / "data" / "county-sim.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(payload, indent=1) + "\n", encoding="utf-8")
    print(f"Wrote {out.relative_to(ROOT)} ({len(runs)} scenario cells x {len(SEEDS)} seeds)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
