import React, { PureComponent } from "react";

export class WorkerPage extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phone: "",
      email: "",
      skill: "",
      experience: "",
      location: "",
      about: "",
      pricePerHour: ""
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const workerData = this.state;

    fetch("http://localhost:5000/api/workers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workerData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        alert("Worker Registered Successfully!");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container py-5">
        <h2 className="fw-bold text-center mb-4">Worker Registration</h2>
        <p className="text-center mb-4">
          Register your details and get hired by customers in your area.
        </p>

        <form
          className="mx-auto"
          style={{ maxWidth: "600px" }}
          onSubmit={this.handleSubmit}
        >
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => this.setState({ fullName: e.target.value })}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              onChange={(e) => this.setState({ phone: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => this.setState({ email: e.target.value })}
              required
            />
          </div>

          {/* Skill Category */}
          <div className="mb-3">
            <label className="form-label">Skill Category</label>
            <select
              className="form-select"
              onChange={(e) => this.setState({ skill: e.target.value })}
              required
            >
              <option value="">Select Skill</option>
              <option>Electrician</option>
              <option>Plumber</option>
              <option>Mechanic</option>
              <option>Painter</option>
              <option>Tutor</option>
              <option>Carpenter</option>
              <option>House Cleaner</option>
              <option>Appliance Repair</option>
            </select>
          </div>

          {/* Experience */}
          <div className="mb-3">
            <label className="form-label">Experience (Years)</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => this.setState({ experience: e.target.value })}
              required
            />
          </div>

          {/* Location */}
          <div className="mb-3">
            <label className="form-label">Location / City</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => this.setState({ location: e.target.value })}
              required
            />
          </div>

          {/* Price Per Hour */}
          <div className="mb-3">
            <label className="form-label">Price per Hour (₹)</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => this.setState({ pricePerHour: e.target.value })}
              required
            />
          </div>

          {/* About */}
          <div className="mb-3">
            <label className="form-label">About You</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(e) => this.setState({ about: e.target.value })}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100">
            Register Worker
          </button>
        </form>
      </div>
    );
  }
}

export default WorkerPage;
