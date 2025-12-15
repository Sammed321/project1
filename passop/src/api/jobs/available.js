app.get("/api/jobs/available", async (req, res) => {
  const jobs = await Job.find({ status: "available" });
  res.json(jobs);
});
