import React from 'react'
import styles from './mypage.module.css'
import userimg from '../../img/Menu/icon_user.png'
import loginimg from '../../img/Title/icon_login_Y.png'
import logoutimg from '../../img/Title/icon_logout_Y.png'
import bookmark from '../../img/Title/icon_bookmark.png'
import notice from '../../img/Title/icon_notice.png'
import faq from '../../img/Title/icon_faq.png'
import go from '../../img/Arrow/icon_right.png'
import { Link } from 'react-router-dom'
import {useLogout} from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'

const MyPage = () => {
  const {user} = useAuthContext();
  const {logout} = useLogout()

  return (
    <div className='container'>

      <div className={styles.title_area1}>
        <div className={styles.title}>
          <img src={userimg} alt="" />
          <h2>내 정보</h2>
        </div>

        <div className={styles.login_area}>
          {
            !user &&(
            <Link to='/login'>
              <span>로그인/회원가입</span>
              <img src={loginimg} alt="" />
            </Link>
            )
          }

          {
            user &&(
              <button type='button' onClick={logout}>
              <span>로그아웃</span>
              <img src={logoutimg} alt="" />
            </button>
            )
          }
          
        </div>
      </div>

      {
        !user &&(
          <div className={styles.user_nologin}>
            <div>
              <strong>우측 상단 아이콘을 눌러</strong>
              <strong>로그인을 해주세요.</strong>
            </div>
          </div>
        )
      }
      {
        user &&(
          <div className={styles.user_login}>
            <ul>
              <li>
                <strong>이름</strong>
                <p>{user.displayName}</p>
              </li>
              <li>
                <strong>이메일</strong>
                <p>{user.email}</p>
              </li>
            </ul>
          </div>
        )
      }

      <div className="divider"></div>

      <ul className={styles.location_area}>
        <li>
          <Link to='/bookmark'>
            <div>
              <img src={bookmark} alt="" />
              <p>즐겨찾기 역</p>
            </div>

            <img src={go} alt="" />
          </Link>
        </li>
        <li>
          <Link to='/notice'>
            <div>
              <img src={notice} alt="" />
              <p>공지사항</p>
            </div>

            <img src={go} alt="" />
          </Link>
        </li>
        <li>
          <Link to='/faq'>
            <div>
              <img src={faq} alt="" />
              <p>자주하는 질문</p>
            </div>

            <img src={go} alt="" />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default MyPage;