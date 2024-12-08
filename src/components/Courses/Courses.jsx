import React, { useState, useEffect } from "react";
import "./Courses.css";
import courses_img_1 from "../../assets/courses_img_1.png";
import courses_img_2 from "../../assets/courses_img_2.png";
import courses_img_3 from "../../assets/courses_img_3.png";
import courses_img_4 from "../../assets/courses_img_4.png";
import courses_img_5 from "../../assets/courses_img_5.png";
import courses_img_6 from "../../assets/courses_img_6.png";
import courses_img_7 from "../../assets/courses_img_7.png";
import courses_img_8 from "../../assets/courses_img_8.png";
import courses_img_9 from "../../assets/courses_img_9.png";
import courses_img_10 from "../../assets/courses_img_10.png";
import courses_img_11 from "../../assets/courses_img_11.png";
import courses_img_12 from "../../assets/courses_img_12.png";
import courses_img_13 from "../../assets/courses_img_13.png";
import courses_img_14 from "../../assets/courses_img_14.png";
import courses_img_15 from "../../assets/courses_img_15.png";
import courses_img_16 from "../../assets/courses_img_16.png";
import courses_img_17 from "../../assets/courses_img_17.png";
import courses_img_18 from "../../assets/courses_img_18.png";
import courses_img_19 from "../../assets/courses_img_19.png";
import courses_img_20 from "../../assets/courses_img_20.png";
import courses_img_21 from "../../assets/courses_img_21.png";
import courses_img_22 from "../../assets/courses_img_22.png";
import courses_img_23 from "../../assets/courses_img_23.png";
import courses_img_24 from "../../assets/courses_img_24.png";
import { useNavigate } from "react-router-dom";

