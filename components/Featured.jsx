import React, { useEffect, useState } from 'react';
import styles from '../styles/Featured.module.css';
import Image from 'next/image';
import featured from '../public/img/featured.png';
import featured2 from '../public/img/featured2.png';
import featured3 from '../public/img/featured3.png';
const data = [
  {
    id: 1,
    img: featured,
  },
  {
    id: 2,
    img: featured2,
  },
  {
    id: 3,
    img: featured3,
  },
];
const Featured = () => {
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
        {/* {data.map((image, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={image} alt='' layout='fill' objectFit='cover' />
          </div>
        ))} */}
        <div className={styles.imgContainer}>
          {data.map((item) => {
            console.log(item);
            return (
              <Image
                src={item.img}
                alt=''
                layout='fill'
                objectFit='cover'
                key={item.id}
              />
            );
          })}
        </div>
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
