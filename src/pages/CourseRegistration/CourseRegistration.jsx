import React, { useState } from "react";
import "./CourseRegistration.css";
import { FaCheckCircle, FaPlayCircle } from "react-icons/fa";

const CourseRegistration = () => {
  const defaultCourse = {
    title: "Full-Stack Web Development For Beginners",
    chapters: [
      {
        title: "Introduction",
        videos: [
          {
            title: "Installing Text Editors",
            duration: "7min",
            completed: true,
          },
          {
            title: "Installing SublimeText",
            duration: "4min",
            completed: false,
          },
          {
            title: "Installing Visual Studio Code",
            duration: "5min",
            completed: false,
          },
        ],
      },
      {
        title: "Learning HTML",
        videos: [
          { title: "What is HTML?", duration: "6min", completed: false },
          {
            title: "Basic HTML Structure",
            duration: "10min",
            completed: false,
          },
          { title: "Creating Forms", duration: "12min", completed: false },
        ],
      },
      {
        title: "Learning CSS",
        videos: [
          { title: "Introduction to CSS", duration: "8min", completed: false },
          {
            title: "CSS Selectors and Properties",
            duration: "15min",
            completed: false,
          },
          {
            title: "Styling Text and Colors",
            duration: "9min",
            completed: false,
          },
        ],
      },
      {
        title: "JavaScript Basics",
        videos: [
          { title: "What is JavaScript?", duration: "5min", completed: false },
          {
            title: "Variables and Data Types",
            duration: "12min",
            completed: false,
          },
          { title: "Basic Operators", duration: "10min", completed: false },
        ],
      },
      {
        title: "DOM Manipulation",
        videos: [
          {
            title: "Understanding the DOM",
            duration: "6min",
            completed: false,
          },
          { title: "Selecting Elements", duration: "7min", completed: false },
          {
            title: "Modifying HTML and CSS with JavaScript",
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
