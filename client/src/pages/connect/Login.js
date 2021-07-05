/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import axios from "axios";
import { SetToken, RemoveToken,GetUserData } from "../../actions/index";
import { useLocation  } from "react-router-dom";
// eslint-disable-next-line
const Login = ({ history }) => {

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState(null)
  const location = useLocation();

  useEffect(() => {
    if(location.state)
  
    setEmail(location.state.user.email)
  }, [location.state])

  const [RegisteredUser, setRegisteredUser] = useState([])
   

  useEffect(() => {
    setError(null)
    }, [Email])

  const dispatch = useDispatch();


  // eslint-disable-next-line
  const [errors, setErrors] = useState(null);

  const login = (e) => {
    e.preventDefault();
    if(Email === "" || Password === "")
    {
      setError("Email and passwrd are required")
      return
    }

 
   
    let info = {
      Email,
      Password,
    };

    axios
      .post("/login", info)
      .then(function (res) {
        console.log(res.data.user);
        dispatch(SetToken(res.data.token));
        dispatch(GetUserData(res.data.user));
        history.push("/");
        setPassword("");
        setEmail("");
      })
      .catch(function (error) {
        setError(error.response.data)
        setPassword("");
       
      });
  };

  return (
    <section className="section-form">
    <img className="wallpaper" src={"./images/wallpaper.jpg"} alt="" />
      <span className="title-contact">Login</span>
      {
        Error &&  <p className="error-msg">
        <i className="fas fa-exclamation-circle"></i>
          {Error}</p>
      }
      <div style={{ marginTop:10 }} className="">
        <form>
          <div className="form-group">
            <label> E-mail </label>
            <input
            value={Email}
              type="text"
              name="email"
              placeholder="Enter your Adress Mail..."
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={()=> setError(null)}
            />
          </div>
          <div className="form-group">
            <label> PassWord </label>
            <input
              type="PassWord"
              name="PassWord"
              placeholder="Enter your PassWord..."
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={()=>  setError(null)}
            />
          </div>
          {errors && errors.map((el) => <h1>{el.msg}</h1>)}
          <button onClick={(e) => login(e)} type="submit">
            {" "}
            Login{" "}
          </button>
        </form>
      </div>
    </section>
  );
};
export default Login;
