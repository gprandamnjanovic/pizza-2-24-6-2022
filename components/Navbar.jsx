import React from 'react';
import styles from '../styles/Navbar.module.css';
import Image from 'next/dist/client/image';
import { useSelector } from 'react-redux';
import Link from 'next/link';
const Navbar = () => {
  const quntity = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callBtn}>
          <Image src='/img/telephone.png' alt='phone' width='32' height='32' />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345-548</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href='/' passHref className={styles.link}>
            <li className={styles.listItems}>
              <a href='#'>Home</a>
            </li>
          </Link>
          <li className={styles.listItems}>
            <a href='#'>Products</a>
          </li>
          <li className={styles.listItems}>
            <a href='#'>Menu</a>
          </li>
          <Image src='/img/logo.png' alt='logo' width='160px' height='69px' />
          <li className={styles.listItems}>
            <a href='#'>Event</a>
          </li>
          <li className={styles.listItems}>
            <a href='#'>Blog</a>
          </li>
          <li className={styles.listItems}>
            <a href='#'>Contact</a>
          </li>
        </ul>
      </div>
      <Link href='/cart' passHref className={styles.link}>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src='/img/cart.png' alt='logo' width='30px' height='30px' />
            <div className={styles.counter}>{quntity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
