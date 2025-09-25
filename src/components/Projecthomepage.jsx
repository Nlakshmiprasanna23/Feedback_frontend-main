import React, { Component } from 'react';
import '../css/Projecthomepage.css';
import { BASEURL, callApi, setSession } from '../api';

export class Homepage extends Component {
  constructor() {
    super();
    this.userRegistration = this.userRegistration.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.signin = this.signin.bind(this);
    this.showSignin = this.showSignin.bind(this);
    this.showSignup = this.showSignup.bind(this);
    this.closeSignin = this.closeSignin.bind(this);
  }

  showSignin() {
    const popup = document.getElementById("popup");
    const signin = document.getElementById("signin");
    const signup = document.getElementById("signup");
    const popupHeader = document.getElementById("popupHeader");

    popupHeader.innerHTML = "Login";
    signin.style.display = "block";
    signup.style.display = "none";
    popup.style.display = "block";

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("responseDiv").innerHTML = "";
  }

  showSignup() {
    const popup = document.getElementById("popup");
    const signin = document.getElementById("signin");
    const signup = document.getElementById("signup");
    const popupHeader = document.getElementById("popupHeader");

    popupHeader.innerHTML = "Signup";
    signin.style.display = "none";
    signup.style.display = "block";
    popup.style.display = "block";

    document.getElementById("fullname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("role").value = "";
    document.getElementById("signuppassword").value = "";
    document.getElementById("confirmpassword").value = "";
  }

  closeSignin(event) {
    if (event.target.id === "popup") {
      document.getElementById("popup").style.display = "none";
    }
  }

  userRegistration() {
    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const role = document.getElementById("role");
    const password = document.getElementById("signuppassword");
    const confirmPassword = document.getElementById("confirmpassword");

    fullname.style.border = "";
    email.style.border = "";
    role.style.border = "";
    password.style.border = "";
    confirmPassword.style.border = "";

    if (!fullname.value) { fullname.style.border = "1px solid red"; fullname.focus(); return; }
    if (!email.value) { email.style.border = "1px solid red"; email.focus(); return; }
    if (!role.value) { role.style.border = "1px solid red"; role.focus(); return; }
    if (!password.value) { password.style.border = "1px solid red"; password.focus(); return; }
    if (!confirmPassword.value) { confirmPassword.style.border = "1px solid red"; confirmPassword.focus(); return; }
    if (password.value !== confirmPassword.value) { password.style.border = "1px solid red"; password.focus(); return; }

    const data = JSON.stringify({
      fullname: fullname.value,
      email: email.value,
      role: role.value,
      password: password.value
    });

    callApi("POST", `${BASEURL}users/signup`, data, this.getResponse);
  }

  getResponse(res) {
    const resp = res.split('::');
    alert(resp[1]);
    if (resp[0] === "200") {
      document.getElementById("signin").style.display = "block";
      document.getElementById("signup").style.display = "none";
    }
  }

  forgotPassword() {
    const username = document.getElementById("username");
    const responseDiv = document.getElementById("responseDiv");

    username.style.border = "";
    responseDiv.innerHTML = "";

    if (!username.value) {
      username.style.border = "1px solid red";
      username.focus();
      return;
    }

    const url = `${BASEURL}users/forgotpassword/${username.value}`;
    callApi("GET", url, "", (res) => {
      const data = res.split('::');
      if (data[0] === "200") {
        responseDiv.innerHTML = `<br/><br/><label style='color:green'>${data[1]}</label>`;
      } else {
        responseDiv.innerHTML = `<br/><br/><label style='color:red'>${data[1]}</label>`;
      }
    });
  }

  signin() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const responseDiv = document.getElementById("responseDiv");

    username.style.border = "";
    password.style.border = "";
    responseDiv.innerHTML = "";

    if (!username.value) { username.style.border = "1px solid red"; username.focus(); return; }
    if (!password.value) { password.style.border = "1px solid red"; password.focus(); return; }

    const data = JSON.stringify({ email: username.value, password: password.value });

    callApi("POST", `${BASEURL}users/signin`, data, (res) => {
      const rdata = res.split('::');
      if (rdata[0] === '200') {
        setSession("csrid", rdata[1], 1); // token
        setSession("userDetails", JSON.stringify({
          fullname: rdata[2],
          email: rdata[3],
          role: rdata[4]
        }), 1);

        window.location.replace("/dashboard");
      } else {
        responseDiv.innerHTML = `<br /><br /><label style="color:red">${rdata[1]}</label>`;
      }
    });
  }

  render() {
    return (
      <div id='base'>
        {/* Popup */}
        <div id='popup' onClick={this.closeSignin}>
          <div className='popupWindow'>
            <div id='popupHeader'>Login</div>

            {/* Sign In Form */}
            <div id='signin'>
              <label className='usernameLabel'>Username</label>
              <input type='text' id='username' />
              <label className='passwordLabel'>Password</label>
              <input type='password' id='password' />
              <div className='ForgotPassword'>
                Forgot <label onClick={this.forgotPassword}>Password?</label>
              </div>
              <button className='signinButton' onClick={this.signin}>Sign In</button>
              <div className='div1' id='responseDiv'></div>
              <div className='div2'>
                Don’t have an Account? <label onClick={this.showSignup}>Sign Up Now</label>
              </div>
            </div>

            {/* Sign Up Form */}
            <div id='signup'>
              <label>Full Name :</label>
              <input type='text' id='fullname' />
              <label>Email :</label>
              <input type='email' id='email' />
              <label>Select Role :</label>
              <select id='role'>
                <option value=''></option>
                <option value='1'>Admin</option>
                <option value='2'>FeedBack Poster</option>
                <option value='3'>Company owner</option>
              </select>
              <label>Password :</label>
              <input type='password' id='signuppassword' />
              <label>Confirm Password:</label>
              <input type='password' id='confirmpassword' />
              <button onClick={this.userRegistration}>Register Now</button>
              <div>Already have an Account? <span onClick={this.showSignin}>SIGN IN</span></div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div id='header'>
          <img className='logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk742OMl8pBeycdB1HVZQEiasqEWzEjhJJPQ&s' alt='logo' />
          <img className='signinIcon' src='./images/user.png' alt='sign' onClick={this.showSignin} />
          <label className='signinText' onClick={this.showSignin}>Sign In</label>
        </div>

        {/* Content */}
        <div id='content'>
          <div className='text1'> Welcome to Feedback Management System </div>
          <div className='text2'> Your feedback matters here </div>
          <div className='text3'> Share and discover experiences </div>
          <div className='searchBar'>
            <input type='text' className='searchText' placeholder='Search by company' />
            <input type='text' className='searchLocation' placeholder='Location' />
            <button className='searchButton'>Search Feedback</button>
          </div>
        </div>

        {/* Footer */}
        <div id='footer'>
          <label className='copyrightText'>
            © 2025 Feedback Management System | KL University
          </label>
          <img className='socialmediaIcon' src='./images/facebook.png' alt='fb' />
          <img className='socialmediaIcon' src='./images/linkedin.png' alt='li' />
          <img className='socialmediaIcon' src='./images/twitter.png' alt='tw' />
        </div>
      </div>
    );
  }
}

export default Homepage;
