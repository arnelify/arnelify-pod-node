import { BrokerCtx, BrokerBytes, RPCStream } from "arnelify-broker";
import Logger from "core/logger";

class Second {

  /**
   * Welcome
   * @param {BrokerCtx} ctx 
   * @param {BrokerBytes} _bytes 
   * @param {RPCStream} stream 
   * @returns 
   */
  static async welcome(ctx: BrokerCtx, _bytes: BrokerBytes, stream: RPCStream): Promise<void> {
    const { _state, params }: Record<string, any> = ctx;
    const { body } = params;

    const result: number = body.numbers.reduce((sum: number, num: number): number => sum + num);
    const response = {
      code: 200,
      success: "Welcome to Arnelify POD framework."
    }

    Logger.warning(`Second: Hi, First! The result of ${body.numbers.join(' + ')} is = ${result}.\n`);
    Logger.warning(`Second: Here's your response: ${JSON.stringify(response)}\n`);

    stream.push_json({
      code: 200,
      success: { result, response }
    });
  }
}

export default Second;