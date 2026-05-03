export type EdgeCommandResult<T = unknown> = {
  success: boolean;
  stdout?: string;
  stderr?: string;
  error?: string;
  data?: T;
};

export type EdgeGpuInfo = {
  vendor?: string;
  name?: string;
  vramTotalMb?: number;
  vramFreeMb?: number;
  driverVersion?: string;
  cudaVersion?: string;
  computeCapability?: string;
};

export type EdgeSystemInfo = {
  ok: boolean;
  platform: string;
  arch: string;
  cpu: {
    name?: string;
    logicalCores?: number;
    physicalCores?: number;
  };
  memory: {
    totalGb?: number;
    availableGb?: number;
  };
  gpus: EdgeGpuInfo[];
  tools: Record<string, boolean>;
  recommendation: {
    backend: 'gguf' | 'litert' | 'lucebox' | 'fallback';
    modelClass: string;
    quant: string;
    context: number;
    gpuLayers: number;
    threads: number;
    notes: string[];
  };
};

export type EdgeRuntimeStatus = {
  ok: boolean;
  running: boolean;
  port: number;
  activeBackend?: string;
  models: Array<{ id: string; backend: string; path?: string; loaded?: boolean }>;
  system?: EdgeSystemInfo;
};

export type EdgeInstallRequest = {
  distro?: string;
  force?: boolean;
};

export type EdgeStartRequest = {
  distro?: string;
  backend?: 'auto' | 'gguf' | 'litert' | 'lucebox';
  model?: string;
};

export type EdgeProviderInstallResult = {
  providerId: string;
  providerName: string;
  baseUrl: string;
  model: string;
};
