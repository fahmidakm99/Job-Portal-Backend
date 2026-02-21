import mongoose from "mongoose";


const ApplicantSchema = new mongoose.Schema({
  jobId: String,
  name: String,
  email: String,
  experience: Number,
  status: String,
  skills: [String],
  appliedDate: Date,
});

const Applicant = mongoose.model("Applicant", ApplicantSchema);

export default Applicant;
