const multer = require("multer");

const storage = multer.memoryStorage();

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
        fileSize: 50 * 1024 * 1024
    }
});

module.exports = uploadNotes;