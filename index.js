const express = require("express");

require("dotenv").config({ path: ".env" });
const connectDB = require("./db");
const cornFunction = require("./cornJob");

connectDB();

const app = express();
app.use(express.json({ extended: false }));

cornFunction();

app.use("/api/user", require("./api/user"));
app.use("/api/event", require("./api/event"));
app.use("/api/reward", require("./api/reward"));
app.use("/api/participate", require("./api/participate"));
app.get("/", (req, res) => {
  res.send("working");
});

const port = process.env.port || 5000;
app.listen(port, () => console.log("server up"));
