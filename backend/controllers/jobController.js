const Job = require("../models/jobModel");
const axios = require("axios");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const { taskName, payload, priority } = req.body;

    if (!taskName || !payload || !priority) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await Job.createJob({ taskName, payload, priority });
    res.status(201).json({ message: "Job created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Jobs
exports.getJobs = async (req, res) => {
  try {
    const [jobs] = await Job.getAllJobs();
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Job By ID
exports.getJob = async (req, res) => {
  try {
    const [job] = await Job.getJobById(req.params.id);
    res.json(job[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Run Job
exports.runJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    // 1. Set status to running
    await Job.updateStatus(jobId, "running");

    // Respond immediately
    res.json({ message: "Job started" });

    // 2. Simulate background processing
    setTimeout(async () => {
      await Job.updateStatus(jobId, "completed");

      // 3. Trigger webhook
      await axios.post(process.env.WEBHOOK_URL, {
        jobId,
        completedAt: new Date(),
      });

      console.log("Webhook triggered for job:", jobId);
    }, 3000);

  } catch (err) {
    console.error(err);
  }
};
