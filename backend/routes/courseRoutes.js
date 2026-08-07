const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { addCourse, getCourses, deleteCourse, updateCourse } = require("../controllers/courseController");


router.post("/add", upload.single("banner"), addCourse);
router.get("/", getCourses);
router.delete("/:id", deleteCourse);
router.put("/:id", upload.single("banner"), updateCourse);

module.exports = router;