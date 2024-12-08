import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const firebaseConfig = {
  apiKey: "AIzaSyARyrQXtlZlbA9s45wonWAzEv3H6u4yxVA",
  authDomain: "learnfree-f8152.firebaseapp.com",
  projectId: "learnfree-f8152",
  storageBucket: "learnfree-f8152.appstack.com",
  messagingSenderId: "15333691794",
  appId: "1:15333691794:web:453b428885a7e11b77f14b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Configure provider settings
googleProvider.setCustomParameters({
  prompt: "select_account", // Always show account selection
});

const Login = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const toggleSignUp = () => setIsSignUp(!isSignUp);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("Account created successfully!");
        // Optional: Set username or additional profile info
        if (username) {
          // You might want to update user profile or store additional info in Firestore
        }
      } catch (error) {
        toast.error("Sign Up Error: " + error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!");
      } catch (error) {
        toast.error("Login Error: " + error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Configure additional scopes if needed
      googleProvider.addScope("profile");
      googleProvider.addScope("email");

      const result = await signInWithPopup(auth, googleProvider);

      // This gives you a Google Access Token
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info
      const user = result.user;

      toast.success("Google Sign-In Successful!");
      onLoginSuccess();
    } catch (error) {
      // Handle Errors here
      const errorCode = error.code;
      const errorMessage = error.message;

      // The email of the user's account used
      const email = error.customData?.email;

      // The AuthCredential type that was used
      const credential = GoogleAuthProvider.credentialFromError(error);

      // Specific error handling
      if (errorCode === "auth/account-exists-with-different-credential") {
        toast.error("An account already exists with a different credential.");
      } else if (errorCode === "auth/popup-blocked") {
        toast.error("Popup was blocked. Please allow popups for this site.");
      } else if (errorCode === "auth/popup-closed-by-user") {
        toast.info("Google Sign-In popup was closed.");
      } else {
        toast.error("Google Sign-In Error: " + errorMessage);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.info("Logged out successfully!");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error("Logout Error: " + error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) onLoginSuccess();
    });
    return () => unsubscribe();
  }, [onLoginSuccess]);

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-content">
        <div className="login-left">
          <div className="login-header">
            <h1>VLSIGuru</h1>
            <p>
              Empowering VLSI enthusiasts with affordable, industry-focused
              education
            </p>
          </div>
        </div>
        <div className="login-logo-container">
          <img src={logo} alt="LearnFree Logo" className="login-logo" />
        </div>
        <div className="login-right">
          <div className="login-form-container">
            {user ? (
              <>
                <h2>
                  Welcome to <span>VLSIGuru</span>,{" "}
                  {user.displayName ||
                    user.email.split("@")[0].charAt(0).toUpperCase() +
                      user.email.split("@")[0].slice(1)}
                </h2>
                <button onClick={handleLogout} className="submit-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <h2>
                  {isSignUp
                    ? "Join Our Learning Community"
                    : "Welcome Back, Learner!"}
                </h2>
                <form onSubmit={handleEmailSubmit} className="login-form">
                  {isSignUp && (
                    <div className="form-group">
                      <input
                        type="text"
                        id="username"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="submit-btn">
                    {isSignUp ? "Start Learning" : "Continue Learning"}
                  </button>
                </form>
                <div className="login-divider">
                  <span>or</span>
                </div>
                <div className="social-login">
                  <button className="google-btn" onClick={handleGoogleSignIn}>
                    <FontAwesomeIcon icon={faGoogle} className="social-icon" />
                    <span>Continue with Google</span>
                  </button>
                </div>
                <p className="toggle-form">
                  {isSignUp
                    ? "Already part of our community?"
                    : "New to LearnFree?"}
                  <button onClick={toggleSignUp}>
                    {isSignUp ? " Log In" : " Sign Up"}
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
