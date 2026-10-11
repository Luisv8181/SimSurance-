"""Fictional "virtual county" generation for SimSurance teaching scenarios (roadmap M4).

Everything produced here is synthetic. Parameters come from a separate JSON
configuration file where each value carries a provenance tag. No real people,
providers, rates, or prevalence estimates are represented.

Common random numbers: the population's care-seeking episodes and the provider
network are drawn from random streams that depend only on the seed, never on the
scenario. Two scenarios run with the same seed therefore face the *same* people
and the *same* network, so differences come from the scenario's assumptions
rather than from luck.
"""

from __future__ import annotations

import hashlib
import json
import math
import random
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Mapping

PROVENANCE_TAGS = frozenset({
    "verified_rule",
    "derived_value",
    "estimated_parameter",
    "expert_assumption",
    "hypothetical_scenario",
})

REQUIRED_PARAMETERS = (
    "population",
    "weekly_need_onset_rate",
    "sessions_needed_min",
    "sessions_needed_max",
    "provider_count",
    "weekly_caseload_min",
    "weekly_caseload_max",
    "no_show_probability",
    "weekly_waitlist_dropout",
    "weekly_treatment_dropout",
    "allowed_amount_cents_per_session",
    "capitation_pmpm_cents",
    "coordinator_weekly_cost_cents",
)

PROBABILITY_PARAMETERS = (
    "weekly_need_onset_rate",
    "no_show_probability",
    "weekly_waitlist_dropout",
    "weekly_treatment_dropout",
)

CENTS_PARAMETERS = (
    "allowed_amount_cents_per_session",
    "capitation_pmpm_cents",
    "coordinator_weekly_cost_cents",
)

# Fixed offsets keep independent random streams separate for a given seed.
_ARRIVAL_STREAM = 1_000_003
_PROVIDER_STREAM = 2_000_003


class CountyConfigError(ValueError):
    """Raised when a county configuration is incomplete or internally invalid."""


@dataclass(frozen=True, slots=True)
class CountyConfig:
    config_id: str
    label: str
    weeks: int
    parameters: Mapping[str, Mapping[str, Any]]
    scenarios: Mapping[str, Mapping[str, Any]]
    sha256: str

    def value(self, name: str) -> Any:
        return self.parameters[name]["value"]

    def scenario_parameters(self, scenario_id: str) -> dict[str, Any]:
        """Return the flat parameter values for a scenario (baseline + overrides)."""
        if scenario_id not in self.scenarios:
            raise CountyConfigError(f"unknown scenario: {scenario_id}")
        values = {name: spec["value"] for name, spec in self.parameters.items()}
        overrides = self.scenarios[scenario_id].get("overrides", {})
        for name, value in overrides.items():
            if name not in values:
                raise CountyConfigError(f"scenario {scenario_id} overrides unknown parameter {name}")
            values[name] = value
        _validate_values(values, context=f"scenario {scenario_id}")
        return values


def _validate_values(values: Mapping[str, Any], *, context: str) -> None:
    for name in PROBABILITY_PARAMETERS:
        v = values[name]
        if isinstance(v, bool) or not isinstance(v, (int, float)) or not 0 <= v <= 1:
            raise CountyConfigError(f"{context}: {name} must be a probability in [0, 1]")
    for name in CENTS_PARAMETERS:
        v = values[name]
        if isinstance(v, bool) or not isinstance(v, int) or v < 0:
            raise CountyConfigError(f"{context}: {name} must be non-negative integer cents")
    for name in ("population", "provider_count", "sessions_needed_min", "weekly_caseload_min"):
        v = values[name]
        if isinstance(v, bool) or not isinstance(v, int) or v <= 0:
            raise CountyConfigError(f"{context}: {name} must be a positive integer")
    if values["sessions_needed_max"] < values["sessions_needed_min"]:
        raise CountyConfigError(f"{context}: sessions_needed_max < sessions_needed_min")
    if values["weekly_caseload_max"] < values["weekly_caseload_min"]:
        raise CountyConfigError(f"{context}: weekly_caseload_max < weekly_caseload_min")


