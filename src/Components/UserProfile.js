import React from "react";
import { useSelector } from "react-redux";
import "./userprofile.css";

const UserProfile = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <div className="userprofile-outercontainer">
      {user ? (
        <div className="user-profile">
          <p> Your Account Details</p>
          <div className="data-row">
            <span>Your Name</span>
            <span>{user.username}</span>
          </div>
          <div className="data-row">
            <span>Your Email</span>
            <span>{user.email}</span>
          </div>
          <div className="data-row">
            <span>Your PhoneNumber</span>
            <span>{user.phonenumber}</span>
          </div>
          <div className="data-row">
            <span>Your Address</span>
            <span>{user.address}</span>
          </div>
        </div>
      ) : (
        <div>Aou are Not Logged In</div>
      )}
    </div>
  );
};

export default UserProfile;
