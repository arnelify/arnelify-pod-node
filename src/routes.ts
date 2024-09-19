import router from "core/router";
import broker from "core/broker";

import testMiddleware from "middleware/test";

import First from "services/first";
import Second from "services/second";

broker.subscribe('first', First, [testMiddleware]);
broker.subscribe('second', Second);

router.get('/', async (ctx: any) => broker.call("first.welcome", ctx.params));

export default router;