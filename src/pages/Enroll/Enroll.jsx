import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Enroll.css";
import sample_img from "../../assets/sample_img.png";
import Courses from "../../components/Courses/Courses";

const Enroll = () => {
  const location = useLocation();
  const { course } = location.state || { course: defaultCourse };
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSyllabusItem, setExpandedSyllabusItem] = useState(null);
  const [expandedFaqItem, setExpandedFaqItem] = useState(null);

  const faqs = [
    {
      question: "What will I learn in this course?",
      answer:
        "You will learn VLSI design concepts including CMOS fundamentals, HDL coding, ASIC/FPGA design, synthesis, timing analysis, and layout design. By the end of the course, you'll have hands-on experience with industry-standard tools.",
    },
    {
      question: "Is this course suitable for beginners?",
      answer:
        "Yes, this course is designed for both beginners and those with some background in electronics. We start with the basics and progressively cover advanced VLSI topics.",
    },
    {
      question: "What tools do I need for this course?",
      answer:
        "You will need a computer with internet access, software like Cadence, Synopsys, or Mentor Graphics (licenses provided during the course), and a basic understanding of digital electronics. All tools are covered in detail during the sessions.",
    },
    {
      question:
        "Can I take this course if I already have some electronics knowledge?",
      answer:
        "Absolutely! This course is ideal for those with a basic understanding of electronics or programming who want to delve into VLSI design and development.",
    },
    {
      question: "How can I get support during the course?",
      answer:
        "You can get support through weekly mentoring sessions, access to an online forum, tool-specific guidance, and Q&A during the live classes. Our instructors are here to help you succeed.",
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
              <strong>Welcome to the VLSI Design Course!</strong>
              This comprehensive course is designed to teach you how to design
              and analyze cutting-edge semiconductor devices and integrated
              circuits. You’ll dive deep into the principles of Very Large Scale
              Integration (VLSI), covering the entire design flow from front-end
              design to back-end implementation. Over the course of 12 weeks,
              you’ll gain hands-on experience with industry-standard tools and
              techniques, preparing you for a career in the semiconductor
              industry.
            </p>
            <p>
              The course begins with the basics of digital electronics and CMOS
              technology, before progressing to advanced topics such as HDL
              (Hardware Description Language) coding, RTL design, synthesis,
              floorplanning, and timing analysis. You’ll learn to work with
              tools like Cadence, Synopsys, and Mentor Graphics, as well as gain
              practical knowledge in low-power design, high-speed circuit
              design, and ASIC/FPGA development. Whether you're a beginner or
              have some experience in electronics, this course is structured to
              help you excel in VLSI design.
            </p>
            <p>
              Beyond technical design, the course also covers crucial topics
              such as DFT (Design for Testability), clock tree synthesis,
              parasitic extraction, and signal integrity analysis. You’ll
              explore advanced methodologies for designing robust and efficient
              circuits, while understanding fabrication processes and packaging
              techniques for chips. The course includes hands-on labs and
              projects to bridge theory with practical skills.
            </p>
            <p>
              By the end of the course, you’ll have the expertise and portfolio
              to apply for roles such as VLSI Design Engineer, ASIC/FPGA
              Engineer, or Verification Engineer. You will have completed
              several projects, including the design of a processor core, a
              memory subsystem, and a high-speed communication interface. With
              personalized mentorship and guidance from industry experts, this
              course is your gateway to excelling in VLSI design and innovation.
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
                <strong>Week 1-2:</strong> Introduction to Digital Electronics
                and CMOS Basics - Understanding the fundamentals of VLSI and
                transistor-level design.
              </li>
              <li>
                <strong>Week 3-4:</strong> HDL Coding and RTL Design - Learning
                Verilog or VHDL for hardware description and creating Register
                Transfer Level (RTL) designs.
              </li>
              <li>
                <strong>Week 5-6:</strong> Synthesis and Timing Analysis -
                Gaining insights into logic synthesis, STA (Static Timing
                Analysis), and design optimization.
              </li>
              <li>
                <strong>Week 7-8:</strong> ASIC/FPGA Design Flow - Exploring the
                design flow for Application-Specific Integrated Circuits (ASICs)
                and Field-Programmable Gate Arrays (FPGAs).
              </li>
              <li>
                <strong>Week 9-10:</strong> Layout Design and DFT -
                Understanding floorplanning, clock tree synthesis, and Design
                for Testability (DFT) methodologies.
              </li>
              <li>
                <strong>Week 11:</strong> VLSI Project - Designing and
                simulating a complete digital system using industry-standard
                tools.
              </li>
              <li>
                <strong>Week 12:</strong> Final Assessment and Capstone Project
                - Presenting your VLSI design and review with industry experts.
              </li>
            </ul>
            <h4>Additional Support:</h4>
            <p>We also offer additional resources to support your learning:</p>
            <ul>
              <li>
                <strong>Office Hours:</strong> Weekly sessions with VLSI experts
                to discuss concepts, troubleshoot designs, and clarify doubts.
              </li>
              <li>
                <strong>Online Community:</strong> Access to a dedicated forum
                where you can interact with peers and VLSI professionals.
              </li>
              <li>
                <strong>Tool Access:</strong> Guided tutorials and licenses for
                using tools like Cadence, Synopsys, and Mentor Graphics during
                the course.
              </li>
              <li>
                <strong>Recorded Sessions:</strong> All live sessions are
                recorded and available for review at your convenience.
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
                className="en-watch-video-button"
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
              // className={activeTab === "overview" ? "en-active" : ""}
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
