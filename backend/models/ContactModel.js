const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    mob: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    msg: {
        type: String,
        required: true,
        trim: true
    },

},
    {
        timestamps: true,
    }
);
const ContactModel = mongoose.model("Contact", contactSchema);

module.exports = ContactModel;