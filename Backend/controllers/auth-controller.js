const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const checkExistingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: "User with same username or password already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newlyCreatedUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newlyCreatedUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const passwordCorrect = await bcrypt.compare(password, user.password);

        if (!passwordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const accessToken = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30m",
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successfully",
            accessToken,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

module.exports = { registerUser, loginUser };
