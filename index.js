require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");

// Connect to the Database
mongoose
  .connect(
    process.env.MLAB_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to the database..."))
  .catch(err => console.log(err));

// Define express app
const app = express();

// API Routes
const posts = require("./routes/posts");
const users = require("./routes/users");
const categories = require("./routes/categories");

// Middleware
app.use(logger("dev"));
app.use(bodyParser.json());

// Serve static files
app.use(express.static("public"));

// Assign API routes
app.use("/api/v1/posts", posts);
app.use("/api/v1/users", users);
app.use("/api/v1/categories", categories);

// Error catcher
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Handle errors
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  // After that respond to client
  res.status(status).json({
    error: {
      message: error.message
    }
  });

  // Push to the terminal
  console.error(err);
});

// Start the server
const port = app.get("port") || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
