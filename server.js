// server.js or app.js example
import dotenv from "dotenv";
dotenv.config();

const express = require("express");
const path = require("path");
const app = express();

// Middleware
app.use(express.json());

// API routes
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/applicants", require("./routes/applicants"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Serve React build (optional, if you want one domain)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../job-portal/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../job-portal/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));