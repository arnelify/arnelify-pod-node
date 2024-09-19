const path = require("path");
const loader = require("./loader");

const isWatch = process.argv.includes('watch');
const tsconfigPath = path.resolve('./tsconfig.json');

const common = {
  allowOverwrite: true,
  bundle: true,
  minify: !isWatch,
  sourcemap: isWatch,
  format: isWatch ? "iife" : "cjs",
  tsconfig: tsconfigPath,
  metafile: isWatch,
  plugins: [],
  alias: {},
  loader
};

const outDirPath = path.resolve("./pod");
const serverPath = path.resolve("./src/server.ts");
const watchPath = path.resolve("./src/watch.ts");

const server = {
  ...common,
  outdir: outDirPath,
  entryPoints: [isWatch ? watchPath : serverPath],
  entryNames: "[dir]/server",
  platform: "node"
};

const knexfileOutDirPath = path.resolve("./src/core/knex/knexfile");
const knexfilePath = path.resolve("./src/core/knex/index.ts");

const knexfile = {
  ...common,
  outdir: knexfileOutDirPath,
  entryPoints: [knexfilePath],
  entryNames: "[dir]/index",
  external: ['knex'],
  platform: "node",
};

module.exports = { server, knexfile };