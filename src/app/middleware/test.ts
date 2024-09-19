import Logger from "core/logger";

import Ctx from "core/broker/contracts/ctx";

const TestMiddleware = (ctx: Ctx): any => {

  ctx.params.numbers = [3,3,3];
  Logger.primary('TestMiddleware: Let\'s start the test, guys.');
  return ctx;
};

export default TestMiddleware;