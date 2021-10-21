import '../stylesheets/Posts.css'
import {
  useQuery,
  gql
} from "@apollo/client";
import { useState } from "react";
import Post from './Post';

const MY_POSTS = gql`
    query {
      myPosts {
        id
        title
        body
        published
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
  myPosts: PostProps[];
}

let x = [{title: "My title", body:"My new body", id: "1", published: true, author: {name: "John"} }, {title: "SECOND tITE", body:"My new body SECOND", id: "2", published: true, author: {name: "Adam"} } ]

const Posts: React.FC= () => {

  //const { loading, error, data  } = useQuery<Users>(GET_USERS);

  const [data1,setData1]=useState<PostProps[]>(x)

  const {loading, error, data } = useQuery<Posts>(MY_POSTS);
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (<div className="posts-container">
    {data1 && data1.map(({title, id, body, author})=> (
      <Post body={body} title={title} author={author}  id={id} />
    ))}
    
  </div>)

}

export default Posts;