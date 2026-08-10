const Notes = require("../models/NotesModel");
const cloudinary = require("../config/cloudinary");

//upload file to cloudinary
const uploadToCloudinary = (buffer, resourceType, folder) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: resourceType
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

//Delete file from Cloudinary
const deleteFromCloudinary = async (publicId, resourceType) => {
    if(!publicId){
        return;
    }
    try{
        await cloudinary.uploader.destroy(
            publicId,
            {
                resource_type: resourceType
            }
        );
    } catch(error){
        console.log("Cloudinary delete error", error);
    }
};

//Add notes
const addNotes = async (req, res) => {
    console.log("Cloudinary addNotes controller called");
    try {
        const { topicName } = req.body;
        console.log("FILES RECEIVED", req.files);
        //validate topic
        if (!topicName) {
            return res.status(400).json({
                success: false,
                message: "Topic name is required"
            });
        }
        //validate file
        if (!req.files || !req.files.banner || !req.files.pdf) {
            return res.status(400).json({
                success: false,
                message: "Banner and PDF is required"
            });
        }

        const bannerFile = req.files.banner[0];
        const pdfFile = req.files.pdf[0];

        //Upload banner
        const bannerResult = await uploadToCloudinary(
            bannerFile.buffer,
            "image",
            "learninghub/notes/banners"
        );
        //upload pdf
        const pdfResult = await uploadToCloudinary(
            pdfFile.buffer,
            "raw",
            "learninghub/notes/pdfs"
        );

        //Save to MongoDB
                

        const notes = new Notes({
            topicName,
            banner: bannerResult.secure_url,
            bannerPublicId: bannerResult.public_id,
            pdf: pdfResult.secure_url,
            pdfPublicId: pdfResult.public_id
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
        //Delete Banner from Cloudinary
        if (note.bannerPublicId) {
            await deleteFromCloudinary(
                note.bannerPublicId,
                "image"
            );
        }
        // Delete PDF from Cloudinary
        if (note.pdfPublicId) {
            await deleteFromCloudinary(
                note.pdfPublicId,
                "raw"
            );
        }
        
        //Delete MongoDB document
        await Notes.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Notes deleted successfully"
        });
    } catch (error) {

        console.log("DELETE NOTES ERROR:", error);

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

            const newBanner = req.files.banner[0];

            //upload new banner
            const bannerResult = await uploadToCloudinary(
                newBanner.buffer,
                "image",
                "learninghub/notes/banners"
            );
            //delete old Cloudinary banner
            if (note.bannerPublicId) {
                await deleteFromCloudinary(
                    note.bannerPublicId,
                    "image"
                );
            }
            //Save new banner
            note.banner = bannerResult.secure_url;
            note.bannerPublicId = bannerResult.public_id;
        }

        // Replace pdf if new pdf is uploaded
        if (req.files && req.files.pdf) {

            const newpdf = req.files.pdf[0];
            //upload new pdf
            const pdfResult = await uploadToCloudinary(
                newpdf.buffer,
                "raw",
                "learninghub/notes/pdfs"
            );
            //delete old cloudinary pdf
            if (note.pdfPublicId) {
                await deleteFromCloudinary(
                    note.pdfPublicId,
                    "raw"
                );
            }
            //save new pdf
            note.pdf = pdfResult.secure_url;
            note.pdfPublicId = pdfResult.public_id;
        }

        await note.save();

        res.status(200).json({
            success: true,
            message: "Notes updated successfully",
            notes: note
        });

    } catch (error) {
        console.log("UPDATE NOTES ERROR:", error);
        
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