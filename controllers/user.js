const User = require("../models/user");
const { createHmac } = require("crypto");
const { createTokenForUser, validateToken } = require("../services/authentication");

// signup handler
async function handleSignUp(req, res) {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const newUser = await User.create({
      fullName: fullName,
      email: email,
      password: password,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the user",
      error: error.message,
    });
  }
}

async function handleSignIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const existingUser = await User.findOne({
    email,
  });

  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const salt = existingUser.salt;
  const storedPasswordHashed = existingUser.password;

  const rcvdPasswordHashed = createHmac("sha256", salt).update(password).digest("hex");

  if (storedPasswordHashed !== rcvdPasswordHashed) {
    return res.status(400).json({
      success: false,
      message: "Password is incorrect",
    });
  }

  const token = createTokenForUser(existingUser);
  return res
    .cookie("token", token)
    .status(201)
    .json({
      success: true,
      message: "User found and matched",
      data: {
        token: token,
      },
    });
}

async function handleLogout(req, res) {
  return res.clearCookie("token").json({
    success: true,
    message: "Logged Out Successfully",
  });
}

module.exports = {
  handleSignUp,
  handleSignIn,
  handleLogout,
};
