/* eslint-disable */
import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { SetToken, RemoveToken, RemoveUserData } from "./actions/index";
import { useHistory } from "react-router-dom";
import "./index.css";

const NavBar = () => {
  const history = useHistory();
  const token = localStorage.getItem("TOKEN");

  useEffect(() => {
    if (!token) history.push("/Page");
  }, []);
  const UserData = useSelector((state) => state.UserData);

  const TokenReducer = useSelector((state) => state.TokenReducer);
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const logout = () => {
    dispatch(RemoveToken());
    dispatch(RemoveUserData());
    history.push("/Login");
  };

  return (
    <div className="navbar">
      {TokenReducer && (
        <div>
          <nav>
            <ul className="menuItems">
              <li>
                <Link to="/" className="li">
                  <Button variant="outline-primary">Home</Button>
                </Link>
              </li>
              <li>
                <Link to="/Materiel" className="li">
                  <Button variant="outline-primary">Camping Checklist </Button>
                </Link>
              </li>
              {/* <li>
                <Link to="/places" className="li">
                  <Button variant="outline-primary"> Best Places?</Button>
                </Link>
              </li> */}
              <li>
                <Link to="/camping" className="li">
                  <Button variant="outline-primary"> Why Camping?</Button>
                </Link>
              </li>

              <li>
                <Button onClick={() => logout()} variant="outline-primary">
                  Log out
                </Button>
              </li>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#0d6efd",
                }}
              >
                <i
                  style={{ fontSize: 25, marginRight: 5 }}
                  className="far fa-user-circle"
                ></i>
                {UserData && UserData.firstname + " " + UserData.lastname}
              </div>
            </ul>
          </nav>
        </div>
      )}

      {!TokenReducer && (
        <nav>
          <ul className="menuItems">
            <li>
              <Link to="/Page" className="li">
                <Button variant="outline-primary btn-login">Page</Button>
              </Link>
            </li>
            <li>
              <Link to="/Materiel" className="li">
                <Button variant="outline-primary btn-login">
                  Camping Checklist{" "}
                </Button>
              </Link>
            </li>
            {/* <li>
                <Link to="/places" className="li">
                  <Button variant="outline-primary"> Best Places?</Button>
                </Link>
              </li> */}
            <li>
              <Link to="/camping" className="li">
                <Button variant="outline-primary btn-login">
                  {" "}
                  Why Camping?
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/Login" className="li">
                <Button variant="outline-primary btn-login">Login</Button>
              </Link>
            </li>
            <li>
              <Link to="/Register" className="li">
                <Button variant="outline-primary btn-login">Register</Button>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
