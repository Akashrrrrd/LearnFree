import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Enroll.css";
import sample_img from "../../assets/sample_img.png";
import Courses from "../../components/Courses/Courses";

const Enroll = () => {
  const location = useLocation();

  // Default course data
  const defaultCourse = {
    id: 1,
    title: "Full Stack Web Development",
    description:
      "Learn to build full-stack applications with React, Node.js, and MongoDB.",
    category: "Web Development",
    rating: 4.7,
    trainer: "John Doe",
    image: "course-image.jpg",
    price: "$499",
    duration: "12 weeks",
    tools: "VSCode, Git, MongoDB Atlas, Heroku",
    modeOfTraining: "Online + 1 to 1 mentor",
    schedule: "Every Monday and Wednesday, 6 PM to 8 PM",
  };

  const { course } = location.state || { course: defaultCourse };
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSyllabusItem, setExpandedSyllabusItem] = useState(null);
  const [expandedFaqItem, setExpandedFaqItem] = useState(null);

  // FAQ data
  const faqs = [
    {
      question: "What will I learn in this course?",
      answer:
        "You will learn full-stack web development including React, Node.js, Express, MongoDB, and more. By the end of the course, you'll be able to build and deploy full-stack applications.",
    },
    {
      question: "Is this course suitable for beginners?",
      answer:
        "Yes, this course is designed for both beginners and intermediate learners. We'll start with the basics and gradually cover more advanced topics.",
    },
    {
      question: "What tools do I need for this course?",
      answer:
        "You will need a computer with internet access, VSCode (or any code editor), Git, and MongoDB Atlas. The tools are explained in detail during the course.",
    },
    {
      question:
        "Can I take this course if I already have some programming knowledge?",
      answer:
        "Absolutely! This course is ideal for those who have some experience in programming and want to advance to full-stack development.",
    },
    {
      question: "How can I get support during the course?",
      answer:
        "You can get support through our online forum, direct mentoring sessions, and Q&A during the live sessions. Our team is available to assist you throughout the course.",
    },
  ];

  const handleEnrollmentSubmit = () => {
    const enrolledCourses = JSON.parse(
      localStorage.getItem("enrolledCourses") || "[]"
    );
    if (!enrolledCourses.some((c) => c.id === course.id)) {
      enrolledCourses.push(course);
      localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
      toast.success("Enrollment submitted successfully!");
    } else {
      toast.info("You're already enrolled in this course!");
    }
  };

  const handleWatchVideo = () => {
    toast.info("Feature not implemented yet.");
  };

  const syllabusItems = [
    {
      title: "Version Control Training",
      content: [
        "Introduction to Git and GitHub",
        "Branching strategies and pull requests",
        "Resolving merge conflicts",
      ],
    },
    {
      title: "RTL Integration",
      content: [
        "RTL integration overview and setup",
        "Module interconnections and hierarchy setup",
      ],
    },
    {
      title: "Linting",
      content: [
        "Setting up linters for code quality",
        "Best practices in code styling",
      ],
    },
    {
      title: "Clock Domain Crossing",
      content: [
        "Understanding clock domain crossing",
        "Implementing synchronizers",
      ],
    },
    {
      title: "Power Aware Design Techniques – VCLP",
      content: ["Introduction to VCLP", "Power optimization techniques"],
    },
    {
      title: "SDC – Synopsys Design Constraints",
      content: [
        "Creating SDC files for synthesis",
        "Timing constraints in the design flow",
      ],
    },
    {
      title: "RTL Synthesis using Design Compiler",
      content: [
        "Setting up the Design Compiler environment",
        "Generating synthesized netlists",
      ],
    },
    {
      title: "Logic Equivalence Checks (LEC)",
      content: [
        "Using tools for logic equivalence checking",
        "Interpreting LEC results",
      ],
    },
    {
      title: "Static Timing Analysis",
      content: [
        "Basics of static timing analysis",
        "Identifying and resolving timing violations",
      ],
    },
  ];

  const toggleSyllabusItem = (index) => {
    setExpandedSyllabusItem(expandedSyllabusItem === index ? null : index);
  };

  const toggleFaqItem = (index) => {
    setExpandedFaqItem(expandedFaqItem === index ? null : index);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="en-tab-content">
            <p>
              <strong>Welcome to the Full Stack Web Development Course!</strong>
              This comprehensive course is designed to teach you how to build
              modern, full-stack web applications using a range of technologies.
              You’ll learn the ins and outs of both front-end and back-end
              development, with an emphasis on React.js for the front end,
              Node.js for the server-side, and MongoDB for the database. Over
              the course of 12 weeks, you'll build real-world applications and
              gain the skills you need to launch your career in web development.
            </p>
            <p>
              The course starts with the basics of HTML, CSS, and JavaScript,
              before progressing into more advanced topics such as React.js,
              Redux, Express, Node.js, and MongoDB. You'll also learn best
              practices in version control using Git and GitHub, and get
              hands-on experience with deploying your applications to platforms
              like Heroku and MongoDB Atlas. Whether you're a beginner or have
              some experience in web development, this course is structured to
              help you level up your skills.
            </p>
            <p>
              In addition to technical skills, the course covers essential
              topics such as debugging, testing, responsive web design, and API
              development. You'll also explore tools like Postman for API
              testing, as well as MongoDB for handling databases, giving you a
              solid foundation for creating scalable and performant
              applications.
            </p>
            <p>
              By the end of the course, you'll be equipped with the skills and
              portfolio to apply for full-stack developer positions. You will
              have built several projects from scratch, including a real-time
              web application, an e-commerce platform, and a personal blog, all
              while receiving personalized support from expert instructors and
              mentors.
            </p>
          </div>
        );
      case "syllabus":
        return (
          <div className="en-tab-content">
            {syllabusItems.map((item, index) => (
              <div key={index} className="syllabus-item">
                <div
                  className="syllabus-header"
                  onClick={() => toggleSyllabusItem(index)}
                >
                  <span>
                    {expandedSyllabusItem === index ? "- " : "+ "}
                    {item.title}
                  </span>
                </div>
                {expandedSyllabusItem === index && (
                  <div className="syllabus-content">
                    <ul>
                      {item.content.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case "schedule":
        return (
          <div className="en-tab-content">
            <h3>Course Schedule</h3>
            <p>
              <strong>Course:</strong> {course.title}
            </p>
            <p>
              <strong>Duration:</strong> {course.duration} (12 weeks, with 2
              sessions per week)
            </p>
            <p>
              <strong>Tools Access:</strong> {course.tools}
            </p>
            <p>
              <strong>Fee:</strong> {course.price}
            </p>
            <p>
              <strong>Mode of Training:</strong> {course.modeOfTraining}{" "}
              (Includes live sessions, self-paced assignments, and 1-on-1 mentor
              support)
            </p>
            <p>
              <strong>Schedule:</strong> {course.schedule}
            </p>
            <h4>Weekly Breakdown:</h4>
            <p>
              Each week, we cover essential topics, complete with hands-on
              coding exercises, project-based assignments, and assessments:
            </p>
            <ul>
              <li>
                <strong>Week 1-2:</strong> HTML, CSS, and JavaScript Basics -
                Building a strong foundation in front-end technologies.
              </li>
              <li>
                <strong>Week 3-5:</strong> React.js and Redux - Developing
                single-page applications and state management.
              </li>
              <li>
                <strong>Week 6-8:</strong> Node.js and Express - Creating
                server-side applications and RESTful APIs.
              </li>
              <li>
                <strong>Week 9-10:</strong> MongoDB - Database integration and
                CRUD operations.
              </li>
              <li>
                <strong>Week 11:</strong> Full-stack Project - Building and
                deploying a complete application.
              </li>
              <li>
                <strong>Week 12:</strong> Final Assessment and Capstone Project
                - Presenting and reviewing project submissions.
              </li>
            </ul>
            <h4>Additional Support:</h4>
            <p>We also offer additional resources to support your learning:</p>
            <ul>
              <li>
                <strong>Office Hours:</strong> Weekly Q&A sessions with
                instructors to clarify concepts and assist with assignments.
              </li>
              <li>
                <strong>Online Forum:</strong> Access to a dedicated online
                forum for peer-to-peer interaction and community support.
              </li>
              <li>
                <strong>Recorded Sessions:</strong> All live sessions are
                recorded and accessible anytime to help you review content.
              </li>
            </ul>
            <p>
              This schedule is designed to balance theoretical learning and
              practical application, ensuring you have ample time for exercises,
              projects, and interaction with mentors and peers.
            </p>
          </div>
        );

      case "faqs":
        return (
          <div className="en-tab-content">
            <h3>Frequently Asked Questions</h3>
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div
                  className="faq-header"
                  onClick={() => toggleFaqItem(index)}
                >
                  <span>
                    {expandedFaqItem === index ? "- " : "+ "}
                    {faq.question}
                  </span>
                </div>
                {expandedFaqItem === index && (
                  <div className="faq-content">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case "material":
        return <div className="en-tab-content">Course material goes here.</div>;
      case "certificate":
        return (
          <div className="en-tab-content">
            <h3>Certificate</h3>
            <p>
              Upon successful completion of the course, students will receive a
              certificate of completion. Below is a sample certificate:
            </p>
            <img
              src={sample_img}
              alt="Sample Certificate"
              className="en-sample-certificate"
            />
          </div>
        );
      case "trainer":
        return (
          <div className="en-tab-content">
            <h3>Trainer Information</h3>
            <p>
              <strong>Name:</strong> {course.trainer}
            </p>
            <p>
              <strong>Qualifications:</strong> {course.level}
            </p>
            <p>
              <strong>Experience:</strong> {course.trainer.experience} years in
              the field of {course.trainer.field}
            </p>
            <p>
              <strong>Specialization:</strong> {course.trainer.specialization}
            </p>
            <p>
              <strong>Teaching Approach:</strong>{" "}
              {course.trainer.teachingApproach}
            </p>
            <p>
              <strong>Contact:</strong> {course.trainer.email}
            </p>
            <h4>About the Trainer:</h4>
            <p>{course.trainer.bio}</p>
            <h4>Achievements:</h4>
            <ul>
              <li>
                Authored multiple research papers in{" "}
                {course.trainer.researchFields}.
              </li>
              <li>
                Speaker at renowned conferences like{" "}
                {course.trainer.conferences}.
              </li>
              <li>
                Mentored over {course.trainer.menteesCount} students to success
                in {course.trainer.industry}.
              </li>
            </ul>
            <p>
              <strong>Message from the Trainer:</strong> "
              {course.trainer.message}"
            </p>
          </div>
        );

      default:
        return <div className="en-tab-content">{course.description}</div>;
    }
  };

  return (
    <div className="en-enroll">
      <ToastContainer />
      <div className="en-enroll-container">
        <div className="en-enroll-content">
          <div className="en-enroll-left">
            <h1 className="en-enroll-title">{course.title}</h1>
            <p className="en-enroll-description">{course.description}</p>
            <p className="en-course-rating">Category: {course.category}</p>
            <div className="en-course-rating">
              Rating: <span>{course.rating}</span>
            </div>
            <p className="en-course-rating">Trainer: {course.trainer}</p>
          </div>
          <div className="en-enroll-right">
            <img
              src={course.image}
              alt={course.title}
              className="en-enroll-image"
            />
            <p className="en-course-price">
              Course Price: {course.price} +{" "}
              <span className="en-discount">10% Off</span>
            </p>
            <Link to="/course-registration">
              <button
                className="en-enroll-button"
                onClick={handleEnrollmentSubmit}
              >
                Watch Video
              </button>
            </Link>
            <Link to="/course-page">
              <button
                className="en-watch-video-button"
                onClick={handleWatchVideo}
              >
                Enroll Now
              </button>
            </Link>
          </div>
        </div>

        {/* Navbar section below course details */}
        <div className="en-navbar">
          <ul className="en-navbar-list">
            <li
              className={activeTab === "overview" ? "en-active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              Course Overview
            </li>
            <li
              className={activeTab === "syllabus" ? "en-active" : ""}
              onClick={() => setActiveTab("syllabus")}
            >
              Syllabus
            </li>
            <li
              className={activeTab === "schedule" ? "en-active" : ""}
              onClick={() => setActiveTab("schedule")}
            >
              Schedule
            </li>
            <li
              className={activeTab === "faqs" ? "en-active" : ""}
              onClick={() => setActiveTab("faqs")}
            >
              FAQs
            </li>
            <li
              className={activeTab === "material" ? "en-active" : ""}
              onClick={() => setActiveTab("material")}
            >
              Course Material
            </li>
            <li
              className={activeTab === "certificate" ? "en-active" : ""}
              onClick={() => setActiveTab("certificate")}
            >
              Certificate
            </li>
            <li
              className={activeTab === "trainer" ? "en-active" : ""}
              onClick={() => setActiveTab("trainer")}
            >
              Trainer Information
            </li>
          </ul>
        </div>

        {/* Tab content section */}
        <div className="en-tab-content-container">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Enroll;
