import React, { useState } from 'react';
import styles from '../../styles/Login.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    try {
      await axios.post('https://pizza-goran-22-6-2022.netlify.app/api/login', {
        username,
        password,
      });
      router.push('/admin');
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <input
          type='text'
          placeholder='username'
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button className={styles.btn} onClick={handleClick}>
          Sing In
        </button>
        {error && <span className={styles.error}>Wrong Credential!</span>}
      </div>
    </div>
  );
};

export default Login;
