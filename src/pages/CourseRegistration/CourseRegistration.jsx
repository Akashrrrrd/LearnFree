import React, { useState } from "react";
import "./CourseRegistration.css";
import { FaCheckCircle, FaPlayCircle } from "react-icons/fa";

const CourseRegistration = () => {
  const defaultCourse = {
    title: "Introduction to VLSI Design",
    chapters: [
      {
        title: "Getting Started with VLSI",
        videos: [
          {
            title: "What is VLSI?",
            duration: "6min",
            completed: true,
          },
          {
            title: "VLSI Applications",
            duration: "8min",
            completed: false,
          },
          {
            title: "Setting Up Your Environment",
            duration: "10min",
            completed: false,
          },
        ],
      },
      {
        title: "Digital Design Basics",
        videos: [
          {
            title: "Understanding Logic Gates",
            duration: "9min",
            completed: false,
          },
          {
            title: "Combinational Circuits",
            duration: "12min",
            completed: false,
          },
          { title: "Sequential Circuits", duration: "15min", completed: false },
        ],
      },
      {
        title: "Introduction to Verilog",
        videos: [
          { title: "What is Verilog?", duration: "8min", completed: false },
          {
            title: "Writing Your First Module",
            duration: "10min",
            completed: false,
          },
          {
            title: "Simulating Circuits with Verilog",
            duration: "12min",
            completed: false,
          },
        ],
      },
      {
        title: "Physical Design Fundamentals",
        videos: [
          {
            title: "Understanding the Physical Design Flow",
            duration: "10min",
            completed: false,
          },
          {
            title: "Placement and Routing Basics",
            duration: "14min",
            completed: false,
          },
          {
            title: "Clock Tree Synthesis",
            duration: "13min",
            completed: false,
          },
        ],
      },
      {
        title: "Design Verification",
        videos: [
          {
            title: "What is Design Verification?",
            duration: "8min",
            completed: false,
          },
          {
            title: "Introduction to SystemVerilog",
            duration: "12min",
            completed: false,
          },
          {
            title: "Simulation vs. Emulation",
            duration: "9min",
            completed: false,
          },
        ],
      },
      {
        title: "DFT (Design for Test)",
        videos: [
          { title: "Overview of DFT", duration: "7min", completed: false },
          {
            title: "Boundary Scan and JTAG",
            duration: "9min",
            completed: false,
          },
          {
            title: "Built-In Self-Test (BIST)",
            duration: "10min",
            completed: false,
          },
        ],
      },
    ],
  };

  const [expandedChapters, setExpandedChapters] = useState({});

  const toggleChapter = (index) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="course-container">
      {/* Video Player Section */}
      <div className="video-player">
        <h2 className="course-title">{defaultCourse.title}</h2>
        <div className="video-player-container">
          <div className="video-overlay">
            <FaPlayCircle className="play-icon" />
          </div>
        </div>
      </div>

      {/* Course Content Sidebar */}
      <div className="course-sidebar">
        <h3>Course Content</h3>
        {defaultCourse.chapters.map((chapter, index) => (
          <div key={index} className="chapter">
            <button
              className="chapter-title"
              onClick={() => toggleChapter(index)}
            >
              {chapter.title}
              <span className="progress-bar">
                <span
                  className="progress-fill"
                  style={{
                    width: `${
                      (chapter.videos.filter((v) => v.completed).length /
                        chapter.videos.length) *
                      100
                    }%`,
                  }}
                ></span>
              </span>
            </button>
            {expandedChapters[index] && (
              <ul className="video-list">
                {chapter.videos.map((video, vIndex) => (
                  <li key={vIndex} className="video-item">
                    {video.completed ? (
                      <FaCheckCircle className="video-status complete" />
                    ) : (
                      <FaPlayCircle className="video-status pending" />
                    )}
                    <span className="video-title">{video.title}</span>
                    <span className="video-duration">{video.duration}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseRegistration;
