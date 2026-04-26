const express = require("express");
const cors = require("cors");
const knex = require("knex");

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

db.select("*")
  .from("users")
  .then((data) => {
    console.log(data);
  });

console.log(db.select("*").from("users"));

const app = express();

app.use(cors("*"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ users: [{}] });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (
    // email === database.users[0].email &&
    // password === database.users[0].password
    true
  ) {
    res.json({ message: "Signin successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  db("users")
    .returning("*")
    .insert({ name: name, email: email, joined: new Date() })
    .then((user) => {
      res.json({
        message: "User registered successfully",
        user: user[0],
      });
    })
    .catch(() => {
      res.status(400).json({ message: "Unable to register user" });
    });
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db("users")
    .select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      res.json({ user });
    })
    .catch(() => res.status(404).json({ message: "User not found" }));
});

app.put("/image", (req, res) => {
  let { id } = req.body;
  let found = false;
  db.users.forEach((user) => {
    if (user.id === parseInt(id)) {
      user.entries++;
      found = true;
      return res.json({
        message: "Image updated successfully",
        entries: user.entries,
      });
    }
  });
  if (!found) {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
