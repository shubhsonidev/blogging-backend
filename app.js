require("dotenv").config();

const express = require("express");
const { connectToDB } = require("./connection");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const cookieParser = require("cookie-parser");
const path = require("path");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swaggerConfig");

// creating instance
const app = express();

// setting port
const PORT = process.env.PORT || 4200;

// connecting mongo db using a seperate module file ./connection
// mongodb://127.0.0.1:27017/blogify local url of mongoDb
connectToDB(process.env.MONGO_URL).then(console.log("Connected to MongoDB"));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(os.tmpdir()));

// routes
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// listening
app.listen(PORT, () => {
  console.log(`Server started at the PORT: ${PORT}`);
});
