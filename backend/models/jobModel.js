const db = require("../config/db");

exports.createJob = (job) => {
  return db.query(
    "INSERT INTO jobs (taskName, payload, priority) VALUES (?, ?, ?)",
    [job.taskName, JSON.stringify(job.payload), job.priority]
  );
};

exports.getAllJobs = () => {
  return db.query("SELECT * FROM jobs ORDER BY createdAt DESC");
};

exports.getJobById = (id) => {
  return db.query("SELECT * FROM jobs WHERE id = ?", [id]);
};

exports.updateStatus = (id, status) => {
  return db.query(
    "UPDATE jobs SET status = ? WHERE id = ?",
    [status, id]
  );
};
