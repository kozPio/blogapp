import '../stylesheets/Post.scss'
import CommentBox from './CommentBox';
import {useQuery} from "@apollo/client";
import { useState } from 'react';
import convertDate from '../utils/convertDate';
import Loading from '../utils/Loading';
import {useParams} from 'react-router-dom';
import {POST} from '../gql';


interface PostProps {
  title: string;
  body: string;
  author: {
    name: string
  };
  id: string;
  published: boolean;
  updatedAt: string; 
  comments: [{
  id: string;
  updatedAt: string;
  text: string;
  author: {
    name: string
  };
}] 

}

interface Post {
  post: PostProps;
}



const SinglePost: React.FC = () => {

  
  const [postError, setPostError]=useState<Error | null>(null);
  const {id}= useParams<{id?: string}>();


 
  

  const {loading, error, data } = useQuery<Post>(POST, {variables: {id}, onError: (err) => {
    setPostError(err)}});


  if (loading) return <div className="single-post-window"><Loading /></div> ;
  if (error) return <p>Error :(</p>;
  return <div className="single-post-window"><div className="single-post-container">
    {data && <div className="single-post-wrapper"><div className="post-header">
      <p>{data.post.author.name}</p>
      <p>{data.post.title}</p>
      <div className="post-edit">
        <p>{convertDate(data.post.updatedAt)}</p>
      </div>  
    </div>
    <div className="post-body">
      <p>{data.post.body}</p>
    </div>

    
    
     </div>}
    
    
  </div>
    {data && <CommentBox postId={data.post.id} comments={data.post.comments}/>}
  </div>

}


export default SinglePost;


//here