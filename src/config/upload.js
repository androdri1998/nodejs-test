const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

module.exports = {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(req, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  },
};
