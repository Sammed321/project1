import React, { Component } from "react";

export default class WorkerDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hiredWorkers: []
    };
  }

  componentDidMount() {
    this.loadHiredWorkers();

    // Auto refresh every 4 seconds
    this.interval = setInterval(this.loadHiredWorkers, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadHiredWorkers = () => {
    fetch("http://localhost:5000/api/workers/hired")
      .then(res => res.json())
      .then(data => this.setState({ hiredWorkers: data }))
      .catch(err => console.log(err));
  };

  render() {
    const { hiredWorkers } = this.state;

    return (
      <div className="container py-5">
        <h2 className="fw-bold mb-4">Workers Hired</h2>

        <div className="row">
          {hiredWorkers.length === 0 && (
            <p>No hired workers yet.</p>
          )}

          {hiredWorkers.map((worker, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{worker.fullName}</h5>
                  <p><strong>Skill:</strong> {worker.skill}</p>
                  <p><strong>Experience:</strong> {worker.experience} years</p>
                  <p><strong>Location:</strong> {worker.location}</p>
                  <p><strong>Price:</strong> ₹{worker.pricePerHour}/hr</p>
                  <p><strong>Status:</strong> {worker.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
