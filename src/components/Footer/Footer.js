import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-heading footer-1">
          <br />
          <a href="#">Blog</a>
          <a href="#">Demo</a>
          <a href="#">Customers</a>
          <a href="#">Investors</a>
          <a href="#">Terms of service</a>
        </div>
        <div className="footer-heading footer-2">
          <br />
          <a href="#">contact us</a>
          <a href="#">Jobs</a>
          <a href="#">Support</a>
          <a href="#">Contact</a>
          <a href="#">Sponsorships</a>
        </div>
        <div className="footer-heading footer-3">
          <br />
          <a href="#">social media</a>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">instagram</a>
          <a href="#">Youtube</a>
        </div>
        <div className="footer-email-form">
          <br />
          <h2>Join our newsletter</h2>
          <input
            type="email"
            id="footer-email"
            placeholder="Enter your email address"
          />
          <input type="submit" id="footer-email-btn" value="signUp" />
        </div>
      </div>
    </div>
  );
}
