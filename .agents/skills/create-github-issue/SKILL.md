# Create GitHub Issue Skill

## Purpose

Standardise how VAIT team members and AI agents write GitHub issues so every task has clear context, bounded scope, and testable acceptance criteria. Works in **Cursor** and **Claude Code** via the `.agents/skills/` manifest in [AGENTS.md](../../../AGENTS.md).

## Trigger Condition

Load this skill when the user asks to:

- Create, draft, or file a GitHub issue
- Write issue acceptance criteria or scope boundaries
- Standardise an issue before handing work to an AI agent
- Triage a vague request into a structured issue

## Issue Structure

Every issue must use these three sections in order. Use Australian English spelling.

### 1. Context

Answer **why** this work is needed. Include:

- The problem, opportunity, or user need
- Who is affected (community, maintainers, contributors)
- Any relevant background, links, or prior decisions
- Why now (urgency, dependency, or trigger)

Do not list implementation steps here — that belongs in **In Scope / Done When**.

### 2. In Scope / Done When

Answer **what** must be true for this issue to close. Include:

- Concrete deliverables (files, features, docs, tests)
- Acceptance criteria as a checklist — each item must be verifiable
- Dependencies or blockers, if any
- Definition of done for AI-assisted work (e.g. lint passes, tests added, docs updated)

Phrase criteria as outcomes, not activities. Prefer "Footer shows ACNC registration number" over "Update the footer component".

### 3. Out of Scope

Answer **what we are deliberately not doing** in this issue. Include:

- Related work deferred to follow-up issues
- Nice-to-haves explicitly excluded
- Assumptions the reader should not make

Ground exclusions in the **Context** — if something is out of scope, briefly say why (e.g. "Separate issue: needs design review first").

## Workflow

### Step 1: Gather inputs

Before drafting, confirm or infer:

1. **Title** — short, imperative, scoped (e.g. `feat: add ACNC footer badge`)
2. **Labels** — match repository conventions when known
3. **Context** — why the work matters
4. **Done criteria** — how reviewers and agents verify completion
5. **Exclusions** — what to defer

Ask the user for missing critical detail. Do not invent requirements.

### Step 2: Draft the issue body

Use this template verbatim for section headings:

```markdown
## Context

<!-- Why do we need this? What problem does it solve? Who benefits? -->

## In Scope / Done When

<!-- Acceptance criteria. Checklist preferred — each item must be verifiable. -->

- [ ]

## Out of Scope

<!-- Deliberate exclusions. Tie back to Context where helpful. -->

-
```

### Step 3: Quality check

Before submitting, verify:

- [ ] **Context** explains *why*, not *how*
- [ ] Every **In Scope / Done When** item is testable or observable
- [ ] **Out of Scope** names at least one exclusion when the request is broad
- [ ] No duplicate content across sections
- [ ] Title is specific enough for an agent to start without guessing

### Step 4: Create the issue

**Preferred — GitHub issue form template** (when the repo has `.github/ISSUE_TEMPLATE/task.yml`):

```bash
gh issue create --web
```

Select **Task** and fill the form fields.

**CLI — from drafted body**:

```bash
gh issue create \
  --title "TITLE_HERE" \
  --body "$(cat <<'EOF'
## Context

...

## In Scope / Done When

- [ ] ...

## Out of Scope

- ...
EOF
)"
```

Add `--label` flags when appropriate. Link related issues with `Relates to #N` or `Blocked by #N` in **Context**.

### Step 5: Hand off to AI

When assigning work to Cursor or Claude Code, include in the prompt:

1. Issue URL or number
2. Instruction to load this skill and [AGENTS.md](../../../AGENTS.md)
3. Reminder to treat **In Scope / Done When** as the contract; do not expand into **Out of Scope** without a new issue

## Examples

### Example: Documentation gap

**Title:** `docs: document preview deployment workflow`

**Context:** Contributors cannot find how to QA branch previews. Cloudflare posts preview URLs on PRs, but this is undocumented, causing repeated questions in team chat.

**In Scope / Done When:**

- [ ] `docs/how-to/03-deployment.md` explains how to find and use preview URLs
- [ ] `docs/how-to/02-contributing.md` links to the preview section
- [ ] AGENTS.md or contributing docs mention preview QA for UI changes

**Out of Scope:**

- Changing Cloudflare configuration
- Adding automated visual regression tests

### Example: Feature request

**Title:** `feat: show next upcoming event on homepage hero`

**Context:** New visitors cannot see when the next community event is. The events API already exists; we need surface-level promotion on the homepage.

**In Scope / Done When:**

- [ ] Hero section displays the next future event (title, date, registration link)
- [ ] Graceful empty state when no upcoming events
- [ ] Component tests cover populated and empty states
- [ ] `pnpm run lint:fix && pnpm run typecheck && pnpm run test:run` pass

**Out of Scope:**

- Full events calendar page
- Event creation or admin UI
- Design changes outside existing hero layout tokens in DESIGN.md

## Runtime compatibility

| Runtime | How to load |
| ------- | ----------- |
| **Cursor** | Skill listed in AGENTS.md; agent reads `.agents/skills/create-github-issue/SKILL.md` when trigger matches |
| **Claude Code** | Same path via AGENTS.md universal manifest; emulate `.agents/` even if not auto-loaded |
| **Human contributors** | Use the **Task** template at `.github/ISSUE_TEMPLATE/task.yml` when opening issues on GitHub |

## Related artefacts

- Issue form template: `.github/ISSUE_TEMPLATE/task.yml`
- Pull request template: `.github/PULL_REQUEST_TEMPLATE.md` (aligned **Context** section)
- Pull request skill: `.agents/skills/vait-create-pr/SKILL.md`
- Contributing guide: `docs/how-to/02-contributing.md`
