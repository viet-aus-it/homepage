---
name: vait-commit
description: >-
  Creates atomic Conventional Commits in the VAIT homepage repo with explicit
  file staging only. Use when the user asks to commit, stage changes, or write
  a commit message for this repository.
---

# VAIT Commit Skill

## Purpose

Standardise how VAIT team members and AI agents commit changes: one logical unit per commit, [Conventional Commits](https://www.conventionalcommits.org/) format, explicit staging only. Works in **Cursor** and **Claude Code** via the `.agents/skills/` manifest in [AGENTS.md](../../../AGENTS.md).

Pair with [vait-create-pr](../vait-create-pr/SKILL.md) after one or more commits are ready for review.

## Trigger Condition

Load this skill when the user asks to:

- Commit, stage, or save changes to git
- Write or improve a commit message
- Split work into atomic commits
- Prepare changes before opening a PR

**Only commit when the user explicitly requests it.** If unclear, ask first.

## Commit Message Format

```
<type>[optional scope]: <subject>

[optional body — why, not what; bullet points allowed]
```

### Types

| Type | When to use |
| ---- | ----------- |
| `feat` | New feature or user-visible behaviour |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `chore` | Tooling, config, skills, templates, deps |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test` | Adding or correcting tests |
| `build` | Build system or deployment config |
| `ci` | CI workflow changes |
| `style` | Formatting, no logic change |
| `perf` | Performance improvement |

Append `!` after the type for breaking changes (e.g. `feat!: remove legacy API`).

### Subject and body rules

- **Subject**: lowercase, imperative mood, no trailing period, max ~72 characters
- **Scope** (optional): area affected, e.g. `feat(hero):`, `docs(contributing):`
- **Body**: explain *why*; keep concise (~5 lines max); bullet points when listing related changes
- **No emojis** in subject or body
- **Australian English** in body text
- Link issues in body when relevant: `Closes #N`, `Relates to #N`

### Examples

```
feat(hero): show next upcoming event on homepage

Surface the next community event so new visitors see when to join.
Closes #51
```

```
chore: add vait-commit skill for atomic conventional commits

Standardise explicit staging and commit message format for AI-assisted work.
```

```
docs(contributing): link Task issue template to create-github-issue skill
```

## Staging Rules

**Never stage everything.** Adapted from team staging practice:

- **NEVER** use `git add -A`, `git add .`, or `git add --all`
- **Always** stage files explicitly by path: `git add path/to/file1 path/to/file2`
- Review what will be committed before staging
- **Never** stage unrelated files (secrets, `.env`, local config, accidental edits)
- Warn the user if they request committing files that likely contain secrets

```bash
# Inspect first
git status
git diff
git diff --staged

# Stage only files belonging to this atomic commit
git add src/components/Hero.tsx src/components/Hero.test.tsx
```

## Atomic Commit Rules

One commit = one logically complete, reviewable unit.

| Do commit together | Do not combine |
| ------------------ | -------------- |
| A feature and its tests | Two unrelated features |
| A fix and the test proving it | A feature and drive-by refactors in other files |
| A skill and its AGENTS.md registration | Formatting-only changes mixed with behaviour changes |
| Docs that describe the same change | Issue template and unrelated component fix |

When multiple unrelated changes exist, make **separate commits** with explicit staging for each.

## Workflow

### Step 1: Inspect (run in parallel)

```bash
git status
git diff
git diff --staged
git log --oneline -10
```

Identify which files belong to the requested commit. Exclude anything unrelated.

### Step 2: Pre-commit checks

When the commit includes code (not docs/templates-only):

```bash
pnpm run lint:fix && pnpm run typecheck
```

Pre-commit hooks run on commit; do not skip hooks (`--no-verify`) unless the user explicitly requests it.

### Step 3: Stage explicitly

```bash
git add <file1> <file2> <file3>
git diff --staged --stat
```

Confirm the staged set matches the intended atomic unit.

### Step 4: Draft the message

Analyse staged changes. Focus the message on *why*. Follow Conventional Commits and recent repo style from `git log`.

### Step 5: Commit

Pass the message via HEREDOC:

```bash
git commit -m "$(cat <<'EOF'
type(scope): imperative subject

Short body explaining why. Closes #N when applicable.
EOF
)"
```

### Step 6: Verify

```bash
git status
git log -1 --stat
```

If the commit failed due to a pre-commit hook that auto-modified files, fix the issue and create a **new** commit (do not amend unless all amend conditions are met).

## Amend Rules

**Avoid `git commit --amend`.** Only amend when **all** of these are true:

1. User explicitly requested amend, **or** commit succeeded but the hook auto-modified files that need including
2. HEAD commit was created in this conversation by you
3. Commit has **not** been pushed to remote

If the commit **failed** or was **rejected** by a hook, never amend: fix and create a new commit.

If already pushed, never amend unless the user explicitly requests it (requires force push).

## Safety Rules

- **Never** update git config
- **Never** run destructive git commands (`push --force`, `reset --hard`) unless explicitly requested
- **Never** force push to `master`
- **Never** use interactive git flags (`-i`)
- **Never** push unless the user explicitly asks

## Quality Checklist

Before committing, verify:

- [ ] User explicitly requested the commit
- [ ] Only relevant files are staged (no `git add .`)
- [ ] Staged changes form one atomic unit
- [ ] Message follows Conventional Commits
- [ ] Body explains *why* where non-obvious
- [ ] No secrets or `.env` files staged
- [ ] Lint and typecheck pass (for code changes)
- [ ] `git log -1` looks correct after commit

## Runtime compatibility

| Runtime | How to load |
| ------- | ----------- |
| **Cursor** | Skill listed in AGENTS.md; invoke when user asks to commit |
| **Claude Code** | Same path via AGENTS.md universal manifest; emulate `.agents/` even if not auto-loaded |

## Related artefacts

- Commit patterns: `.agents/rules/commands.md`
- Communication conventions: `.agents/rules/communication.md`
- Pull request skill: `.agents/skills/vait-create-pr/SKILL.md`
- Change management: [AGENTS.md](../../../AGENTS.md)
