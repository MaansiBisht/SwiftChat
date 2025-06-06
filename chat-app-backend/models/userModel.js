const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// Password complexity configuration
const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
};

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      index: true 
    },
    password: { 
      type: String, 
      required: true, 
      select: false 
    },
    publicKey: {  // field for E2EE
      type: String,
      required: true,
    },
    verified: { type: Boolean, default: false },
    verificationLinkSent: { type: Boolean, default: false },
    avatarLink: { type: String },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
    },
    process.env.JWTPRIVATEKEY,
    { expiresIn: "7d" }
  );
};

const User = mongoose.model("user", userSchema);

const validateRegister = (data) => {
  console.log(data)
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity(complexityOptions).required().label("Password"),
    publicKey: Joi.string().required().label("Public Key"),
  });
  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validateRegister, validateLogin };
