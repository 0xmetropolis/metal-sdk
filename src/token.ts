// Token-related API methods

import type { MetalClient } from "./client";
import type { DistributeRequest, TokenData, TokenJobResponse } from "./types";

export class TokenAPI {
    private client: MetalClient;

    constructor(client: MetalClient) {
        this.client = client;
    }

    /**
     * Get token details
     * @param address Token address
     * @returns Token details
     */
    async getToken(address: string): Promise<TokenData> {
        return this.client.fetchSecret(`/token/${address}`);
    }

    /**
     * Distribute tokens to a holder
     * @param tokenAddress Token address
     * @param params Distribution parameters
     * @returns Distribution result
     */
    async distribute(
        tokenAddress: string,
        params: DistributeRequest
    ): Promise<{ success: boolean }> {
        return this.client.fetchSecret(`/token/${tokenAddress}/distribute`, {
            method: "POST",
            body: JSON.stringify(params),
        });
    }

    /**
     * Create liquidity pool for token
     * @param tokenAddress Token address
     * @param params LP creation parameters
     * @returns LP creation job response
     */
    async createLP(
        tokenAddress: string,
        params: any
    ): Promise<TokenJobResponse> {
        return this.client.fetchSecret(`/token/${tokenAddress}/liquidity`, {
            method: "POST",
            body: JSON.stringify(params),
        });
    }
}
