import modalOverlayStyles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClick: () => void;
  children: React.ReactNode
};


const ModalOverlay = ({children, onClick}:IModalOverlayProps) => {
  return(
    <div className={modalOverlayStyles.container} onClick={onClick}>
        {children}
    </div>  
  )
}

export default ModalOverlay;