const express = require("express");
const { handleSignUp, handleSignIn, handleLogout } = require("../controllers/user");

// intializing router using express
const router = express.Router();

// signup route
router.post("/signup", handleSignUp);

// signin route
router.post("/signin", handleSignIn);

// logout route
router.get("/logout", handleLogout);

module.exports = router;
