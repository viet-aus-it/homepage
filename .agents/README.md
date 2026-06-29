# Agent configuration (maintainers)

**Not for normal coding sessions** — load only when adding rules, skills, or ADRs.

## Layers

1. **Always:** [AGENTS.md](../AGENTS.md) (~routing + mandatory)
2. **On demand:** domain rule + [references.md](rules/references.md); skill when triggered; DESIGN.md / ADRs by task
3. **Never preload:** all domain rules at once

## Where to add what

| Add                          | Location                                  | Also update                                                                 |
| ---------------------------- | ----------------------------------------- | --------------------------------------------------------------------------- |
| Structural decision          | `docs/adr/NNNN-*.md`                      | `docs/adr/README.md`, [references.md](rules/references.md) if new doc type  |
| Visual token / component key | `DESIGN.md`                               | Same PR                                                                     |
| Domain rule                  | `.agents/rules/<name>.md`                 | [references.md](rules/references.md), [AGENTS.md](../AGENTS.md) routing row |
| Skill                        | `.agents/skills/<name>/SKILL.md`          | [references.md](rules/references.md), [AGENTS.md](../AGENTS.md)             |
| Mandatory agent behaviour    | [AGENTS.md](../AGENTS.md)                 | Keep one line; detail in a rule file                                        |
| Shared link                  | [references.md](rules/references.md) only | Not per-rule cross-ref sections                                             |

**Drift rule:** Rules link to ADRs and DESIGN.md; they do not duplicate them.

**Signature check:** `VAIT_HOMEPAGE_AGENTS_v1.0`
