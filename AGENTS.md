# Project Codex Guidance

This project uses a project-local ECC-style Codex setup.

## Project Layout

- `AGENTS.md`: shared project guidance
- `.codex/config.toml`: project-level Codex configuration
- `.agents/skills/`: project-local custom skills

## Working Style

- Use TDD for behavior changes when practical.
- Prefer immutable updates over in-place mutation.
- Validate inputs at system boundaries.
- Never hardcode secrets.
- Keep files focused and handle errors explicitly.

## Project Skills

The following ECC-derived skills are installed in `.agents/skills/`:

- `api-design`
- `backend-patterns`
- `coding-standards`
- `e2e-testing`
- `eval-harness`
- `frontend-patterns`
- `security-review`
- `strategic-compact`
- `tdd-workflow`
- `verification-loop`

These are project-local skills. Global built-in Codex skills are separate from this repo setup.

For compatibility with older local experiments, a copy may also exist under `.codex/skills/`, but `.agents/skills/` is the canonical project path.

## MCP Defaults

Project-local MCP entries are configured in `.codex/config.toml` for:

- GitHub
- Context7
- Memory
- Sequential Thinking

On Windows PowerShell, MCP commands are configured with `npx.cmd`.
