import '../stylesheets/Posts.css'
import {
  useQuery,
  gql
} from "@apollo/client";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router';
import Post from './Post';
import truncate from '../utils/turncate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus} from '@fortawesome/free-solid-svg-icons';


const POSTS = gql`
    query {
      posts {
        id
        title
        body
        published
        author {
          name
        }
      }
    }
  `


  const MY_POSTS = gql`
    query {
      myPosts {
        id
        title
        body
        published
        author {
          name
        }
      }
    }
  `

const GET_USERS = gql`
    query {
      users {
        id
        name
      }
    }
    `

interface UserProps {
  name: string;
  id: string
}

interface Users {
  users: UserProps[];
}


interface PostProps {
  title: string;
  id: string;
  body: string;
  published: boolean
  author: {
    name: string
  }
}

interface Posts {
  posts: PostProps[];
}

interface MyPosts {
  myPosts: PostProps[];
}

interface locationProps {
  user: boolean;
}

//let x = [{title: "My title", body: text, id: "1", published: true, author: {name: "John"} }, {title: "SECOND tITE", body: text, id: "2", published: true, author: {name: "Adam"} } ]

const Posts: React.FC= () => {

  //const { loading, error, data  } = useQuery<Users>(GET_USERS);
  const location = useLocation<locationProps>();
  const [posts, setPosts]=useState(POSTS);
  const [user, setUser]=useState(location.state?.user || false)
  

  useEffect(()=> {
      if(user) {
        setPosts(MY_POSTS)
      }else{
        setPosts(POSTS)
      }
   
  }, [user])


  useEffect(()=> {
    if(location.state){
      setUser(location.state.user)
    }
    
 
  }, [location])


  const {loading, error, data } = useQuery<Posts | MyPosts>(posts);
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (<div className="posts-container">
    <div className="posts-createPost"><FontAwesomeIcon className="posts-plus" icon={faPlus} color="#a99888" />Create Post</div>
    {data && ('posts' in data) && data.posts.map(({title, id, body, author, published})=> (
      <Post published={published} user={false} body={truncate(body)} title={title} author={author}  id={id} />
    ))}
    {data && ('myPosts' in data) && data.myPosts.map(({title, id, body, author, published})=> (
      <Post published={published} user={true} body={truncate(body)} title={title} author={author}  id={id} />
    ))}
    
  </div>)

}

export default Posts;