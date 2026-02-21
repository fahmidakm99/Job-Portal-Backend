import express from "express";
import Applicant from "../models/Applicant.js"; // make sure path is correct

const router = express.Router();

// GET all applicants
router.get("/", async (req, res) => {
  try {
    const applicants = await Applicant.find(); // fetch all applicants
    res.json(applicants);
  } catch (err) {
    console.error("Error fetching applicants:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET a single applicant by ID
router.get("/:id", async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);
    if (!applicant) return res.status(404).json({ message: "Applicant not found" });
    res.json(applicant);
  } catch (err) {
    console.error("Error fetching applicant:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all applicants for a specific job
router.get("/job/:jobId", async (req, res) => {
  try {
    const applicants = await Applicant.find({ jobId: req.params.jobId });
    res.json(applicants);
  } catch (err) {
    console.error("Error fetching applicants for job:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update applicant status
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["applied", "reviewing", "interview", "hired", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const applicant = await Applicant.findByIdAndUpdate(
      id,
      { status },
      { new: true } // return the updated document
    );

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.json(applicant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;