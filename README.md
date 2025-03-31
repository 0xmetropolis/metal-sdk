add files from v0 to src ✅
insure we are not missing endpoints from the docs

go back to v0, reprompt the llm.txt but link to this sdk instead.
"create a boilerplate for a create-metal-app"

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
const tokenJob = await metal.merchant.createToken({
    name: "My Token",
    symbol: "MTK",
});

// Distribute tokens
const distribution = await metal.token.distribute("tokenAddress", {
    sendToAddress: "holderAddress",
    amount: "100",
});

// Create or get a holder
const holder = await metal.holder.createHolder("user123");
```

🚨 Note: Never expose your secret key in client-side code. The secret client should only be used in secure server environments.
