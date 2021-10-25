import '../stylesheets/Posts.scss'
import {
  useQuery,
  gql
} from "@apollo/client";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router';
import Post from './Post';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import ModalCreatePost from './ModalCreatePost';
import Loading from  '../utils/Loading';




const POSTS = gql`
    query($first: Int $skip: Int) {
      posts(first: $first skip: $skip orderBy: updatedAt_DESC) {
        id
        title
        body
        published
        author {
          name
        }
        updatedAt
      }
    }
  `


  const MY_POSTS = gql`
    query ($first: Int $skip: Int) {
      myPosts(first: $first skip: $skip orderBy: updatedAt_DESC) {
        id
        title
        body
        published
        author {
          name
        }
        updatedAt
      }
    }
  `



interface PostProps {
  title: string;
  id: string;
  body: string;
  published: boolean
  author: {
    name: string
  };
  updatedAt: string
}

interface Posts {
  posts: PostProps[];
}

interface MyPosts {
  myPosts: PostProps[];
}

interface LocationProps {
  user: boolean;
}



const Posts: React.FC= () => {

  //const { loading, error, data  } = useQuery<Users>(GET_USERS);
  const location = useLocation<LocationProps>();
  const [posts, setPosts]=useState(POSTS);
  const [user, setUser]=useState(location.state?.user || false)
  const [openModal, setOpenModal]= useState(false);
  const [howMuchSkip, setHowMuchSkip]=useState(0)


  const toggleModdal = () => {
    setOpenModal(!openModal)
  }
  

  useEffect(()=> {
    if(user) {
      setPosts(MY_POSTS)
    }else{
      setPosts(POSTS)
    }
    setHowMuchSkip(0);
}, [user])


  useEffect(()=> {
    if(location.state){
      setUser(location.state.user)
    }
    
 
  }, [location])


  const {loading, error, data, fetchMore } = useQuery<Posts | MyPosts>(posts, {
    variables: { first: 5, skip: 0 },
  });


  const loadMore = () => {
    setHowMuchSkip(howMuchSkip+5)
    console.log(howMuchSkip)
    //@ts-ignore
    fetchMore({variables: {skip: howMuchSkip+5}, updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) return prev;
      if('posts' in prev && 'posts' in fetchMoreResult){
        return {
          ...prev,
          posts: [...prev.posts, ...fetchMoreResult.posts]
        }
      }else if('myPosts' in prev && 'myPosts' in fetchMoreResult) {
        return {
          ...prev,
          posts: [...prev.myPosts, ...fetchMoreResult.myPosts]
        }
      }
      
    }
  })
    
  }
 
  if (loading) return <div className="posts-container"><Loading /></div> ;
  if (error) return <p>Error :(</p>;
  return (<div className="posts-container">
    {data && ('posts' in data) && data.posts.map(({title, id, body, author, published, updatedAt})=> (
      <Post updatedAt={updatedAt} published={published} user={false} body={body} title={title} author={author}  id={id} key={id} />
    ))}
    {data && ('myPosts' in data) &&
      <div onClick={() => toggleModdal()} className="posts-createPost"><FontAwesomeIcon className="posts-plus" icon={faPlus} color="#a99888" />Create Post</div>
    }
    {data && ('myPosts' in data) && data.myPosts.map(({title, id, body, author, published, updatedAt})=> (
      <Post updatedAt={updatedAt} published={published} user={true} body={body} title={title} author={author}  id={id} key={id}/>
    ))}
    <div onClick={()=> loadMore() } className="posts-createPost">Fetch More<FontAwesomeIcon className="posts-arrow" icon={faAngleDown} color="#a99888" /></div>
    {openModal && <ModalCreatePost  show={openModal} toggleModal={(modal: boolean)=> setOpenModal(modal)} />}
  </div>)

}

export default Posts;