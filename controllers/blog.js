const Blog = require("../models/blog");

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
    return res.status(401).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Create a new blog post (this example assumes you have a Blog model)
  try {
    const newBlog = await Blog.create({
      title: title,
      body: body,
      coverImageURL: coverImageURL,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Blog post created successfully!",
      data: newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function handleGetBlog(req, res) {
  const blogs = await Blog.find({});
  try {
    return res.status(200).json({
      success: true,
      message: "Blogs list",
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function handleGetBlogThroughId(req, res) {
  const id = req.params.id;

  const blog = await Blog.findOne({
    _id: id,
  });
  try {
    return res.status(200).json({
      success: true,
      message: "Blogs list",
      data: blog,
    });
  } catch (error) {
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
