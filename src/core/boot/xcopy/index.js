const path = require("path");
const { copyFile, readdir, mkdir, stat } = require("fs/promises");

class XCopy {

  /**
   * MkDir
   * @param {string} dest 
   */
  static async mkdir(dest) {

    await mkdir(dest, { recursive: true });
  }

  /**
   * Copy
   * @param {string} src 
   * @param {string} dest 
   * @param {CallableFunction} callback 
   * @returns 
   */
  static async copy(src, dest, callback) {

    const stats = await stat(src);
    const isDirectory = stats.isDirectory();

    const shouldCopy = callback(src, isDirectory);
    if (!shouldCopy) return;

    if (!isDirectory) {
      await copyFile(src, dest);
      return;
    }

    await mkdir(dest, { recursive: true });

    const items = await readdir(src);
    for (const item of items) {

      const subSrc = path.join(src, item);
      const subDest = path.join(dest, item);
      await this.copy(subSrc, subDest, callback);
    }
  }
}

module.exports = XCopy;