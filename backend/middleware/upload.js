const multer = require("multer");
const path = require("path");

//Storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() + path.extname(file.originalname).toLowerCase()
        );
    }
});

// file filter (only images allowed)
const fileFilter = (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png|webp/;
    const allowedMimeTypes = /image\/jpeg|image\/jpg|image\/png|image\/webp/;

    const extension = allowedExtensions.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimeType = allowedMimeTypes.test(file.mimetype);

    if (extension && mimeType) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;