import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';
import {MdClose} from 'react-icons/md';


const CREATE_POST = gql`
  mutation ( $props: CreatePostInput!) {
    createPost(data: $props) {
      id
      title
      published
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
  `


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
  `

interface PostReturn {
  id: string;
  title: string;
  published: boolean;
}

interface PostProps {
  title: string;
  published: boolean;
  body: string;
}

interface ModalProps {
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
  .post-create-body{
    width: 90%;
    height: 50%;
    font-size: 18px;
    display: flex;
    flex-wrap: wrap;
    background: #f0ece5;
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
  .post-create-footer{
    display: flex;
    width: 90%;
    justify-content: flex-end;
  }

  .post-error-message {
    font-size: 16px;
    color: #FFA500;
  }

  button {
    font-size 14px;
    padding: 5px 24px;
    background: #f0ece5;
    color: #a99888;
    border: 1px solid #a99888;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    max-height: 26px;
    min-width: 135px;
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




const ModalCreatePost:React.FC<ModalProps> = ({ show, toggleModal}) => {

  const [showModal, setShowModal]= useState<boolean>(show);
  const modalRef = useRef();

  const [newTitle, setNewTitle]=useState('');
  const [newBody, setNewBody]=useState('');
  const [newPublished, setNewPublished]= useState(false);
  const [errorLength, setErrorLength]=useState<string | null>(null);
  const [createError, setCreateError]= useState<Error | null>(null)

  const closeModal = () => {
    toggleModal(!showModal)
  }

  const createAndClose =() => {
    if(newBody.length >=10 && newTitle.length >=5)
      {
        createPost();
        closeModal();
      } else{
        setErrorLength('Plese make sure your title has at least 5  charchters and your post content has at least 10 charachters')
      }   
  }

  
  const [createPost, { error, data }] = useMutation<
    { createPost: PostReturn },
    { props: PostProps }
  >(CREATE_POST, {
    variables: {  props: { title: newTitle, published: newPublished, body: newBody } }, refetchQueries: [{query: POSTS} , {query: MY_POSTS} ], onError: (err) => {
      setCreateError(err);
  } 
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
          <p>Create your post</p>
          <label htmlFor="title">Post title</label>
          <input value={newTitle} onChange={(e)=> setNewTitle(e.target.value)} type="text" name="title" />
          <label htmlFor="body">Post content</label>
          <textarea className="post-create-body" value={newBody} onChange={(e)=> setNewBody(e.target.value)}  name="body" />
          <div className="post-checkbox">
            <label htmlFor="published">Should post be published</label>
            <input onChange={(e)=> setNewPublished(e.target.checked)} checked={newPublished}  type="checkbox" name="published" /> 
          </div> 
          <div className="post-create-footer">
            {errorLength && <p className="post-error-message">{errorLength}</p>}
            <button onClick={()=> createAndClose()}>Create Post</button>
          </div>
        </ModalContent>
        <CloseModalButton aria-label='Close modal' onClick={()=> closeModal()}/>
      </ModalWrapper>
    </BackGround>
  
  )
}


export default ModalCreatePost;
