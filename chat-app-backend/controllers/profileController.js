const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { promisify } = require("util");

const verifyToken = promisify(jwt.verify);

const profileController = async (req, res) => {
    try {
        const token = req.cookies?.authToken;
        if (!token) {
            return res.status(401).json({ message: "No authentication token" });
        }

        const userData = await verifyToken(token, process.env.JWTPRIVATEKEY);
        const user = await User.findById(userData._id).select("-password");
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error("Profile controller error:", err);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

const profileUpdate = async (req, res) => {
    try {
        const token = req.cookies?.authToken;
        if (!token) {
            return res.status(401).json({ message: "No authentication token" });
        }

        // Verify token and get user ID
        const userData = await verifyToken(token, process.env.JWTPRIVATEKEY);
        
        // Find user by ID from token
        const user = await User.findById(userData._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update allowed fields
        const { firstName, lastName, email, avatarLink } = req.body;
        
        // Check if email is being changed and validate
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }
            user.email = email;
        }

        // Update other fields
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (avatarLink) user.avatarLink = avatarLink;

        await user.save();
        
        // Return updated user data without password
        const updatedUser = await User.findById(user._id).select("-password");
        res.status(200).json(updatedUser);

    } catch (err) {
        console.error("Profile update error:", err);
        res.status(400).json({ 
            message: err.message || "Error updating profile" 
        });
    }
};

module.exports = { profileController, profileUpdate };
