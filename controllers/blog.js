const Blog = require("../models/blog");
const fs = require("fs");
const path = require("path");

// Middleware to handle adding a new blog
async function handleAddBlog(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const { title, body } = req.body;
  const coverImageURL = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !body || !coverImageURL) {
    // Clean up the uploaded file if it exists
    if (req.file) {
      const filePath = path.join("/tmp", req.file.filename);
      fs.unlinkSync(filePath);
    }
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const newBlog = await Blog.create({
      title,
      body,
      coverImageURL,
      createdBy: req.user._id,
    });

    // Clean up the uploaded file after successfully creating the blog
    if (req.file) {
      const filePath = path.join("/tmp", req.file.filename);
      fs.unlinkSync(filePath);
    }

    return res.status(201).json({
      success: true,
      message: "Blog post created successfully!",
      data: newBlog,
    });
  } catch (error) {
    console.error(error);

    // Clean up the uploaded file if an error occurs
    if (req.file) {
      const filePath = path.join("/tmp", req.file.filename);
      fs.unlinkSync(filePath);
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// Middleware to get all blogs
async function handleGetBlog(req, res) {
  try {
    const blogs = await Blog.find({});
    return res.status(200).json({
      success: true,
      message: "Blogs list",
      data: blogs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// Middleware to get a blog by ID
async function handleGetBlogThroughId(req, res) {
  const id = req.params.id;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog found",
      data: blog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

module.exports = {
  handleAddBlog,
  handleGetBlog,
  handleGetBlogThroughId,
};
