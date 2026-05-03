import { bridge } from '@office-ai/platform';
import type {
  EdgeCommandResult,
  EdgeInstallRequest,
  EdgeProviderInstallResult,
  EdgeRuntimeStatus,
  EdgeStartRequest,
  EdgeSystemInfo,
} from '@/common/types/edgeAllInOne';

// Dedicated IPC surface for the all-in-one Aion Edge Runtime.
// Kept separate from ipcBridge.ts to avoid large-file merge conflicts while using the same bridge provider system.
export const edgeRuntime = {
  install: bridge.buildProvider<EdgeCommandResult, EdgeInstallRequest | undefined>('edge-runtime.install'),
  start: bridge.buildProvider<EdgeCommandResult, EdgeStartRequest | undefined>('edge-runtime.start'),
  stop: bridge.buildProvider<EdgeCommandResult, { distro?: string } | undefined>('edge-runtime.stop'),
  system: bridge.buildProvider<EdgeCommandResult<EdgeSystemInfo>, void>('edge-runtime.system'),
  status: bridge.buildProvider<EdgeCommandResult<EdgeRuntimeStatus>, void>('edge-runtime.status'),
  logs: bridge.buildProvider<EdgeCommandResult<string[]>, { name?: string; lines?: number } | undefined>('edge-runtime.logs'),
  installModelProvider: bridge.buildProvider<EdgeCommandResult<EdgeProviderInstallResult>, void>('edge-runtime.install-model-provider'),
  downloadGguf: bridge.buildProvider<EdgeCommandResult, { distro?: string; repo: string; filename: string; alias?: string }>('edge-runtime.download-gguf'),
};
