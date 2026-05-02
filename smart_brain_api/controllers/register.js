const handleRegister = (db, bcrypt) => (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Incorrect form submission" });
  }
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
};

module.exports = {
  handleRegister: handleRegister,
};
