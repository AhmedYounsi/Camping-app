import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import io from "socket.io-client";
const socket = io("http://localhost:5000");
function Feedback(props) {
  var Post = [];
  Post = useSelector((state) => state.SinglePost);
  const UserData = useSelector((state) => state.UserData);

  const [comment, setcomment] = useState("")
  const [commentArr, setcommentArr] = useState([])
  const [All_comm, setAll_comm] = useState([])
   useEffect(() => {
    socket.emit("GET_COMMENT",Post._id)
    socket.on("Comment",data =>{
      if(!data) return
      setAll_comm(data)
     
      setcommentArr(data.comment.reverse())
    })
   }, [])

 

  const commenter = () => {
    if(comment.length ==0 ) return
    props.send_comment(comment)
    setcomment('')
  }

  const del_comm = (comment_id) =>{
    let data = {
      comment_id,
      post_id : Post._id
    }
socket.emit("DELETE_COMM",data)
  }

    return (
        <div style={{ marginBottom:50 }}>
            <textarea
            placeholder="Comments.."
            value={comment}
         onChange={(e) => setcomment(e.target.value)}
         className="comment-input" name="" id=""  rows="3"></textarea>
         <button className="comment-btn" onClick={()=> commenter()} style={{marginBottom:20}}>Comment</button>
     


       {
         commentArr.map((post) => (
           <div key={post.comment_id} className="">
                    <ul style={{padding : 0}} id="comments-list" className="comments-list">
      <li style={{margin : 0}}>
        <div className="comment-main-level">
       
        
          <div className="comment-box">
            <div className="comment-head">
              <h6 className="comment-name by-author"><a href="http://creaticode.com/blog">  { post.author_name }</a></h6>
          
             {
                   (post.author_id === UserData._id || UserData.email === "Benzeinebsamar@gmail.com") &&
                   <i
                   onClick={()=> del_comm(post.comment_id) }
                className="fas fa-trash-alt">
  
                </i>

             }
 
          
            </div>
            <div style={{textAlign:'left'}} className="comment-content">
             { post.text }
                 </div>
          </div>
        </div>
        </li>
        </ul>
           </div>
        ))
       }
     
        </div>
    )
}

export default Feedback
