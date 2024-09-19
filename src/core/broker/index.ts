import BrokerAbstract from "./abstracts/broker";

import Callback from "./contracts/callback";
import Ctx from "./contracts/ctx";

class Broker extends BrokerAbstract {

  /**
   * 
   * @param {string} service
   * @param {ClassDeclaration} callable 
   * @param {Array} middleware 
   */
  async subscribe(service: string, callable: any, middleware: CallableFunction[] = []): Promise<void> {
    this.consumerHandler(callable, middleware, async (method: string, callback: Callback): Promise<void> => {

      const onMessage = (message: any): void => {
        callback(message);
      };
      
      this.consumer(service, method, onMessage); //Default Consumer
    });
  }

  /**
   * Call
   * @param {string} topic
   * @param {Params} params 
   * @returns 
   */
  async call(topic: string, params: { [key: string]: any }): Promise<Ctx> {
    return this.producerHandler(topic, params, (message: any): void => {

      this.producer(topic, message); //Default Producer
    });
  }
}

const broker = new Broker();
export default broker;