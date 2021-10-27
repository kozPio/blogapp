import '../stylesheets/CommentsBox.scss';
import { useState, useEffect } from "react";
import  Comment  from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import ModalCreateComment from './ModalCreateComment';
import NotificationModal from './NotificationModal';

 
interface CommentProps {
  comments: [{
    id: string;
    updatedAt: string;
    text: string;
    author: {
      name: string
    };
}];
postId: string;
}


type Comm =   [{
  id: string;
  updatedAt: string;
  text: string;
  author: {
    name: string
  };
}];


const CommentBox:React.FC<CommentProps> = ({comments, postId})=> {

  const [openModal, setOpenModal]= useState(false);
  const [notLoggedInError, setNotLoggedInError]= useState<Error | null>(null);
  const [sortedComments, setSortedComments]=useState<Comm | null>(comments);
  const token = localStorage.getItem('token');


  useEffect(() => {
      if(comments){
        let preSorted = [...comments];
        let sorted = preSorted.reverse()
      //@ts-ignore
      setSortedComments(sorted)
      
      }
    
    
  }, [comments])

  const toggleModdal = () => {
    if(token){
      setOpenModal(!openModal)
    }else{
      let err =new Error('Plese Login to add a comment')
      setNotLoggedInError(err)
    }
    
  }
  
  return (<div className="comment-container">
    <div onClick={() => toggleModdal()} className="comments-createComment"><FontAwesomeIcon className="comments-plus" icon={faPlus} color="#a99888" />Add new comment</div>
    {sortedComments && sortedComments.map(comment => (
      <Comment user={false} text={comment.text} author={comment.author} updatedAt={comment.updatedAt} key={comment.id} id={comment.id} />
    ))}
    {openModal && <ModalCreateComment id={postId}  show={openModal} toggleModal={(modal: boolean)=> setOpenModal(modal)} />}
    {notLoggedInError && <NotificationModal modalContent={notLoggedInError.message} toggleModal={(err: Error | null)=> setNotLoggedInError(err)}/>}
  </div>)
}

export default CommentBox