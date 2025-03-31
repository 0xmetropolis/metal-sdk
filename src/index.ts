// Main SDK entry point

import { MetalClient } from "./client"
import type { MetalConfig } from "./config"
import { HolderAPI } from "./holder"
import { MerchantAPI } from "./merchant"
import { TokenAPI } from "./token"

export * from "./types"

export class Metal {
  public merchant: MerchantAPI
  public token: TokenAPI
  public holder: HolderAPI
  public client: MetalClient

  constructor(config: MetalConfig) {
    this.client = new MetalClient(config)
    this.merchant = new MerchantAPI(this.client)
    this.token = new TokenAPI(this.client)
    this.holder = new HolderAPI(this.client)
  }

  // Static method to create a client-side Metal instance
  static createPublicClient(publicKey: string): Metal {
    return new Metal({ publicKey })
  }

  // Static method to create a server-side Metal instance
  static createSecretClient(secretKey: string): Metal {
    return new Metal({ secretKey })
  }
}

// Export the Metal class and client
export { MetalClient }

// Export individual APIs for direct imports
export { MerchantAPI, TokenAPI, HolderAPI }

