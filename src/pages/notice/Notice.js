import React from 'react'
import { Link } from 'react-router-dom'
import back from '../../img/Arrow/icon_left.png'
import notice from '../../img/Title/icon_notice.png'
import styles from './notice.module.css'

const Notice = () => {
  const list =[
    "1호선 구로역 열차 지연",
    "5호선 화곡역 3번 출구 에스컬레이터 설치 공사 폐쇄",
    "2호선 시청역 장애인 지하철 시위",
    "신분당선 양재역 끼임사고 발생 지연",
    "9호선 당산역 엘리베이터 점검"
  ]
  const getList = list.map((list)=> (<li className={styles.list}>{list}</li>))
  return (
    <div className='container'>
      <div className="sub_page title_area2">
        <Link to='/mypage'><img src={back} alt="" /></Link>

        <div className="title">
          <h2>공지사항</h2>
          <img src={notice} alt="" />
        </div>
      </div>

      <ul className={styles.notice_list}>
        {getList}
      </ul>
    </div>
  )
}

export default Notice