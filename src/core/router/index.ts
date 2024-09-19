import formidable from "./formidable";
import url from "url";

class Router {

  #routes: any = [];

  /**
   * Sort Routes
   */
  #sortRoutes(): void {

    this.#routes.sort((a: { [key: string]: any }, b: { [key: string]: any }): number => {

      const paramsLen = (segments: string[]) => {
        const params = segments.filter((segment: string) => segment.startsWith(':'));
        return params.length;
      };

      const segmentsA = a.route.split('/');
      const segmentsB = b.route.split('/');
      const paramsA = paramsLen(segmentsA);
      const paramsB = paramsLen(segmentsB);

      const isLess = paramsA !== paramsB;
      if (isLess) return paramsA - paramsB;

      const segmentsLen = segmentsA.length - segmentsB.length;
      return segmentsLen;
    });
  }

  /**
   * Any
   * @param {string} route 
   * @param {CallableFunction} controller 
   */
  any(route: string, controller: (ctx: any) => { [key: string]: any }): void {
    this.#routes.push({
      route,
      method: null,
      controller
    });

    this.#sortRoutes();
  }

  /**
   * Get
   * @param {string} route 
   * @param {CallableFunction} controller 
   */
  get(route: string, controller: (ctx: any) => { [key: string]: any }): void {
    this.#routes.push({
      route,
      method: 'GET',
      controller
    });

    this.#sortRoutes();
  }

  /**
   * Post
   * @param {string} route 
   * @param {CallableFunction} controller 
   */
  post(route: string, controller: (ctx: any) => { [key: string]: any }): void {
    this.#routes.push({
      route,
      method: 'POST',
      controller
    });

    this.#sortRoutes();
  }

  /**
   * Put
   * @param {string} route 
   * @param {CallableFunction} controller 
   */
  put(route: string, controller: (ctx: any) => { [key: string]: any }): void {
    this.#routes.push({
      route,
      method: 'PUT',
      controller
    });

    this.#sortRoutes();
  }

  /**
   * Patch
   * @param {string} route 
   * @param {CallableFunction} controller 
   */
  patch(route: string, controller: (ctx: any) => { [key: string]: any }): void {
    this.#routes.push({
      route,
      method: 'PATCH',
      controller
    });

    this.#sortRoutes();
  }

  /**
   * Delete
   * @param {string} route 
   * @param {CallableFunction} controller 
   */
  delete(route: string, controller: (ctx: any) => { [key: string]: any }): void {
    this.#routes.push({
      route,
      method: 'DELETE',
      controller
    });

    this.#sortRoutes();
  }

  /**
   * Find Route Segments
   * @param {object} route 
   * @param {Array} segmentsRoute 
   * @param {Array} segmentsUrl 
   * @returns 
   */
  #findSegments(route: { [key: string]: any }, segmentsRoute: string[], segmentsUrl: string[]): { [key: string]: any } | null {

    const isLenEqual = segmentsRoute.length === segmentsUrl.length;
    if (!isLenEqual) return null;

    for (let i = 0; segmentsRoute.length > i; i++) {

      const isParam = segmentsRoute[i].startsWith(':');

      if (isParam) {

        const key = segmentsRoute[i].substring(1, segmentsRoute[i].length);
        const param = segmentsUrl[i];
        route['params'][key] = param;

      } else {

        const isMatch = segmentsRoute[i] === segmentsUrl[i];
        if (!isMatch) return null;
      }
    }

    return route;
  }

  /**
   * Find Route
   * @param {any} req
   * @returns 
   */
  #findRoute(req: any): { [key: string]: any } | null {

    const pathname = req.url.split('?')[0];
    const segmentsUrl: string[] = pathname.split('/');

    for (const route of this.#routes) {

      const newRoute = JSON.parse(JSON.stringify(route));
      const hasController = route.hasOwnProperty('controller');
      newRoute['controller'] = hasController ? route.controller : null;
      newRoute['params'] = {};

      const segmentsRoute = route.route.split('/');
      const segments = this.#findSegments(newRoute, segmentsRoute, segmentsUrl);
      if (segments) return newRoute;
    }

    return null;
  }

  /**
   * Get Route
   * @param {any} req
   * @returns
   */
  #getRoute(req: any): { [key: string]: any } | null {

    const route = this.#findRoute(req);
    if (route) return route;
    return null;
  }

  /**
   * Get Agent
   * @param {any} req 
   * @returns 
   */
  #getAgent(req: any): string | null {

    const hasAgent = !!req.headers['user-agent'];
    if (hasAgent) return req.headers['user-agent'];
    return null;
  }

  /**
   * Get Cookie
   * @param {any} req 
   * @returns
   */
  #getCookies(req: any): { [key: string]: string } | null {

    const hasCookie = req.headers.hasOwnProperty('cookie');
    if (!hasCookie) return null;

    const cookieRaw = req.headers.cookie;
    const cookieRawRecord = cookieRaw.split('; ');

    const cookie: { [key: string]: string } = {};
    for (const cookieRawPair of cookieRawRecord) {
      const [key, value] = cookieRawPair.split('=');
      cookie[key] = value;
    }

    return cookie;
  }

  /**
   * Get Params
   * @param {any} req
   * @returns 
   */
  #getParams(req: any): { [key: string]: string } {

    const { query }: any = url.parse(req.url, true);
    return query;
  }

  /**
   * Get Body
   * @param {any} req
   * @returns 
   */
  async #getBody(req: any): Promise<{ [key: string]: string }> {

    const body = await formidable(req);
    return body;
  }

  /**
   * Get IP
   * @param {any} req
   * @returns
   */
  #getIp(req: any): string {

    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  }

  /**
   * Request
   * @param {any} req 
   * @param {any} res
   */
  async request(req: any, res: any): Promise<any> {

    const pathname: string = req.url.split('?')[0];
    const route: any = this.#getRoute(req);
    const cookie: { [key: string]: string } | null = this.#getCookies(req);
    const params: { [key: string]: string } = this.#getParams(req);
    const body: { [key: string]: string } = req.method === 'POST' ? await this.#getBody(req) : {};
    const agent: string | null = this.#getAgent(req);
    const ip: string = this.#getIp(req);

    const defaultHeader: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const _state: { [key: string]: any } = { pathname, cookie, route, agent, ip };
    const ctxParams: { [key: string]: any } = { _state, ...params, ...body };
    const ctx: { [key: string]: any } = { params: ctxParams };
    
    if (!route) {
      const code: number = 404;
      const error: string = 'Not found.';
      const buffer = Buffer.from(JSON.stringify({ code, error }));
      res.writeHead(code, defaultHeader);
      res.end(buffer);
      return;
    }

    const hasController = route.hasOwnProperty('controller');
    if (!hasController) {

      const code: number = 404;
      const error: string = 'Not found.';
      const buffer: Buffer = Buffer.from(JSON.stringify({ code, error }));
      res.writeHead(code, defaultHeader);
      res.end(buffer);
      return;
    }

    const response: { [key: string]: any } = await route.controller(ctx);
    if (!response) {

      const code: number = 204;
      const error: string = 'Empty response.';
      const buffer: Buffer = Buffer.from(JSON.stringify({ code, error }));
      res.writeHead(code, defaultHeader);
      res.end(buffer);
      return;
    }

    const hasCode: boolean = response.hasOwnProperty('code');
    const hasHeader: boolean = response.hasOwnProperty('header');
    const code = hasCode ? response.code : 200;
    const headers = hasHeader ? response.headers : defaultHeader;
    const buffer: Buffer = Buffer.from(JSON.stringify(response));
    res.writeHead(code, headers);
    res.end(buffer);
  }
}

const router = new Router();
export default router;