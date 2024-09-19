const esbuild = require("esbuild");
const path = require("path");

const ESBuildAbstract = require("./abstracts/esbuild");
const { server, knexfile } = require("./settings");
const env = require("./env");

class ESBuild extends ESBuildAbstract {

  /**
   * Build
   */
  static async build() {

    this.checkDirs();
    const src = path.resolve(".env");
    const dest = path.resolve("./src/core/env/index.ts");
    this.addPlugin(server, env(src, dest));
    await esbuild.build(server);
  }

  /**
   * Watch
   */
  static async watch() {

    this.checkDirs();
    const src = path.resolve(".env");
    const dest = path.resolve("./src/core/env/index.ts");
    this.addPlugin(server, env(src, dest));
    const ctx = await esbuild.context(server);
    ctx.watch();
  }

  /**
   * Migrate
   */
  static async migrate() {

    this.checkDirs();
    const src = path.resolve(".env");
    const dest = path.resolve("./src/core/env/index.ts");
    this.addPlugin(knexfile, env(src, dest));
    await esbuild.build(knexfile);
  }

  /**
   * Seed
   */
  static async seed() {

    this.checkDirs();
    const src = path.resolve(".env");
    const dest = path.resolve("./src/core/env/index.ts");
    this.addPlugin(knexfile, env(src, dest));
    await esbuild.build(knexfile);
  }
}

module.exports = ESBuild;