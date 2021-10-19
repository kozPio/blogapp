import { useState } from "react";
import  Comment  from "./Comment";

const CommentBox:React.FC = ()=> {

  const [comments, setComments]= useState([{text: "Nice post man", author: "John"}, {text: "I don't like you", author: "Anastasia"}, {text: "Hello there", author: "Alfred"}])

  return (<div>
    {comments && comments.map(comment => (
      <Comment text={comment.text} author={comment.author} />
    ))}

  </div>)
}

export default CommentBox