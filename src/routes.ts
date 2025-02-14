import ArnelifyRouter from "arnelify-router";
import broker from "core/broker";

import testMiddleware from "middleware/test";
import First from "services/first";
import Second from "services/second";

import Ctx from "core/broker/contracts/ctx";

/**
 * Routes
 * @param router
 */
const routes = async (router: ArnelifyRouter): Promise<void> => {
  broker.subscribe('second.welcome', async(ctx: Ctx): Promise<any> => {
    const second: Second = new Second();
    return second.welcome(ctx);
  });

  broker.subscribe('first.welcome', async (ctx: Ctx): Promise<any> => {
    const newCtx: Ctx = testMiddleware(ctx);
    const first: First = new First();
    return first.welcome(newCtx);
  });
  
  router.get('/', async (ctx: any): Promise<any> => {
    return broker.call("first.welcome", ctx["params"]);
  });
};

export default routes;