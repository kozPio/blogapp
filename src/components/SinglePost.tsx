import '../stylesheets/Post.css'
import CommentBox from './CommentBox';
import {useQuery, gql} from "@apollo/client";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import convertDate from '../utils/convertDate';


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




const POST = gql`
    query($id: ID!) {
      post(id: $id) {
        id
        title
        body
        published
        author {
          name
        }
        updatedAt
        comments {
          id
          updatedAt
          text
          author {
            name
          }
        }
    }
  }
  `

interface PostId {
  id: string;
}

interface LocationProps {
  id: string;
}

const SinglePost: React.FC = () => {

  const location = useLocation<LocationProps>();
  const [openModal, setOpenModal]= useState(false);
  const [id, setId] = useState(location.state.id );
  const [postError, setPostError]=useState<Error | null>(null);




  

  const {loading, error, data } = useQuery<Post>(POST, {variables: {id}, onError: (err) => {
    setPostError(err)}});


  return <div className="single-post-window"><div className="single-post-container">
    {data && <div className="single-post-wrapper"><div className="post-header">
      <p>{data.post.author.name}</p>
      <p>{data.post.title}</p>
      <div className="post-edit">
        <p>{convertDate(data.post.updatedAt)[0]} {convertDate(data.post.updatedAt)[1]}</p>
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