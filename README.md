# Metal SDK

A flexible Node SDK for interacting with the Metal API. This SDK provides a clean interface for all Metal API endpoints with separate configurations for client-side and server-side usage.

For more information on the Metal API, please refer to the [Metal API Docs](https://docs.metal.build).

## Frontend Setup (Client-side)

For public endpoints that don't require secret keys, use the public client:

```typescript
import { Metal } from "@0xmetropolis/metal-sdk";

// Initialize with public key
const metal = Metal.createPublicClient("your_public_key");

// Examples of client-safe operations:
// Get holder details
const holder = await metal.holder.getHolder("user123");

// Get token balance
const balance = await metal.holder.getTokenBalance(
    "user123",
    "tokenAddress"
);
```

## Backend Setup (Server-side)

For protected endpoints that require authentication, use the secret client:

```typescript
import { Metal } from "@0xmetropolis/metal-sdk";

// Initialize with secret key
const metal = Metal.createSecretClient("your_secret_key");

// Examples of server-side operations:
// Create a new token
const tokenJob = await metal.createToken({
    name: "My Token",
    symbol: "MTK",
});

// Distribute tokens
const distribution = await metal.distribute("tokenAddress", {
    sendToAddress: "holderAddress",
    amount: "100",
});

// Get or create holder
const holder = await metal.getOrCreateHolder("user123");
```

🚨 Note: Never expose your secret key in client-side code. The secret client should only be used in secure server environments.

## Publishing

1. Implement changes, add features, etc.

2. Bump the version in `package.json`

3. `npm install && npm run build`. Ensure the build passes.

4. `npm login` (if not already logged in)

5. `npm publish`.
