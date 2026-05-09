# AionUiPro

AionUiPro is a fork of AionUI focused on becoming a polished desktop AI operations control center for local and cloud AI workflows.

## Planned Pro Features

- Discord Assistant Integration through the existing `Settings -> Remote -> Discord` panel.
- Dual Hermes Docker Runtimes: a private work agent and a public/community Gemma4 bot.
- Vulkan-first llama.cpp profiles for the owner machine, with no silent backend switching.
- Tune Profile Governance so local model launches use saved profiles only.
- Obsidian Memory Surfaces for safe markdown playbooks, summaries, and reviewed skill candidates.
- Fork-safe updates from `HardStyleMoose/AionUiPro`.
- One-click Start Everything and Save & Exit All runtime workflows.
- Optional Docker Model Runner backend for compatible profiles.

## Key Planning Files

- [`TodoContext.txt`](./TodoContext.txt) — full Codex handoff and architecture contract.
- [`TODO.md`](./TODO.md) — checkbox implementation tracker.

## Development Rules

- Keep `main` stable and buildable.
- Use small feature branches.
- Keep private runtime data outside the repository.
- Keep community bot memory separated from private work memory.
- Owner local runtime defaults to manual llama.cpp Vulkan.

See `TodoContext.txt` for the full branch strategy, implementation roadmap, and acceptance criteria.
