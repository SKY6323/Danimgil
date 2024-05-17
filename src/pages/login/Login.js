import React, { useState } from 'react'
import styles from './login.module.css'
import { Link } from 'react-router-dom'
import back from '../../img/Arrow/icon_left.png'
import loginimg from '../../img/Title/icon_login.png'
import { useNavigate } from "react-router-dom";
import { useLogin } from '../../hooks/useLogin'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login } = useLogin();
  const navigate = useNavigate();

  const loginUser = (event) => {
    event.preventDefault();
    login(email, password);
    navigate('/mypage')
  }

  const handleData = (event) => {
    if (event.target.type === "email") {
      setEmail(event.target.value);
    } else if (event.target.type === "password") {
      setPassword(event.target.value);
    }
  };

  return (
    <div className={styles.container}>
        <div className={styles.login_area}>

          <div className={styles.title}>
            <Link to='/mypage'><img src={back} alt="" /></Link>

            <div>
              <h2>로그인</h2>
              <img src={loginimg} alt="" />
            </div>
          </div>

          <form onSubmit={(event)=>loginUser(event)}>
            <label htmlFor="userid">
              <input type="email" id='userid' placeholder='아이디' required value={email} onChange={handleData}/>
            </label>
            <label htmlFor="userpwd">
              <input type="password" id='userpwd' placeholder='비밀번호'required value={password} onChange={handleData}/>
            </label>

            <div className={styles.btn_area}>
              <button type='submit'>로그인</button>
            </div>
          </form>

          <Link to='/signup'>회원가입</Link>
        </div>
    </div>
  )
}

export default Login