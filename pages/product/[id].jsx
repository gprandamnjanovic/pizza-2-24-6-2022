import React, { useState } from 'react';
import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';
const Product = ({ pizza }) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, seanttQuity] = useState(1);
  const dispach = useDispatch();
  const changePrice = (number) => {
    setPrice(price + number);
  };
  const handleSize = (sizeIdex) => {
    const diff = pizza.prices[sizeIdex] - pizza.prices[size];
    setSize(sizeIdex);
    changePrice(diff);
  };
  const handleChange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExtras([...extras, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra.id !== option._id));
    }
  };
  console.log(extras);
  const handleClick = () => {
    dispach(addProduct({ ...pizza, extras, price, quantity }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} alt='' layout='fill' objectFit='contain' />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Chose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src='/img/size.png' alt='' layout='fill' />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src='/img/size.png' alt='' layout='fill' />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src='/img/size.png' alt='' layout='fill' />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h1 className={styles.choose}>Chose additional ingredients</h1>
        <div className={styles.ings}>
          {pizza.extraOptions.map((option) => (
            <div className={styles.options} key={option._id}>
              <input
                type='checkbox'
                name={option.text}
                id={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor='double'>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.btnContainer}>
          <input
            onChange={(e) => seanttQuity(e.target.value)}
            type='number'
            defaultValue={1}
            className={styles.quanity}
          />
          <button className={styles.btn} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async ({ params }) => {
  const response = await axios.get(
    `https://pizza-goran-22-6-2022.netlify.app/api/products/${params.id}`
  );
  return {
    props: {
      pizza: response.data,
    },
  };
};

export default Product;
