# Update Documentation Skill

## Purpose

Audit and update all project documentation to reflect recent code changes, ensuring docs stay in sync with the codebase.

## Trigger Condition

When user asks to:

- Update documentation
- Sync docs with recent changes
- Audit docs for accuracy
- Update README or AGENTS.md
- Check if docs are up to date

## Documentation Locations

| Location | Content | Key Sections |
|----------|---------|-------------|
| `README.md` | Project overview, setup, tech stack | Overview, quick start, commands |
| `docs/` | User-facing docs ([Diataxis](https://diataxis.fr/) framework) | Tutorials, how-to guides, explanation, reference |
| `AGENTS.md` | Agent control manifest | Project structure, tech stack, available skills/rules, commands |
| `.agents/rules/` | Domain-specific guidelines | Code style, patterns, commands, engineering principles, communication, special considerations, infrastructure |
| `.agents/skills/` | Task-specific toolkits | Each skill's SKILL.md |

## Workflow

### Step 1: Identify Recent Changes

Determine the scope of changes to review:

```bash
# If user specifies a range, use it. Otherwise, find recent changes:
git log --oneline --since="2 weeks ago"
git log --oneline HEAD~20..HEAD

# Get a summary of what changed:
git diff --stat <range>

# For a specific commit range:
git log --oneline <from>..<to>
```

Ask the user for a commit range if not provided. Default to the last 20 commits or 2 weeks, whichever is smaller.

### Step 2: Categorise Changes

Group changes by their documentation impact:

- **New features**: New routes, components, hooks, utilities
- **Config changes**: New env vars, build config, CI/CD changes
- **Architecture changes**: New modules, directory restructuring, new dependencies
- **Command changes**: New scripts, modified workflows
- **Skill/rule changes**: New or modified agent skills and rules

For each category, note which documentation locations are affected using the mapping:

| Change Type | Docs to Check |
|-------------|---------------|
| New feature/component | `README.md`, `docs/explanation/01-architecture.md`, `AGENTS.md` (project structure) |
| New dependency | `README.md`, `AGENTS.md` (tech stack), `docs/reference/01-project-reference.md` |
| New command/script | `README.md`, `AGENTS.md` (commands), `docs/reference/01-project-reference.md`, `.agents/rules/commands.md` |
| Infrastructure change | `docs/explanation/02-infrastructure.md`, `docs/how-to/03-deployment.md`, `.agents/rules/infrastructure.md` |
| New route | `AGENTS.md` (project structure), `docs/reference/01-project-reference.md` |
| New skill/rule | `AGENTS.md` (available skills/rules) |
| Test changes | `docs/how-to/01-development.md`, `docs/reference/01-project-reference.md` |
| CI/CD change | `docs/how-to/03-deployment.md`, `docs/reference/01-project-reference.md` |
| Config/env var change | `docs/reference/01-project-reference.md`, `README.md` |

### Step 3: Audit Each Location

For each affected documentation file, read the current content and compare against the actual codebase state:

1. **Read the doc file** to understand its current content
2. **Read the relevant source files** to understand what the doc should say
3. **Identify gaps**: missing features, outdated instructions, wrong commands, stale references
4. **Identify removals**: documented features that no longer exist

Pay special attention to:
- Tech stack versions and package names
- Command examples (do they still work?)
- File paths (do they still exist?)
- Project structure trees (match actual directory layout)

### Step 4: Apply Updates

Update each affected file following these principles:

- **Preserve existing style**: Match the tone, formatting, and structure of each file
- **Minimal changes**: Only update what is actually out of date — do not rewrite sections that are still accurate
- **Australian English**: Consistent spelling (e.g., 'organisation', 'optimised', 'behaviour')
- **No fluff**: Concise, factual documentation

### Step 5: Verify

Review all changes for:

```bash
# Check for broken file path references in docs
# (manually scan updated docs for paths and verify they exist)

# Verify commands still work
pnpm run typecheck
pnpm run lint
```

- All file paths referenced in docs exist
- All commands referenced in docs are valid
- Cross-references between docs are consistent (e.g., AGENTS.md tech stack matches README.md)

## Checklist

- [ ] Commit range identified and all changes reviewed
- [ ] Changes categorised by documentation impact
- [ ] `README.md` checked and updated
- [ ] `docs/` files checked and updated for affected topics
- [ ] `AGENTS.md` checked: project structure, tech stack, skills, rules, commands
- [ ] `.agents/rules/` checked for affected rules
- [ ] `.agents/skills/` checked for affected skills
- [ ] Cross-references between docs are consistent
- [ ] Australian English spelling throughout
- [ ] No stale file paths or broken references
- [ ] Passes `pnpm run lint` (for any code-adjacent changes)

## Documentation Framework

The `docs/` directory follows the [Diataxis](https://diataxis.fr/) framework. Each document must serve **one** primary purpose:

| Type | Purpose | Question It Answers |
|------|---------|---------------------|
| **Tutorial** | Learning-oriented guided experience | "Can you teach me to...?" |
| **How-to guide** | Goal-oriented steps | "How do I...?" |
| **Explanation** | Understanding-oriented discussion | "Why...? Can you tell me about...?" |
| **Reference** | Information-oriented lookup | "What is...?" |

Current `docs/` structure:

- **`tutorials/`**: `01-getting-started`
- **`how-to/`**: `01-development`, `02-contributing`, `03-deployment`
- **`explanation/`**: `01-architecture`, `02-infrastructure`
- **`reference/`**: `01-project-reference`

When updating docs, do not mix content types. Move how-to steps out of reference docs, move reference tables out of explanation docs, etc.

### External Linking Rule

Every mention of an external tool, framework, pattern, or standard must include a hyperlink on first mention per document. This applies to technology names, methodologies, external tools, specifications, and design patterns.

## Notes

- This skill audits and updates existing documentation. It does not create new `docs/` files unless a major new feature clearly warrants one.
- When in doubt about whether a change needs documentation, err on the side of updating — stale docs are worse than verbose docs.
- The `docs/` files are numbered for ordering. If a new file is needed, pick the next available number.
- `AGENTS.md` is the most frequently impacted file since it tracks project structure, tech stack, and available skills/rules.
- Run this skill after completing a feature, before cutting a release, or whenever the user suspects docs have drifted.
