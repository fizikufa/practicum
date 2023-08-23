import { FC, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import modalStyle from './modal.module.css';

  
interface IModalProps {
    onClick: () => void;
    title: string
  };

const modalRoot = document.getElementById('modals')!;

const Modal:FC<React.PropsWithChildren<IModalProps>> = ({children, onClick,  title}) => {

  const escFunction = useCallback((event:KeyboardEvent) => {
    if (event.key === "Escape") {
      onClick();
    }
  }, [onClick])

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return createPortal(
    <div className={modalStyle.container}>
        <div className={modalStyle.modal}>
            <div id='closeSvg' className={modalStyle.close + " mt-10 mr-10"} onClick={onClick}><CloseIcon type="primary" /></div>
            <p className={modalStyle.title}>{title}</p>
            {children}
        </div>
        <ModalOverlay onClick={onClick} />
    </div>,
    modalRoot
);    
}

export default Modal;