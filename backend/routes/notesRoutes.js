const express = require("express");
const router = express.Router();

const uploadNotes = require("../middleware/notesUpload");

const {
    addNotes,
    getNotes,
    deleteNotes,
    updateNotes
} = require("../controllers/notesController");

router.post("/add", uploadNotes.fields([
    {
        name: "banner",
        maxCount: 1
    },
    {
        name: "pdf",
        maxCount: 1
    }
]),
    addNotes
);

router.put(
    "/:id",
    uploadNotes.fields([
        {
            name: "banner",
            maxCount: 1
        },
        {
            name: "pdf",
            maxCount: 1
        }
    ]),
    updateNotes
);

router.get("/", getNotes);
router.delete("/:id", deleteNotes);

module.exports = router;