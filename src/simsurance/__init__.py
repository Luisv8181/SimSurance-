"""Core research components for SimSurance."""

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

__all__ = [
    "AdjudicationResult", "AdjudicationStatus", "Claim", "CoverageStatus",
    "Ledger", "LedgerError", "PolicyError", "PolicyRegistry", "PolicyRule",
    "Provenance", "Transaction", "TransactionType", "adjudicate_claim",
]
