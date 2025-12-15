import mongoose from "mongoose";

const WorkerSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  email: String,
  password: String,
  skill: String,
  experience: Number,
  location: String,
  about: String,
  pricePerHour: Number,

  // IMPORTANT: Worker status added
  status: {
    type: String,
    default: "available"    // available | hired
  }
});

export default mongoose.model("Worker", WorkerSchema);
