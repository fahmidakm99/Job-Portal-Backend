import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  type: String,
  description: String,
  postedDate: Date,
  keywords: [String],
  salary: String,
  level: String,
  experience: Number,
  deadline: Date,
  responsibilities: [String],
  requirements: [String],
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
