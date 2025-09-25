import React, { Component } from "react";
import { getSession } from "../api";
import "../css/Profile.css";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "Not available",
      email: "Not available",
      role: "Not available"
    };
  }

  componentDidMount() {
    const userStr = getSession("userDetails");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.setState({
          fullname: user.fullname || "Not available",
          email: user.email || "Not available",
          role: user.role || "Not available"
        });
      } catch (err) {
        console.error("Error parsing userDetails", err);
      }
    }
  }

  render() {
    const { fullname, email, role } = this.state;
    return (
      <div className="profile-container">
        <h1>Welcome to Your Profile</h1>
        <div className="profile-field">
          <label>Full Name:</label>
          <span>{fullname}</span>
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <span>{email}</span>
        </div>
        <div className="profile-field">
          <label>Role:</label>
          <span>{role}</span>
        </div>
      </div>
    );
  }
}

export default Profile;
