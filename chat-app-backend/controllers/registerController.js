const bcrypt = require('bcrypt');
const {User , validateRegister} = require('../models/userModel.js');
const {Token}  = require('../models/tokenModel.js');
const sendEmail = require('../utils/sendEmail.js');
const crypto = require('crypto');

const registerController = async (req, res) => {
    try{
        const { error } = validateRegister(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        let user = await User.findOne({email:req.body.email});
        if(user && user.verified) {
            return res.status(400).json({ message: "User already exists" });
        }
        if(user && user.verificationLinkSent) {
            return res.status(400).json({ message: "Verification link already sent" });
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // save the user
        user = await new User({
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            email: req.body.email,
            password: hashPassword,
            publicKey: req.body.publicKey, // E2EE public key
            verified: false,
            verificationLinkSent: true
        }).save();

        // create a token
        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 // 1 hour
        }).save();

        // send email
        const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email,"Verify your email", url)
        await user.save();
        return res.status(201).json({ message: "User registered successfully, please check your email for verification link" });

    }catch(err) {
        console.error("Error in registerController:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = registerController;