import { useContext, useState,useEffect } from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import "./login.scss";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch,error } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);

  const navigate=useNavigate();

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);


  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  const handelSignup=()=>{
    console.log("Sign up button clicked");
    navigate("/register");
  }
  return (
    <div className="login">
      {showError && <div className="errorPopup">{error}</div>}
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
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
          Sign In
          </button>
        </form>
        <span>
            New to Netflix? <button className="signupButton" onClick={handelSignup}>Sign up now.</button>
          </span>
          <small>

            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <a style={{color: 'white'}} href="https://support.google.com/recaptcha/?hl=en#6080904">Learn more</a>.

          </small>
      </div>
    </div>
  );
}