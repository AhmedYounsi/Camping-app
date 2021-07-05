/* eslint-disable */
import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import axios from "axios";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useSelector, useDispatch } from "react-redux";

import "./index.css";
import io from "socket.io-client";
import { SetData } from "../../actions";
import NewPost from "../NewPost/NewPost";
const socket = io("http://localhost:5000");

export const places = () => {
  const dispatch = useDispatch();

  const [Array, setArray] = useState([]);
  const [DisableLIKE, setDisableLIKE] = useState(false);
  const UserData = useSelector((state) => state.UserData);
  const [Modal, setModal] = useState(false);

  var Posts = [];
  Posts = useSelector((state) => state.Posts);

  useEffect(() => {
    GetPosts();
  }, []);

  useEffect(() => {
    socket.on("LIKE", (data) => {
      dispatch(SetData(data));
    });
  }, [Array]);

  const LIKE = async (PostId) => {
    document.getElementById(PostId).disabled = true;
    let data = {
      PostId,
      UserId: UserData._id,
    };

    const index = Posts.findIndex((el) => el._id === PostId);
    var arr = Posts;
    if (arr[index].likes.includes(UserData._id)) {
      var i = arr[index].likes.indexOf(UserData._id);
      if (index !== -1) arr[index].likes.splice(i, 1);
    } else {
      arr[index].likes.push(UserData._id);
    }
    dispatch(SetData([]));
    dispatch(SetData(arr));

    socket.emit("LIKE", data);
  };

  const show_modal = () => {
    setModal(true);
  };

  const GetPosts = () => {
    axios
      .get("http://localhost:5000/get_posts")
      .then(function (res) {
        // handle success
        dispatch(SetData(res.data));
        setArray(res.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <div>
      <div onClick={() => show_modal()} className="ADD">
        <i className="fas fa-plus"></i>
      </div>
      {Modal && <NewPost HideModal={() => setModal(false)} />}
      <div>
        <h2>Let's Go Camping </h2>
        <h4> Welcom! </h4>

        <ResponsiveMasonry
          style={{ minHeight: "70vh", margin: 20 }}
          columnsCountBreakPoints={{ 450: 1, 550: 2, 900: 3 }}
        >
          <Masonry>
            {Posts.map((post) => (
              <div key={post._id} className="">
                <div className="single-post">
                <div className="owner">
                <i className="far fa-user-circle"></i>
                     {post.owner} </div>
                  <img className="img-places" src={post.img} alt="" />
                  <div className="desc"> 
                  {
                      post.description.length > 0 ? post.description : 
                      <p className="no-desc">No description</p>
                  }
                   </div>
                  <div className="like-section">
                    <span className="like-count"> {post.likes.length} </span>

                    <button
                      className="button-like"
                      id={post._id}
                      onClick={() => LIKE(post._id)}
                    >
                      {post.likes.includes(UserData._id) ? (
                        <i
                          style={{ color: " #f44336" }}
                          className="fas fa-heart"
                        ></i>
                      ) : (
                        <i className="far fa-heart"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>

        <Footer />
      </div>
    </div>
  );
};
