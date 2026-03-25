import { BrokerCtx, BrokerBytes, RPCStream } from "arnelify-broker";
import Logger from "core/logger";

class First {

  /**
   * Welcome
   * @param {BrokerCtx} ctx 
   * @param {BrokerBytes} _bytes 
   * @param {RPCStream} stream 
   * @returns 
   */
  static async welcome(ctx: BrokerCtx, _bytes: BrokerBytes, stream: RPCStream): Promise<void> {
    const { _state, params }: Record<string, any> = ctx;
    const { body }: Record<string, any> = params;

    Logger.warning(`First: Hey, Second! Can you tell me what ${body.numbers.join(' + ')} equals? :)\n`);

    const { ctx: json }: Record<string, any> =
      await stream.send_json('second.welcome', { _state, params });
    if (json.code !== 200) {
      stream.push_json(json.error);
      return;
    }

    const { response } = json.success;
    stream.push_json(response);
    Logger.warning('First: Great, Second! Thanks a lot!\n');
  }
}

export default First;