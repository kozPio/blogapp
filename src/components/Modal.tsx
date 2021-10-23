import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';


const UPDATE_POST = gql`
  mutation ($id: ID!, $props: UpdatePostInput!) {
    updatePost(id: $id, data: $props) {
      id
      title
      published
    }
  }
`;

interface PostReturn {
  id: string;
  title: string;
  published: boolean;
}

interface PostProps {
  title?: string;
  published?: boolean;
  body?: string;
}

interface ModalProps {
  modalContent: {
    title: string;
    body: string;
    id: string;
    published: boolean;
  }
  show: boolean;
  toggleModal: any;
}

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, 0.8);
  position: absolute;
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

  .post-checkbox{
    display: flex;
  }

  .post-checkbox input {
    margin-top: 8px;
    width: 15px;
    height: 15px;
    margin-left: 15px;
  }

  button {
    padding: 10px 24px;
    background: #f0ece5;
    color: #a99888;
    border: 1px solid #a99888;
    border-radius: 8px;
    cursor: pointer;
    align-self: flex-end;
    margin-right: 15px;
  }

  button:hover {
    background-color: #a99888;
    color:  #f0ece5;
  }
`;


const CloseModalX = styled.div`
`

const CloseModalButton = styled(CloseModalX)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;




const Modal:React.FC<ModalProps> = ({modalContent, show, toggleModal}) => {

  const [showModal, setShowModal]= useState<boolean>(show);
  const modalRef = useRef();
  const {id, title, body, published} = modalContent;

  const [newTitle, setNewTitle]=useState(title);
  const [newBody, setNewBody]=useState(body);
  const [newPublished, setNewPublished]= useState(published);

  const closeModal = () => {
    toggleModal(!showModal)
  }

  const updateAndClose =() => {
    updatePost();
    closeModal();
  }

  
  const [updatePost, { error, data }] = useMutation<
    { deletePost: PostReturn },
    { id: string; props: PostProps }
  >(UPDATE_POST, {
    variables: { id, props: { title: newTitle, published: newPublished, body: newBody } }, // Variables are implementing interface of LOginData
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
          <p>Update your post</p>
          <label htmlFor="title">Post title</label>
          <input value={newTitle} onChange={(e)=> setNewTitle(e.target.value)} type="text" name="title" />
          <label htmlFor="body">Post content</label>
          <textarea className="post-body" value={newBody} onChange={(e)=> setNewBody(e.target.value)}  name="body" />
          <div className="post-checkbox">
            <label htmlFor="published">Is post published</label>
            <input onChange={(e)=> setNewPublished(e.target.checked)} checked={newPublished}  type="checkbox" name="published" /> 
          </div> 
          <button onClick={()=> updateAndClose()}>Update Post</button>
        </ModalContent>
        <CloseModalButton aria-label='Close modal' onClick={()=> closeModal()}/>
      </ModalWrapper>
    </BackGround>
  
  )
}


export default Modal;
