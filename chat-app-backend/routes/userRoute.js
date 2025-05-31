const express = require("express");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const verifyEmail = require("../controllers/emailVerificationContoller");
const profileController = require("../controllers/profileController");
const messageController = require("../controllers/messageController");
const peopleController = require("../controllers/peopleController");
const { User } = require("../models/userModel");
const Message = require("../models/messageModel");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/:id/verify/:token", verifyEmail);
router.get("/profile", profileController.profileController);
router.get("/messages/:userId", messageController);
router.get("/people", peopleController);
router.put("/profile/update", profileController.profileUpdate);

router.post("/messages", async (req, res) => {
  try {
    const { text, sender, recipient, actualRecipient} = req.body;
    const message = new Message({ text, sender, recipient, actualRecipient});
    await message.save();
    res.status(201).send("Message saved");
  } catch (error) {
    res.status(500).send("Error saving message");
  }
});

router.get('/:userId/publicKey', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).select('publicKey');
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json({ publicKey: user.publicKey });
    } catch (error) {
      res.status(500).json({ message: "Error fetching public key" });
    }
  });
  
module.exports = router;
