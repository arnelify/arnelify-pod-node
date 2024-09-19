import Logger from "core/logger";

import Ctx from "core/broker/contracts/ctx";

class Second {

  welcome(ctx: Ctx): any {

    const { params } = ctx;

    const result = params.numbers.reduce((a: number, b: number): number => a + b);
    const response = {
      code: 200,
      success: "Welcome to Arnelify POD framework."
    }

    Logger.primary(`Second: Hi, First! The result of ${params.numbers.join(' + ')} is = ${result}.`);
    Logger.primary(`Second: Here's your response: ${JSON.stringify(response)}`);

    return {
      code: 200,
      success: { result, response }
    };
  }
}

export default Second;