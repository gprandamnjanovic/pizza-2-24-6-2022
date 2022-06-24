import React, { useEffect, useState } from 'react';
import styles from '../styles/Featured.module.css';
import Image from 'next/dist/client/image';
const Featured = () => {
  const images = [
    '/img/featured.png',
    '/img/featured2.png',
    '/img/featured3.png',
  ];
  const [index, setIndex] = useState(0);

  const handleArrow = (direction) => {
    if (direction === 'l') {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === 'r') {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      handleArrow('r');
    }, 8000);
  }, [index]);
  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow('l')}
      >
        <Image
          src='/img/arrowl.png'
          alt=''
          width='50'
          height='50'
          objectFit='contain'
        />
      </div>

      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} alt='' layout='fill' objectFit='cover' />
          </div>
        ))}
      </div>
      <div
        className={styles.arrowContainer}
        style={{ right: '-5rem' }}
        onClick={() => handleArrow('r')}
      >
        <Image
          src='/img/arrowr.png'
          alt=''
          width='50'
          height='50'
          objectFit='contain'
        />
      </div>
    </div>
  );
};

export default Featured;
