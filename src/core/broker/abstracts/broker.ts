import crypto from "crypto";
import moment from "moment";
import logger from "core/logger";

import EventEmitter from "events";
import Serializer from "../serializer";

import Consumer from "../contracts/consumer";
import Producer from "../contracts/producer";
import Ctx from "../contracts/ctx";

class BrokerAbstract {

  #emitter: EventEmitter = new EventEmitter();

  /**
   * Consumer
   * @param {string} service 
   * @param {string} method 
   * @param {CallableFunction} onMessage
   */
  consumer(service: string, method: string, onMessage: (message: any) => void): void {
    const topic = `${service}.${method}`;
    this.#emitter.on(topic, onMessage);
    logger.warning(`topic registered '${topic}'.`);
  }

  /**
   * Consumer Handler
   * @param {ClassDeclaration} callable
   * @param {Array} middleware
   * @param {Consumer} consumer
   */
  consumerHandler(callable: any, middleware: CallableFunction[], consumer: Consumer): void {

    const instance = new callable();
    const staticMethods = Object.getOwnPropertyNames(callable)
      .filter((prop: any): boolean => typeof callable[prop] === 'function');

    const { prototype } = callable;
    const instanceMethods = Object.getOwnPropertyNames(prototype)
      .filter((prop: any): boolean => prop !== 'constructor');

    const targets: { [key: string]: any }[] = [];
    for (const method of staticMethods) {
      
      const { constructor } = Object.getPrototypeOf(callable[method]);
      const isAsync = constructor.name === 'AsyncFunction';
      
      targets.push({ 
        method, 
        isAsyncCallable: isAsync, 
        callable: callable[method]
      });
    }

    for (const method of instanceMethods) {
      
      const { constructor } = Object.getPrototypeOf(instance[method]);
      const isAsync = constructor.name === 'AsyncFunction';
      
      targets.push({ 
        method,
        isAsyncCallable: isAsync,
        callable: instance[method]
      });
    }

    for (const target of targets) {

      const { method, isAsyncCallable, callable } = target;

      consumer(method, async (message: any): Promise<void> => {

        const deserialized = Serializer.deserialize(message);
        deserialized.receivedAt = moment().format('YYYY-MM-DD HH:mm:ss');

        const { topic, requestId } = deserialized;

        for (const midware of middleware) {
          const isAsyncMidware = midware.constructor.name === 'AsyncFunction';
          if (isAsyncMidware) {
            await midware(deserialized);
          } else {
            midware(deserialized);
          }
        }

        if (isAsyncCallable) {

          const response = await callable(deserialized);
          this.#emitter.emit(`${topic}:${requestId}`, response);

        } else {

          const response = callable(deserialized);
          this.#emitter.emit(`${topic}:${requestId}`, response);
        }

      });
    }
  }

  /**
   * Producer
   * @param {string} topic 
   * @param {any} message
   */
  producer(topic: string, message: any): void {
    
    this.#emitter.emit(topic, message);
  }

  /**
   * Producer Handler
   * @param {object} params
   * @param {Producer} producer
   * @returns 
   */
  async producerHandler(topic: string, params: { [key: string]: any }, producer: Producer): Promise<Ctx> {
    return new Promise((resolve: (response: any) => void): void => {

      const random = Math.floor(Math.random() * 10000) + 10000;
      const requestIdRaw = String(`${Date.now()}${random}`).replace(/\./, '');
      const requestId = crypto.createHash('sha1')
        .update(requestIdRaw)
        .digest('hex');

      this.#emitter.once(`${topic}:${requestId}`, (response: any) => {
        resolve(response);
      });

      const message = Serializer.serialize({
        topic,
        requestId,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        receivedAt: null,
        params
      });

      producer(message);
    });
  }
}

export default BrokerAbstract;