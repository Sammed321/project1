import mongoose from "mongoose";

const WorkerSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  email: String,
  skill: String,
  experience: Number,
  location: String,
  about: String,
  pricePerHour: Number
});

export default mongoose.model("Worker", WorkerSchema);
