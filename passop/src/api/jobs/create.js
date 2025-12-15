app.post("/api/jobs/create", async (req, res) => {
  const { title, location, customer } = req.body;

  const job = await Job.create({
    title,
    location,
    customer,
    status: "available",
    assignedTo: null
  });

  io.emit("job-added", job);  // notify all workers in real-time

  res.json(job);
});
