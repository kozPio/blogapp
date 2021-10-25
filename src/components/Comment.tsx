import '../stylesheets/Comment.scss'
import { useEffect, useState } from "react";
import convertDate from "../utils/convertDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX , faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {useMutation, gql} from "@apollo/client";
import NotificationModal from './NotificationModal';
import ModalUpdateComment from './ModalUpdateComment';


const DELETE_COMMENT = gql`
    mutation($id: ID!){
      deleteComment(id: $id){
        id
      }
    }
  `;


  const COMMENTS = gql`
    query{
      comments{
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
  `;

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


  interface CommentReturn {
    id: string;
  }

interface CommentProps {
    updatedAt: string;
    text: string;
    author: {
      name: string
    };
    user: boolean;
    id: string;
    post?: {
      id: string;
    }
}

const Comment:React.FC<CommentProps> = ({text, author, updatedAt, user, id, post })=> {

  const [openModal, setOpenModal]= useState(false);
  const [deleteError, setDeleteError]= useState<Error | null>(null);
  const [modalContent, setModalContent]= useState({id, text})

  const toggleModdal = () => {
    setOpenModal(!openModal)
  };

  


  const [deleteComment, { error, data }] = useMutation<
    { deleteComment: CommentReturn }, 
    { id: string } 
  >(DELETE_COMMENT, {
    variables: { id } , refetchQueries: [{query: COMMENTS}, { query: POST, variables: {id: post ? post.id : '' }} ], onError: (err) => {
      setDeleteError(err);
  } 
  });


 
  return ( <div className="comment-wrapper">
    <div className="comment-header">
      <p>{author.name}</p>
      <div className="comment-time">
        <p>{convertDate(updatedAt)[0]} {convertDate(updatedAt)[1]}</p>
        {user ? <div className="post-edit-icons"> <FontAwesomeIcon onClick={()=> deleteComment()} icon={faX} color="#FF6666"/> <FontAwesomeIcon onClick={()=> toggleModdal()} icon={faPenToSquare} color="#ffff9f"/> </div>: null }
      </div>  
    </div>
    <div className="comment-text">
      <p>{text}</p>
    </div>
    {openModal && <ModalUpdateComment modalContent={modalContent} show={openModal} toggleModal={(modal: boolean)=> setOpenModal(modal)} />}
    {deleteError && <NotificationModal modalContent={deleteError.message} toggleModal={(err: Error | null)=> setDeleteError(err)}/>}
     </div>)
}

export default Comment