const express = require("express");

// acquire the necessary environment variables
require("dotenv").config({ path: ".env" });
const connectDB = require("./db");
const cornFunction = require("./cornJob");

// establish connection to the DB instance
connectDB();

// create express server
const app = express();
app.use(express.json({ extended: false }));

// run the corn-job
cornFunction();

// Based upon different paths, I added different routers
app.use("/api/user", require("./api/user"));
app.use("/api/event", require("./api/event"));
app.use("/api/reward", require("./api/reward"));
app.use("/api/participate", require("./api/participate"));
app.get("/", (req, res) => {
  res.send("working");
});

const port = process.env.port || 5000;
app.listen(port, () => console.log("server up"));
