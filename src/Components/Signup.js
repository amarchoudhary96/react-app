import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth, db } from "../FirebaseConfigs/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import "./signup.css";

const Signup = () => {
  const Navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((usercredencial) => {
        const user = usercredencial.user;
        const initialcartvalue = 0;
        console.log(user);
        addDoc(collection(db, "users"), {
          username: userName,
          email: email,
          phonenumber: phoneNumber,
          password: password,
          cart: initialcartvalue,
          address: address,
          uid: user.uid,
        })
          .then(() => {
            setSuccessMsg(
              "new user added sucessfully,you will now be automatically redirected to login page."
            );
            setUserName("");
            setPhoneNumber("");
            setEmail("");
            setPassword("");
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg("");
              Navigate("/login");
            }, 4000);
          })
          .catch((error) => {
            setErrorMsg(error.message);
          });
      })
      .catch((error) => {
       
        if (error.message == "Firebase: Error (auth/invalid-email).") {
          setErrorMsg("please fill all required fields");
        }
        if (error.message == "Firebase: Error (auth/email-already-in-use).") {
          setErrorMsg("user already exists");
        }
      });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <p>create account</p>

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
        <label>your name</label>
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="first and last name"
        />
        <label>Mobile number</label>
        <input
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="tel"
          placeholder="Mobile number"
        />
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
        <label>Address</label>
        <textarea
          onChange={(e) => setAddress(e.target.value)}
          placeholder="enter your address"
        />
        <div className="signup-btn">
          <button type="submit">Sign up</button>
        </div>
        <div className="link">
          <span>Already have an account?</span>
          <Link to="/login">sign in </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
