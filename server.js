const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Birds = require("./models/birds.js");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/birds", async (req, res) => {
  const allBirds = await Birds.find();
  res.render("birds/index.ejs", { birds: allBirds });
});

app.get("/birds/new", (req, res) => {
  res.render("birds/new.ejs");
});

app.get("/birds/:birdId", async (req, res) => {
  const foundBird = await Birds.findById(req.params.birdId);
  res.render("birds/show.ejs", { birds: foundBird });
});

app.post("/birds", async (req, res) => {
  await Birds.create(req.body);
  res.redirect("/birds");
});

app.delete("/birds/:birdId", async (req, res) => {
  await Birds.findByIdAndDelete(req.params.birdId);
  res.redirect("/birds");
});

app.get("/birds/:birdId/edit", async (req, res) => {
  const foundBird = await Birds.findById(req.params.birdId);
  res.render("birds/edit.ejs", { birds: foundBird });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
