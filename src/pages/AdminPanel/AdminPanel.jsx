import React, { useState, useEffect } from "react";
import {
  Search,
  BarChart2,
  Users,
  Clock,
  DollarSign,
  Book,
  Award,
  TrendingUp,
  X,
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

  const [analyticsData] = useState({
    totalRevenue: 156780,
    totalStudents: 3245,
    averageRating: 4.8,
    totalCourses: 24,
    completionRate: 78,
    activeUsers: 1890,
  });

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Advanced React Patterns & Best Practices",
      subtitle: "Master modern React development techniques",
      instructor: "Sarah Johnson",
      category: "Development",
      enrollments: 845,
      rating: 4.9,
      revenue: 42250,
      completionRate: 88,
      lastUpdated: "2024-03-20",
      status: "active",
      level: "advanced",
      thumbnail: "/placeholder-1.jpg",
      description: "Learn advanced React patterns and best practices...",
    },
    {
      id: 2,
      title: "AI & Machine Learning Fundamentals",
      subtitle: "From basics to advanced ML concepts",
      instructor: "Dr. Michael Chen",
      category: "Data Science",
      enrollments: 632,
      rating: 4.7,
      revenue: 37920,
      completionRate: 76,
      lastUpdated: "2024-03-18",
      status: "active",
      level: "intermediate",
      thumbnail: "/placeholder-2.jpg",
      description: "Master the fundamentals of AI and Machine Learning...",
    },
    {
      id: 3,
      title: "UX/UI Design Masterclass",
      subtitle: "Create stunning user experiences",
      instructor: "Emma Wilson",
      category: "Design",
      enrollments: 573,
      rating: 4.8,
      revenue: 28650,
      completionRate: 92,
      lastUpdated: "2024-03-15",
      status: "active",
      level: "beginner",
      thumbnail: "/placeholder-3.jpg",
      description:
        "Learn to create beautiful and functional user interfaces...",
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
              <Award size={16} /> {course.rating} rating
            </span>
            <span>
              <DollarSign size={16} /> ${course.revenue.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

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
            <div className="ap-stat-card">
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
                <Award size={24} />
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
                          <Award size={16} />
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
                      <Award size={16} />
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
