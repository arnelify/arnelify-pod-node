import { RPC } from "arnelify-broker";
import TestMiddleware from "middleware/test";

import First from "services/first";
import Second from "services/second";

/**
 * Actions
 * @param {RPC} rpc 
 */
function rpc_actions(rpc: RPC): void {
  rpc.on('first.welcome', async (ctx, bytes, stream): Promise<void> => {
    TestMiddleware(ctx, bytes, stream);
    await First.welcome(ctx, bytes, stream);
  });
  
  rpc.on('second.welcome', Second.welcome);
}

export { RPC, rpc_actions };