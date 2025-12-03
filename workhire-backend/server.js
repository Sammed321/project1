import Worker from "./models/worker.js";  // IMPORT MODEL CORRECTLY
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("Mongo Error: ", err));

// Simple Test Route
app.get("/", (req, res) => {
  res.send("Backend is Running 🚀");
});

// SEARCH WORKERS API
app.get("/api/workers/search", async (req, res) => {
  try {
    const { skill, location, minExp, maxPrice } = req.query;

    let filter = {};

    if (skill) filter.skill = { $regex: skill, $options: "i" };
    if (location) filter.location = { $regex: location, $options: "i" };
    if (minExp) filter.experience = { $gte: Number(minExp) };
    if (maxPrice) filter.pricePerHour = { $lte: Number(maxPrice) };

    const workers = await Worker.find(filter);
    console.log("Workers found:", workers);
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// REGISTER WORKER API
app.post("/api/workers", async (req, res) => {
  try {
    const worker = new Worker(req.body);
    await worker.save();
    res.status(201).json({ success: true, message: "Worker Registered!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// START SERVER
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT} 🔥`)
);
app.post("/api/worker/login", async (req, res) => {
  const { email, password } = req.body;

  const worker = await Worker.findOne({ email, password });

  if (!worker) {
    return res.json({ success: false, message: "Invalid email or password" });
  }

  res.json({ success: true, message: "Login successful", worker });
});
