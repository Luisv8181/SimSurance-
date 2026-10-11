"""Core research components for SimSurance."""

from .county import (
    County,
    CountyConfig,
    CountyConfigError,
    Episode,
    Provider,
    generate_county,
    load_config,
    parse_config,
)
from .ledger import Ledger, LedgerError, Transaction, TransactionType
from .policy import (
    AdjudicationResult,
    AdjudicationStatus,
    Claim,
    CoverageStatus,
    PolicyError,
    PolicyRegistry,
    PolicyRule,
    Provenance,
    adjudicate_claim,
)
from .runner import build_manifest, run_replications, summarize, summarize_runs
from .simulator import RunResult, build_toy_registry, simulate

__all__ = [
    "AdjudicationResult",
    "AdjudicationStatus",
    "Claim",
    "County",
    "CountyConfig",
    "CountyConfigError",
    "CoverageStatus",
    "Episode",
    "Ledger",
    "LedgerError",
    "PolicyError",
    "PolicyRegistry",
    "PolicyRule",
    "Provenance",
    "Provider",
    "RunResult",
    "Transaction",
    "TransactionType",
    "adjudicate_claim",
    "build_manifest",
    "build_toy_registry",
    "generate_county",
    "load_config",
    "parse_config",
    "run_replications",
    "simulate",
    "summarize",
    "summarize_runs",
]
