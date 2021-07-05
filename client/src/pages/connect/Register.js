/* eslint-disable */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";

const Register = ({ history }) => {
 


  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phone, setphone] = useState("");
  const [age, setage] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Error, setError] = useState(null)
 

  const registerNow = async (e) => {
     
    e.preventDefault();
    let info = {
      firstname,
      lastname,
      phone,
      age,
      email,
      password,
    };

    axios
    axios.post('http://localhost:5000/register', info)
    .then(function (res) {
      console.log(res.data)
      history.push("/Login", { user : res.data });
    })
    .catch(function (error) {
          console.log(error.response.data);
          setError(error.response.data)
     });
 
  };

  return (
    <section className="section">
       <img className="wallpaper" src={"./images/wallpaper.jpg"} alt="" />
      <span className="title-contact">Register </span>
      {
        Error &&  <p className="error-msg">
        <i className="fas fa-exclamation-circle"></i>
          {Error}</p>
      }
     
      <div className="">
        <form onSubmit={registerNow}>
          <div className="row mt-3">
            <div className="form-group">
              <label> First Name </label>
              <input
                type="text"
                name="firstname"
                placeholder="Enter your First Name..."
                onChange={(e) => setfirstname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label> Last Name </label>
              <input
                type="text"
                name="lastname"
                placeholder="Enter your Last Name..."
                onChange={(e) => setlastname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label> Phone </label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your Phone Numbre..."
                onChange={(e) => setphone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label> Age </label>
              <input
                type="text"
                name="age"
                placeholder="Enter your Age..."
                onChange={(e) => setage(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label> E-mail </label>
              <input
                type="text"
                name="email"
                placeholder="Enter your Adress Mail..."
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label> PassWord </label>
              <input
                type="passWord"
                name="PassWord"
                placeholder="Enter your PassWord..."
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Register </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
