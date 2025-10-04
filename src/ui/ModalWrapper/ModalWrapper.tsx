import { type ReactNode, type MouseEvent } from 'react';
import styles from './modalWrapper.module.css';

type ModalWrapperProps = {
  onClose: () => void;
  children: ReactNode;
};

export const ModalWrapper = ({ onClose, children }: ModalWrapperProps) => {
    const handleOverlayClick = () => onClose();

    const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContainer} onClick={handleContainerClick}>
                <button className={styles.modalClose} onClick={onClose}>
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
};
