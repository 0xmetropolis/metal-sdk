// Metal API client for making requests

import { METAL_API_BASE_URL, type MetalConfig } from "./config"

export class MetalClient {
  private config: MetalConfig

  constructor(config: MetalConfig) {
    this.config = config
  }

  // Static method to create a public client (for frontend)
  static createPublicClient(publicKey: string): MetalClient {
    return new MetalClient({ publicKey })
  }

  // Static method to create a private client (for backend)
  static createSecretClient(secretKey: string): MetalClient {
    return new MetalClient({ secretKey })
  }

  // Client-side fetch (only uses public key)
  async fetchPublic(endpoint: string, options: RequestInit = {}) {
    if (!this.config.publicKey) {
      throw new Error("Metal public API key is required for client-side requests")
    }

    const url = `${METAL_API_BASE_URL}${endpoint}`
    const headers = {
      ...options.headers,
      "x-api-key": this.config.publicKey,
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Unknown error" }))
      throw new Error(`Metal API error: ${error.message || response.statusText}`)
    }

    return response.json()
  }

  // Server-side fetch (uses secret key)
  async fetchSecret(endpoint: string, options: RequestInit = {}) {
    if (!this.config.secretKey) {
      throw new Error("Metal secret API key is required for server-side requests")
    }

    const url = `${METAL_API_BASE_URL}${endpoint}`
    const headers = {
      ...options.headers,
      "Content-Type": "application/json",
      "x-api-key": this.config.secretKey,
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Unknown error" }))
      throw new Error(`Metal API error: ${error.message || response.statusText}`)
    }

    return response.json()
  }

  // Getter for public key (used in holder.ts)
  get publicKey(): string | undefined {
    return this.config.publicKey
  }
}

