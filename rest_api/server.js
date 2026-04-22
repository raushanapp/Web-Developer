const express = require("express");
const app = express();

// app.use(express.json());

// app.get("/", (req, res) => {
//   console.log("====================================");
//   console.log(req.headers, req.header);
//   console.log("====================================");

//   res.send("Hello, World!");
// });

app.use(express.static(__dirname + "/public"));

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
