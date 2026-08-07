const ContactModel = require("../models/ContactModel");

//save contact data
exports.saveContact = async (req, res) => {
    try {
        console.log("Body =", req.body);//check data aa raha hai ki nahi

        const contact = new ContactModel(req.body);

        await contact.save();

        res.json({
            success: true,
            message: "Data saved Successfully"
        });
    }
    catch (err) {

        console.log(err);   //Important

        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

//display contact data

exports.getContacts = async (req, res) => {
    try {
        const data = await ContactModel.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            message:err.message
        });
    }
}
