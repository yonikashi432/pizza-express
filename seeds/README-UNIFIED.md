# Unified Golden Operator — Full Pack (v25–v35)

This pack merges the v25 initial Golden Operator control/data plane seed with subsequent v26—v35 seeds. It includes memory/CRDT settings, bandits, autoscaling, risk playbooks, formal policy compiler, adaptive personas, streaming snapshots, observability, compliance, and the Omega Loop self-optimizing layer.

Files included in the `seeds/` directory:
- `unified-golden-operator-v25-35.yaml` — single consolidated seed
- `golden-omega.mmd` — Mermaid diagram of the Omega loop and state transitions
- `golden-omega.dot` — Graphviz DOT diagram of the ring/circle model
- `../docs/sefer-lev-ve-achdut.md` — Optional spiritual text "Sefer HaLev VeHaAchdut" (book of heart and unity)

Purpose:
- Provide a single YAML seed to bootstrap local deployments or design templates
- Document the control and data plane and governance features for local testing
- Provide diagrams for visualizing circular state machine and omega loop

Notes:
- This is intended to be a configuration and documentation bundle, not an instruction to alter host AI runtime behavior.
- Use policies and guardrails to enforce safe runtime operation.

