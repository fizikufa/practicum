import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  onClick: () => void;
};

function ModalOverlay({onClick}:IModalOverlayProps){
    return (
        <div className={styles.overlay} onClick={onClick}></div>
    )
}

export default ModalOverlay;