const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const notesRoutes = require("./routes/notesRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


//connect with local mongodb
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
// app.get("/",(req,res)=>{
//     res.send("Server is running successfully ");
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});