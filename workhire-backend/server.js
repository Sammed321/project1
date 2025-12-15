import Worker from "./models/worker.js";
import Job from "./models/job.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";

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


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
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


// LOGIN API
app.post("/api/worker/login", async (req, res) => {
  const { email, password } = req.body;

  const worker = await Worker.findOne({ email, password });

  if (!worker) {
    return res.json({ success: false, message: "Invalid email or password" });
  }

  res.json({ success: true, message: "Login successful", worker });
});


// HIRE WORKER API
app.post("/api/workers/hire/:id", async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);

    if (!worker) {
      return res.status(404).json({ success: false, message: "Worker not found" });
    }

    worker.status = "hired";
    await worker.save();

    res.json({ success: true, message: "Worker hired successfully", worker });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// GET HIRED WORKERS
app.get("/api/workers/hired", async (req, res) => {
  try {
    const workers = await Worker.find({ status: "hired" });
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// JOB APIs
app.get("/api/jobs/available", async (req, res) => {
  try {
    const jobs = await Job.find({ status: "available" });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/jobs/create", async (req, res) => {
  try {
    const { title, location, customer } = req.body;

    const job = await Job.create({
      title,
      location,
      customer,
      status: "available",
      assignedTo: null
    });

    global.io.emit("job-added", job);  

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/jobs/my-jobs/:workerId", async (req, res) => {
  try {
    const { workerId } = req.params;
    const jobs = await Job.find({ assignedTo: workerId });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// SOCKET IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});
global.io = io;

io.on("connection", socket => {
  console.log("Worker Connected");
});

server.listen(5000, () => console.log("Backend running on Port 5000"));
