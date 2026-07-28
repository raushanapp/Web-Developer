const express = require("express");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
// const dotenv = require("dotenv");
// dotenv.config();

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "raushankumar",
    password: "post",
    database: "smart_barin",
  },
});

const app = express();
app.use(cors("*"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ users: [{}] });
});

app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", register.handleRegister(db, bcrypt));

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
