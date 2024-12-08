// Home.js

import React from "react";
import "./Home.css";
import Courses from "../Courses/Courses";
import { Link } from "react-router-dom";

const IconPlaceholder = ({ children }) => (
  <div className="icon-placeholder">{children}</div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    {icon}
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <div className="hero-content">
          <h1 className="animate-fade-in-down">
            Master VLSI Design with Affordable Learning
          </h1>
          <p className="animate-fade-in-up">
            Explore a wide range of VLSI-focused courses crafted to empower
            engineers and enthusiasts. Join us to enhance your skills in
            cutting-edge semiconductor technologies.
          </p>
          <Link to="/courses">
            <a href="/courses" className="cta-button">
              Browse Courses
              <span className="arrow-icon">→</span>
            </a>
          </Link>
        </div>
      </header>

      <section className="features">
        <h2>Why Choose VLSIGuru?</h2>
        <div className="feature-grid">
          <FeatureCard
            icon={<IconPlaceholder>🔧</IconPlaceholder>}
            title="VLSI-Specific Courses"
            description="Dive deep into topics like RTL Design, CMOS, and ASIC implementation."
          />
          <FeatureCard
            icon={<IconPlaceholder>🔒</IconPlaceholder>}
            title="Blockchain Credentials"
            description="Secure your achievements with blockchain-backed certifications."
          />
          <FeatureCard
            icon={<IconPlaceholder>💻</IconPlaceholder>}
            title="Engineer-Friendly Interface"
            description="Experience a UI tailored for smooth and efficient learning."
          />
          <FeatureCard
            icon={<IconPlaceholder>🎥</IconPlaceholder>}
            title="Industry-Grade Content"
            description="Learn from video courses curated by industry-leading VLSI professionals."
          />
          <FeatureCard
            icon={<IconPlaceholder>📊</IconPlaceholder>}
            title="Real-World Projects"
            description="Gain hands-on experience with practical VLSI design projects."
          />
          <FeatureCard
            icon={<IconPlaceholder>📝</IconPlaceholder>}
            title="Skill Assessments"
            description="Test your knowledge with assessments after each module."
          />
          <FeatureCard
            icon={<IconPlaceholder>❓</IconPlaceholder>}
            title="Comprehensive FAQs"
            description="Find quick answers to your questions about VLSI and the platform."
          />
          <FeatureCard
            icon={<IconPlaceholder>🏅</IconPlaceholder>}
            title="Certification Badges"
            description="Showcase your expertise with badges earned for course completion."
          />
        </div>
      </section>
      <Courses />
    </div>
  );
};

export default Home;
