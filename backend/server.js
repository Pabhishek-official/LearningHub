const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const cors = require("cors");
const dns = require("dns");

require("dotenv").config();
//Fix MongoDB Atlas SRV DNS resolution
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const notesRoutes = require("./routes/notesRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


//connect with mongodb atlas
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Mongodb Connected");
}).catch((err) => {
    console.log("Connection Error :", err);
})

app.use("/api", require("./routes/commonRoutes"));
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/notes", notesRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});