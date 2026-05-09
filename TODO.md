# AionUiPro Implementation Checklist

This checklist tracks the staged implementation for the AionUiPro Discord + Hermes + Vulkan runtime upgrade.

## Phase 0 — Safety and Repo Guardrails

- [ ] Create `chore/fork-guardrails` branch
- [ ] Confirm `main` is clean and buildable
- [ ] Verify updater source is `HardStyleMoose/AionUiPro`
- [ ] Add forbidden-file checks for secrets and `.env`
- [ ] Add fork overwrite guardrails
- [ ] Document branch protection requirements

## Phase 1 — CI Foundation

- [ ] Create `ci/foundation-pipeline` branch
- [ ] Add GitHub Actions quality workflow
- [ ] Add Linux typecheck/lint/test/package job
- [ ] Add Windows Electron package smoke job
- [ ] Add branch policy validation job
- [ ] Upload build artifacts for review

## Phase 2 — Tune Profile System

- [ ] Create `feat/runtime-profile-foundation` branch
- [ ] Add tune profile schema
- [ ] Add profile validation
- [ ] Add secure profile storage
- [ ] Add profile editor UI under Model
- [ ] Add import/export JSON
- [ ] Block launches without saved profile
- [ ] Add profile tests

## Phase 3 — Vulkan llama.cpp Runtime

- [ ] Create `feat/llama-vulkan-runtime` branch
- [ ] Add `manual-vulkan` backend support
- [ ] Add Windows Vulkan detection service
- [ ] Add Vulkan-enabled llama.cpp binary validation
- [ ] Add owner default profile requiring Vulkan
- [ ] Block silent CUDA fallback
- [ ] Add PowerShell Vulkan launch wrapper
- [ ] Add process supervision and health checks
- [ ] Add Vulkan tests

## Phase 4 — Docker Model Runner Optional Backend

- [ ] Add Docker Model Runner adapter
- [ ] Add DMR endpoint detection
- [ ] Add DMR compatibility badges
- [ ] Ensure DMR never replaces owner Vulkan default
- [ ] Add DMR tests

## Phase 5 — Dual Hermes Docker Runtime

- [ ] Create `feat/hermes-runtime-orchestration` branch
- [ ] Add Hermes profile types
- [ ] Add compose template generator
- [ ] Add `hermes-work` runtime config
- [ ] Add `hermes-gemma4-community` runtime config
- [ ] Enforce separated data folders
- [ ] Enforce separated Obsidian vault paths
- [ ] Add Docker lifecycle service
- [ ] Add Hermes health probes
- [ ] Add tests for mount separation

## Phase 6 — Hermes Runtime UI

- [ ] Create `feat/hermes-runtime-ui` branch
- [ ] Add runtime overview cards
- [ ] Add Work Agent card
- [ ] Add Gemma4 Community Bot card
- [ ] Add Docker status panel
- [ ] Add logs panel with redaction
- [ ] Add start/stop/restart/test actions

## Phase 7 — Discord Remote Panel

- [ ] Create `feat/discord-remote-control` branch
- [ ] Locate existing Remote settings implementation
- [ ] Replace Discord `Coming Soon` panel
- [ ] Mirror Telegram panel layout
- [ ] Add bot token field
- [ ] Add Client ID and Guild ID
- [ ] Add agent and model selectors
- [ ] Add activation and reply mode selectors
- [ ] Add authorized users list
- [ ] Add admin/trusted role IDs
- [ ] Add Test Bot, Sync Commands, Invite Link actions
- [ ] Add Discord token redaction
- [ ] Add Discord settings persistence

## Phase 8 — Discord Routing and Commands

- [ ] Add public `/ask` command
- [ ] Add public `/help`, `/status`, `/models`, `/new`, `/reset`, `/feedback`
- [ ] Add owner `/work` commands
- [ ] Route `/ask` to Gemma4 Community Bot
- [ ] Route `/work` to Hermes Work Agent
- [ ] Block normal users from work runtime
- [ ] Add slash command sync scaffolding
- [ ] Add route policy tests

## Phase 9 — Memory and Skill Boundaries

- [ ] Add MemoryBoundaryService
- [ ] Add SkillPromotionService
- [ ] Add community candidate queue
- [ ] Add owner approval flow
- [ ] Block automatic community-to-work promotion
- [ ] Add Obsidian-safe note writer
- [ ] Add tests for memory boundary enforcement

## Phase 10 — About Page Runtime Controls

- [ ] Create `feat/about-runtime-workflows` branch
- [ ] Add update source indicator
- [ ] Add Sync My GitHub Fork button
- [ ] Add Start Everything button
- [ ] Add Save & Exit All button
- [ ] Add runtime status summary
- [ ] Add dry-run fork sync behavior
- [ ] Add conflict handling copy

## Phase 11 — Start Everything

- [ ] Add StartEverythingService
- [ ] Add `scripts/start-everything.ps1`
- [ ] Check Docker CLI
- [ ] Check Docker engine
- [ ] Generate compose if missing
- [ ] Start community runtime
- [ ] Optionally start work runtime
- [ ] Validate Vulkan owner profile
- [ ] Start app-owned llama.cpp Vulkan server if configured
- [ ] Start Discord bridge
- [ ] Sync slash commands if enabled
- [ ] Write final status JSON

## Phase 12 — Save & Exit All

- [ ] Add SaveAndExitAllService
- [ ] Add `scripts/save-and-exit-all.ps1`
- [ ] Stop accepting new Discord jobs
- [ ] Flush sessions
- [ ] Save memory summaries
- [ ] Stop app-owned llama.cpp process
- [ ] Stop Hermes Work Agent
- [ ] Stop Community Bot if full shutdown selected
- [ ] Stop Discord bridge
- [ ] Release app-owned ports
- [ ] Call `app.quit()` directly

## Phase 13 — OpenRouter Optional Enhancements

- [ ] Add response caching toggle
- [ ] Add work/community workspace separation
- [ ] Add provider routing preference settings
- [ ] Add optional web_search/web_fetch toggles
- [ ] Keep existing model choices unchanged

## Phase 14 — Final Stabilization

- [ ] Run typecheck
- [ ] Run lint
- [ ] Run unit tests
- [ ] Run Electron build
- [ ] Test app boot without Docker
- [ ] Test app boot with Docker
- [ ] Test Vulkan profile validation
- [ ] Test Discord panel persistence
- [ ] Test Start Everything
- [ ] Test Save & Exit All
- [ ] Verify no secrets are committed
- [ ] Tag stable release from `release/stable`

## Notes

- Owner default local backend is manual llama.cpp Vulkan.
- Docker Model Runner is optional and must not replace owner Vulkan profile.
- Community bot and private work agent must remain isolated.
- Use `TodoContext.txt` as the full architectural handoff.
