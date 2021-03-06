import React, { useState } from 'react';
import styles from '../styles/Add.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState(null);
  const [extraOptions, setExtraOptions] = useState([]);
  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };
  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };
  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };
  const handleCreate = async () => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'uploads2');
    try {
      const uploadResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/drllxycnh/image/upload',
        data
      );
      const { url } = uploadResponse.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };
      await axios.post(`${process.env.BASE_URL}/api/products`, newProduct);
      setClose(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={() => setClose(true)}>
          X
        </span>
        <h1 className={styles.title}>Add New Pizza</h1>
        <div className={styles.item}>
          <label htmlFor='' className={styles.label}>
            Chose Image
          </label>
          <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label htmlFor='' className={styles.label}>
            Title
          </label>
          <input
            type='text'
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='' className={styles.label}>
            Desc
          </label>
          <textarea
            rows={4}
            onChange={(e) => setDesc(e.target.value)}
            type='text'
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='' className={styles.label}>
            Prices
          </label>
          <div className={styles.priceContainerd}>
            <input
              type='number'
              placeholder='Small'
              onChange={(e) => changePrice(e, 0)}
              className={`${styles.input} ${styles.inputSm}`}
            />
            <input
              type='number'
              placeholder='Medium'
              onChange={(e) => changePrice(e, 1)}
              className={`${styles.input} ${styles.inputSm}`}
            />
            <input
              type='number'
              placeholder='Large'
              onChange={(e) => changePrice(e, 2)}
              className={`${styles.input} ${styles.inputSm}`}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label htmlFor='' className={styles.label}>
            Extra
          </label>
          <div className={styles.extra}>
            <input
              type='text'
              className={`${styles.input} ${styles.inputSm}`}
              placeholder='Item'
              name='text'
              onChange={handleExtraInput}
            />
            <input
              type='nuber'
              className={`${styles.input} ${styles.inputSm}`}
              placeholder='Price'
              name='price'
              onChange={handleExtraInput}
            />
            <button className={styles.btn} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addBtn} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
