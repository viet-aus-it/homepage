# VAIT Create Pull Request Skill

## Purpose

Standardise how VAIT team members and AI agents open pull requests so every PR explains _why_ the change exists, _what_ changed, and _what was verified_. Works in **Cursor** and **Claude Code** via the `.agents/skills/` manifest in [AGENTS.md](../../../AGENTS.md).

Pair with [vait-commit](../vait-commit/SKILL.md) for atomic commits before opening a PR. Pair with [create-github-issue](../create-github-issue/SKILL.md) when closing a tracked issue.

## Trigger Condition

Load this skill when the user asks to:

- Create, draft, or open a pull request
- Write a PR description or summary
- Run `/create-pr` or equivalent PR workflow
- Prepare a branch for review after completing work

## PR Structure

Every pull request body must follow [.github/PULL_REQUEST_TEMPLATE.md](../../../.github/PULL_REQUEST_TEMPLATE.md). Use Australian English spelling.

### 1. Context

Answer **why** this change is being proposed. Include:

- The problem solved or value added
- Link to the GitHub issue (`Closes #N`, `Fixes #N`, or `Relates to #N`) when applicable
- Enough background for a reviewer who has not been in the thread

Do not list file changes here — that belongs in **Changes**.

### 2. Changes

Answer **what** changed. Include:

- Key changes as bullet points, grouped by theme when helpful
- Notable files or areas touched (only when it aids review)
- Behavioural impact on the project or users

Keep bullets scannable. Omit drive-by refactors unless they affect review.

### 3. Checklist

Answer **what was verified**. Start from the template defaults and tailor:

- [ ] Code builds and runs locally
- [ ] Lint and formatting checks pass
- [ ] Tests pass (if applicable)
- [ ] Documentation updated (if needed)
- [ ] ADR added or updated (if structural conventions changed)

Mark items `[x]` only when genuinely completed. Add project-specific items when relevant (for example `DESIGN.md` updated for UI changes, [ADR](../../docs/adr/README.md) added or updated for structural changes).

## Workflow

### Step 1: Inspect the branch

Gather context before drafting:

```bash
git branch --show-current
git log --oneline origin/master..HEAD
git diff --stat origin/master...HEAD
```

Read the diff for the core changes. Identify the linked issue from commit messages or branch name.

### Step 2: Run pre-PR checks

**Do not create or update a PR until these pass:**

```bash
pnpm run lint:fix && pnpm run typecheck
```

If `lint:fix` reformats files, stage and commit the formatting changes first (use [vait-commit](../vait-commit/SKILL.md)). A PR must not be opened while the branch has lint or typecheck failures.

### Step 3: Draft the PR body

Use this template verbatim for section headings:

```markdown
## Context

<!-- Why is this change being proposed? What problem does it solve or what value does it add? -->

## Changes

<!-- What are the key changes in this PR? Bullet points preferred. -->

-

## Checklist

<!-- Checklist of what was tested or completed. Add/remove as needed. -->

- [ ] Code builds and runs locally
- [ ] Lint and formatting checks pass
- [ ] Tests pass (if applicable)
- [ ] Documentation updated (if needed)
- [ ] ADR added or updated (if structural conventions changed)
```

### Step 4: Quality check

Before submitting, verify:

- [ ] `pnpm run lint:fix && pnpm run typecheck` pass on the branch
- [ ] **Context** explains _why_, not a repeat of **Changes**
- [ ] **Changes** focuses on reviewer-relevant deltas
- [ ] Issue link present when work tracks an issue
- [ ] **Checklist** reflects what was actually run
- [ ] Title follows [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `feat:`, `fix:`, `chore:`, `docs:`)

### Step 5: Push the branch

```bash
git push -u origin "$(git branch --show-current)"
```

### Step 6: Create the pull request

```bash
gh pr create \
  --title "TYPE: short imperative summary" \
  --body "$(cat <<'EOF'
## Context

...

## Changes

- ...

## Checklist

- [ ] Code builds and runs locally
- [ ] Lint and formatting checks pass
- [ ] Tests pass (if applicable)
- [ ] Documentation updated (if needed)
- [ ] ADR added or updated (if structural conventions changed)
EOF
)"
```

Use `gh pr edit` to update an existing PR body. Add `--base master` if the default branch differs.

Include `Closes #N` in the PR body or title when the PR should close an issue on merge.

### Step 7: Summarise for the user

After `gh pr create` or `gh pr edit` succeeds, return the PR URL directly:

`https://github.com/viet-aus-it/homepage/pull/N`

## Examples

### Example: Docs-only change

**Title:** `docs: document preview deployment workflow`

**Context:** Closes #42. Contributors could not find how to QA branch previews; this caused repeated questions in team chat.

**Changes:**

- Add preview URL section to `docs/how-to/03-deployment.md`
- Link from `docs/how-to/02-contributing.md`

**Checklist:**

- [x] Documentation updated (if needed)
- [x] Lint and formatting checks pass (docs only)

### Example: Feature with tests

**Title:** `feat: show next upcoming event on homepage hero`

**Context:** Closes #51. New visitors had no visibility of the next community event from the homepage.

**Changes:**

- Fetch next future event in hero section
- Add empty state when no upcoming events
- Add component tests for populated and empty states

**Checklist:**

- [x] Code builds and runs locally
- [x] Lint and formatting checks pass
- [x] Tests pass (if applicable)
- [x] Documentation updated (if needed)

## Runtime compatibility

| Runtime                | How to load                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------- |
| **Cursor**             | Skill listed in AGENTS.md; invoke via `/create-pr` command or when trigger matches     |
| **Claude Code**        | Same path via AGENTS.md universal manifest; emulate `.agents/` even if not auto-loaded |
| **Human contributors** | GitHub pre-fills `.github/PULL_REQUEST_TEMPLATE.md` when opening a PR                  |

## Related artefacts

- Pull request template: `.github/PULL_REQUEST_TEMPLATE.md`
- Issue authoring skill: `.agents/skills/create-github-issue/SKILL.md`
- Contributing guide: `docs/how-to/02-contributing.md`
