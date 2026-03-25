#!/usr/bin/env bun

import env from "core/env";
import { Http1, Http1Ctx, Http1Stream } from "arnelify-server";
import Logger from "core/logger";

import { RPC, rpc_actions } from "./rpc";

/**
 * Main
 */
(async function main(): Promise<void> {

  const rpc: RPC = new RPC();
  rpc_actions(rpc);

  const http1: Http1 = new Http1({
    allow_empty_files: env.HTTP3_ALLOW_EMPTY_FILES === 'true',
    block_size_kb: Number(env.HTTP3_BLOCK_SIZE_KB),
    charset: env.HTTP3_CHARSET,
    compression: env.HTTP3_COMPRESSION === 'true',
    keep_alive: Number(env.HTTP3_KEEP_ALIVE),
    keep_extensions: env.HTTP3_KEEP_EXTENSIONS === 'true',
    max_fields: Number(env.HTTP3_MAX_FIELDS),
    max_fields_size_total_mb: Number(env.HTTP3_MAX_FIELDS_SIZE_TOTAL_MB),
    max_files: Number(env.HTTP3_MAX_FILES),
    max_files_size_total_mb: Number(env.HTTP3_MAX_FILES_SIZE_TOTAL_MB),
    max_file_size_mb: Number(env.HTTP3_MAX_FILE_SIZE_MB),
    port: Number(env.HTTP3_PORT),
    storage_path: env.HTTP3_STORAGE_PATH,
    thread_limit: Number(env.HTTP3_THREAD_LIMIT)
  });

  http1.logger(async (level: string, message: string): Promise<void> => {
    switch (level) {
      case 'success':
        Logger.success(`${message}\n`);
        break;
      case 'info':
        Logger.primary(`${message}\n`);
        break;
      case 'warning':
        Logger.warning(`${message}\n`);
        break;
      default:
        Logger.danger(`${message}\n`);
    }
  });

  http1.on('/', async (ctx: Http1Ctx, stream: Http1Stream): Promise<void> => {
    const { ctx: json } = await rpc.send_json("first.welcome", ctx);

    await stream.set_code(200);
    await stream.push_json(json);
    await stream.end();
  });

  http1.on("_", async (_ctx: Http1Ctx, stream: Http1Stream): Promise<void> => {
    await stream.set_code(404);
    await stream.push_json({
      code: 404,
      error: "Not found."
    });

    await stream.end();
  });

  await http1.start();

})();