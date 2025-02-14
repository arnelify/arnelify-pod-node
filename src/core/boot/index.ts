#!/usr/bin/env bun

/**
 * MIT LICENSE
 *
 * COPYRIGHT (R) 2025 ARNELIFY. AUTHOR: TARON SARKISYAN
 *
 * PERMISSION IS HEREBY GRANTED, FREE OF CHARGE, TO ANY PERSON OBTAINING A COPY
 * OF THIS SOFTWARE AND ASSOCIATED DOCUMENTATION FILES (THE "SOFTWARE"), TO DEAL
 * IN THE SOFTWARE WITHOUT RESTRICTION, INCLUDING WITHOUT LIMITATION THE RIGHTS
 * TO USE, COPY, MODIFY, MERGE, PUBLISH, DISTRIBUTE, SUBLICENSE, AND/OR SELL
 * COPIES OF THE SOFTWARE, AND TO PERMIT PERSONS TO WHOM THE SOFTWARE IS
 * FURNISHED TO DO SO, SUBJECT TO THE FOLLOWING CONDITIONS:
 *
 * THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE INCLUDED IN ALL
 * COPIES OR SUBSTANTIAL PORTIONS OF THE SOFTWARE.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import path from "path";

import Plant from "./plant";
import Logger from "core/logger";
import Watcher from "./watcher";

/**
 * Boot
 */
class Boot {

  /**
   * Setup
   */
  static async setup(folder: string): Promise<void> {

    Logger.warning(`Installing framework...\n`);

    const projectPath: string = path.resolve(folder);
    const packagePath: string = path.resolve(__dirname, '../../../');

    await Plant.mkdir(path.resolve(projectPath, 'src/app/middleware'));
    await Plant.mkdir(path.resolve(projectPath, 'src/app/repositories'));
    await Plant.mkdir(path.resolve(projectPath, 'src/app/requests'));
    await Plant.mkdir(path.resolve(projectPath, 'src/app/services'));
    await Plant.mkdir(path.resolve(projectPath, 'src/app/translations'));
    await Plant.mkdir(path.resolve(projectPath, 'src/database/factories'));
    await Plant.mkdir(path.resolve(projectPath, 'src/database/migrations'));
    await Plant.mkdir(path.resolve(projectPath, 'src/database/seeds'));
    await Plant.mkdir(path.resolve(projectPath, 'src/tests'));

    await Plant.xcopy(packagePath, projectPath, (src: string): boolean => {
      const exclude = [
        path.resolve(projectPath, '.git'),
        path.resolve(projectPath, 'node_modules'),
      ];

      const isExcluded = exclude.includes(src);
      if (isExcluded) return false;
      return true;
    });

    Logger.success("Successfully!\n");
  }

  /**
   * Build
   */
  static async build(): Promise<void> {
    const envPath: string = path.resolve('.env');
    const watchPath: string = path.resolve('src/server.ts');
    const serverPath: string = path.resolve('pod/server');

    const watcher: Watcher = new Watcher();
    await watcher.apply(envPath);
    await watcher.build(watchPath, serverPath);
  }

  /**
   * Watch
   */
  static async watch(): Promise<void> {
    const envPath: string = path.resolve('.env');
    const watchPath: string = path.resolve('src/watch.ts');
    const serverPath: string = path.resolve('pod/server');

    const watcher: Watcher = new Watcher();
    await watcher.apply(envPath);
    await watcher.build(watchPath, serverPath);
    watcher.start(watchPath);
    await watcher.watch(watchPath, serverPath);
  }
}

/**
 * Main
 * @returns
 */
(async function main() {

  const { argv } = process;
  for (let i = 0; argv.length > i; ++i) {

    const isSetup = argv[i] === 'setup';
    if (isSetup) {
      const folder: string = argv[i + 1] 
        && argv[i + 1].trim() ? argv[i + 1] : "NewProject";
      await Boot.setup(folder);
      break;
    }

    const isBuild = argv[i] === 'build';
    if (isBuild) {
      await Boot.build();
      break;
    }

    const isWatch = argv[i] === 'watch';
    if (isWatch) {
      await Boot.watch();
      break;
    }
  }

  return 0;

})();