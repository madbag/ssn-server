require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();

require("./config")(app);

// 👇 Start handling routes here
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const articleRouter = require("./routes/article.route");
app.use("/api", articleRouter);

const commentRouter = require("./routes/comment.route");
app.use("/api", commentRouter);

const authRouter = require("./routes/auth.route")
app.use("/auth", authRouter)

require("./error-handling")(app);

module.exports = app;

