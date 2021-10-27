import { useRef } from 'react';
import styled from 'styled-components';
import {MdClose} from 'react-icons/md';




interface ModalProps {
  modalContent: string;
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
  width: 300px;
  height: 200px;
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
  align-items: center;
  line-height: 1.8;
  background-color: #f0ece5;
  color: #FF6666;
  font-weight: bold;
  p {
    font-size 18px;
    margin-bottom: 20px;
  }
  div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .notification-button {
    font-size 14px;
    padding: 10px 15px;
    width: 100px;
    background: #f0ece5;
    color: #a99888;
    border: 1px solid #a99888;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
  }

  .notification-button:hover {
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




const NotificationModal:React.FC<ModalProps> = ({ modalContent, toggleModal}) => {

  const modalRef = useRef();

  

  const closeModal = () => {
    toggleModal(null);
  }


  const CloseModalOnOutsideClick = (e: React.MouseEvent) => {
    if(modalRef.current === e.target){
      toggleModal(null);
    }
  }


  return  (
    <BackGround ref={modalRef as any} onClick={CloseModalOnOutsideClick}>
      <ModalWrapper>
        <ModalContent>
          <div>
            <p>{modalContent}</p>
            <button onClick={()=> closeModal()} className="notification-button">ok</button>
          </div>
        </ModalContent>
        <CloseModalButton aria-label='Close modal' onClick={()=> closeModal()}/>
      </ModalWrapper>
    </BackGround>
  
  )
}


export default NotificationModal;
