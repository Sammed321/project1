import React, { PureComponent } from "react";

export class Home extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      skill: "",
      location: "",
      minExp: "",
      maxPrice: "",
      results: []
    };
  }

  handleSearch = () => {
    const { skill, location, minExp, maxPrice } = this.state;

    let query = [];

    if (skill) query.push(`skill=${skill}`);
    if (location) query.push(`location=${location}`);
    if (minExp) query.push(`minExp=${minExp}`);
    if (maxPrice) query.push(`maxPrice=${maxPrice}`);

    const finalQuery = query.length ? "?" + query.join("&") : "";

    fetch(`http://localhost:5000/api/workers/search${finalQuery}`)
      .then(res => res.json())
      .then(data => this.setState({ results: data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>

        {/* HERO SECTION */}
        <section className="bg-light py-5">
          <div className="container text-center">
            <h1 className="fw-bold mb-3">Hire Skilled Workers Near You</h1>
            <p className="mb-4">
              Find trusted professionals like electricians, plumbers, tutors,
              mechanics and more in just a few clicks.
            </p>

            {/* SEARCH + FILTERS */}
            <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap">

              <input
                type="text"
                className="form-control w-25"
                placeholder="Skill (Electrician, Plumber...)"
                onChange={(e) => this.setState({ skill: e.target.value })}
              />

              <input
                type="text"
                className="form-control w-25"
                placeholder="Location"
                onChange={(e) => this.setState({ location: e.target.value })}
              />

              <input
                type="number"
                className="form-control"
                style={{ width: "150px" }}
                placeholder="Min Exp"
                onChange={(e) => this.setState({ minExp: e.target.value })}
              />

              <input
                type="number"
                className="form-control"
                style={{ width: "150px" }}
                placeholder="Max Price"
                onChange={(e) => this.setState({ maxPrice: e.target.value })}
              />

              <button className="btn btn-primary" onClick={this.handleSearch}>
                Search
              </button>

            </div>
          </div>
        </section>

        {/* SEARCH RESULTS SECTION */}
        {this.state.results.length > 0 && (
          <section className="container mt-4">
            <h3 className="fw-bold mb-3">Search Results</h3>
            <div className="row">

              {this.state.results.map((worker, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="card shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-title">{worker.fullName}</h5>
                      <p><strong>Skill:</strong> {worker.skill}</p>
                      <p><strong>Experience:</strong> {worker.experience} years</p>
                      <p><strong>Location:</strong> {worker.location}</p>
                      <p><strong>Price:</strong> ₹{worker.pricePerHour}/hr</p>
                      <button className="btn btn-success w-100">Hire Now</button>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </section>
        )}

        {/* CATEGORIES */}
        <section className="container py-5">
          <h2 className="fw-bold text-center mb-4">Browse Categories</h2>

          <div className="row text-center">
            {[
              "Electrician",
              "Plumber",
              "Tutor",
              "House Cleaner",
              "Mechanic",
              "Painter",
              "Carpenter",
              "Appliance Repair"
            ].map((category, index) => (
              <div className="col-6 col-md-3 mb-4" key={index}>
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body d-flex flex-column justify-content-center">
                    <h5 className="card-title">{category}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* POPULAR WORKERS */}
        <section className="bg-light py-5">
          <div className="container">
            <h2 className="fw-bold text-center mb-4">Popular Workers</h2>

            <div className="row">
              {[1, 2, 3].map((worker) => (
                <div className="col-md-4 mb-4" key={worker}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src="https://via.placeholder.com/350x200"
                      className="card-img-top"
                      alt="Worker"
                    />
                    <div className="card-body">
                      <h5 className="card-title">John Doe</h5>
                      <p className="card-text">
                        Professional Electrician with 5+ years of experience.
                      </p>
                      <button className="btn btn-primary w-100">Hire Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* CTA BANNER */}
        <section className="container text-center py-5">
          <h2 className="fw-bold mb-3">Are you a Skilled Worker?</h2>
          <p className="mb-4">
            Join our platform and connect with customers in your area.
          </p>

          <button className="btn btn-success px-4 py-2" onClick={() => {
            window.location.href = "/workerpage";
          }}>
            Register as Worker
          </button>
        </section>

      </div>
    );
  }
}

export default Home;
