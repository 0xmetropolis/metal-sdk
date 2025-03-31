// Merchant-related API methods

import type { MetalClient } from "./client"
import type { CreateTokenRequest, TokenData, TokenJobResponse } from "./types"

export class MerchantAPI {
  private client: MetalClient

  constructor(client: MetalClient) {
    this.client = client
  }

  /**
   * Create a new token
   * @param params Token creation parameters
   * @returns Job ID and status
   */
  async createToken(params: CreateTokenRequest): Promise<TokenJobResponse> {
    return this.client.fetchSecret("/merchant/create-token", {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  /**
   * Check token creation status
   * @param jobId The job ID from createToken
   * @returns Current status of the token creation job
   */
  async getTokenStatus(jobId: string): Promise<TokenJobResponse> {
    return this.client.fetchSecret(`/merchant/create-token/status/${jobId}`)
  }

  /**
   * Get all tokens for the merchant
   * @returns List of all tokens
   */
  async getAllTokens(): Promise<TokenData[]> {
    return this.client.fetchSecret("/merchant/all-tokens")
  }
}

