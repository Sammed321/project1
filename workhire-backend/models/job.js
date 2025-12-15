import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  customer: { type: String, required: true },
  status: { type: String, default: "available" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Worker", default: null },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Job", JobSchema);
