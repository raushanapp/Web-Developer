const dotenv = require("dotenv");
dotenv.config();

const handleApiCall = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.clarifai.com/v2/models/face-detection/outputs",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.CLARIFAI_PAT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_app_id: {
            user_id: "clarifai",
            app_id: "main",
          },
          inputs: [
            {
              data: {
                image: {
                  url: req.body.input,
                },
              },
            },
          ],
        }),
      },
    );

    const data = await response.json();

    // optional: check for API-level error
    if (data.status?.code !== 10000) {
      console.log(data.status);
      return res.status(400).json("Clarifai API error");
    }

    res.json(data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Error detecting face");
  }
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
