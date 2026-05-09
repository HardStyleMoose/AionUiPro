# AionUiPro

> Free, local, open-source GUI app for Gemini CLI — extended into a pro desktop AI operations control center.

AionUiPro is a public fork of AionUI. It keeps the original goal of making Gemini CLI easier to use through a clean desktop interface, while adding a planned Pro layer for local runtimes, Discord assistants, Hermes Agent orchestration, Obsidian memory, and safer model/profile management.

## Project Status

This fork is currently in the planning and implementation-tracking stage for the Pro upgrade. The base AionUI desktop app remains the foundation; new work is being staged carefully through small feature branches so the app stays stable.

- Full architecture handoff: [`TodoContext.txt`](./TodoContext.txt)
- Checklist file: [`TODO.md`](./TODO.md)
- GitHub tracking issue: [#1 AionUiPro Discord + Hermes + Vulkan Runtime Upgrade Checklist](https://github.com/HardStyleMoose/AionUiPro/issues/1)

## Original AionUI Foundation

AionUI is a free, local, open-source GUI app for Gemini CLI. This fork keeps that base experience and aims to preserve compatibility with the upstream app while adding optional advanced modules.

Core base goals preserved:

- Local-first desktop workflow
- Gemini CLI GUI experience
- Agent and remote connection settings
- Model and assistant management
- Clean Electron desktop interface
- Existing AionUI behavior should remain intact

## Planned AionUiPro Additions

### Discord Assistant Integration

The existing `Settings -> Remote -> Discord` section is planned to become a full Discord bot control panel, matching the Telegram setup style already present in the app.

Planned Discord features:

- Bot token setup with secure storage
- Client ID and Guild/Server ID fields
- Slash command sync
- Invite link generation
- Authorized users, admin roles, and trusted roles
- Public `/ask` commands routed to the community bot
- Owner-only `/work` commands routed to the private work agent

### Dual Hermes Docker Runtimes

AionUiPro will manage two isolated Hermes Agent Docker runtimes:

| Runtime | Purpose | Memory Scope | Default Behavior |
|---|---|---|---|
| `hermes-work` | Private work agent | Private | On-demand |
| `hermes-gemma4-community` | Public/community Discord bot | Community only | Always-on when Discord is enabled |

The community bot must never access private work memory, private repo mounts, private Obsidian vaults, or owner-only execution tools.

### Vulkan-first llama.cpp Profiles

The owner machine defaults to manual llama.cpp with Vulkan tuning. This is important for the RTX 2060 Super setup used by the maintainer.

Rules:

- Owner default backend: manual llama.cpp Vulkan
- No silent CUDA fallback
- Docker Model Runner is optional, not a replacement for the owner Vulkan profile
- All model launches require saved tune profiles

### Tune Profile Governance

AionUiPro will use saved tune profiles instead of hidden runtime changes.

Planned profile abilities:

- Save known-good llama.cpp settings
- Import/export profile JSON
- Clone profiles
- Benchmark profiles
- Mark profiles as last-known-good
- Create candidate profiles without auto-activating them
- Assign profiles to agents

### Obsidian Memory Surfaces

Obsidian will be used as a safe human-readable memory surface for summaries, playbooks, and reviewed skill candidates.

Rules:

- No API keys or tokens in Obsidian
- Separate work and community vaults
- Community memory cannot auto-promote into private work memory
- Owner approval required for promotion

### Fork-safe Updates

AionUiPro should update from this fork, not overwrite itself from upstream.

Planned update controls:

- Update source indicator
- Sync My GitHub Fork button
- Conflict-aware fork sync
- No force-push
- No reset-over-custom-code behavior

### One-click Runtime Controls

Planned About/System controls:

- Start Everything
- Save & Exit All
- Runtime status summary
- Docker/Hermes/Discord health checks
- Graceful shutdown without manually killing ports

## Implementation Tracker

Progress is tracked in the repo issue checklist:

[Open the implementation checklist issue](https://github.com/HardStyleMoose/AionUiPro/issues/1)

Major phases:

- [ ] Safety and repo guardrails
- [ ] CI foundation
- [ ] Tune profile system
- [ ] Vulkan llama.cpp runtime
- [ ] Docker Model Runner optional backend
- [ ] Dual Hermes Docker runtime
- [ ] Hermes runtime UI
- [ ] Discord Remote panel
- [ ] Discord routing and commands
- [ ] Memory and skill boundaries
- [ ] About page runtime controls
- [ ] Start Everything workflow
- [ ] Save & Exit All workflow
- [ ] OpenRouter optional enhancements
- [ ] Final stabilization

## Security Rules

This is a public repository.

Do not commit:

- API keys
- Discord bot tokens
- Hugging Face tokens
- NVIDIA NIM keys
- OpenRouter keys
- `.env` files
- Docker runtime data
- Obsidian vault contents
- private machine paths containing secrets
- local model files

Secrets should live only in encrypted app storage, local environment files that are ignored by Git, or user-managed secret stores.

## Development Rules

- Keep `main` stable and buildable
- Use small feature branches
- Prefer additive modules over destructive rewrites
- Do not break existing AionUI behavior
- Do not silently change runtime flags
- Do not auto-switch model backends
- Keep work and community memory isolated

See [`TodoContext.txt`](./TodoContext.txt) for the full branch strategy, implementation roadmap, CI plan, Vulkan policy, and acceptance criteria.

## License and Attribution

This project is a fork of AionUI. Original AionUI functionality and upstream work should be preserved and credited while this fork adds optional Pro-focused integrations and workflow improvements.
