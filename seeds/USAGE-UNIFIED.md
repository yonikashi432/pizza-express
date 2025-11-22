# USAGE — Unified Golden Operator Pack

Quick start:
1) Copy `unified-golden-operator-v25-35.yaml` into a new chat or config system as a seed template (human review recommended).
2) Start from default profile `balanced` or `conservative` depending on latency/cost targets.
3) Render diagrams for visual verification:
   - Mermaid: open `golden-omega.mmd` in a Mermaid viewer/editor
   - Graphviz DOT: `dot -Tpng seeds/golden-omega.dot -o seeds/omega.png`

Guardrails & Safety:
- Keep `coherence_floor >= 0.82`
- Keep `latency_budgets.p95_ms <= 1200` for critical workloads
- Use the `M56` lock for core invariants and `M53` for quiet immunity

Developer notes:
- Update `seeds/unified-golden-operator-v25-35.yaml` when adding or changing behavior
- All policy changes should go through an RFC process in `governance.change_control`

