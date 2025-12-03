import React, { PureComponent } from "react";

export class Footer extends PureComponent {
  render() {
    return (
      <footer className="bg-dark text-light py-4 mt-5">
        <div className="container">
          <div className="row">

            {/* Logo */}
            <div className="col-md-4 mb-3">
              <h4 className="fw-bold">WorkHire</h4>
              <p>
                A platform to hire trusted and skilled workers for any home
                or professional services.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-md-4 mb-3">
              <h5 className="fw-bold">Quick Links</h5>
              <ul className="list-unstyled">
                <li>Home</li>
                <li>Categories</li>
                <li>Top Workers</li>
                <li>Register as Worker</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-md-4 mb-3">
              <h5 className="fw-bold">Contact Us</h5>
              <p className="mb-1">📍 Belagavi, Karnataka</p>
              <p className="mb-1">📞 +91 98765 43210</p>
              <p>📧 support@workhire.com</p>

              {/* Social Icons */}
              <div className="d-flex gap-3 fs-4">
                <i className="bi bi-facebook"></i>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-twitter"></i>
                <i className="bi bi-linkedin"></i>
              </div>
            </div>
          </div>

          <hr className="border-secondary" />
          <p className="text-center mb-0">
            © {new Date().getFullYear()} WorkHire. All Rights Reserved.
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
