import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorSignup from "./DoctorSignup";
import DoctorLogin from "./DoctorLogin";
import "./index.css";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token is present in localStorage
    if (localStorage.getItem("authToken")) {
      // Redirect to dashboard if token is found
      navigate("/dashboard");
    } else {
      setShowCards(true);
    }
  }, [navigate]);

  return (
    <div className="auth-container">
      {showCards && (
        <div className="auth-card">
          <h2>{isSignup ? "Doctor Signup" : "Doctor Login"}</h2>
          {isSignup ? <DoctorSignup /> : <DoctorLogin />}
          <button
            className="toggle-btn"
            onClick={() => setIsSignup((prev) => !prev)}
          >
            {isSignup ? "Already have an account? Login" : "New here? Signup"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
