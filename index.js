import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";  // ✅ IMPORT THIS
import applicantsRouter from "./routes/applicants.js";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Use routes
app.use("/api/jobs", jobRoutes);
app.use("/api/applicants", applicantsRouter);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/JobPortalDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
