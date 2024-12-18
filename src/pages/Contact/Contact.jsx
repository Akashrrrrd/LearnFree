import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
  };

  return (
    <div className="con-page">
      <div className="con-header">
        <h1>Contact VLSIGuru</h1>
        <p>Got questions about our VLSI courses? We're here to help!</p>
      </div>

      <div className="con-container">
        <div className="con-details">
          <h2>Contact Information</h2>
          <div className="con-contact-info">
            <p>
              <Mail className="con-icon" />
              <span>support@vlsiguru.com</span>
            </p>
            <p>
              <Phone className="con-icon" />
              <span>09618222144</span>
            </p>
            <p>
              <MapPin className="con-icon" />
              <span>
                2nd Floor Jai Plaza Symphony, Sector 6, HSR Layout, Bengaluru,
                Karnataka 560102
              </span>
            </p>
          </div>

          <form className="con-form" onSubmit={handleSubmit}>
            <h3>Send us a Message</h3>
            <div className="con-form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="con-form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="con-form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="con-submit-btn">
              {/* <Send className="con-btn-icon" /> */}
              Send Message
            </button>
          </form>
        </div>

        <div className="con-map">
          <h2>Our Location</h2>
          <div className="con-map-container">
            <iframe
              title="VLSIGuru Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.3847291738225!2d77.63066707983718!3d12.915715554892165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15373a45e889%3A0x8d45f790099cd6f5!2sVLSI%20FIRST-%20VLSI%20Training%20Institute%20In%20Bangalore!5e1!3m2!1sen!2sin!4v1734523804700!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
