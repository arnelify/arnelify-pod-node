import { BrokerBytes, BrokerCtx, RPCStream } from "arnelify-broker";
import Logger from "core/logger";

/**
 * Test Middleware
 * @param {BrokerCtx} ctx 
 * @param {BrokerBytes} _bytes 
 * @param {RPCStream} _stream 
 */
const TestMiddleware = (ctx: BrokerCtx, _bytes: BrokerBytes, _stream: RPCStream): void => {
  const { params }: Record<string, any> = ctx;
  const { body }: Record<string, any> = params;

  Logger.warning('TestMiddleware: Let\'s start the test, guys.\n');
  body.numbers = [3, 3, 6];
};

export default TestMiddleware;