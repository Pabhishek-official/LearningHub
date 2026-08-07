const express = require("express");

const router = express.Router();

const { saveContact } = require("../controllers/generalController");
const { getContacts } = require("../controllers/generalController");

router.post("/contact", saveContact);
router.get("/contacts", getContacts);

module.exports = router;