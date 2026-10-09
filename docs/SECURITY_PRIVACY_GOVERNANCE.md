# Security, Privacy, Ethics and Governance

## Prototype boundary
Use generated synthetic people and public aggregate data. Do not ingest/commit identifiable client data, PHI, PII, private claims extracts, credentials, tokens or restricted data.

## Synthetic data
Synthetic data do not automatically eliminate re-identification risk. Document generation method, source aggregates, granularity, linkage risks and limitations. Do not make synthetic people by copying identifiable records and changing a few fields.

## Source/data rights
Check licenses and terms before redistributing full source documents, extracts or datasets. Prefer source metadata, links, citations and permitted excerpts. Track versions and superseded sources; do not commit restricted data.

## Human governance
Consult appropriate institutional review/ethics offices before interviews, surveys, nonpublic records or studies potentially involving human subjects; do not assume simulation categorically eliminates review. Qualified experts must review material policy, actuarial, clinical and statistical assumptions.

## Security
- No secrets in source control.
- Use least privilege, environment variables and secret management.
- Validate uploaded documents and sandbox ingestion.
- Use dependency/static/secret scanning where feasible.
- Restrict future private data processing with appropriate access logs, retention and deletion.
- Do not send sensitive data to third-party LLMs.

## Reporting
Label results observed, estimated, assumed or simulated. Separate payer-level budget impact from consolidated cost. Do not assert policy authorization without reviewing the exact applicable authority. Do not present simulations as causal evidence, guaranteed savings or individual-level predictions.
