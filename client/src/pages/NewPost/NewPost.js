/* eslint-disable */
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetData } from "../../actions";
import "./NewPost.css";

function NewPost(props) {
  const [ImageURI, setImageURI] = useState(null);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [Description, setDescription] = useState("")

  var Posts = (Posts = useSelector((state) => state.Posts));
  const TokenReducer = useSelector((state) => state.TokenReducer);
  const UserData = useSelector((state) => state.UserData);

  const previewFile = () => {
    var preview = document.querySelector("img");
    var file = document.querySelector("input[type=file]").files[0];

    var reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        preview.src = reader.result;
        setImageURI(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const upload = () => {
    const data = {
      ImageURI,
      user: UserData.firstname,
      user_id: UserData._id,
      description : Description
    };

    const options = {
      headers: {
        Authorization: TokenReducer,
      },
    };
    setLoading(true);
    axios
      .post("/new_post", data, options)
      .then((res) => {
        props.HideModal();
        dispatch(SetData([]));
        dispatch(SetData(res.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        props.HideModal();
      });
  };

  const image_input = () =>{
      var input = document.querySelector('.input')
      input.click()
  }
  return (
    <div className="modal-new">
      <div onClick={() => props.HideModal()} className="modal-hide">
        X
      </div>
      <div className="modal-title">NEW POST</div>
      <button className="btn-upload" style={{ width:170 }} onClick={() => image_input()}>
      <i style={{ fontSize:27 ,marginRight:15}} className="fas fa-camera-retro"></i>
        <div>IMPORT</div>
      </button>
      <input
        className="input"
        style={{ color: "white",display:'none' }}
        type="file"
        onChange={() => previewFile()}
      />
      <img
        style={{ display: !ImageURI ? "none" : "block" }}
        className="display-img"
        src=""
        alt="Aperçu de l’image..."
      ></img>
      {ImageURI && (
        
        <div>
          <textarea
          value={Description}
           onChange={(e) =>  setDescription(e.target.value)}
          placeholder="Description" name="" id="" cols="38" rows="2"></textarea>
          <div style={{ display:"flex",justifyContent:'center' }}>
          <button className="btn-upload" onClick={() => upload()}>
            { Loading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div>
                <i className="fas fa-upload"></i>
                UPLOAD
              </div>
            )}
          </button>
        
          </div>
          
        </div>
      )}
    </div>
  );
}

export default NewPost;
