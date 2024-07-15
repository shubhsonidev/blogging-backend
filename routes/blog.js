const express = require("express");
const { handleAddBlog, handleGetBlog, handleGetBlogThroughId } = require("../controllers/blog");

// intializing router using express
const router = express.Router();

// add blog route
router.post("/add", handleAddBlog);

router.get("/", handleGetBlog);

router.get("/:id", handleGetBlogThroughId);

module.exports = router;
