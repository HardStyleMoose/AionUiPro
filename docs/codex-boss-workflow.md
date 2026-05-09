# Codex Boss Workflow Plan

This document is the handoff plan for running AionUiPro development with Codex as the lead/boss agent. It is not limited to the Discord bot. Codex should coordinate the full AionUiPro upgrade: side-by-side app setup, Hermes Docker, local/provider routing, Discord, model profiles, Obsidian memory surfaces, Start/Save workflows, and fork-safe updates.

## Core Direction

The maintainer already has the original AionUI installed and configured. AionUiPro must be a second side-by-side app named `AionUiPro`, with separate app data, separate update source, and no destructive migration of the original AionUI setup.

Hermes was removed from WSL and must be reintroduced through Docker only.

Codex is the boss agent:

- Codex creates branches.
- Codex reads `TodoContext.txt`, `TODO.md`, this workflow, and issue #1 before coding.
- Codex breaks work into small PR-sized phases.
- Codex delegates subtasks conceptually to specialized workstreams but keeps final control of edits.
- Codex must not implement everything in one huge refactor.

## Mandatory Safety Rules

- Public repo: no secrets, tokens, `.env`, private Discord IDs, private vaults, Docker data, or local model files.
- Personal Discord bot config stays local only.
- Original AionUI install must remain untouched.
- AionUiPro must have separate app identity and user data.
- Owner default local runtime is manual llama.cpp Vulkan.
- Do not silently fallback from Vulkan to CUDA.
- Do not burn all ChatGPT/OpenAI rate limit when local/other providers are configured.
- Do not launch local models without saved tune profiles.
- Community runtime must never access private work runtime memory.

## Target Architecture

```text
Windows 11
  Original AionUI
    - left installed and untouched

  AionUiPro Desktop
    - Codex-built fork
    - separate app identity
    - separate settings/userData
    - Remote -> Discord implementation
    - Model -> Tune Profiles
    - Agents -> profile-bound agents
    - About -> Sync My Fork / Start Everything / Save & Exit All

  Docker Desktop
    - hermes-work
    - hermes-gemma4-community

  Local model backends
    - manual llama.cpp Vulkan owner profile
    - Ollama if configured
    - LM Studio if configured
    - Docker Model Runner optional

  Obsidian
    - work vault surface
    - community vault surface
```

## Codex Boss Operating Mode

Codex should work in phases and update issue #1/TODO.md when phases complete.

Recommended roles Codex should simulate internally:

1. Repo Safety Lead
   - checks branch hygiene, secrets, updater target, app identity.
2. Runtime Lead
   - implements Hermes Docker and local backend lifecycle.
3. Model Routing Lead
   - implements tune profiles and rate-limit-aware provider router.
4. Discord Lead
   - implements Remote -> Discord, slash commands, permissions, local token storage.
5. UI Lead
   - keeps AionUI style consistent.
6. QA Lead
   - adds tests and verifies build.

Codex remains responsible for all final changes.

## Phase A — Prepare Side-by-Side AionUiPro

Goal: make the fork safe to run beside the already installed original AionUI.

Tasks:

- Confirm current package metadata.
- Change product/display name to `AionUiPro` where appropriate.
- Use separate appId where appropriate.
- Use separate userData directory from original AionUI.
- Use separate update source: `HardStyleMoose/AionUiPro`.
- Add visible About page update source indicator.
- Add safeguards against overwriting original AionUI settings.
- Add optional import-from-original flow only as an explicit user action.

Acceptance:

- Original AionUI can remain installed.
- AionUiPro can be built/installed as a second app.
- AionUiPro settings do not overwrite original AionUI settings.

## Phase B — Install Hermes Through Docker

Goal: restore Hermes through Docker image only, not WSL install.

Default local folder:

```text
C:\AI\HermesDocker\
  compose\
  work-data\
  gemma4-community-data\
  work-obsidian\
  community-obsidian\
```

Hermes containers:

```text
hermes-work
  port: 8642 -> 8642
  data: C:\AI\HermesDocker\work-data
  vault: C:\AI\HermesDocker\work-obsidian
  mode: private, owner-only, on-demand

hermes-gemma4-community
  port: 8643 -> 8642
  data: C:\AI\HermesDocker\gemma4-community-data
  vault: C:\AI\HermesDocker\community-obsidian
  mode: public/community, always-on when Discord enabled
```

Tasks:

- Add Docker detection.
- Add Docker Desktop/engine check.
- Add Compose template generator.
- Add `hermes-work` and `hermes-gemma4-community` runtime profiles.
- Add start/stop/restart/logs/health APIs.
- Never mount Docker socket by default.
- Never mount private repo/vault into community container.

Manual setup baseline for user:

```powershell
mkdir C:\AI\HermesDocker
mkdir C:\AI\HermesDocker\compose
mkdir C:\AI\HermesDocker\work-data
mkdir C:\AI\HermesDocker\gemma4-community-data
mkdir C:\AI\HermesDocker\work-obsidian
mkdir C:\AI\HermesDocker\community-obsidian
docker pull nousresearch/hermes-agent:latest
```

Acceptance:

- AionUiPro boots without Docker.
- If Docker exists, AionUiPro can detect status.
- Compose generation is safe and does not overwrite manually edited files without confirmation.

## Phase C — Model Tune Profiles and Provider Routing

Goal: use local and other providers intelligently so the project does not consume all ChatGPT/OpenAI limits.

Routing modes:

