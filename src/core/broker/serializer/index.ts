class Serializer {

  /**
   * 
   * @param {any} data
   * @param {boolean} toString
   * @returns 
   */
  static #convertFunctions(data: any, toString: boolean): any {

    const isObject = typeof data === 'object' && data !== null;
    if (isObject) {

      const isArray = Array.isArray(data);
      if (isArray) {

        return data.map((value: any): any => this.#convertFunctions(value, toString));

      } else {

        const obj: { [key: string]: any } = {};

        for (const key in data) {

          obj[key] = this.#convertFunctions(data[key], toString);
        }

        return obj;
      }
    }

    if (toString) {

      const isString = typeof data === 'string';
      if (isString) {
        const isCallableString = data.startsWith('!#CALLABLE:');
        if (isCallableString) {
          console.log('input: ', `\\${data}`);
          return `\\${data}`;
        }
      }

      const isFunction = typeof data === 'function';
      if (isFunction) {

        const callable = `!#CALLABLE:${data.toString()}`;
        return callable;
      }

    } else {

      const isString = typeof data === 'string';
      if (isString) {

        const isCallableString = data.startsWith('\\!#CALLABLE:');
        if (isCallableString) {

          return data.substring(1, data.length);

        } else {

          const isCallable = data.startsWith('!#CALLABLE:');
          if (isCallable) {

            const callable = new Function(`return ${data.substring(11, data.length)}`)();
            return callable;
          }
        }
      }
    }

    return data;
  }

  /**
   * Deserialize
   * @param {string} serialized
   * @returns 
   */
  static deserialize(serialized: string): any {

    const json = JSON.parse(serialized);
    const deserialized = this.#convertFunctions(json, false);

    return deserialized;
  }

  /**
   * Serialize
   * @param {any} deserialized
   * @returns
   */
  static serialize(deserialized: any): string {

    const json = this.#convertFunctions(deserialized, true);
    const serialized = JSON.stringify(json);

    return serialized;
  }
}

export default Serializer;