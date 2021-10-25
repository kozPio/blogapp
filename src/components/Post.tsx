import '../stylesheets/Post.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX , faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {useMutation, gql} from "@apollo/client";
import { useState } from 'react';
import ModalUpdatePost from './ModalUpdatePost';
import { Link } from 'react-router-dom';
import truncate from '../utils/turncate';
import convertDate from '../utils/convertDate';
import NotificationModal from './NotificationModal';


interface PostProps {
  title: string;
  body: string;
  author: {
    name: string
  };
  id: string;
  user: boolean;
  published: boolean;
  updatedAt: string
}


interface ModalProps {
  title: string;
  body: string;
  id: string;
  published: boolean
}



const DELETE_POST = gql`
mutation($id: ID!) {
deletePost(
  id: $id
) {
  id
}
}
`;


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
        updatedAt
      }
    }
  `;


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
        updatedAt
      }
    }
  `;

interface PostId {
  id: string;
}


interface ModuleProps {
  [key: string]: string;
}

const Post: React.FC<PostProps> = ({title, body, author, id, user, published, updatedAt}) => {

  const [openModal, setOpenModal]= useState(false);
  const [modalContent, setModalContent]=useState<ModalProps>({id, title, body, published});
  const [deleteError, setDeleteError]= useState<Error | null>(null)

  const toggleModdal = () => {
    setOpenModal(!openModal)
  }

  const [deletePost, { error, data }] = useMutation<
    { deletePost: PostId }, // sets what is returned from this mutation what props can I access on data after mutation (if those props exist)
    { id: string } 
  >(DELETE_POST, {
    variables: { id } , refetchQueries: [{query: POSTS} , {query: MY_POSTS} ], onError: (err) => {
      setDeleteError(err);
  } 
  });


  return <div className="post-container" key={id}>
    <div className="post-header">
      <p>{author.name}</p>
      <p>{title}</p>
      <div className="post-edit">
        <p>{convertDate(updatedAt)[0]} {convertDate(updatedAt)[1]}</p>
        {user ? <div className="post-edit-icons"> <FontAwesomeIcon onClick={()=> deletePost()} icon={faX} color="#FF6666"/> <FontAwesomeIcon onClick={()=> toggleModdal()} icon={faPenToSquare} color="#ffff9f"/> </div>: null }
      </div>
      
      
    </div>
    <div className="post-body">
      <p>{truncate(body)}</p>
      <Link className="post-body-read-more" to={{
            pathname: "/post",
            state: {
              id
            }
          }}>
        <button>read more</button>
      </Link>
      
    </div>
    {openModal && <ModalUpdatePost modalContent={modalContent} show={openModal} toggleModal={(modal: boolean)=> setOpenModal(modal)} />}
    {deleteError && <NotificationModal modalContent={deleteError.message} toggleModal={(err: Error | null)=> setDeleteError(err)}/>}
  </div>

}


export default Post;