import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser"; // Import EmailJS
import "./CoursePage.css";

const CoursePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    dob: "",
    phone: "",
    college: "",
    degree: "",
    department: "",
    graduationYear: "",
    domain: "",
    referralSource: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send form data using EmailJS
    emailjs
      .send(
        "your_service_id", // Replace with your EmailJS service ID
        "your_template_id", // Replace with your EmailJS template ID
        formData,
        "your_public_key" // Replace with your EmailJS public key
      )
      .then(
        (result) => {
          toast.success(
            "Registration successful! Form details sent to the admin."
          );
        },
        (error) => {
          toast.error("Failed to send the form. Please try again later.");
        }
      );
  };

  return (
    <div className="cp-form-container">
      <form onSubmit={handleSubmit} className="cp-form">
        <h1 className="cp-title">Student Registration</h1>
        {["name", "email", "dob", "phone", "college"].map((field) => (
          <div key={field} className="cp-form-group">
            <label className="cp-label" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "dob" ? "date" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="cp-input"
              required
            />
          </div>
        ))}

        <div className="cp-form-group">
          <label className="cp-label" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="cp-input"
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="cp-form-group">
          <label className="cp-label" htmlFor="degree">
            Degree
          </label>
          <select
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className="cp-input"
            required
          >
            <option value="" disabled>
              Select a degree
            </option>
            <option value="B.Tech">B.Tech</option>
            <option value="B.E">B.E</option>
            <option value="M.Tech">M.Tech</option>
            <option value="M.E">M.E</option>
            <option value="PhD">PhD</option>
            <option value="MBA">MBA</option>
            <option value="MCA">MCA</option>
          </select>
        </div>

        <div className="cp-form-group">
          <label className="cp-label" htmlFor="department">
            Department
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="cp-input"
            required
          >
            <option value="" disabled>
              Select a department
            </option>
            <option value="Computer Science">Computer Science</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="Electrical">Electrical</option>
            <option value="Biotechnology">Biotechnology</option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Information Technology">
              Information Technology
            </option>
          </select>
        </div>

        <div className="cp-form-group">
          <label className="cp-label" htmlFor="graduationYear">
            Graduation Year
          </label>
          <select
            id="graduationYear"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            className="cp-input"
            required
          >
            <option value="" disabled>
              Select graduation year
            </option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={2024 + i} value={2024 + i}>
                {2024 + i}
              </option>
            ))}
          </select>
        </div>

        <div className="cp-form-group">
          <label className="cp-label" htmlFor="domain">
            Interested Domain
          </label>
          <select
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            className="cp-input"
            required
          >
            <option value="" disabled>
              Select a domain
            </option>
            <option value="Digital Design">Digital Design</option>
            <option value="Analog Design">Analog Design</option>
            <option value="Physical Design">Physical Design</option>
            <option value="Verification">Verification</option>
            <option value="DFT (Design for Test)">DFT (Design for Test)</option>
            <option value="VLSI CAD">VLSI CAD</option>
          </select>
        </div>

        <div className="cp-form-group">
          <label className="cp-label" htmlFor="referralSource">
            Who referred you to VLSI Guru?
          </label>
          <select
            id="referralSource"
            name="referralSource"
            value={formData.referralSource}
            onChange={handleChange}
            className="cp-input"
            required
          >
            <option value="" disabled>
              Select a source
            </option>
            <option value="Social Media">Social Media</option>
            <option value="Friend or Colleague">Friend or Colleague</option>
            <option value="College or Professor">College or Professor</option>
            <option value="Online Search">Online Search</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" className="cp-submit-button">
          Enroll Now
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CoursePage;
