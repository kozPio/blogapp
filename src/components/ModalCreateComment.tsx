import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { MdClose } from 'react-icons/md';
import {CREATE_COMMENT, POST, COMMENTS} from '../gql';


interface CommentReturn {
  id: string;
  text: string;
  author: {
    name: string
  }
}

interface CommentProps {
  text: string;
  post: string;
}

interface ModalProps {
  show: boolean;
  toggleModal: any;
  id: string;
}

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;`

  const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0,0,0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  display: grid;
  grid-template-column: 1f 1f;
  z-index: 10;
  border-radius: 10px;

  @media only screen and (max-width: 1250px) {
    width: 600px
  }
   `;

   


const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 30px;
  line-height: 1.8;
  background-color: #f0ece5;
  color: #a99888;
  font-weight: bold;
  p {
    align-self: center;
    font-size 22px;
  }

  .comment-create-text{
    width: 90%;
    height: 50%;
    font-size: 18px;
    display: flex;
    flex-wrap: wrap;
    background: #f0ece5;
    resize: none;
  }

  
  .comment-create-footer{
    margin-top: 20px;
    display: flex;
    width: 90%;
    justify-content: flex-end;
  }

  .comment-error-message {
    font-size: 16px;
    color: #FFA500;
    margin-right: 10px;
  }

  button {
    font-size 14px;
    padding: 10px;
    background: #f0ece5;
    color: #a99888;
    border: 1px solid #a99888;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
  }

  button:hover {
    background-color: #a99888;
    color:  #f0ece5;
  }
`;



const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;




const ModalCreateComment:React.FC<ModalProps> = ({ id, show, toggleModal}) => {

  const [showModal, setShowModal]= useState<boolean>(show);
  const modalRef = useRef();

  const [newText, setNewText]=useState('');
  const [errorInput, seterrorInput]=useState<string | null>(null);
  const [CreateError, setCreateError]=useState<Error | null>(null);

  const closeModal = () => {
    toggleModal(!showModal)
  }

  const createAndClose =() => {
    if(newText.length >=5)
      {
        createComment();
        closeModal();
      } else{
        seterrorInput('Plese make sure your text has at least 5 charachters')
      }   
  }

  
  const [createComment, { error}] = useMutation<
    { createComment: CommentReturn },
    { props: CommentProps }
  >(CREATE_COMMENT, {
    variables: {  props: { text: newText, post: id } }, onError: (err) => {
      setCreateError(err)}, refetchQueries: [{query: POST, variables: {id}}, {query: COMMENTS}]
  });

  const CloseModalOnOutsideClick = (e: React.MouseEvent) => {
    if(modalRef.current === e.target){
      toggleModal(!showModal);
    }
  }

  if (error) return <p> {error.message}</p>;

  return  (
    <BackGround ref={modalRef as any} onClick={CloseModalOnOutsideClick}>
      <ModalWrapper>
        <ModalContent>
          <p>Add your comment</p>
          <label htmlFor="text">Comment text</label>
          <textarea className="comment-create-text" value={newText} onChange={(e)=> setNewText(e.target.value)}  name="text" />
           
          <div className="comment-create-footer">
            {errorInput && <p className="comment-error-message">{errorInput}</p>}
            <button onClick={()=> createAndClose()}>Create Comment</button>
          </div>
        </ModalContent>
        <CloseModalButton aria-label='Close modal' onClick={()=> closeModal()}/>
      </ModalWrapper>
    </BackGround>
  
  )
}


export default ModalCreateComment;
