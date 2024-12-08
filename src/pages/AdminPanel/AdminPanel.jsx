import React, { useState, useEffect } from "react";
import {
  Search,
  BarChart2,
  Users,
  DollarSign,
  Book,
  TrendingUp,
  X,
  Star,
  UserPlus,
} from "lucide-react";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewCourse, setPreviewCourse] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);

  // Initial students data
  const initialStudents = [
    {
      id: 1,
      name: "Arjun Mehta",
      course: "Digital Logic Design",
      email: "arjun.mehta@example.com",
      phone: "9876543210",
    },
    {
      id: 2,
      name: "Sneha Sharma",
      course: "VLSI Design Principles",
      email: "sneha.sharma@example.com",
      phone: "8765432109",
    },
    {
      id: 3,
      name: "Ravi Nair",
      course: "Analog Circuit Design",
      email: "ravi.nair@example.com",
      phone: "7654321098",
    },
    {
      id: 4,
      name: "Ananya Iyer",
      course: "Digital Logic Design",
      email: "ananya.iyer@example.com",
      phone: "6543210987",
    },
    {
      id: 5,
      name: "Karthik Rao",
      course: "VLSI Design Principles",
      email: "karthik.rao@example.com",
      phone: "5432109876",
    },
    {
      id: 6,
      name: "Priya Gupta",
      course: "Analog Circuit Design",
      email: "priya.gupta@example.com",
      phone: "4321098765",
    },
    {
      id: 7,
      name: "Rahul Deshmukh",
      course: "FPGA Programming with Verilog",
      email: "rahul.deshmukh@example.com",
      phone: "3210987654",
    },
    {
      id: 8,
      name: "Sanya Kapoor",
      course: "Digital Logic Design",
      email: "sanya.kapoor@example.com",
      phone: "2109876543",
    },
    {
      id: 9,
      name: "Amitabh Sengupta",
      course: "VLSI Design Principles",
      email: "amitabh.sengupta@example.com",
      phone: "1098765432",
    },
    {
      id: 10,
      name: "Pooja Reddy",
      course: "Analog Circuit Design",
      email: "pooja.reddy@example.com",
      phone: "9087654321",
    },
  ];

  const [students, setStudents] = useState(initialStudents);

  const [courseData, setCourseData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "beginner",
    duration: "",
    price: "",
    instructor: "",
    prerequisites: "",
    learningOutcomes: "",
    thumbnail: null,
    videoPreview: null,
  });

  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    dateOfBirth: "",
    address: "",
    previousEducation: "",
    emergencyContact: "",
  });

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Introduction to VLSI Design",
      subtitle: "Learn the fundamentals of VLSI systems",
      instructor: "Dr. Anil Mehta",
      category: "Electronics",
      enrollments: 7,
      rating: 4.8,
      revenue: 45,
      completionRate: 85,
      lastUpdated: "2024-03-22",
      status: "active",
      level: "beginner",
      thumbnail: "/vlsi-1.jpg",
      description:
        "Understand the basics of VLSI design, including CMOS technology and layout design principles.",
    },
    {
      id: 2,
      title: "Digital Logic Design for VLSI",
      subtitle: "Master digital logic circuits for VLSI applications",
      instructor: "Prof. Priya Sharma",
      category: "Electronics",
      enrollments: 4,
      rating: 4.9,
      revenue: 10,
      completionRate: 90,
      lastUpdated: "2024-03-20",
      status: "active",
      level: "intermediate",
      thumbnail: "/vlsi-2.jpg",
      description:
        "Learn about combinational and sequential logic design, essential for VLSI implementations.",
    },
    {
      id: 3,
      title: "Analog IC Design Essentials",
      subtitle: "Explore analog circuits in VLSI systems",
      instructor: "Dr. Neha Kapoor",
      category: "Electronics",
      enrollments: 3,
      rating: 4.7,
      revenue: 15,
      completionRate: 88,
      lastUpdated: "2024-03-18",
      status: "active",
      level: "advanced",
      thumbnail: "/vlsi-3.jpg",
      description:
        "Dive into analog IC design, including amplifiers, filters, and operational circuit techniques.",
    },
    {
      id: 4,
      title: "FPGA Design and Prototyping",
      subtitle: "Hands-on experience with FPGA-based VLSI systems",
      instructor: "Dr. Rajesh Verma",
      category: "Electronics",
      enrollments: 6,
      rating: 4.8,
      revenue: 25,
      completionRate: 92,
      lastUpdated: "2024-03-16",
      status: "active",
      level: "intermediate",
      thumbnail: "/vlsi-4.jpg",
      description:
        "Learn FPGA architecture, programming, and prototyping techniques for VLSI designs.",
    },
    {
      id: 5,
      title: "ASIC Design Flow",
      subtitle: "Master the complete flow of ASIC development",
      instructor: "Dr. Kavita Singh",
      category: "Electronics",
      enrollments: 5,
      rating: 4.6,
      revenue: 30,
      completionRate: 87,
      lastUpdated: "2024-03-14",
      status: "active",
      level: "advanced",
      thumbnail: "/vlsi-5.jpg",
      description:
        "Understand ASIC design from RTL design to physical implementation and verification.",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editMode) {
      setEditingCourse((prev) => ({ ...prev, [name]: value }));
    } else {
      setCourseData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (editMode) {
      setEditingCourse((prev) => ({ ...prev, [type]: file }));
    } else {
      setCourseData((prev) => ({ ...prev, [type]: file }));
    }

    if (type === "thumbnail" && file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewImg = document.getElementById(
          editMode ? "edit-thumbnail-preview" : "ap-thumbnail-preview"
        );
        if (previewImg) {
          previewImg.src = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStudentInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();

    // Create new student object
    const newStudent = {
      id: students.length + 1,
      name: studentData.name,
      email: studentData.email,
      phone: studentData.phone,
      course: studentData.course,
    };

    // Update students array
    setStudents((prevStudents) => [...prevStudents, newStudent]);

    // Update course enrollments
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.title === studentData.course
          ? { ...course, enrollments: course.enrollments + 1 }
          : course
      )
    );

    // Reset student data and switch to dashboard
    setStudentData({
      name: "",
      email: "",
      phone: "",
      course: "",
      dateOfBirth: "",
      address: "",
      previousEducation: "",
      emergencyContact: "",
    });
    setActiveTab("dashboard");

    // Optional: Show success toast
    showToastMessage(`Student ${newStudent.name} added successfully!`);
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    simulateUpload();

    const newCourse = {
      id: courses.length + 1,
      ...courseData,
      enrollments: 0,
      rating: 0,
      revenue: 0,
      completionRate: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
      status: "active",
      thumbnail: courseData.thumbnail
        ? URL.createObjectURL(courseData.thumbnail)
        : "/placeholder-new.jpg",
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Prepare course data
      const newCourse = {
        ...courseData,
        id: Date.now(), // Generate unique ID
        thumbnail: courseData.thumbnailUrl // Assuming you store the uploaded image URL
      };
    
      // Get existing courses from localStorage
      const existingCourses = JSON.parse(localStorage.getItem('uploadedCourses') || '[]');
      
      // Add new course
      const updatedCourses = [...existingCourses, newCourse];
      
      // Save back to localStorage
      localStorage.setItem('uploadedCourses', JSON.stringify(updatedCourses));
    };
    

    setTimeout(() => {
      setCourses((prev) => [...prev, newCourse]);
      showToastMessage("Course uploaded successfully!");
      setActiveTab("courses");
      setCourseData({
        title: "",
        subtitle: "",
        description: "",
        category: "",
        level: "beginner",
        duration: "",
        price: "",
        instructor: "",
        prerequisites: "",
        learningOutcomes: "",
        thumbnail: null,
        videoPreview: null,
      });
    }, 5000);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    simulateUpload();

    setTimeout(() => {
      setCourses((prev) =>
        prev.map((course) =>
          course.id === editingCourse.id
            ? {
                ...editingCourse,
                lastUpdated: new Date().toISOString().split("T")[0],
                thumbnail:
                  editingCourse.thumbnail instanceof File
                    ? URL.createObjectURL(editingCourse.thumbnail)
                    : editingCourse.thumbnail,
              }
            : course
        )
      );
      showToastMessage("Course updated successfully!");
      setEditMode(false);
      setEditingCourse(null);
      setActiveTab("courses");
    }, 5000);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setEditMode(true);
    setActiveTab("upload");
  };

  const handlePreview = (course) => {
    setPreviewCourse(course);
    setShowPreview(true);
  };

  const filteredCourses = courses
    .filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.enrollments - a.enrollments;
        case "rating":
          return b.rating - a.rating;
        case "revenue":
          return b.revenue - a.revenue;
        default:
          return b.enrollments - a.enrollments;
      }
    });

  const PreviewModal = ({ course, onClose }) => (
    <div className="ap-preview-modal">
      <div className="ap-preview-content">
        <button className="ap-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="ap-preview-thumbnail"
        />
        <h2>{course.title}</h2>
        <p className="ap-preview-subtitle">{course.subtitle}</p>
        <div className="ap-preview-details">
          <p>
            <strong>Instructor:</strong> {course.instructor}
          </p>
          <p>
            <strong>Category:</strong> {course.category}
          </p>
          <p>
            <strong>Level:</strong> {course.level}
          </p>
          <p>
            <strong>Description:</strong> {course.description}
          </p>
          <div className="ap-preview-stats">
            <span>
              <Users size={16} /> {course.enrollments} students
            </span>
            <span>
              <Star size={16} /> {course.rating} rating
            </span>
            <span>
              <DollarSign size={16} /> ${course.revenue.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Render student details modal
  const renderStudentDetailsModal = () => {
    if (!showStudentDetails) return null;

    return (
      <div className="ap-student-modal">
        <div className="ap-student-modal-content">
          <h3>Student Details</h3>
          <button
            onClick={() => setShowStudentDetails(false)}
            className="ap-student-modal-close"
          >
            Close
          </button>
          <table className="ap-student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.course}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="ap-container">
      <header className="ap-header">
        <div className="ap-header-content">
          <h1>Learning Management System</h1>
          <p className="ap-subtitle">
            Manage your courses and track performance
          </p>
        </div>
      </header>
      <nav className="ap-navigation">
        <button
          className={`ap-nav-btn ${
            activeTab === "dashboard" ? "ap-active" : ""
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          <BarChart2 size={20} />
          Dashboard
        </button>
        <button
          className={`ap-nav-btn ${activeTab === "courses" ? "ap-active" : ""}`}
          onClick={() => setActiveTab("courses")}
        >
          <Book size={20} />
          Courses
        </button>
        <button
          className={`ap-nav-btn ${activeTab === "upload" ? "ap-active" : ""}`}
          onClick={() => {
            setActiveTab("upload");
            if (!editMode) {
              setCourseData({
                title: "",
                subtitle: "",
                description: "",
                category: "",
                level: "beginner",
                duration: "",
                price: "",
                instructor: "",
                prerequisites: "",
                learningOutcomes: "",
                thumbnail: null,
                videoPreview: null,
              });
            }
          }}
        >
          <TrendingUp size={20} />
          {editMode ? "Edit Course" : "New Course"}
        </button>
        <button
          className={`ap-nav-btn ${
            activeTab === "addStudent" ? "ap-active" : ""
          }`}
          onClick={() => {
            setActiveTab("addNewStudent");
            setStudentData({
              name: "",
              email: "",
              phone: "",
              course: "",
              dateOfBirth: "",
              address: "",
              previousEducation: "",
              emergencyContact: "",
            });
          }}
        >
          <UserPlus size={20} />
          Add Student
        </button>
      </nav>
      {activeTab === "dashboard" && (
        <div className="ap-dashboard">
          <div className="ap-stats-grid">
            <div className="ap-stat-card">
              <div className="ap-stat-icon ap-revenue">
                <DollarSign size={24} />
              </div>
              <div className="ap-stat-info">
                <h3>Total Revenue</h3>
                <p>
                  $
                  {courses
                    .reduce((total, course) => total + course.revenue, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
            <div
              className="ap-stat-card"
              onClick={() => setShowStudentDetails(true)}
              style={{ cursor: "pointer" }}
            >
              <div className="ap-stat-icon ap-users">
                <Users size={24} />
              </div>
              <div className="ap-stat-info">
                <h3>Total Students</h3>
                <p>
                  {courses
                    .reduce((total, course) => total + course.enrollments, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
            <div className="ap-stat-card">
              <div className="ap-stat-icon ap-courses">
                <Book size={24} />
              </div>
              <div className="ap-stat-info">
                <h3>Active Courses</h3>
                <p>
                  {
                    courses.filter((course) => course.status === "active")
                      .length
                  }
                </p>
              </div>
            </div>
            <div className="ap-stat-card">
              <div className="ap-stat-icon ap-rating">
                <Star size={24} />
              </div>
              <div className="ap-stat-info">
                <h3>Average Rating</h3>
                <p>
                  {(
                    courses.reduce(
                      (total, course) => total + course.rating,
                      0
                    ) / courses.length || 0
                  ).toFixed(1)}
                  /5.0
                </p>
              </div>
            </div>
          </div>
          {/* Student Details Modal */}
          {showStudentDetails && (
            <div className="ap-student-modal">
              <div className="ap-student-modal-content">
                <h3>Student Details</h3>
                <button
                  onClick={() => setShowStudentDetails(false)}
                  className="ap-student-modal-close"
                >
                  Close
                </button>
                <ul>
                  {students.map((student, index) => (
                    <li key={index}>
                      {student.name} enrolled in{" "}
                      <strong>{student.course}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="ap-recent-section">
            <h2>Recent Course Performance</h2>
            <div className="ap-courses-grid">
              {courses
                .sort(
                  (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
                )
                .slice(0, 3)
                .map((course) => (
                  <div key={course.id} className="ap-course-card">
                    <div className="ap-course-header">
                      <span className={`ap-level-badge ap-${course.level}`}>
                        {course.level}
                      </span>
                    </div>
                    <div className="ap-course-content">
                      <h3>{course.title}</h3>
                      <p className="ap-course-subtitle">{course.subtitle}</p>
                      <div className="ap-course-meta">
                        <span>
                          <Users size={16} />
                          {course.enrollments} students
                        </span>
                        <span>
                          <Star size={16} />
                          {course.rating} rating
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Add New Students Modal */}
      {activeTab === "addNewStudent" && (
        <div className="ap-add-student-container">
          <div className="ap-add-student-content">
            <h2>Add New Student</h2>
            <form onSubmit={handleStudentSubmit} className="ap-student-form">
              <div className="ap-form-row">
                <div className="ap-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={studentData.name}
                    onChange={handleStudentInputChange}
                    placeholder="Enter student's full name"
                    required
                  />
                </div>
                <div className="ap-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={studentData.email}
                    onChange={handleStudentInputChange}
                    placeholder="Enter student email"
                    required
                  />
                </div>
              </div>
              <div className="ap-form-row">
                <div className="ap-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={studentData.phone}
                    onChange={handleStudentInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="ap-form-group">
                  <label>Course</label>
                  <select
                    name="course"
                    value={studentData.course}
                    onChange={handleStudentInputChange}
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.title}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="ap-form-actions">
                <button
                  type="button"
                  className="ap-cancel-btn"
                  onClick={() => setActiveTab("dashboard")}
                >
                  Cancel
                </button>
                <button type="submit" className="ap-submit-btn">
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {activeTab === "courses" && (
        <div className="ap-courses-section">
          <div className="ap-controls">
            <div className="ap-search">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="ap-sort"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="rating">Sort by Rating</option>
              <option value="revenue">Sort by Revenue</option>
            </select>
          </div>

          <div className="ap-courses-grid">
            {filteredCourses.map((course) => (
              <div key={course.id} className="ap-course-card">
                <div className="ap-course-header">
                  <span className={`ap-level-badge ap-${course.level}`}>
                    {course.level}
                  </span>
                </div>
                <div className="ap-course-content">
                  <h3>{course.title}</h3>
                  <p className="ap-course-subtitle">{course.subtitle}</p>
                  <div className="ap-course-meta">
                    <span>
                      <Users size={16} />
                      {course.enrollments} students
                    </span>
                    <span>
                      <Star size={16} />
                      {course.rating} rating
                    </span>
                    <span>
                      <DollarSign size={16} />${course.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="ap-course-actions">
                    <button
                      className="ap-btn ap-btn-primary"
                      onClick={() => handleEdit(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="ap-btn ap-btn-secondary"
                      onClick={() => handlePreview(course)}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === "upload" && (
        <div className="ap-upload-section">
          <form
            onSubmit={editMode ? handleEditSubmit : handleSubmit}
            className="ap-upload-form"
          >
            <div className="ap-form-grid">
              <div className="ap-form-group">
                <label htmlFor="title">Course Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editMode ? editingCourse.title : courseData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="ap-form-group">
                <label htmlFor="subtitle">Course Subtitle</label>
                <input
                  type="text"
                  id="subtitle"
                  name="subtitle"
                  value={
                    editMode ? editingCourse.subtitle : courseData.subtitle
                  }
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="ap-form-group ap-full-width">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={
                    editMode
                      ? editingCourse.description
                      : courseData.description
                  }
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <div className="ap-form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={
                    editMode ? editingCourse.category : courseData.category
                  }
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="marketing">Marketing</option>
                  <option value="data-science">Data Science</option>
                </select>
              </div>

              <div className="ap-form-group">
                <label htmlFor="level">Course Level</label>
                <select
                  id="level"
                  name="level"
                  value={editMode ? editingCourse.level : courseData.level}
                  onChange={handleInputChange}
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="ap-form-group">
                <label htmlFor="instructor">Instructor</label>
                <input
                  type="text"
                  id="instructor"
                  name="instructor"
                  value={
                    editMode ? editingCourse.instructor : courseData.instructor
                  }
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="ap-upload-files">
                <div className="ap-form-group">
                  <label htmlFor="thumbnail">Course Thumbnail</label>
                  <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "thumbnail")}
                    required={!editMode}
                  />
                  <img
                    id={
                      editMode
                        ? "edit-thumbnail-preview"
                        : "ap-thumbnail-preview"
                    }
                    src={editMode ? editingCourse.thumbnail : ""}
                    alt=""
                    className="ap-thumbnail-preview"
                  />
                </div>

                <div className="ap-form-group">
                  <label htmlFor="videoPreview">Video Preview</label>
                  <input
                    type="file"
                    id="videoPreview"
                    name="videoPreview"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e, "videoPreview")}
                    required={!editMode}
                  />
                </div>
              </div>
            </div>

            {isUploading && (
              <div className="ap-upload-progress">
                <div className="ap-progress-bar">
                  <div
                    className="ap-progress-fill"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <span>{uploadProgress}% Uploaded</span>
              </div>
            )}

            <div className="ap-form-actions">
              {editMode && (
                <button
                  type="button"
                  className="ap-btn ap-btn-secondary"
                  onClick={() => {
                    setEditMode(false);
                    setEditingCourse(null);
                    setActiveTab("courses");
                  }}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="ap-submit-btn"
                disabled={isUploading}
              >
                {isUploading
                  ? "Uploading..."
                  : editMode
                  ? "Update Course"
                  : "Upload Course"}
              </button>
            </div>
          </form>
        </div>
      )}
      {showPreview && previewCourse && (
        <PreviewModal
          course={previewCourse}
          onClose={() => {
            setShowPreview(false);
            setPreviewCourse(null);
          }}
        />
      )}
      {showToast && <div className="ap-toast">{toastMessage}</div>}
    </div>
  );
};

export default AdminPanel;
