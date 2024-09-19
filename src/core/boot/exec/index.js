const { exec: command } = require("child_process");
const logger = require("../logger");

/**
 * Execute
 * @param {string} cmd 
 * @param {CallableFunction} callback
 * @param {string} output
 * @returns 
 */
const exec = async (cmd, callback, output = '') => {

  return new Promise((resolve, reject) => {

    const child = command(cmd);

    child.stdout.on('data', (raw) => {
      const data = callback(raw);
      if (data) output += data;
    });

    child.stderr.on('data', (data) => {
      logger.danger(`StdErr: ${data}`);
    });

    child.on('error', (error) => {
      logger.danger('danger', `Error: ${error}`);
      reject(null);
    });

    child.on('close', (code) => {
      const isSuccess = code === 0;
      if (!isSuccess) {
        logger.danger(`Exited with code: ${code}`);
        reject(null);
      }

      resolve(output);
    });
    
  }).catch(() => {

    process.exit(1);
  });
}

module.exports = exec;