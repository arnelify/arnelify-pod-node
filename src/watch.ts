import Router from "./routes";
import { createServer } from "http";
import { Server as SocketIO } from "socket.io";
import logger from "./core/logger";

/**
 * Watch server
 */
class Server {

  #server: any = null;
  #io: any = null;

  constructor() {
    this.#server = createServer(this.#requestHandler);
    this.#io = new SocketIO(this.#server);
  }

  /**
   * Request Handler
   * @param {any} req 
   * @param {any} res 
   * @returns 
   */
  async #requestHandler(req: any, res: any): Promise<any> {
    await Router.request(req, res);
  }

  /**
   * Start
   */
  async start(): Promise<any> {

    const port = 3001;
    this.#server.listen(port, () => {
      logger.success(`Server running on port: ${port}`);
    });
  }
}

const server = new Server();
server.start();