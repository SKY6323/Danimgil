import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import back from '../../img/Arrow/icon_left.png'
import faqimg from '../../img/Title/icon_faq.png'
import up from '../../img/Arrow/icon_up.png'
import down from '../../img/Arrow/icon_down.png'
import styles from './faq.module.css'

const Faq = () => {
  const [isClick, setIsClick] = useState(false);
  const [clickIdx, setClickidx] = useState()

  const list = [
    {
        id:0,
        title: '즐겨찾기 사용법',
        content: '즐겨찾기는 회원가입 후에 사용 가능합니다. \n이후 별 아이콘을 누르면 [내 정보 > 즐겨찾기 역]에서 확인 가능합니다.'
    },
    {
        id:1,
        title: '편의시설 위치',
        content: '편의시설의 유무는 확인되나 위치는 확인되지 않는 경우가 있습니다. 이는 관련한 데이터가 없어 발생하는 일로 자세한 위치는 역사에 문의 바랍니다.'
    },
    {
        id:2,
        title: '신고·문의',
        content: '서울지하철 모든 신고·문의는 (1577-1234)로 남겨주세요. 통화와 문자 모두 가능합니다.'
    }
  ]

  const handleOpen = ((event, idx)=>{
    event.preventDefault();
    setIsClick((isClick) => !isClick)
    setClickidx(idx)
  })

  const getList = list.map((list,idx)=>(
    <li onClick={event => handleOpen(event, idx)} className={isClick && clickIdx == idx ? `${styles.on}` :null} key={idx}>
          <div className={styles.title}>
            <h3>{list.title}</h3>
            <img src={isClick && clickIdx == idx ? `${up}` : `${down}`} alt="" />
          </div>

          <div className={styles.text}>
            <p>{list.content}</p>
          </div>
        </li>
  ))

  return (
    <div className='container'>
      <div className="sub_page title_area2">
        <Link to='/mypage'><img src={back} alt="" /></Link>

        <div className="title">
          <h2>자주하는 질문</h2>
          <img src={faqimg} alt="" />
        </div>
      </div>

      <ul className={styles.faq_list}>
        {getList}
      </ul>
    </div>
  )
}

export default Faq