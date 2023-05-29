// Initialize and start the app
const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server up and running on port: ${port}`);
});

// Databse initialization
const database = require("mongoose")
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log(err.message);
  });

// App routes
const router = express.Router();
app.use("/api", router);

// Model import
const Test = require("./testModel");

// To get all fields
router.get("/find-all", async (req, res) => {
  try {
    const result = await Test.find();

    return res.status(201).json(result);
  } catch (err) {
    console.log(err.message);
  }
});

// To get selective fields
router.get("/find-selected", async (req, res) => {
  try {
    const result = await Test.find(
      {},
      { field2: { $elemMatch: { "array.subField1": 1 } } }
    );

    return res.status(201).json(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/post", async (req, res) => {
  try {
    const { field1, field2, name, array, subField1, subField2 } = req.body;

    const post = new Test({
      field1,
      field2,
      name,
      array,
      subField1,
      subField2,
    });

    const savedPost = await post.save();

    res.status(201).json(savedPost);
  } catch (err) {
    console.log(err.message);
    res.send("Server error");
  }
});
