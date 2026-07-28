const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Incorrect form submission" });
  }
  db("login")
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      if (data.length === 0)
        return res.status(400).json({ message: "Invalid credentials" });
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
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Invalid credentials" });
    });
};

module.exports = {
  handleSignin: handleSignin,
};
