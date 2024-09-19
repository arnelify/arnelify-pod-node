/**
 * Logger
 */
class Logger {

  /**
   * Primary
   * @param {string} message 
   */
  static primary(message) {
    console.log("\x1b[0m" + `[Arnelify POD]: ${message}` + "\x1b[0m");
  }

  /**
   * Success
   * @param {string} message 
   */
  static success(message) {
    console.log("\x1b[32m" + `[Arnelify POD]: ${message}` + "\x1b[0m");
  }

  /**
   * Warning
   * @param {string} message 
   */
  static warning(message) {
    console.log("\x1b[33m" + `[Arnelify POD]: ${message}` + "\x1b[0m");
  }

  /**
   * Danger
   * @param {string} message 
   */
  static danger(message) {
    console.log("\x1b[31m" + `[Arnelify POD]: ${message}` + "\x1b[0m");
  }
}

module.exports = Logger;