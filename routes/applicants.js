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

// Update status of an applicant
router.put("/:id/status", async (req, res) => {
  try {
    const applicantId = req.params.id;
    const { status } = req.body; // new status sent from frontend

    const updatedApplicant = await Applicant.findByIdAndUpdate(
      applicantId,
      { status },
      { new: true }
    );

    if (!updatedApplicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.json(updatedApplicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});




export default router;