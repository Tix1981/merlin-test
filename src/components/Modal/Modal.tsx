import React, { FC } from 'react';
import styles from './modal.module.css';

interface IProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: FC<IProps> = ({ children, title, onClose }) => {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>{title}</h2>
          <span className={styles.closeLink} onClick={onClose}>
            Close
          </span>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
