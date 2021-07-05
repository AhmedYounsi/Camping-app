import React from 'react'
import "./commentsList.css"
function CommentsList(props) {

    if (props.allComments === true) {
        return (
            <div className="comments-list">
                <ul className="list-group-comment">
                    {props.comments.map(e => (
                        <li className="list-group-item-comment">
                            <img className="comment-user-image" src={`http://localhost:5000/${e.writer.image}`} />
                          <p className="comment-content" style={{textAlign:"start"}}> {e.content}</p> 
                        </li>
                    ))}
                </ul>
            </div>
        )
    } else {
        if(props.comments.length >= 2) {
            return (
                <div>
                    <div className="comments-list">
                        <ul className="list-group-comment">
                            <li className="list-group-item-comment">
                                <img className="comment-user-image" src={`http://localhost:5000/${props.comments[props.comments.length - 2].writer.image}`}/>
                                <p className="comment-content" style={{textAlign:"start"}}>  {props.comments[props.comments.length - 2].content} </p>
                            </li>
                        </ul>
                    </div>
                    <div className="comments-list">
                        <ul className="list-group-comment">
                            <li className="list-group-item-comment">
                                <img className="comment-user-image" src={`http://localhost:5000/${props.comments[props.comments.length - 1].writer.image}`} />
                                <p className="comment-content" style={{textAlign:"start"}}>   {props.comments[props.comments.length - 1].content} </p>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        } else if(props.comments.length === 1) {
            return (
                <div>
                    <div className="comments-list">
                        <ul className="list-group-comment">
                            <li className="list-group-item-comment">
                                <img className="comment-user-image" src={`http://localhost:5000/${props.comments[props.comments.length - 1].writer.image}`}/>
                                <p className="comment-content" style={{textAlign:"start"}}>   {props.comments[props.comments.length - 1].content} </p>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default CommentsList