import client from "formidable";
import env from "core/env";
import path from "path";

/**
 * Formidable
 * @param {any} req
 * @returns 
 */
const formidable = async function (req: any): Promise<{ [key: string]: any }> {

  const form = client({
    encoding: env.FORMIDABLE_ENCODING,
    keepExtensions: env.FORMIDABLE_KEEP_EXTENSIONS === 'true',
    maxFields: Number(env.FORMIDABLE_MAX_FIELDS),
    maxFieldsSize: env.FORMIDABLE_MAX_FIELDS_SIZE_TOTAL_MB * 1024 * 1024,
    allowEmptyFiles: env.FORMIDABLE_ALLOW_EMPTY_FILES === 'true',
    maxFiles: Number(env.FORMIDABLE_MAX_FILES),
    maxTotalFileSize: env.FORMIDABLE_MAX_FILE_SIZE_TOTAL_MB * 1024 * 1024,
    maxFileSize: env.FORMIDABLE_MAX_FILE_SIZE_MB * 1024 * 1024,
    uploadDir: path.resolve('./src/storage/formidable'),
    createDirsFromUploads: false,
    hashAlgorithm: false,
  });

  try {

    const [fields, files] = await form.parse(req);

    let body: { [key: string]: any } = {};
    const hasFields = !!fields && fields !== null; Object.keys(fields).length > 0;
    if (hasFields) body = { ...fields };

    const hasFiles = !!files && files !== null && Object.keys(files).length > 0;
    if (hasFiles) {
      for (const param in files) {

        const targets: any = files[param];
        body[param] = [];

        for (const target of targets) {

          body[param].push({
            type: 'file',
            mime: target.mimetype,
            filepath: target.filepath,
            original: target.originalFilename,
            updatedAt: target.lastModifiedDate,
            size: target.size,
            ext: path.extname(target.filepath),
          });
        }
      }
    }

    return body;

  } catch (err) {

    return {};
  }
}

export default formidable;