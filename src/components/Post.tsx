import '../stylesheets/Post.css'
import CommentBox from './CommentBox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX , faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {useMutation, gql} from "@apollo/client";
import { useState } from 'react';
import Modal from './Modal';


interface PostProps {
  title: string;
  body: string;
  author: {
    name: string
  };
  id: string;
  user: boolean;
  published: boolean
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
`

interface PostId {
  id: string;
}


interface ModuleProps {
  [key: string]: string;
}

const Post: React.FC<PostProps> = ({title, body, author, id, user, published}) => {

  const [openModal, setOpenModal]= useState(false);
  const [modalContent, setModalContent]=useState<ModalProps>({id, title, body, published});


  const toggleModdal = () => {
    setOpenModal(!openModal)
  }

  const [deletePost, { error, data }] = useMutation<
    { deletePost: PostId }, // sets what is returned from this mutation what props can I access on data after mutation (if those props exist)
    { id: string } 
  >(DELETE_POST, {
    variables: { id } // Variables are implementing interface of LOginData
  });


  return <div className="post-container" key={id}>
    <div className="post-header">
      <p>{author.name}</p>
      <p>{title}</p>
      <div className="post-edit">
        <p>2010-20-10</p>
        {user ? <div className="post-edit-icons"> <FontAwesomeIcon onClick={()=> deletePost()} icon={faX} color="#FF6666"/> <FontAwesomeIcon onClick={()=> toggleModdal()} icon={faPenToSquare} color="#ffff9f"/> </div>: null }
      </div>
      
      
    </div>
    <div className="post-body">
      <p>{body}</p>
      <button>read more</button>
    </div>
    {openModal && <Modal modalContent={modalContent} show={openModal} toggleModal={(modal: boolean)=> setOpenModal(modal)} />}
    {/* <CommentBox /> */}
  </div>

}


export default Post;