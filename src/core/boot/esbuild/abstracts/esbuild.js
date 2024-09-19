const path = require("path");
const XCopy = require("../../xcopy");

class ESBuildAbstract {

  static async checkDirs() {

    await XCopy.mkdir(path.resolve('./src/core/env'));
    await XCopy.mkdir(path.resolve('./src/app/middleware'));
    await XCopy.mkdir(path.resolve('./src/app/repositories'));
    await XCopy.mkdir(path.resolve('./src/app/requests'));
    await XCopy.mkdir(path.resolve('./src/app/services'));
    await XCopy.mkdir(path.resolve('./src/app/translations'));
    await XCopy.mkdir(path.resolve('./src/database/factories'));
    await XCopy.mkdir(path.resolve('./src/database/migrations'));
    await XCopy.mkdir(path.resolve('./src/database/seeds'));
    await XCopy.mkdir(path.resolve('./src/storage/formidable'));
    await XCopy.mkdir(path.resolve('./src/tests'));
  }

  /**
   * Add plugin
   * @param {object} plugin 
   * @returns 
   */
  static addPlugin(server, plugin) {

    if (!plugin) return;
    server.plugins.push(plugin);
  }
}

module.exports = ESBuildAbstract;