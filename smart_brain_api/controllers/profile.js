const handleProfile = (req, res, db) => {
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
};

module.exports = {
  handleProfile,
};
