import unittest

from simsurance.ledger import Ledger, LedgerError, Transaction, TransactionType


def tx(tx_id, payer, payee, cents, kind, *, include=False, rule="RULE-1", scenario="baseline"):
    return Transaction(
        transaction_id=tx_id,
        period="2026-10",
        payer=payer,
        payee=payee,
        amount_cents=cents,
        transaction_type=kind,
        scenario_id=scenario,
        rule_ref=rule,
        include_in_system_total=include,
    )


class LedgerTests(unittest.TestCase):
    def test_integer_cents_and_payer_totals(self):
        ledger = Ledger([
            tx("cap-1", "DHS", "BH-MCO", 100_000, TransactionType.CAPITATION),
            tx("claim-1", "BH-MCO", "Clinic", 12_500, TransactionType.SERVICE_PAYMENT, include=True),
        ])
        self.assertEqual(ledger.outgoing_by_payer("DHS"), 100_000)
        self.assertEqual(ledger.outgoing_by_payer("BH-MCO"), 12_500)
        self.assertEqual(ledger.system_total_cents(), 12_500)

    def test_transfer_and_capitation_cannot_be_counted_as_system_cost(self):
        with self.assertRaises(LedgerError):
            tx("bad", "DHS", "BH-MCO", 10_000, TransactionType.CAPITATION, include=True)

    def test_payment_requires_rule_reference(self):
        with self.assertRaises(LedgerError):
            tx("bad", "BH-MCO", "Clinic", 1_000, TransactionType.SERVICE_PAYMENT, rule=None)

    def test_rejects_float_money(self):
        with self.assertRaises(LedgerError):
            tx("bad", "Payer", "Clinic", 10.50, TransactionType.SERVICE_PAYMENT)

    def test_rejects_nonpositive_amount(self):
        with self.assertRaises(LedgerError):
            tx("bad", "Payer", "Clinic", 0, TransactionType.SERVICE_PAYMENT)

    def test_duplicate_transaction_id_rejected(self):
        transaction = tx("same", "Payer", "Clinic", 100, TransactionType.SERVICE_PAYMENT, include=True)
        ledger = Ledger([transaction])
        with self.assertRaises(LedgerError):
            ledger.add(transaction)

    def test_scenario_filter(self):
        ledger = Ledger([
            tx("base", "Payer", "Clinic", 100, TransactionType.SERVICE_PAYMENT, include=True),
            tx("pilot", "Payer", "Clinic", 200, TransactionType.SERVICE_PAYMENT, include=True, scenario="pilot"),
        ])
        self.assertEqual(ledger.system_total_cents(scenario_id="baseline"), 100)
        self.assertEqual(ledger.system_total_cents(scenario_id="pilot"), 200)


if __name__ == "__main__":
    unittest.main()