- local-first
- balanced
- cloud-first
- manual approval

Default recommended policy for maintainer:

```text
Planner/reviewer: configured stronger provider only when allowed
Coder/debugger: local manual llama.cpp Vulkan profile when suitable
Summarizer/memory: cheap/local profile
Community bot: community profile/provider only
Private work: private profile/provider only
```

Local load limits:

- Default max heavy local model jobs: 1
- Queue extra local tasks instead of spawning many model processes.
- Do not load multiple large models simultaneously unless user opts in.

Tasks:

- Add saved Tune Profiles.
- Add owner default manual llama.cpp Vulkan profile type.
- Add provider router policy object.
- Add per-provider soft limit/cooldown state.
- Add visible provider used per run.
- Add no-silent-paid-provider-switch rule.

Acceptance:

- No model launches without saved profile.
- Multi-agent work does not route every subtask to ChatGPT/OpenAI by default.
- Local profiles are preferred when policy allows.

## Phase D — Owner Manual llama.cpp Vulkan Runtime

Goal: support maintainer’s Vulkan llama.cpp flow on RTX 2060 Super.

Tasks:

- Add Vulkan detection service.
- Detect `vulkaninfo` when available.
- Detect Vulkan-capable GPU.
- Validate configured llama.cpp Vulkan binary.
- Validate model path.
- Launch llama-server with saved profile flags.
- Track process PID and port.
- Add health check and graceful stop.
- No silent CUDA fallback.

Acceptance:

- Missing Vulkan blocks owner profile launch with clear error.
- App can start/stop app-owned llama.cpp Vulkan process.
- Save & Exit All stops app-owned llama.cpp process.

## Phase E — AionUiPro Agents Page

Goal: use AionUI multi-agent abilities without sending everything to one paid provider.

Tasks:

- Add/extend agent cards for:
  - Hermes Work Agent
  - Gemma4 Community Bot
  - manual llama.cpp Vulkan Agent
  - Docker Model Runner Agent
  - Ollama Agent
  - LM Studio Agent
- Add assigned Tune Profile per agent.
- Add memory scope and skills scope per agent.
- Add per-agent provider policy.
- Block incompatible profile assignment.

Acceptance:

- Agents can be assigned saved profiles.
- Community agent cannot use private profiles.
- Work agent can use private/shared profiles.

## Phase F — Remote -> Discord

Goal: implement the existing Discord panel, not a separate final settings page.

Tasks:

- Locate existing Remote settings page.
- Replace Discord `Coming Soon` with Telegram-style setup.
- Add bot token field with secure storage.
- Add Client ID and Guild ID.
- Add agent selector.
- Add default model/profile selector.
- Add authorized users.
- Add admin/trusted role IDs.
- Add Sync Slash Commands.
- Add Generate Invite Link.
- Add Test Bot.

Routing:

```text
/ask -> Gemma4 Community Bot
/work -> Hermes Work Agent, owner/admin only
```

Personal bot boundary:

- Code is generic.
- Credentials are local-only.
- Personal token/client/guild/channel/role/user IDs are never committed.

Acceptance:

- Other users can connect their own bot.
- Maintainer can use personal bot locally through encrypted settings.
- Public repo has no personal bot details.

## Phase G — Obsidian Memory Surfaces

Goal: keep Obsidian useful without making it the unsafe runtime controller.

Recommendation:

- AionUiPro owns runtime control, provider routing, Docker lifecycle, Discord, and memory boundaries.
- Obsidian stores safe markdown summaries/playbooks/candidates.
- Obsidian Agent Client plugin can be optional bridge, not the main controller.

Tasks:

- Add separate work/community vault paths.
- Add markdown summary writer.
- Add memory/skill candidate queues.
- Add owner approval for promotion.
- Add no-secrets-in-vault checks where practical.

Acceptance:

- Work and community memory remain separated.
- Community notes cannot auto-promote into work memory.
- Secrets are never written to Obsidian.

## Phase H — Start Everything

Goal: one click to start the configured stack.

Flow:

1. Check Docker.
2. Start Docker Desktop if possible or show instructions.
3. Generate compose if missing.
4. Start community runtime if Discord enabled.
5. Start work runtime if configured.
6. Validate/start llama.cpp Vulkan profile if configured.
7. Start Discord bridge if enabled.
8. Sync slash commands if configured.
9. Probe health.
10. Show final status.

Script:

```text
scripts/start-everything.ps1
```

Acceptance:

- User does not manually open multiple terminals.
- App reports exactly what started and what failed.

## Phase I — Save & Exit All

Goal: one click to save state and stop app-owned services.

Flow:

1. Stop accepting new Discord jobs.
2. Flush active sessions.
3. Save/summarize memory.
4. Write Obsidian summaries if enabled.
5. Stop app-owned llama.cpp process.
6. Stop Hermes Work.
7. Stop Community Bot unless keep-alive is enabled.
8. Stop Discord bridge.
9. Release app-owned ports.
10. Call `app.quit()` directly.

Script:

```text
scripts/save-and-exit-all.ps1
```

Acceptance:

- No manual port killing.
- No Docker volume deletion.
- Shutdown is repeatable and visible.

## Codex First Task

Start with branch:

```text
chore/fork-guardrails
```

First goals:

1. Verify side-by-side app identity requirements.
2. Verify updater source points to this fork.
3. Add secret/forbidden-file guardrails.
4. Do not touch Discord or Hermes yet.

Only after Phase A is green should Codex move to CI and profile/runtime work.
