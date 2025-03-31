// Holder-related API methods

import type { MetalClient } from "./client";
import type {
    HolderData,
    SpendRequest,
    SpendResponse,
    TokenBalanceResponse,
} from "./types";

export class HolderAPI {
    private client: MetalClient;

    constructor(client: MetalClient) {
        this.client = client;
    }

    /**
     * Create or get a holder
     * @param holderId Unique identifier for the holder
     * @returns Holder data including address
     */
    async createHolder(holderId: string): Promise<HolderData> {
        return this.client.fetchSecret(`/holder/${holderId}`, {
            method: "PUT",
        });
    }

    /**
     * Get holder details (client-side safe)
     * @param holderId Holder ID
     * @returns Holder data
     */
    async getHolder(holderId: string): Promise<HolderData> {
        if (!this.client.publicKey) {
            throw new Error("Public key is required for this operation");
        }
        return this.client.fetchPublic(
            `/holder/${holderId}?publicKey=${this.client.publicKey}`
        );
    }

    /**
     * Get token balance for a holder
     * @param holderId Holder ID
     * @param tokenAddress Token address
     * @returns Token balance
     */
    async getTokenBalance(
        holderId: string,
        tokenAddress: string
    ): Promise<TokenBalanceResponse> {
        return this.client.fetchPublic(
            `/holder/${holderId}/token/${tokenAddress}`
        );
    }

    /**
     * Spend tokens
     * @param holderId Holder ID
     * @param params Spend parameters
     * @returns Spend result
     */
    async spend(
        holderId: string,
        params: SpendRequest
    ): Promise<SpendResponse> {
        return this.client.fetchSecret(`/holder/${holderId}/spend`, {
            method: "POST",
            body: JSON.stringify(params),
        });
    }

    /**
     * Withdraw tokens from holder
     * @param holderId Holder ID
     * @param params Withdraw parameters
     * @returns Withdraw result
     */
    async withdraw(
        holderId: string,
        params: SpendRequest
    ): Promise<SpendResponse> {
        return this.client.fetchSecret(`/holder/${holderId}/withdraw`, {
            method: "POST",
            body: JSON.stringify(params),
        });
    }
}
