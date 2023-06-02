import React, {useEffect} from 'react';
import { createPortal } from 'react-dom';
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

  return isOpen && createPortal(
    <div className={modalStyle.container}>
        <div className={modalStyle.modal}>
            <div className={modalStyle.close + " mt-10 mr-10"} onClick={onClick}><CloseIcon type="primary" /></div>
            <p className={modalStyle.title}>{title}</p>
            {children}
        </div>
        <ModalOverlay onClick={onClick} />
    </div>,
    modalRoot
);    
}

export default Modal;