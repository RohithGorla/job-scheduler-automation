const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

// Create job
router.post("/jobs", jobController.createJob);

// Get all jobs
router.get("/jobs", jobController.getJobs);

// Get job by ID
router.get("/jobs/:id", jobController.getJob);

// Run job
router.post("/run-job/:id", jobController.runJob);

module.exports = router;
