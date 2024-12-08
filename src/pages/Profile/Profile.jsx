import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";

const Profile = () => {
  const defaultImage = "/api/placeholder/150/150";

  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem("profileImage") || defaultImage;
  });
  const [name, setName] = useState(() => {
    return localStorage.getItem("name") || "New User";
  });
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("email") || "";
  });
  const [bio, setBio] = useState(() => {
    return localStorage.getItem("bio") || "";
  });
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const storedCourses = localStorage.getItem("enrolledCourses");
    return storedCourses ? JSON.parse(storedCourses) : [];
  });

  // Save user data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("profileImage", profileImage);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("bio", bio);
  }, [profileImage, name, email, bio]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        toast.success("Profile image updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pro-profile-container">
      <ToastContainer />
      <div className="pro-profile-header">
        <h1>LearnFree</h1>
        <p>Your Learning Journey</p>
      </div>
      <div className="pro-profile-content">
        <div className="pro-profile-sidebar">
          <div className="pro-profile-image-container">
            <img
              src={profileImage}
              alt="Profile"
              className="pro-profile-image"
            />
            <label className="pro-image-upload-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              Update Photo
            </label>
          </div>
          <div className="pro-profile-stats">
            <div className="pro-stat-item">
              <span className="pro-stat-value">{enrolledCourses.length}</span>
              <span className="pro-stat-label">Courses</span>
            </div>
          </div>
        </div>
        <div className="pro-profile-main">
          <div className="pro-profile-details">
            <h2>Personal Information</h2>
            <div className="pro-profile-field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="pro-profile-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="pro-profile-field">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write something about yourself"
              />
            </div>
          </div>
          <div className="pro-enrolled-courses">
            <h2>Enrolled Courses</h2>
            {enrolledCourses.length > 0 ? (
              <ul className="pro-course-list">
                {enrolledCourses.map((course, index) => (
                  <li key={index} className="pro-course-item">
                    <div className="pro-course-info">
                      <span className="pro-course-name">{course.title}</span>
                      <div className="pro-progress-bar">
                        <div
                          className="pro-progress-fill"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="pro-course-percentage">
                      {course.progress}%
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No courses enrolled yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
