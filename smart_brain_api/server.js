const express = require("express");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcryptjs");

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
  db("login")
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      let isValid = bcrypt.compareSync(password, data[0].hash); // true
      if (isValid) {
        return db("users")
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res
              .status(200)
              .json({ message: "Signin successful", user: user[0] });
          })
          .catch(() => {
            res.status(400).json({ message: "Unable to fetch user" });
          });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    })
    .catch(() => {
      res.status(400).json({ message: "Invalid credentials" });
    });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then(async (loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({ name, email: loginEmail[0].email, joined: new Date() })
          .then((user) => {
            res.json({
              message: "User registered successfully",
              user: user[0],
            });
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => {
    console.error(err);
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
      if (user.length) {
        res.json({ user });
      } else {
        res.status(400).json({ message: "User not found" });
      }
    })
    .catch(() => res.status(400).json({ message: "User getting error" }));
});

app.put("/image", (req, res) => {
  let { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res
        .status(200)
        .json({ message: "Image updated successfully", entries: entries[0] });
    })
    .catch(() => {
      res.status(400).json({ message: "Error updating image" });
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
