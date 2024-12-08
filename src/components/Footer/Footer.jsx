import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h2 className="footer-logo">VLSIGuru</h2>
          <p className="footer-description">
            Your go-to platform for mastering VLSI design and semiconductor
            technology.
          </p>
          <div className="social-links">
            <a
              href="https://facebook.com/vlsiguru"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com/vlsiguru"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://linkedin.com/company/vlsiguru"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://instagram.com/vlsiguru"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Courses</h3>
          <ul className="footer-links">
            <li>
              <a href="/courses/digital-design">Digital Design</a>
            </li>
            <li>
              <a href="/courses/verilog">Verilog HDL</a>
            </li>
            <li>
              <a href="/courses/systemverilog">SystemVerilog</a>
            </li>
            <li>
              <a href="/courses/asic-design">ASIC Design Flow</a>
            </li>
            <li>
              <a href="/courses/fpga-design">FPGA Design</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <ul className="footer-links">
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/partnerships">Partnerships</a>
            </li>
            <li>
              <a href="/press">Press</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <ul className="footer-links">
            <li>
              <a href="/help">Help Center</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
            <li>
              <a href="/accessibility">Accessibility</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <p>
            <i className="fas fa-envelope"></i> support@vlsiguru.com
          </p>
          <p>
            <i className="fas fa-phone"></i> +1 (800) 987-6543
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i> 456 Semiconductor Ave,
            Silicon Valley, 67890
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} VLSIGuru. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
