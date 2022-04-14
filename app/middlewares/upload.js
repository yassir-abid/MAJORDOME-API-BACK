const debug = require('debug')('uploadMiddleware');
/**
 * This middleware will use Multer for handling multipart/form-data along with uploading files.
 */

const multer = require('multer');
// util module supports the needs of Node.js internal APIs
const util = require('util');
const path = require('path');

const { ApiError } = require('../helpers/errorHandler');

// restrict file size: 2MB
// max file size (in bytes)
const maxSize = 2 * 1024 * 1024;

let directoryPath;

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        if (request.originalUrl.includes('/avatar')) {
            directoryPath = path.join(__dirname, '../assets/avatar/');
        } else if (request.originalUrl.includes('/pictures')) {
            directoryPath = path.join(__dirname, '../assets/picture/');
        } else if (request.originalUrl.includes('/documents')) {
            directoryPath = path.join(__dirname, '../assets/file/');
        }
        cb(null, directoryPath);
    },
    filename: (request, file, cb) => {
        file.customName = `${Date.now()}-${file.originalname.replace(/\s/g, '')}`;
        cb(null, file.customName);
    },
});

// single(fieldname): Accept a single file with the name fieldname.
// The single file will be stored in request.file.
const uploadFile = multer({
    storage,
    limits: { fileSize: maxSize }, // optional
}).single('file');

// util.promisify() makes the exported middleware object can be used with async-await
const uploadFileMiddleware = util.promisify(uploadFile);

const upload = async (request, response, next) => {
    debug('upload');
    try {
        await uploadFileMiddleware(request, response);
        if (request.file === undefined) {
            throw new ApiError('Please upload a file!', { statusCode: 400 });
        }
        debug(request.file);
        next();
    } catch (error) {
        // handle the error by checking error code (LIMIT_FILE_SIZE)
        if (error.code === 'LIMIT_FILE_SIZE') {
            throw new ApiError('File size cannot be larger than 2MB!', { statusCode: 400 });
        }
        throw new ApiError(`Could not upload the file. Error: ${error}`, { statusCode: 500 });
    }
};

module.exports = upload;
