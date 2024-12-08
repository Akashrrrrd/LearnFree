import React from 'react';
import './ConnectNow.css';

const ConnectNow = () => {
  return (
    <div className="connect-now-wrapper">
      <div className="connect-now-card">
        <div className="connect-now-content">
          <h2>Need Assistance?</h2>
          <p>
            Reach out to our team at <span className="platform-name">VLSIGuru</span>, and we'll guide you through your next steps in the learning journey.
          </p>
        </div>
        <div className="connect-now-action">
          <button className="contact-button">
            Contact us
            <span className="phone-icon"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectNow;