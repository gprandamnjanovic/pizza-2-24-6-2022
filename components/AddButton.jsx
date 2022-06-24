import React from 'react';
import styles from '../styles/AddButton.module.css';
const AddButton = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddBtn}>
      Add New Pizza
    </div>
  );
};

export default AddButton;
