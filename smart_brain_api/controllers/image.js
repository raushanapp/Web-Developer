const Clarifai = require("clarifai-nodejs-grpc");
const dotenv = require("dotenv");
dotenv.config();

// const app = new Clarifai.App({
//   apiKey: process.env.CLARIFAI_API_KEY,
// });
const workflowUrl = "https://clarifai.com/clarifai/main/workflows/Face";

const app = new Clarifai.App({
  authConfig: {
    pat: process.env.CLARIFAI_PAT,
    appId: process.env.CLARIFAI_APP_ID,
    userId: process.env.CLARIFAI_USER_ID,
  },
});
const handleApiCall = async (req, res) => {
  const facedetection = await app.model();
  console.log(facedetection);
};

const handleImage = (req, res, db) => {
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
};

module.exports = {
  handleImage,
  handleApiCall,
};
