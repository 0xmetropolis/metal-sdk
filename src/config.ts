// Configuration for Metal SDK

export const METAL_API_BASE_URL = "https://api.metal.build"

export interface MetalConfig {
  publicKey?: string
  secretKey?: string
}

// Empty default config - users must explicitly provide keys
export const getDefaultConfig = (): MetalConfig => {
  return {}
}

