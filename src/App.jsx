import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Enroll from "./pages/Enroll/Enroll";
import ConnectNow from "./components/ConnectNow/ConnectNow";
import Footer from "./components/Footer/Footer";
import VideoPage from "./pages/VideoPage/VideoPage";
import AI from "./pages/AI/AI";
import FAQ from "./pages/FAQ/FAQ";
import Login from "./pages/Login/Login";
import Quiz from "./pages/Quiz/Quiz";
import Courses from "./components/Courses/Courses";
import Profile from "./pages/Profile/Profile";
import CourseRegistration from "./pages/CourseRegistration/CourseRegistration";
import CoursePage from "./pages/CoursePage/CoursePage";
import Contact from "./pages/Contact/Contact";
import AdminPanel from "./pages/AdminPanel/AdminPanel";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <AppContent onLoginSuccess={handleLoginSuccess} />
    </Router>
  );
};

// This component is nested within Router, so useLocation can be used here.
const AppContent = ({ onLoginSuccess }) => {
  const location = useLocation();
  
  // Define paths where the Footer should be displayed
  const footerVisiblePaths = ["/", "/courses", "/faq", "/profile"];

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/video-page" element={<VideoPage />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/faq" element={<FAQ />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={onLoginSuccess} />}
        />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/course-registration" element={<CourseRegistration />} />
        <Route path="/course-page" element={<CoursePage />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/admin-panel" element={<AdminPanel/>}/>
      </Routes>
      
      {footerVisiblePaths.includes(location.pathname) && <Footer />}
    </>
  );
};

export default App;
