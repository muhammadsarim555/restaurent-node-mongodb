const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signUp = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check If The Input Fields are Valid
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Please Input Email Username and Password" });
    }

    // Check If User Exists In The Database
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Hash The User's Password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save The User To The Database
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User Created Successfully", newUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error creating user" });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check If The Input Fields are Valid
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please Input Email and Password" });
    }

    // Check If User Exists In The Database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare Passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.SECRET_KEY || "1234!@#%<{*&)",
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ message: "Login Successful", data: user, token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error during login" });
  }
};
