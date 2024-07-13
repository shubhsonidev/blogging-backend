const express = require("express");
const { handleAddBlog, handleGetBlog, handleGetBlogThroughId } = require("../controllers/blog");
const multer = require("multer");
const path = require("path");

// intializing router using express
const router = express.Router();

// Creating storage using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

// intialising upload using multer
const upload = multer({ storage: storage });

// add blog route
router.post("/add", upload.single("coverImageURL"), handleAddBlog);

router.get("/", handleGetBlog);

router.get("/:id", handleGetBlogThroughId);

module.exports = router;
