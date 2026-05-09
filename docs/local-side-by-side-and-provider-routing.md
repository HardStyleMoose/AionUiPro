# Local Side-by-Side Setup and Provider Routing

This note captures an important maintainer requirement for AionUiPro.

## Existing AionUI Install

The maintainer already has the original AionUI installed and configured. AionUiPro must be able to run as a second separate desktop app on the same Windows machine.

Requirements:

- Build/display name should be `AionUiPro`.
- App identity should be separate from upstream AionUI where practical.
- User data directory must be separate from the original AionUI app data.
- Tray identity and shortcuts should be clearly named `AionUiPro`.
- Auto-updater should target `HardStyleMoose/AionUiPro`.
- Do not automatically overwrite or migrate the original AionUI settings.
- Importing existing AionUI settings must be opt-in only.

## Provider and Rate-Limit Routing

AionUiPro should avoid sending every task to a single cloud provider when local models and other configured providers are available.

Required routing modes:

- `local-first`: use local backends first, then configured fallback.
- `balanced`: use local/smaller models for simple subtasks and stronger providers for planning/review only.
- `cloud-first`: use the selected cloud provider first, with local fallback if allowed.
- `manual`: ask before switching providers.

The router should support:

- Per-agent provider assignment.
- Per-task provider class.
- Per-provider session/day soft limits.
- Cooldown after rate-limit responses.
- Max parallel local jobs.
- Max parallel cloud jobs.
- Visible provider used per response/log where practical.

## Multi-Agent Resource Policy

AionUiPro has multi-agent workflows, but the maintainer does not want the machine overloaded.

Default resource behavior:

- Only one heavy local inference process at a time on the maintainer machine unless explicitly changed.
- Prefer queueing subtasks over spawning many local model jobs.
- Avoid loading multiple large local models simultaneously.
- Summarizer/memory-writing tasks should prefer cheap/local profiles when available.
- Planner/reviewer tasks may use stronger configured providers only if policy allows.

## Personal Bot Boundary

The maintainer may use a personal Discord bot locally. That bot configuration must stay local and out of the public repo.

Public repo contains:

- Generic Discord integration code.
- Generic setup UI.
- Secure local storage support.
- Setup documentation for users to bring their own bot.

Public repo must not contain:

- Personal bot credentials.
- Personal Discord app details.
- Private server/channel/role/user identifiers.
- Local config files.

## Acceptance Criteria

- AionUiPro can be installed and run beside original AionUI.
- AionUiPro keeps separate app settings and update source.
- Provider router supports local-first, balanced, cloud-first, and manual modes.
- Multi-agent workflows do not route every subtask to one paid provider by default.
- Personal Discord bot setup remains local-only.
