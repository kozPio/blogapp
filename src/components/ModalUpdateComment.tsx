import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';
import {MdClose} from 'react-icons/md';


const UPDATE_COMMENT = gql`
  mutation ($id: ID!, $props: UpdateCommentInput!) {
    updateComment(id: $id, data: $props) {
      id
      text
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
      }
    }
  `;

interface CommentReturn {
  id: string;
  text: string
}

interface CommentProps {
  text: string
}

interface ModalProps {
  modalContent: {
    id: string;
    text: string
  }
  show: boolean;
  toggleModal: any;
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
  height: 300px;
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

  input{
    width: 90%;
    font-size: 18px;
    margin-bottom: 10px;
    background-color: #f0ece5;
  }
  .post-body{
    width: 90%;
    height: 50%;
    font-size: 18px;
    display: flex;
    flex-wrap: wrap;
    resize: none;
  }


  button {
    padding: 10px 24px;
    background: #f0ece5;
    color: #a99888;
    border: 1px solid #a99888;
    border-radius: 8px;
    cursor: pointer;
    align-self: flex-end;
    margin: 15px;
  }

  button:hover {
    background-color: #a99888;
    color:  #f0ece5;
  }
`;


const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: fixed;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;




const ModalUpdateComment:React.FC<ModalProps> = ({modalContent, show, toggleModal}) => {

  const [showModal, setShowModal]= useState<boolean>(show);
  const modalRef = useRef();
  const {id, text} = modalContent;

  const [newText, setNewText]=useState(text);
  const [updateError, setUpdateError]= useState<Error | null>(null)


  const closeModal = () => {
    toggleModal(!showModal)
  }

  const updateAndClose =() => {
    updateComment();
    closeModal();
  }

  
  const [updateComment] = useMutation<
    { updateComment: CommentReturn },
    { id: string; props: CommentProps }
  >(UPDATE_COMMENT, {
    variables: { id, props: { text: newText} }, refetchQueries: [{query: COMMENTS} ], onError: (err) => {
      setUpdateError(err); }
  });

  const CloseModalOnOutsideClick = (e: React.MouseEvent) => {
    if(modalRef.current === e.target){
      toggleModal(!showModal);
    }
  }

  return  (
    <BackGround ref={modalRef as any} onClick={CloseModalOnOutsideClick}>
      <ModalWrapper>
        <ModalContent>
          <p>Update your Comment</p>
          <label htmlFor="body">Comment text</label>
          <textarea className="post-body" value={newText} onChange={(e)=> setNewText(e.target.value)}  name="body" />
          <button onClick={()=> updateAndClose()}>Update Comment</button>
        </ModalContent>
        <CloseModalButton aria-label='Close modal' onClick={()=> closeModal()}/>
      </ModalWrapper>
    </BackGround>
  
  )
}


export default ModalUpdateComment;
