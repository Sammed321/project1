import React from "react";

function WorkerDashboard() {
  return (
    <div className="container py-5">
      <h2>Worker Dashboard</h2>

      <h4 className="mt-4">Available Jobs</h4>

      <div className="card p-3 mt-3">
        <h5>Fan Repair Needed</h5>
        <p>Location: Belagavi</p>
        <p>Customer: John</p>
        <button className="btn btn-success">Accept Job</button>
      </div>
    </div>
  );
}

export default WorkerDashboard;
