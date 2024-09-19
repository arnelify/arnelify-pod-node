#!/usr/bin/env node

const path = require("path");
const ESBuild = require("./esbuild");
const exec = require("./exec");
const XCopy = require("./xcopy");

class Boot {
  
  /**
   * Build
   */
  static async build() {

    await ESBuild.build();
    const binPath = path.resolve('./pod/server.js');
    await exec(`node ${binPath}`, (raw) => {
      const data = raw.trim();
      console.log(data);
      return data;
    });
  }

  /**
   * Watch
   */
  static async watch() {

    await ESBuild.watch();
    const binPath = path.resolve('./pod/server.js');
    await exec(`yarn nodemon ${binPath} --quiet`, (raw) => {
      const data = raw.trim();
      const isHidden = data.indexOf('--quiet') + 1;
      if (isHidden) return;

      console.log(data);
      return data;
    });
  }

  /**
   * Migrate
   */
  static async migrate() {

    await ESBuild.migrate();
    const knexfilePath = path.resolve('./src/core/knex/knexfile');
    await exec(`knex migrate:latest --knexfile ${knexfilePath}`, (raw) => {

      const data = raw.trim();
      console.log(data);
      return data;
    });
  }

  /**
   * Seed
   */
  static async seed() {

    await ESBuild.build();
    const knexfilePath = path.resolve('./src/core/knex/knexfile');
    await exec(`knex seed:run --knexfile ${knexfilePath}`, (raw) => {

      const data = raw.trim();
      console.log(data);
      return data;
    });
  }

  /**
   * Setup
   */
  static async setup() {

    const onSetup = async (callback) => {

      let isOnSetup = false;
      const args = process.argv;
      for (const arg of args) {
        
        if (isOnSetup) {
          await callback(arg);
          return
        }
  
        const isSetup = arg === 'setup';
        if (isSetup) isOnSetup = true;
      }

      callback("./");
    }

    await onSetup(async (rootDir) => {
      
      const packageRoot = path.resolve(__dirname, '../../../');
      const projectRoot = path.resolve(".", rootDir);

      await XCopy.copy(packageRoot, projectRoot, (src, isDirectory) => {

        if (isDirectory) {
          const item = path.relative(packageRoot, src);

          const isGit = item.startsWith('.git');
          if (isGit) return false;

          const isNodeModules = item.startsWith('node_modules');
          if (isNodeModules) return false;

          const isDockerModule = item.startsWith('docker') 
            && item.split('/').length > 2;
          if (isDockerModule) return false;

          const isPod = item.startsWith('pod');
          if (isPod) return false;
        }

        return true;
      });
    });
  }

  /**
   * Start
   * @returns 
   */
  static async start() {

    const isSetup = process.argv.includes('setup');
    if (isSetup) return this.setup();

    const isBuild = process.argv.includes('build');
    if (isBuild) return this.build();

    const isWatch = process.argv.includes('watch');
    if (isWatch) return this.watch();

    const isMigrate = process.argv.includes('migrate');
    if (isMigrate) return this.migrate();

    const isSeed = process.argv.includes('seed');
    if (isSeed) return this.seed();
  }
}

Boot.start();