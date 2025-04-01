// Main SDK entry point

import { MetalClient } from "./client";
import type { MetalConfig } from "./config";
import { HolderAPI } from "./holder";
import { MerchantAPI } from "./merchant";
import { TokenAPI } from "./token";
import type {
    CreateTokenRequest,
    TokenData,
    TokenJobResponse,
    DistributeRequest,
    CreateLPRequest,
} from "./types";

export * from "./types";

export class Metal {
    private merchantAPI: MerchantAPI;
    private tokenAPI: TokenAPI;
    public holder: HolderAPI;
    public client: MetalClient;

    constructor(config: MetalConfig) {
        this.client = new MetalClient(config);
        this.merchantAPI = new MerchantAPI(this.client);
        this.tokenAPI = new TokenAPI(this.client);
        this.holder = new HolderAPI(this.client);
    }

    // Static method to create a client-side Metal instance
    static createPublicClient(publicKey: string): Metal {
        return new Metal({ publicKey });
    }

    // Static method to create a server-side Metal instance
    static createSecretClient(secretKey: string): Metal {
        return new Metal({ secretKey });
    }

    // Merchant API methods
    async createToken(params: CreateTokenRequest): Promise<TokenJobResponse> {
        return this.merchantAPI.createToken(params);
    }

    async getTokenStatus(jobId: string): Promise<TokenJobResponse> {
        return this.merchantAPI.getTokenStatus(jobId);
    }

    async getAllTokens(): Promise<TokenData[]> {
        return this.merchantAPI.getAllTokens();
    }

    // Token API methods
    async getToken(address: string): Promise<TokenData> {
        return this.tokenAPI.getToken(address);
    }

    async distribute(
        tokenAddress: string,
        params: DistributeRequest
    ): Promise<{ success: boolean }> {
        return this.tokenAPI.distribute(tokenAddress, params);
    }

    async createLP(
        tokenAddress: string,
        params: CreateLPRequest
    ): Promise<TokenJobResponse> {
        return this.tokenAPI.createLP(tokenAddress, params);
    }
}

// Export the Metal class and client
export { MetalClient };

export { MerchantAPI, TokenAPI, HolderAPI };
