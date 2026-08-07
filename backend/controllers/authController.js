const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

// register user
const registerUser = async (req, res) => {
    try {
        const { fullName, email, mobile, password } = req.body;
        // check empty fields
        if (!fullName || !email || !mobile || !password) {
            return res.status(400).json({
                message: "Please fill all fields",
                success: false
            });
        }
        //  check existing email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                message: "Email already registered",
                success: false
            });
        }
        //  check existing mobile
        const existingMobile = await User.findOne({ mobile });
        if (existingMobile) {
            return res.status(400).json({
                message: "Mobile number already registered",
                success: false
            });
        }
        //  Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);
        //  Create User
        const user = new User({
            fullName,
            email,
            mobile,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({
            message: "Registration Successful",
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};

const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all fields",
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password",
                success: false
            });
        }
        const token = jwt.sign(
            {
                id: user._id,
            },
            "onlinestudysecret",
            {
                expiresIn: "1d",
            }
        );
        res.status(200).json({
            message: "Login Successful",
            success: true,
            token,
            user,
        });
    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};

module.exports = { registerUser, loginUser };