const coursesData = [
  {
    id: 1,
    title: "Introduction to VLSI Design",
    description:
      "Learn the fundamentals of VLSI design, including CMOS technology, digital logic, and circuit layout.",
    category: "VLSI Design",
    rating: "★★★★",
    duration: "6 weeks",
    level: "Beginner",
    image: courses_img_1,
    videoLink: "https://www.youtube.com/embed/3y57xdZ1CCg",
    trainer: "Prof. Arun Kumar",
    price: "$250",
  },
  {
    id: 2,
    title: "Digital VLSI Design",
    description:
      "Understand the principles and techniques used in the design of digital VLSI circuits and systems.",
    category: "VLSI Design",
    rating: "★★★",
    duration: "8 weeks",
    level: "Intermediate",
    image: courses_img_2,
    videoLink: "https://www.youtube.com/embed/JiXdy7SOzBM",
    trainer: "Prof. Ravi Verma",
    price: "$300",
  },
  {
    id: 3,
    title: "CMOS VLSI Design",
    description:
      "Explore CMOS technology and its application in designing efficient and scalable digital circuits.",
    category: "VLSI Design",
    rating: "★★★★★",
    duration: "10 weeks",
    level: "Advanced",
    image: courses_img_3,
    videoLink: "https://www.youtube.com/embed/OpvvWbyd3bE",
    trainer: "Prof. Ayesha Malik",
    price: "$350",
  },
  {
    id: 4,
    title: "VLSI Circuit Simulation",
    description:
      "Learn how to simulate and analyze VLSI circuits using industry-standard simulation tools.",
    category: "VLSI Design",
    rating: "★★★★",
    duration: "6 weeks",
    level: "Beginner",
    image: courses_img_4,
    videoLink: "https://www.youtube.com/embed/9q2vZpIJGRM",
    trainer: "Prof. Nishant Yadav",
    price: "$220",
  },
  {
    id: 5,
    title: "Low Power VLSI Design",
    description:
      "Gain expertise in designing low-power VLSI circuits for energy-efficient systems.",
    category: "VLSI Design",
    rating: "★★★",
    duration: "8 weeks",
    level: "Intermediate",
    image: courses_img_5,
    videoLink: "https://www.youtube.com/embed/FuTAtOL6cx0",
    trainer: "Prof. Neha Sinha",
    price: "$275",
  },
  {
    id: 6,
    title: "VLSI Design Automation",
    description:
      "Learn the various automation tools and techniques used in VLSI design and layout.",
    category: "VLSI Design",
    rating: "★★★★★",
    duration: "10 weeks",
    level: "Advanced",
    image: courses_img_6,
    videoLink: "https://www.youtube.com/embed/OaYr7OAv7pQ",
    trainer: "Prof. Ranjit Gupta",
    price: "$400",
  },
  {
    id: 7,
    title: "VLSI Architecture Design",
    description:
      "Explore the architectural aspects of VLSI systems, including processors and memory systems.",
    category: "VLSI Architecture",
    rating: "★★★★",
    duration: "8 weeks",
    level: "Intermediate",
    image: courses_img_7,
    videoLink: "https://www.youtube.com/embed/NtJ2L3sdmMI",
    trainer: "Prof. Rajesh Kumar",
    price: "$300",
  },
  {
    id: 8,
    title: "Analog VLSI Design",
    description:
      "Focus on designing analog circuits using VLSI techniques for various applications.",
    category: "VLSI Design",
    rating: "★★★",
    duration: "8 weeks",
    level: "Intermediate",
    image: courses_img_8,
    videoLink: "https://www.youtube.com/embed/wWVJt9vs_oM",
    trainer: "Prof. Priya Reddy",
    price: "$280",
  },
  {
    id: 9,
    title: "VLSI Testing Techniques",
    description:
      "Learn the various testing techniques and methodologies for verifying VLSI designs.",
    category: "VLSI Testing",
    rating: "★★★★",
    duration: "6 weeks",
    level: "Beginner",
    image: courses_img_9,
    videoLink: "https://www.youtube.com/embed/lKsP5zM3jvI",
    trainer: "Prof. Deepak Sharma",
    price: "$220",
  },
  {
    id: 10,
    title: "Advanced VLSI Fabrication",
    description:
      "Deep dive into the fabrication process of VLSI circuits and the various techniques involved.",
    category: "VLSI Fabrication",
    rating: "★★★★★",
    duration: "12 weeks",
    level: "Advanced",
    image: courses_img_10,
    videoLink: "https://www.youtube.com/embed/Dn80cIp3c3M",
    trainer: "Prof. Radhika Bhat",
    price: "$450",
  },
  {
    id: 11,
    title: "FPGA-based VLSI Design",
    description:
      "Learn FPGA-based design methods for implementing VLSI systems and applications.",
    category: "VLSI Design",
    rating: "★★★",
    duration: "8 weeks",
    level: "Intermediate",
    image: courses_img_11,
    videoLink: "https://www.youtube.com/embed/MhExTzH3tnI",
    trainer: "Prof. Suresh Patel",
    price: "$250",
  },
  {
    id: 12,
    title: "VLSI for Embedded Systems",
    description:
      "Gain knowledge of how VLSI design is applied in embedded systems and IoT devices.",
    category: "VLSI Design",
    rating: "★★★★",
    duration: "6 weeks",
    level: "Intermediate",
    image: courses_img_12,
    videoLink: "https://www.youtube.com/embed/YnXJ7X9JghQ",
    trainer: "Prof. Meena Sharma",
    price: "$275",
  },
  {
    id: 13,
    title: "Design of VLSI Logic Circuits",
    description:
      "Learn the design of logic circuits using VLSI techniques and how to optimize their performance.",
    category: "VLSI Design",
    rating: "★★★★",
    duration: "6 weeks",
    level: "Intermediate",
    image: courses_img_13,
    videoLink: "https://www.youtube.com/embed/mTcM43f5HRA",
    trainer: "Prof. Arvind Prakash",
    price: "$260",
  },
  {
    id: 14,
    title: "VLSI Design for Communication Systems",
    description:
      "Learn how VLSI design principles are applied to communication systems and signal processing.",
    category: "VLSI Communication",
    rating: "★★★★★",
    duration: "10 weeks",
    level: "Advanced",
    image: courses_img_14,
    videoLink: "https://www.youtube.com/embed/Tj_dDfsTMyA",
    trainer: "Prof. Rajeev Reddy",
    price: "$380",
  },
  {
    id: 15,
    title: "System-on-Chip (SoC) Design",
    description:
      "Gain expertise in the design and implementation of System-on-Chip (SoC) architectures.",
    category: "SoC Design",
    rating: "★★★★",
    duration: "10 weeks",
    level: "Advanced",
    image: courses_img_15,
    videoLink: "https://www.youtube.com/embed/Lt_LKDtpjjg",
    trainer: "Prof. Sarika Gupta",
    price: "$400",
  },
  {
    id: 16,
    title: "High-Speed VLSI Circuit Design",
    description:
      "Explore techniques for designing high-speed VLSI circuits for fast and efficient systems.",
    category: "High-Speed Design",
    rating: "★★★",
    duration: "10 weeks",
    level: "Advanced",
    image: courses_img_16,
    videoLink: "https://www.youtube.com/embed/aCzLErLxe-Q?si=HDdb6vvRTo7p0z5k",
    trainer: "Prof. Nitin Kumar",
    price: "$340",
  },
  // {
  //   id: 17,
  //   title: "Advanced VLSI Testing Techniques",
  //   description:
  //     "Learn the advanced testing techniques used to ensure the functionality and reliability of VLSI circuits.",
  //   category: "VLSI Testing",
  //   rating: "★★★",
  //   duration: "6 weeks",
  //   level: "Intermediate",
  //   image: courses_img_17,
  //   videoLink: "https://www.youtube.com/embed/f93iGvCahgs?si=QyxgJMYr3UO_8BR8",
  //   trainer: "Prof. Amit Choudhary",
  //   price: "$220",
  // },
  // {
  //   id: 18,
  //   title: "VLSI for Machine Learning",
  //   description:
  //     "Learn how VLSI design is applied to machine learning applications for efficient computation.",
  //   category: "VLSI Design",
  //   rating: "★★★★",
  //   duration: "8 weeks",
  //   level: "Intermediate",
  //   image: courses_img_18,
  //   videoLink: "https://www.youtube.com/embed/KzGBdDkMNkk",
  //   trainer: "Prof. Tanvi Sharma",
  //   price: "$320",
  // },
  // {
  //   id: 19,
  //   title: "Reconfigurable VLSI Systems",
  //   description:
  //     "Study reconfigurable VLSI systems for flexible and adaptable hardware designs.",
  //   category: "VLSI Design",
  //   rating: "★★★",
  //   duration: "10 weeks",
  //   level: "Advanced",
  //   image: courses_img_19,
  //   videoLink: "https://www.youtube.com/embed/x33gG_gxOYw",
  //   trainer: "Prof. Manoj Singh",
  //   price: "$360",
  // },
  // {
  //   id: 20,
  //   title: "VLSI System Modeling and Simulation",
  //   description:
  //     "Understand the techniques for modeling and simulating VLSI systems to predict their behavior.",
  //   category: "VLSI Simulation",
  //   rating: "★★★★",
  //   duration: "6 weeks",
  //   level: "Intermediate",
  //   image: courses_img_20,
  //   videoLink: "https://www.youtube.com/embed/aJpdbGjwpPE",
  //   trainer: "Prof. Ashish Joshi",
  //   price: "$270",
  // },
  // {
  //   id: 21,
  //   title: "VLSI Design Optimization",
  //   description:
  //     "Learn how to optimize VLSI designs for better performance, power efficiency, and cost.",
  //   category: "VLSI Design",
  //   rating: "★★★★★",
  //   duration: "10 weeks",
  //   level: "Advanced",
  //   image: courses_img_21,
  //   videoLink: "https://www.youtube.com/embed/Y34XUo-iyqM",
  //   trainer: "Prof. Vikas Sharma",
  //   price: "$420",
  // },
  // {
  //   id: 22,
  //   title: "Quantum VLSI Design",
  //   description:
  //     "Study the emerging field of quantum VLSI design and its applications in quantum computing.",
  //   category: "Quantum VLSI",
  //   rating: "★★★★",
  //   duration: "12 weeks",
  //   level: "Advanced",
  //   image: courses_img_22,
  //   videoLink: "https://www.youtube.com/embed/OZG_lGqZmdo",
  //   trainer: "Prof. Kunal Kapoor",
  //   price: "$500",
  // },
  // {
  //   id: 23,
  //   title: "Advanced VLSI Process Technology",
  //   description:
  //     "Explore advanced process technologies used in the fabrication of modern VLSI circuits.",
  //   category: "VLSI Fabrication",
  //   rating: "★★★",
  //   duration: "12 weeks",
  //   level: "Advanced",
  //   image: courses_img_23,
  //   videoLink: "https://www.youtube.com/embed/PgD6GFYgkhk",
  //   trainer: "Prof. Sanjay Mishra",
  //   price: "$480",
  // },
  // {
  //   id: 24,
  //   title: "VLSI System Design and Implementation",
  //   description:
  //     "Learn the complete process of designing and implementing a VLSI system from start to finish.",
  //   category: "VLSI Design",
  //   rating: "★★★★★",
  //   duration: "12 weeks",
  //   level: "Advanced",
  //   image: courses_img_24,
  //   videoLink: "https://www.youtube.com/embed/QpJLvXvXwDs",
  //   trainer: "Prof. Rina Kapoor",
  //   price: "$530",
  // },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = coursesData.filter((course) => {
      return (
        (filter === "All" || course.category === filter) &&
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredCourses(filtered);
  }, [searchTerm, filter]);

  const categories = [
    "All",
    ...new Set(coursesData.map((course) => course.category)),
  ];

  const handleEnroll = (course) => {
    navigate("/enroll", { state: { course } });
  };

  return (
    <div className="courses">
      <div className="courses-header">
        <h1>Design the Future with VLSI</h1>
        <p>
          Explore our specialized VLSI courses and master the art of
          semiconductor design, chip architecture, and circuit optimization to
          shape tomorrow's technology.
        </p>
      </div>

      <div className="courses-controls">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`category-button ${
                filter === category ? "active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="courses-list">
        {filteredCourses.map((course) => (
          <div key={course.id} className="course-card">
            <img
              src={course.image}
              alt={course.title}
              className="course-image"
            />
            <div className="course-content">
              <h2>{course.title}</h2>
              {/* <p className="course-description">{course.description}</p>
              <div className="course-details">
                <span className="course-category">{course.category}</span>
                <span className="course-duration">{course.duration}</span>
                <span className="course-level">{course.level}</span>
              </div> */}
              <br />
              <button
                className="enroll-button"
                onClick={() => handleEnroll(course)}
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
