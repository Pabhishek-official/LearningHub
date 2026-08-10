const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: true
        },
        banner: {
            type: String,
            required: true
        },
        cloudinaryPublicId: {
            type: String
        },
        
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;