/* eslint-disable */

import React , {useEffect} from "react";
import './App.css';
import Feed from "./pages/Feed";
import Home from "./pages/Home/Home";
import Login from "./pages/connect/Login";
import NavBar from "./NavBar";
import Register from "./pages/connect/Register";
import PrivateRoute from "./PrivateRoute";
import { Materiel } from "./pages/Materiel/Materiel";
import { places } from "./pages/Places/places";
import camping from "./pages/Camping/camping";
import { SetToken,GetUserData } from "./actions/index";
import {BrowserRouter as Router ,Route,Switch,useHistory,useLocation  } from 'react-router-dom'
// eslint-disable-next-line
import { useSelector, useDispatch } from "react-redux";
import SinglePost from "./SinglePost/SinglePost";

function App() {
  const dispatch = useDispatch();
 

 

useEffect(() => {
 
 
  const token = localStorage.getItem('TOKEN')
  const user  = JSON.parse(localStorage.getItem("user_data"));

  if(token)
 {
   
  dispatch(SetToken(token));
  dispatch(GetUserData(user));
 }
 
}, [])


  return ( 
  <Router>
    <NavBar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route  exact path="/Register" component={Register}/>
        <PrivateRoute  exact path="/Feed" component={Feed}/>
        <Route  exact path="/Login" component={Login}/>
        <Route  exact path="/Materiel" component={Materiel}/>
        <Route  exact path="/places" component={places}/>
        <Route  exact path="/camping" component={camping}/>
        <Route  exact path="/post/:id" component={SinglePost}/>



      </Switch>
    </Router>
  );
}

export default App;
