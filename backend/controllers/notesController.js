const Notes = require("../models/NotesModel");
const fs = require("fs");
const path = require("path");

//Add notes
const addNotes = async (req, res) => {
    try {
        const { topicName } = req.body;
        console.log("FILES RECEIVED", req.files);
        if (!topicName) {
            return res.status(400).json({
                success: false,
                message: "Topic name is required"
            });
        }
        if (!req.files || !req.files.banner || !req.files.pdf) {
            return res.status(400).json({
                success: false,
                message: "Banner and PDF is required"
            });
        }
        const bannerPath = req.files.banner[0].path;
        const pdfPath = req.files.pdf[0].path;
        console.log("Banner:", bannerPath);
        console.log("PDF", pdfPath);

        const notes = new Notes({
            topicName,
            banner: bannerPath,
            pdf: pdfPath
        });

        await notes.save();

        res.status(201).json({
            success: true,
            message: "Notes added successfully",
            notes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to add notes"
        });
    }
};

// Get all Notes
const getNotes = async (req, res) => {
    try {
        const notes = await Notes.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            notes
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch notes"
        });
    }
};

//Delete Notes
const deleteNotes = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Notes not found"
            });
        }
        //Delete Banner
        if (note.banner && fs.existsSync(note.banner)) {
            fs.unlinkSync(note.banner);
        }
        // Delete PDF
        if (note.pdf && fs.existsSync(note.pdf)) {
            fs.unlinkSync(note.pdf);
        }

        await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Notes deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete notes"
        });
    }
};

//Update Notes
const updateNotes = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Notes not found"
            });
        }
        const { topicName } = req.body;
        if (!topicName) {
            return res.status(400).json({
                success: false,
                message: "Topic name is required"
            });
        }
        //Update topic name
        note.topicName = topicName;
        //replace banner if new banner is uploaded
        if (req.files && req.files.banner) {
            const newBannerPath = req.files.banner[0].path;
            if (note.banner && fs.existsSync(note.banner)) {
                fs.unlinkSync(note.banner);
            }
            note.banner = newBannerPath;
        }
        // Replace pdf if new pdf is uploaded
        if (req.files && req.files.pdf) {
            const newPdfPath = req.files.pdf[0].path;
            if (note.pdf && fs.existsSync(note.pdf)) {
                fs.unlinkSync(note.pdf);
            }
            note.pdf = newPdfPath;
        }
        await note.save();
        res.status(200).json({
            success: true,
            message: "Notes updated successfully",
            notes: note
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to update notes"
        });
    }
};

module.exports = {
    addNotes,
    getNotes,
    deleteNotes,
    updateNotes
};