def parse_config(raw: Mapping[str, Any]) -> CountyConfig:
    """Validate a raw configuration mapping and return a :class:`CountyConfig`."""
    for key in ("config_id", "label", "weeks", "parameters", "scenarios"):
        if key not in raw:
            raise CountyConfigError(f"config missing {key}")
    params = raw["parameters"]
    for name in REQUIRED_PARAMETERS:
        if name not in params:
            raise CountyConfigError(f"config missing parameter {name}")
    for name, spec in params.items():
        if "value" not in spec or "unit" not in spec:
            raise CountyConfigError(f"parameter {name} needs value and unit")
        if spec.get("provenance") not in PROVENANCE_TAGS:
            raise CountyConfigError(f"parameter {name} has invalid provenance tag")
        if spec["provenance"] == "verified_rule" and not spec.get("source_ref"):
            raise CountyConfigError(f"parameter {name} is tagged verified_rule without a source_ref")
    if "baseline" not in raw["scenarios"]:
        raise CountyConfigError("config must define a baseline scenario")
    for sid, scenario in raw["scenarios"].items():
        if scenario.get("provenance") not in PROVENANCE_TAGS:
            raise CountyConfigError(f"scenario {sid} has invalid provenance tag")
    weeks = raw["weeks"]
    if isinstance(weeks, bool) or not isinstance(weeks, int) or weeks <= 0:
        raise CountyConfigError("weeks must be a positive integer")
    canonical = json.dumps(raw, sort_keys=True, separators=(",", ":")).encode("utf-8")
    config = CountyConfig(
        config_id=raw["config_id"],
        label=raw["label"],
        weeks=weeks,
        parameters=params,
        scenarios=raw["scenarios"],
        sha256=hashlib.sha256(canonical).hexdigest(),
    )
    for sid in config.scenarios:
        config.scenario_parameters(sid)  # validates overrides
    return config


def load_config(path: str | Path) -> CountyConfig:
    return parse_config(json.loads(Path(path).read_text(encoding="utf-8")))


@dataclass(frozen=True, slots=True)
class Episode:
    """One synthetic care-seeking episode. Contains no personal attributes."""

    episode_id: str
    arrival_week: int
    sessions_needed: int


@dataclass(frozen=True, slots=True)
class Provider:
    provider_id: str
    weekly_slots: int


@dataclass(frozen=True, slots=True)
class County:
    seed: int
    episodes: tuple[Episode, ...]
    providers: tuple[Provider, ...]

    @property
    def total_weekly_slots(self) -> int:
        return sum(p.weekly_slots for p in self.providers)


def _poisson(rng: random.Random, lam: float) -> int:
    """Knuth's Poisson sampler; adequate for the small weekly rates used here.

    Using a Poisson count of weekly arrivals is a modeling assumption (it treats
    onsets as independent events), not an empirical claim.
    """
    if lam <= 0:
        return 0
    limit = math.exp(-lam)
    k, p = 0, 1.0
    while True:
        p *= rng.random()
        if p <= limit:
            return k
        k += 1


def generate_county(config: CountyConfig, seed: int, *, capacity_multiplier: float = 1.0) -> County:
    """Generate synthetic episodes and providers for one seed.

    ``capacity_multiplier`` scales every provider's weekly slots and is intended
    for sensitivity analysis. It does not change who arrives or when.
    """
    if isinstance(seed, bool) or not isinstance(seed, int):
        raise CountyConfigError("seed must be an integer")
    if not capacity_multiplier > 0:
        raise CountyConfigError("capacity_multiplier must be positive")
    base = config.scenario_parameters("baseline")

    arrival_rng = random.Random(seed * 7919 + _ARRIVAL_STREAM)
    lam = base["population"] * base["weekly_need_onset_rate"]
    episodes: list[Episode] = []
    for week in range(config.weeks):
        for _ in range(_poisson(arrival_rng, lam)):
            sessions = arrival_rng.randint(base["sessions_needed_min"], base["sessions_needed_max"])
            episodes.append(Episode(f"E{len(episodes) + 1:05d}", week, sessions))

    provider_rng = random.Random(seed * 7919 + _PROVIDER_STREAM)
    providers = []
    for index in range(base["provider_count"]):
        slots = provider_rng.randint(base["weekly_caseload_min"], base["weekly_caseload_max"])
        providers.append(Provider(f"P{index + 1:02d}", max(1, round(slots * capacity_multiplier))))

    return County(seed=seed, episodes=tuple(episodes), providers=tuple(providers))
