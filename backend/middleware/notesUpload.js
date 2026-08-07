const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = "uploads/notes";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname).toLowerCase();
        cb(
            null,
            Date.now() + "-" + Math.round(Math.random() * 1E9) + extension
        );
    }
});

const fileFilter = (req, file, cb) => {
    const imageTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp"
    ];
    const pdfTypes = [
        "application/pdf"
    ];
    if (
        imageTypes.includes(file.mimetype) ||
        pdfTypes.includes(file.mimetype)
    ) {
        cb(null, true);
    } else {
        cb(
            new Error("Only image and PDF files are allowed")
        );
    }
};

const uploadNotes = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

module.exports = uploadNotes;