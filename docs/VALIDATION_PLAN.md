# SimSurance Validation Plan

## Validation layers
1. Source validity: authoritative source, jurisdiction, version, effective date, exact passage.
2. Rule validity: reviewed interpretation and explicit unresolved states.
3. Code verification: implementation matches written specification.
4. Accounting verification: ledger reconciles and transfers/capitation avoid double counting.
5. Population calibration: synthetic aggregates compared with defined public benchmarks.
6. Process validation: utilization, wait and service transitions compared with observed or reviewed patterns.
7. Outcome validation: evaluate against independent/later data where feasible.
8. Uncertainty analysis: stochastic, parameter and structural uncertainty.
9. External review: policy, financial, clinical, statistical and community perspectives.
10. Reproducibility: environment/config/source/data/run manifest reproduces results.

Calibration is not validation, face validity is not empirical validation, and matching historic spending does not prove predictive validity under a new policy.

## Accounting tests
- No payment for denied claim without a separate explicit mechanism.
- Payments reference the applicable rule/version.
- Allowed/paid relationships follow the modeled rule.
- Adjustments/reversals remain traceable.
- Payer/payee totals reconcile by period.
- Internal transfers do not inflate consolidated expenditure.
- Capitation and downstream provider claims are not counted as separate societal costs.
- Money uses integer cents or fixed-point decimal.
- Identical deterministic inputs reproduce outputs.

## Statistical reporting
Use multiple replications for stochastic models, report distributions/intervals, test uncertain inputs such as demand, uptake, rates, capacity, dropout and costs, and document missingness, selection, measurement and transportability limitations.

## MVP success
A transparent toy baseline runs end-to-end; hand-calculated financial cases reconcile; run metadata are complete; one hypothetical scenario is compared with baseline; sensitivity identifies robust and assumption-dependent conclusions; the report makes clear it is not proof of real-world effects.
