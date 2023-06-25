import { useState } from "react";

import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((usercredential) => {
        setSuccessMsg(
          "logged in successfully , you will be redirected to home "
        );
        setEmail("");
        setPassword("");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
          navigate("/home");
        }, 3000);
      })
      .catch((error) => {
        if (error.message == "Firebase: Error (auth/invalid-email).") {
          setErrorMsg("please fill all required fields");
        }
        if (error.message == "Firebase: Error (auth/user-not-found).") {
          setErrorMsg("Email not found");
        }
        if (error.message == "Firebase: Error (auth/wrong-password).") {
          setErrorMsg("wrong password");
        }
      });
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <p>login</p>

        {successMsg && (
          <>
            <div className="success-msg">{successMsg}</div>
          </>
        )}
        {errorMsg && (
          <>
            <div className="error-msg">{errorMsg}</div>
          </>
        )}

        <label>Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="enter your password"
        />
        <div className="login-btn">
          <button type="submit" onClick={handleLogin}>
            login
          </button>
        </div>
        <div className="link">
          <span>Don't have an account?</span>
          <Link to="/signup">sign up </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
// nitishthakranjaat382@gmail.com
