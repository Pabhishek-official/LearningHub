const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
    {
        topicName: {
            type: String,
            required: true
        },
        banner: {
            type: String,
            required: true
        },
        bannerPublicId: {
            type: String
        },
        pdf: {
            type: String,
            required: true
        },
        pdfPublicId: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Notes = mongoose.model("Notes", notesSchema);
module.exports = Notes;