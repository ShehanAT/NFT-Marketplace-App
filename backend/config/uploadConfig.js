const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'imgs/')
    },
    filename: (request, file, callback) => {
        const fileExtention = file.originalname.split(".")[1];

        const newNameFile = require("crypto").randomBytes(16).toString("hex");

        callback(null, `${newNameFile}.${fileExtention}`)
    }
});

const upload = multer({ storage });
module.exports = upload;