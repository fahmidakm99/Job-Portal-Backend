import express from "express";
import Job from "../models/Job.js";
import Applicant from "../models/Applicant.js";


const router = express.Router();

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedDate: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single job
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET applicants for a specific job
router.get("/:id/applicants", async (req, res) => {
  try {
    const applicants = await Applicant.find({ jobId: req.params.id });
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET job with applicants
router.get("/:id/full", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const applicants = await Applicant.find({ jobId: req.params.id });

    res.json({ job, applicants });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create job
router.post("/", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export default router;
