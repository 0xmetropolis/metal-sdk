// Metal API response and request types

export type Address = `0x${string}`;
export type Hex = `0x${string}`;

// Token Types
export interface TokenData {
    id: Address;
    address: Address;
    name: string;
    symbol: string;
    totalSupply: number;
    startingAppSupply: number;
    remainingAppSupply: number;
    merchantSupply?: number;
    merchantAddress?: Address;
    price: number | null;
    holders: TokenHolder[];
}

export interface TokenHolder {
    id: Address;
    address: Address;
    balance: number;
    value: number;
}

// Holder Types
export interface HolderData {
    id: string;
    address: Address;
    tokens: TokenInfo[];
    totalValue: number;
}

export interface TokenInfo {
    id: string;
    address: string;
    name: string;
    symbol: string;
    balance: number;
    value: number;
}

// Request Types
export interface DistributeRequest {
    tokenAddress: Address;
    amount: number;
    sendToAddress?: Address;
    sendToId?: string;
}

export interface SpendRequest {
    tokenAddress: string;
    amount: number;
    toAddress?: string;
}

export interface CreateTokenRequest {
    name: string;
    symbol: string;
    network: "base" | "sepolia";
    merchantAddress: string;
    canAirdrop: boolean;
    canDistribute: boolean;
    canLP: boolean;
}

export interface CreateLPRequest {
    tokenAddress: Address;
    initialStartingPrice: string;
}

// Response Types
export interface TokenJobResponse {
    jobId: string;
    status: "success" | "pending" | "failed" | "stuck";
    data: TokenData;
}

export interface SpendResponse {
    success: boolean;
    transactionHash?: Hex;
}

export interface TokenBalanceResponse {
    name: string;
    symbol: string;
    id: string;
    address: string;
    balance: number;
    value?: number | null;
}

// Token Status Response Types
export interface PendingTokenResponse {
    id: string;
    status: "pending";
    transactionHash?: Hex;
}

export interface SuccessfulTokenResponse {
    id: string;
    status: "success";
    tokenAddress: Address;
    transactionHash: Hex;
    metalBuildUrl: string;
    uniswapUrl: string;
    lpInfo?: {
        nftId: string;
        liquidityPoolAddress: Address;
    };
}

export interface FailedTokenResponse {
    id: string;
    status: "failed";
    error: string;
}

export interface StuckTokenResponse {
    id: string;
    status: "stuck";
    error: string;
}

export type TokenStatusResponse =
    | PendingTokenResponse
    | SuccessfulTokenResponse
    | FailedTokenResponse
    | StuckTokenResponse;

export interface TokenRewardResponse {
    name: string;
    symbol: string;
    tokenAddress: Address;
    txHash: Hex;
    txUrl: string;
    amount: number;
    recipient: Address;
    rewardsBalance: number;
}
