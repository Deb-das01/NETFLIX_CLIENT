import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    const emailValue = emailRef.current.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      setErrorMessage("Please enter a valid email address.");
      setTimeout(() => setErrorMessage(""), 4000);
    } else {
      setEmail(emailValue);
      setErrorMessage("");
    }
  };

  const handleSignIn = () => {
    console.log("Redirect to sign in page");
    navigate("/login");
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      await axios.post("https://netflix-mern-backend.onrender.com/api/auth/register", { email, username, password });
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
        ) : (
          <form className="input">
            <input type="username" placeholder="username" ref={usernameRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
        {!email && (
          <div className="signInPrompt">
            <div className="smallTextWrapper">
              Already a User? <button className="loginButton" onClick={handleSignIn}>Sign In</button>
            </div>
            <small>
              This page is protected by Google reCAPTCHA to ensure you're not a bot. <a style={{color: 'white'}} href="https://support.google.com/recaptcha/?hl=en#6080904">Learn more</a>.
            </small>
          </div>
        )}
      </div>
    </div>
  );
}
