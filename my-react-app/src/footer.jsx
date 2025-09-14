// src/Footer.jsx
import React from "react";
import "./css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Info */}
        <div className="footer-section">
          <h2>Smart Education</h2>
          <p>
            Your trusted platform to explore career opportunities, learn skills,
            and shape your future. We connect education with innovation and
            guide you to the right career path.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQs</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li><a href="/blogs">Career Blogs</a></li>
            <li><a href="/guides">Study Guides</a></li>
            <li><a href="/exams">Govt. Exam Prep</a></li>
            <li><a href="/jobs">Private Jobs</a></li>
            <li><a href="/entrepreneurship">Entrepreneurship</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@smartedu.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Hyderabad, India</p>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Smart Education | All Rights Reserved</p>
        <p>Made with ❤️ for Students & Learners</p>
      </div>
    </footer>
  );
};

export default Footer;
