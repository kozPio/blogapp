import '../stylesheets/Posts.scss'
import {
  useQuery
} from "@apollo/client";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router';
import Post from './Post';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import ModalCreatePost from './ModalCreatePost';
import Loading from  '../utils/Loading';
import { useParams } from 'react-router-dom';
import {POSTS, MY_POSTS} from '../gql';


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

interface PostsProps {
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
  const [howMuchSkip, setHowMuchSkip]=useState(0);
  const {time} = useParams<{time?: string}>();
  const [order, setOrder]=useState('updatedAt_DESC');
  const [howMuchLoad, setHowMuchLoad]=useState(5);


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
  if(time === 'old' || time === 'latest') {
    if(time === 'old'){
      setOrder('updatedAt_ASC')
      setHowMuchLoad(5)
    }
    if(time === 'latest'){
      setOrder('updatedAt_DESC')
      setHowMuchLoad(1)
    }
    
  }else{
    setOrder('updatedAt_DESC')
    setHowMuchLoad(5)
  }
  setHowMuchSkip(0);
}, [time])


  useEffect(()=> {
    if(location.state){
      setUser(location.state.user)
    }
    
 
  }, [location])


  const {loading, error, data, fetchMore } = useQuery<PostsProps | MyPosts>(posts, {
    variables: { first: howMuchLoad, skip: 0, orderBy: order},
  });


  const loadMore = () => {
    let x = howMuchSkip;
    if(time === 'latest'){
      x+=1;
      setHowMuchSkip(x)
    }else {
      x+=5;
      setHowMuchSkip(x)
    }
    //@ts-ignore
    fetchMore({variables: {skip: x}, updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) return prev;
      if('posts' in prev && 'posts' in fetchMoreResult){
        return {
          ...prev,
          posts: [...prev.posts, ...fetchMoreResult.posts]
        }
      }else if('myPosts' in prev && 'myPosts' in fetchMoreResult) {
        return {
          ...prev,
          myPosts: [...prev.myPosts, ...fetchMoreResult.myPosts]
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