import { useState } from "react"

interface CommentProps {
  text: string;
  author: string
}

const Comment:React.FC<CommentProps> = ({text, author})=> {

 
  return (<div>
    <p>{author}</p>
    <p>{text}</p>
  </div>)
}

export default Comment