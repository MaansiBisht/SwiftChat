const bcrypt = require('bcrypt');
const { User, validateLogin } = require('../models/userModel.js');

const loginController = async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        // Find user by email and explicitly include the password field
        const user = await User.findOne({ email: req.body.email }).select("+password");

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Check if password matches
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid password" }); // 401 for unauthorized
        }

        // Generate token
        const token = user.generateAuthToken();

        // Send response with cookie
        res.status(200)
            .cookie("authToken", token, {
                httpOnly: false,
                sameSite: "none",
                secure: true,
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            })
            .send({ message: "Login successful", status: 200 });

    } catch (err) {
        console.error("Error in loginController:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports = loginController;