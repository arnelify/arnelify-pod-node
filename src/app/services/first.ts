import broker from "../../core/broker";
import Logger from "core/logger";

import Ctx from "core/broker/contracts/ctx";

class First {

  async welcome(ctx: Ctx): Promise<any> {

    const { params } = ctx;
    
    Logger.primary(`First: Hey, Second! Can you tell me what ${params.numbers.join(' + ')} equals? :)`);
    
    const secondResponse = await broker.call('second.welcome', ctx.params);
    if (secondResponse.code !== 200) return secondResponse;

    const { response } = secondResponse.success
    Logger.primary('First: Great, Second! Thanks a lot!');
    
    return response;
  }
}

export default First;