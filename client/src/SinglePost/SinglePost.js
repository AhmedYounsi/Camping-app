/* eslint-disable */
import React, { useEffect, useState } from "react";
import "./SinglePost.css";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";
 
import Feedback from "./Feedback";
import { SetSingle } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";
function SinglePost() {
    const dispatch = useDispatch();
  const [SinglePost, setSinglePost] = useState([])  
  let { id } = useParams();
 const [Array, setArray] = useState([])
;

  useEffect(() => {
    dispatch(SetSingle([]));
    get_post()

  }, []);


  var Post = [];
  Post = useSelector((state) => state.SinglePost);
  const UserData = useSelector((state) => state.UserData)

  useEffect(() => {
    socket.on("LIKE_ONE", (data) => {
        dispatch(SetSingle(data));
    });
  }, [Array]);

  const LIKE = async (PostId) => {
    document.getElementById(PostId).disabled = true;
    let data = {
      PostId,
      UserId: UserData._id,
    };
 
    var arr = SinglePost;
    if (arr.likes.includes(UserData._id)) {
      var i = arr.likes.indexOf(UserData._id);
     arr.likes.splice(i, 1);
    } else {
      arr.likes.push(UserData._id);
    }
    dispatch(SetSingle([]));
    dispatch(SetSingle(arr));


    socket.emit("LIKE_ONE", data);
  };

  const get_post = () =>{
    axios
    .post("/single_post" , { id : id})
    .then(function (res) {
      
      setSinglePost(res.data)
      dispatch(SetSingle(res.data));
      setArray(res.data)
    
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const send_comment = (comment) => {

let data = {
  comment,
  UserData,
  post_id : Post._id
}
socket.emit("Comment",data)
  }


  return (
    <div>
 
      
       
       {
           Post.title &&
           <div className="post">
               <div className="owner">
                <i className="far fa-user-circle"></i>
                     {Post.owner} </div>
           <div className="img-content">
               <img src={Post.img} alt="" />
           </div>
           <div className="like-section">
                     <span className="like-count"> {Post.likes.length} </span>
 
                     <button
                       className="button-like"
                       id={Post._id}
                       onClick={() => LIKE(Post._id)}
                     >
                       {Post.likes.includes(UserData._id) ? (
                         <i
                           style={{ color: " #f44336" }}
                           className="fas fa-heart"
                         ></i>
                       ) : (
                         <i className="far fa-heart"></i>
                       )}
                     </button>
                   </div>
                   <Feedback send_comment={(comment)=> send_comment(comment)}  />
       </div>
      
       }
    </div>
  );
}

export default SinglePost;
