const express = require("express");
const app = express();

const userRoutes = require("./userRoutes");
const analyticsRoutes = require("./analyticsRoutes");
const postRoutes = require("./postsRoutes");

// user Route
app.use("/users", userRoutes);
app.use("/analytics/users", analyticsRoutes);

// post Route
app.use("/posts", postRoutes);

module.exports = app;
