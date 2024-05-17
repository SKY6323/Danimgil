import React from 'react'
import { Link } from 'react-router-dom'
import back from '../../img/Arrow/icon_left.png'
import bookmark from '../../img/Title/icon_bookmark.png'
import List from '../../component/list/List'

const Bookmark = () => {
  return (
    <div className='container'>
      <div className="sub_page title_area2">
        <Link to='/mypage'><img src={back} alt="" /></Link>

        <div className="title">
          <h2>즐겨찾기 역</h2>
          <img src={bookmark} alt="" />
        </div>
      </div>

      <div className="bookmark_list">
        <List />
      </div>
    </div>
  )
}

export default Bookmark