const User = require("../models/User");

const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check empty fields
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }

  // Check password length
  if (password.length < 6 || password.length > 20) {
    return res.status(400).json({
      message: "Password must be between 6 and 20 characters",
    });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "SignUp successfully",
      id: user._id,
      user,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({message:"Please fill all the fields"});
  }
  try {

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
   res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};