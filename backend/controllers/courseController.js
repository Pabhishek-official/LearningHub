const Course = require("../models/CourseModel");

const addCourse = async (req, res) => {
    try {
        const { courseName, description } = req.body;
        if (!courseName || !description || !req.file) {
            return res.status(400).json({
                message: "Please fill all fields and upload banner",
                success: false
            });
        }
        const course = new Course({
            courseName,
            description,
            banner: req.file.path
        });
        await course.save();
        res.status(201).json({
            message: "Course Added Successfully",
            success: true,
            course
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            courses
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch courses"
        });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }
        // Delete course from mongodb
        await Course.findByIdAndDelete(id);
        // Delete banner image
        if (course.banner) {
            const fs = require("fs");
            const path = require("path");
            const imagePath = path.join(
                __dirname,
                "..",
                course.banner
            );
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete course"
        });
    }
};

const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { courseName, description } = req.body;
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }
        if (!courseName || !description) {
            return res.status(400).json({
                success: false,
                message: "Course name and description are required"
            });
        }
        // Update text fields
        course.courseName = courseName;
        course.description = description;
        // If a new banner is uploaded
        if (req.file) {
            const fs = require("fs");
            const path = require("path");
            // Delete old banner
            if (course.banner) {
                const oldImagePath = path.join(
                    __dirname,
                    "..",
                    course.banner
                );
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            //Save new banner path
            course.banner = req.file.path;
        }
        await course.save();
        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to update course"
        });
    }
};

module.exports = {
    addCourse,
    getCourses,
    deleteCourse,
    updateCourse
};