const { readFile, writeFile } = require('fs/promises');

/**
 * Env Plugin
 * @param {string} src 
 * @param {string} dest 
 * @returns {object}
 */
const env = function (src, dest) {

  /**
   * Parse Env
   * @param {string} raw 
   * @param {object} data 
   * @returns {string}
   */
  const parse = (raw, data = {}) => {

    const rows = raw.replace(/\r\n/g, '\n')
      .replace(/\n\n/g, '\n')
      .replace(/\r/g, '\n')
      .split('\n');

    rows.forEach(row => {

      row = row.trim();
      const isEmpty = !row.length;
      if (isEmpty) return;

      const isComment = row.startsWith('#');
      if (isComment) return;

      const hasData = row.indexOf('=') + 1;
      if (!hasData) return;

      const [rawKey] = row.split('=');
      if (!rawKey) return;

      const key = rawKey.trim();
      if (!key) return;

      const value = row.substring(key.length + 1, row.length);
      if (!value) return;

      data[key] = value;

    });

    const json = JSON.stringify(data);
    let description = `/** Managed by ESBuild */ `;
    description += `const env: { [key: string]: any } = ${json}; `;
    description += `export default env;`;
    return description;
  };

  return {

    name: 'env-plugin',

    setup(build) {

      build.onStart(async () => {

        const raw = await readFile(src, "utf8");
        const data = parse(raw);

        await writeFile(dest, data, "utf8");
      });
    }
  };
};

module.exports = env;