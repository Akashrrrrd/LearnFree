import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import Loading from "./components/Loading/Loading"; // Import the Loading component

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top
  }, [pathname]);

  return null;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    // Simulate a delay for the loading state
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <ScrollToTop /> {/* Add ScrollToTop here */}
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      {loading ? (
        <Loading />
      ) : (
        <AppContent onLoginSuccess={handleLoginSuccess} />
      )}
    </Router>
  );
};

const AppContent = ({ onLoginSuccess }) => {
  const location = useLocation();
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
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      {footerVisiblePaths.includes(location.pathname) && <Footer />}
    </>
  );
};

export default App;
