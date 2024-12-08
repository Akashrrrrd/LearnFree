import React, { useState, useEffect } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    verification: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${latitude},${longitude}`;
          setMapUrl(googleMapsEmbedUrl);
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          // Default map location if user denies location permission or error occurs
          setMapUrl(
            "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=New+York"
          );
        },
        { enableHighAccuracy: true }
      );
    };
    getLocation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitStatus("success");
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact VLSIGuru</h1>
        <p>
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
      </div>

      <div className="contact-container">
        {/* Contact Information Section */}
        <div className="contact-info">
          <div className="info-item">
            <div className="icon location-icon"></div>
            <div className="info-content">
              <h3>Visit Us</h3>
              <p>
                1234 Company St,
                <br />
                City, State, ZIP Code
              </p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon email-icon"></div>
            <div className="info-content">
              <h3>Email Us</h3>
              <p>contact@vlsiguru.com</p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon phone-icon"></div>
            <div className="info-content">
              <h3>Call Us</h3>
              <p>+1 (123) 456-7890</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (123) 456-7890"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows="4"
                required
              ></textarea>
            </div>

            {submitStatus === "success" && (
              <div className="success-message">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <button
              type="submit"
              className={`submit-button ${isSubmitting ? "submitting" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-container">
        {mapUrl ? (
          <iframe
            src={mapUrl}
            title="Current Location of VLSIGuru"
            className="map-frame"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="loading">Loading map...</p>
        )}
      </div>
    </div>
  );
};

export default Contact;
