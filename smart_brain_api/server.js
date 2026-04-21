const express = require("express");

const app = express();

app.use(express.json());

const database = {
  users: [
    {
      id: 123,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      entries: 0,
      joined: new Date(),
    },
    {
      id: 124,
      name: "Sally",
      email: "sally@example.com",
      password: "password1234",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.json({ users: database.users });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (
    email === database.users[0].email &&
    password === database.users[0].password
  ) {
    res.json({ message: "Signin successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  database.users.push({
    id:
      database.users.length > 0
        ? Math.max(...database.users.map((u) => u.id)) + 1
        : 125,
    name,
    email,
    password,
    entries: 0,
    joined: new Date(),
  });

  res.json({
    message: "User registered successfully",
    users: database.users[database.users.length - 1],
  });
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  const user = database.users.find((u) => u.id === parseInt(id));
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.put("/image", (req, res) => {});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
