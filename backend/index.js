const cors = require('cors')
const express = require('express')
const app = express()
const { MongoClient } = require("mongodb")
require('dotenv').config()

const db_url = process.env.DB_URL


let db;

app.use(express.json());
app.use(cors())

MongoClient.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db("lms_test");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

app.get("/colleges", async (req, res) => {
  try {
    const colleges = await db.collection("colleges").find().toArray();
    res.status(200).json(colleges);
  } catch (error) {
    console.error("Error fetching colleges:", error);
    res.status(500).json({ error: "Failed to fetch colleges" });
  }
});

app.post("/colleges", async (req, res) => {
  try {
    const newCollege = req.body;
    const result = await db.collection("colleges").insertOne(newCollege);
    res.status(201).json({ message: "College added successfully", id: result.insertedId });
  } catch (error) {
    console.error("Error adding college:", error);
    res.status(500).json({ error: "Failed to add college" });
  }
});

app.post("/reviews", async (req, res) => {
  try {
    const newCollege = req.body;
    const result = await db.collection("reviews").insertOne(newCollege);
    res.status(201).json({ message: "Review added successfully", id: result.insertedId });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
});

const port = 4000 || process.env.PORT
app.listen(port, () => {
  console.log(`Server started succesfully on PORT: ${port}`)
})
