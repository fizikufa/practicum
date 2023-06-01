import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import modalStyle from './modal.module.css';
  
interface IModalProps {
    onClick: () => void;
    title: string,
    isOpen: boolean,
    children: React.ReactNode
  };

const modalRoot = document.getElementById('modals')!;

const Modal = ({children, onClick, isOpen, title}:IModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e:KeyboardEvent) =>(e.key === 'Escape' ? onClick() : null)
    document.body.addEventListener('keydown', closeByEscape);
    return () => {
      document.body.removeEventListener('keydown', closeByEscape);  
    };
  }, [onClick, isOpen]);
  if (!isOpen) return null;

  return ReactDOM.createPortal (
    (
      <ModalOverlay onClick={onClick}>
        <div className={`pt-10 pr-10 pb-15 pl-10 ${modalStyle.container}`} onClick={(e) => e.stopPropagation()}>
          <div className={`pt-3 pb-3 ${modalStyle.header}`}>  
            <p className='text text_type_main-large'>{title}</p> 
            <button className={modalStyle.button_close} onClick={onClick}>
              <CloseIcon type='primary'/> 
            </button>
          </div>
          {children}
        </div>
      </ModalOverlay>
    ),
    modalRoot
  )    
}

export default Modal;