"""Unit tests for the synthetic county, baseline simulator, and replication runner (M4-M7)."""

from __future__ import annotations

import copy
import json
import unittest
from pathlib import Path

from simsurance import (
    CountyConfigError,
    generate_county,
    load_config,
    parse_config,
    run_replications,
    simulate,
    summarize_runs,
)

ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / "config" / "toy_county.json"


class CountySimulationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.raw = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
        cls.config = load_config(CONFIG_PATH)

    def test_verified_rule_parameter_requires_source_ref(self) -> None:
        bad = copy.deepcopy(self.raw)
        bad["parameters"]["population"]["provenance"] = "verified_rule"
        with self.assertRaises(CountyConfigError):
            parse_config(bad)

    def test_invalid_probability_rejected(self) -> None:
        bad = copy.deepcopy(self.raw)
        bad["parameters"]["no_show_probability"]["value"] = 1.5
        with self.assertRaises(CountyConfigError):
            parse_config(bad)

    def test_seeded_county_and_simulation_are_reproducible(self) -> None:
        county_a = generate_county(self.config, seed=7)
        county_b = generate_county(self.config, seed=7)
        self.assertEqual(county_a, county_b)

        run_a = simulate(self.config, county_a, "baseline")
        run_b = simulate(self.config, county_b, "baseline")
        self.assertEqual(run_a.metrics, run_b.metrics)
        self.assertEqual(run_a.weekly_waitlist, run_b.weekly_waitlist)
        self.assertEqual(run_a.ledger.transactions, run_b.ledger.transactions)

    def test_episode_and_ledger_invariants_hold(self) -> None:
        county = generate_county(self.config, seed=11)
        for scenario_id in ("baseline", "care_coordination_pilot"):
            with self.subTest(scenario=scenario_id):
                result = simulate(self.config, county, scenario_id)
                m = result.metrics
                self.assertEqual(
                    m["arrivals"],
                    m["started_care"] + m["left_waitlist"] + m["still_waiting_at_end"],
                )
                self.assertEqual(
                    m["started_care"],
                    m["completed"] + m["stopped_care_early"] + m["in_care_at_end"],
                )
                self.assertGreater(m["capitation_transfers_cents"], 0)
                self.assertEqual(
                    m["system_cost_cents"],
                    m["service_payments_cents"] + m["coordinator_cost_cents"],
                )

    def test_common_random_numbers_isolate_scenario_effect(self) -> None:
        base_runs = run_replications(self.config, "baseline", range(1, 11))
        pilot_runs = run_replications(self.config, "care_coordination_pilot", range(1, 11))
        for b, p in zip(base_runs, pilot_runs):
            self.assertEqual(b.metrics["arrivals"], p.metrics["arrivals"])
            self.assertEqual(b.metrics["weekly_slots"], p.metrics["weekly_slots"])
        base_summary = summarize_runs(base_runs)
        pilot_summary = summarize_runs(pilot_runs)
        self.assertGreater(
            pilot_summary["metrics"]["completed"]["mean"],
            base_summary["metrics"]["completed"]["mean"],
        )

    def test_exported_lab_data_matches_config_hash(self) -> None:
        exported = json.loads((ROOT / "learning-lab" / "data" / "county-sim.json").read_text(encoding="utf-8"))
        self.assertEqual(exported["manifest"]["config_sha256"], self.config.sha256)
        self.assertEqual(len(exported["runs"]), 8)


if __name__ == "__main__":
    unittest.main()
