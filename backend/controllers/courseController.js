const Course = require("../models/CourseModel");
const cloudinary = require("../config/cloudinary");

// Helper function to upload image buffer to cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "learninghub/courses",
                resource_type: "image"
            },
            (error, result) => {
                if(error){
                    reject(error);
                } else{
                    resolve(result);
                }
            }
        );
        stream.end(buffer);
    });
};
//Add course

const addCourse = async (req, res) => {
    try {
        const { courseName, description } = req.body;
        if (!courseName || !description || !req.file) {
            return res.status(400).json({
                message: "Please fill all fields and upload banner",
                success: false
            });
        }
        // Upload banner to Cloudinary
        const result = await uploadToCloudinary(req.file.buffer);

        const course = new Course({
            courseName,
            description,
            banner: result.secure_url,
            cloudinaryPublicId: result.public_id
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

// Get Courses
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

// Delete Courses
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

        // Delete Images from cloudinary
        if(course.cloudinaryPublicId){
            await cloudinary.uploader.destroy(
                course.cloudinaryPublicId,
                {
                    resource_type: "image"
                }
            );
        }

        //Delete course from MongoDB
        await Course.findByIdAndDelete(id);

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

//Update Course
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

            //Upload new banner to Cloudinary
            const result = await uploadToCloudinary(req.file.buffer);

            // Delete old banner from Cloudinary
            if (course.cloudinaryPublicId) {
                await cloudinary.uploader.destroy(
                    course.cloudinaryPublicId,
                    {
                        resource_type: "image"
                    }
                );
            }
            //Save new cloudinary information
            course.banner = result.secure_url;
            course.cloudinaryPublicId = result.public_id;
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