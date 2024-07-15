const Blog = require("../models/blog");
const axios = require("axios");

async function handleAddBlog(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }
  const { title, body, coverImageURL } = req.body;

  console.log(req.body);

  if (!title || !body) {
    return res.status(401).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const postData = {
      key: process.env.IMGBB_KEY,
      image: coverImageURL,
    };

    // Convert to FormData
    const formData = new FormData();
    formData.append("key", postData.key);
    formData.append("image", postData.image);

    const response = await axios.post("https://api.imgbb.com/1/upload", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.data.data.url);

    if (!response.data.data.url) {
      return res.status(500).json({
        success: false,
        message: "File upload error occured: internal server error",
      });
    }

    const newBlog = await Blog.create({
      title: title,
      body: body,
      coverImageURL: response.data.data.url,
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
