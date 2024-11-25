import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [showPayment, setShowPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "Bank",
    upiId: "",
    paypalEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPayment(true);
    toast.success("Registration form submitted! Proceed to payment.");
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    toast.success("Payment successful! Registration completed.");
    console.log("Form Data:", formData);
    console.log("Payment Details:", paymentDetails);
    setShowPayment(false); // Close payment form after successful submission
  };

  return (
    <div className="cp-form-container">
      <form onSubmit={handleSubmit} className="cp-form">
        <h1 className="cp-title">Student Registration</h1>

        {["name", "gender", "email", "dob", "phone", "college"].map((field) => (
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
          Proceed to Payment
        </button>
      </form>

      {showPayment && (
        <div className="cp-payment-overlay">
          <form onSubmit={handlePaymentSubmit} className="cp-payment-form">
            <span
              className="cp-close-btn"
              onClick={() => setShowPayment(false)}
            >
              ×
            </span>
            <h2 className="cp-payment-title">Payment Details</h2>

            <div className="cp-form-group">
              <label className="cp-label" htmlFor="paymentMethod">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={paymentDetails.paymentMethod}
                onChange={handlePaymentChange}
                className="cp-input"
                required
              >
                <option value="Bank">Bank Payment</option>
                <option value="GPay">GPay</option>
                <option value="PhonePe">PhonePe</option>
                <option value="PayPal">PayPal</option>
                <option value="Paytm">Paytm</option>
                <option value="Mobile Banking">Mobile Banking</option>
              </select>
            </div>

            {paymentDetails.paymentMethod === "Bank" && (
              <>
                <div className="cp-form-group">
                  <label className="cp-label" htmlFor="cardNumber">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handlePaymentChange}
                    className="cp-input"
                    pattern="\d{16}"
                    maxLength="16"
                    required
                  />
                </div>

                <div className="cp-form-group">
                  <label className="cp-label" htmlFor="expiryDate">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={paymentDetails.expiryDate}
                    onChange={handlePaymentChange}
                    className="cp-input"
                    pattern="\d{2}/\d{2}"
                    required
                  />
                </div>

                <div className="cp-form-group">
                  <label className="cp-label" htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handlePaymentChange}
                    className="cp-input"
                    pattern="\d{3}"
                    maxLength="3"
                    required
                  />
                </div>
              </>
            )}

            {["GPay", "PhonePe", "Paytm", "PayPal"].includes(
              paymentDetails.paymentMethod
            ) && (
              <>
                <div className="cp-form-group">
                  <label className="cp-label" htmlFor="upiId">
                    UPI ID (for GPay, PhonePe, Paytm)
                  </label>
                  <input
                    type="text"
                    id="upiId"
                    name="upiId"
                    value={paymentDetails.upiId}
                    onChange={handlePaymentChange}
                    className="cp-input"
                    required
                  />
                </div>
              </>
            )}

            <button type="submit" className="cp-submit-button">
              Submit Payment
            </button>
          </form>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CoursePage;
