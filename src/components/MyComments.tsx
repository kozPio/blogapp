import '../stylesheets/MyComments.scss'
import {
  useQuery,
  gql
} from "@apollo/client";
import { useEffect, useState } from "react";
import Loading from  '../utils/Loading';
import Comment from './Comment';
import jwt from 'jsonwebtoken';




const COMMENTS = gql`
    query{
      comments {
        id
        text
        author {
          id
          name
        }
        updatedAt
        post {
          id
        }
      }
    }
  `


interface CommentProps {
  text: string;
  id: string;
  author: {
    id: string;
    name: string
  };
  updatedAt: string
  post: {
    id: string;
  }
}

interface Comments {
  comments: CommentProps[];
}



const MyComments: React.FC= () => {

  
  const [openModal, setOpenModal]= useState(false);
  const token = localStorage.getItem('token');
  const [comments, setComments ] = useState<CommentProps[]>([]);

  const toggleModdal = () => {
    setOpenModal(!openModal)
  }


  const {loading, error, data } = useQuery<Comments>(COMMENTS);


  useEffect(()=> {
    if(data && token) {
      let userID = jwt.decode(token);
      //@ts-ignore
      let id =userID.userId;

      let commentsArray= data.comments.filter((comment)=> comment.author.id === id)
      setComments(commentsArray);  
    }

  },[data])
 
  if (loading) return <div className="comments-container"><Loading /></div> ;
  if (error) return <p>Error :(</p>;
  return (<div className="comments-container">
    {comments && comments.map(({text, id, author, updatedAt, post})=> (
      <Comment user={true} updatedAt={updatedAt}   text={text} author={author}  key={id} id={id} post={post}  />
    ))}
  </div>)

}

export default MyComments;