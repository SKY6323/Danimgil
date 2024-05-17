import React from 'react'
import styles from './login.module.css'
import { Link } from 'react-router-dom'
import back from '../../img/Arrow/icon_left.png'
import loginimg from '../../img/Title/icon_login.png'
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')

    const { signup } = useSignup();
    const navigate = useNavigate();

    const handleData = (event) => {
        if (event.target.type === "email") {
            setEmail(event.target.value)
        } else if (event.target.type === "password") {
            setPassword(event.target.value)
        } else if (event.target.type === "text") {
            setDisplayName(event.target.value)
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault(); //submit 버튼은 화면을 기본적으로 새로고침하므로
        console.log(email, password);
        signup(email, password, displayName)
        navigate('/login')
    }

  return (
    <div className={styles.container}>
        <div className={styles.login_area}>

          <div className={styles.title}>
          <Link to='/login'><img src={back} alt="" /></Link>

            <div>
              <h2>회원가입</h2>
              <img src={loginimg} alt="" />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
          <label htmlFor="username">
              <input type="text" id='username' placeholder='이름' onChange={handleData}/>
            </label>
            <label htmlFor="userid">
              <input type="email" id='userid' placeholder='아이디' onChange={handleData}/>
            </label>
            <label htmlFor="userpwd">
              <input type="password" id='userpwd' placeholder='비밀번호' onChange={handleData}/>
            </label>

            <div className={styles.btn_area}>
              <button type='submit'>회원가입</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Signup