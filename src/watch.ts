#!/usr/bin/env bun

import ArnelifyRouter from "arnelify-router";
import ArnelifyServer from "arnelify-server";

import Logger from "core/logger";
import routes from "./routes";

/**
 * Main
 */
(function main(): number {
  const router: ArnelifyRouter = new ArnelifyRouter();
  routes(router);

  const server: ArnelifyServer = new ArnelifyServer({
    "SERVER_ALLOW_EMPTY_FILES": true,
    "SERVER_BLOCK_SIZE_KB": 64,
    "SERVER_CHARSET": "UTF-8",
    "SERVER_GZIP": true,
    "SERVER_KEEP_EXTENSIONS": true,
    "SERVER_MAX_FIELDS": 1024,
    "SERVER_MAX_FIELDS_SIZE_TOTAL_MB": 20,
    "SERVER_MAX_FILES": 1,
    "SERVER_MAX_FILES_SIZE_TOTAL_MB": 60,
    "SERVER_MAX_FILE_SIZE_MB": 60,
    "SERVER_PORT": 3001,
    "SERVER_QUEUE_LIMIT": 1024,
    "SERVER_UPLOAD_DIR": "./src/storage/upload"
  });

  server.setHandler(async (req: any, res: any): Promise<void> => {
    const { _state } = req;
    const { method, path } = _state;
    const routeOpt = router.find(method, path);
    if (!routeOpt) {
      res.setCode(404);
      res.addBody(JSON.stringify({
        code: 404,
        error: "Not found."
      }));

      res.end();
      return;  
    }

    res.setCode(200);
    const route: {[key: string]: any} = routeOpt;
    const controller: CallableFunction = router.getController(route.id);
    
    const params = { _state };
    const ctx = { params };

    const response: any = await controller(ctx);
    const isObject: boolean = typeof response == "object";
    if (!isObject) {
      res.addBody(response);
      res.end();
      return;
    }

    const hasCode: boolean = response.hasOwnProperty("code")
      && Number.isFinite(response["code"]);
    if (hasCode) res.setCode(response["code"]);
    res.addBody(JSON.stringify(response));
    res.end();
  });

  server.start((message: string, isError: boolean): void => {
    if (isError) {
      Logger.danger(`Error: ${message}\n`);
      return;
    }

    Logger.success(`${message}\n`);
  });

  return 0;

})();