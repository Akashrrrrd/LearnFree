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
            Unlock Your Potential with Free Learning
          </h1>
          <p className="animate-fade-in-up">
            Explore a wide range of courses designed to empower learners of all
            backgrounds. Join us and enhance your skills with blockchain-secured
            credentials.
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
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <FeatureCard
            icon={<IconPlaceholder>📚</IconPlaceholder>}
            title="Free Learning Platform"
            description="Access high-quality educational content without any cost."
          />
          <FeatureCard
            icon={<IconPlaceholder>🔒</IconPlaceholder>}
            title="Blockchain Implementation"
            description="Keep your data safe and secure with blockchain technology."
          />
          <FeatureCard
            icon={<IconPlaceholder>💻</IconPlaceholder>}
            title="User-Friendly Interface"
            description="Enjoy a compact UI experience designed for seamless learning."
          />
          <FeatureCard
            icon={<IconPlaceholder>🎥</IconPlaceholder>}
            title="Top YouTube Courses"
            description="Learn from the best with video courses sourced from top YouTube channels."
          />
          <FeatureCard
            icon={<IconPlaceholder>🤖</IconPlaceholder>}
            title="AI Assistance"
            description="Utilize AI to get instant answers to your questions."
          />
          <FeatureCard
            icon={<IconPlaceholder>📝</IconPlaceholder>}
            title="Interactive Quizzes"
            description="Refresh your knowledge with quizzes after each course."
          />
          <FeatureCard
            icon={<IconPlaceholder>❓</IconPlaceholder>}
            title="FAQ Section"
            description="Get to know our platform better with frequently asked questions."
          />
          <FeatureCard
            icon={<IconPlaceholder>🏅</IconPlaceholder>}
            title="Achievement Badges"
            description="Earn badges for completing courses to boost your motivation."
          />
        </div>
      </section>
      <Courses />
    </div>
  );
};

export default Home;
