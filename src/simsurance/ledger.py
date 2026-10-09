"""Small auditable financial ledger for synthetic SimSurance scenarios.

This module models transactions, not legal payment authority. It uses integer
cents and requires explicit classification of system-cost inclusion.
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
from typing import Iterable


class LedgerError(ValueError):
    """Raised when a transaction violates ledger invariants."""


class TransactionType(str, Enum):
    FUNDING_TRANSFER = "funding_transfer"
    CAPITATION = "capitation"
    SERVICE_PAYMENT = "service_payment"
    ADMINISTRATIVE_COST = "administrative_cost"
    PROVIDER_OPERATING_COST = "provider_operating_cost"
    GRANT = "grant"
    ADJUSTMENT = "adjustment"
    REVERSAL = "reversal"


@dataclass(frozen=True, slots=True)
class Transaction:
    transaction_id: str
    period: str
    payer: str
    payee: str
    amount_cents: int
    transaction_type: TransactionType
    scenario_id: str
    rule_ref: str | None = None
    reference_id: str | None = None
    include_in_system_total: bool = False

    def __post_init__(self) -> None:
        for field_name in ("transaction_id", "period", "payer", "payee", "scenario_id"):
            value = getattr(self, field_name)
            if not isinstance(value, str) or not value.strip():
                raise LedgerError(f"{field_name} must be a non-empty string")
        if isinstance(self.amount_cents, bool) or not isinstance(self.amount_cents, int):
            raise LedgerError("amount_cents must be an integer number of cents")
        if self.amount_cents <= 0:
            raise LedgerError("amount_cents must be positive; use a typed reversal for corrections")
        if self.payer == self.payee:
            raise LedgerError("payer and payee must be different entities")
        if not isinstance(self.transaction_type, TransactionType):
            raise LedgerError("transaction_type must be a TransactionType")
        if self.include_in_system_total and self.transaction_type in {
            TransactionType.FUNDING_TRANSFER,
            TransactionType.CAPITATION,
            TransactionType.GRANT,
        }:
            raise LedgerError(
                "funding transfers, capitation, and grants cannot be counted directly as "
                "consolidated system costs; model the downstream use of funds instead"
            )
        if self.transaction_type in {TransactionType.SERVICE_PAYMENT, TransactionType.CAPITATION}:
            if not self.rule_ref or not self.rule_ref.strip():
                raise LedgerError("service payments and capitation require a rule_ref")


class Ledger:
    """Append-only transaction collection with deterministic summary methods."""

    def __init__(self, transactions: Iterable[Transaction] = ()) -> None:
        self._transactions: list[Transaction] = []
        self._ids: set[str] = set()
        for transaction in transactions:
            self.add(transaction)

    @property
    def transactions(self) -> tuple[Transaction, ...]:
        return tuple(self._transactions)

    def add(self, transaction: Transaction) -> None:
        if transaction.transaction_id in self._ids:
            raise LedgerError(f"duplicate transaction_id: {transaction.transaction_id}")
        self._transactions.append(transaction)
        self._ids.add(transaction.transaction_id)

    def outgoing_by_payer(self, payer: str) -> int:
        """Return cents paid/transferred by a payer, across all transaction types."""
        return sum(t.amount_cents for t in self._transactions if t.payer == payer)

    def totals_by_payer(self) -> dict[str, int]:
        totals: dict[str, int] = {}
        for transaction in self._transactions:
            totals[transaction.payer] = totals.get(transaction.payer, 0) + transaction.amount_cents
        return dict(sorted(totals.items()))

    def system_total_cents(self, *, scenario_id: str | None = None) -> int:
        """Sum explicitly designated final-system costs, excluding financing transfers."""
        return sum(
            t.amount_cents
            for t in self._transactions
            if t.include_in_system_total and (scenario_id is None or t.scenario_id == scenario_id)
        )

    def total_by_type(self, *, scenario_id: str | None = None) -> dict[str, int]:
        totals: dict[str, int] = {}
        for transaction in self._transactions:
            if scenario_id is not None and transaction.scenario_id != scenario_id:
                continue
            key = transaction.transaction_type.value
            totals[key] = totals.get(key, 0) + transaction.amount_cents
        return dict(sorted(totals.items()))
