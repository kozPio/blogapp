import '../stylesheets/Comment.css'
import { useState } from "react";
import convertDate from "../utils/convertDate";


interface CommentProps {
    updatedAt: string;
    text: string;
    author: {
      name: string
    };
}

const Comment:React.FC<CommentProps> = ({text, author, updatedAt})=> {

 
  return ( <div className="comment-wrapper">
    <div className="comment-header">
      <p>{author.name}</p>
      <div className="comment-time">
        <p>{convertDate(updatedAt)[0]} {convertDate(updatedAt)[1]}</p>
      </div>  
    </div>
    <div className="comment-text">
      <p>{text}</p>
    </div>

    
    
     </div>)
}

export default Comment