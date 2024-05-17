import React, { useState } from 'react'
import menu1iconB from '../img/Menu/icon_list_B.png'
import menu1icon from '../img/Menu/icon_list.png'
import menu2iconB from '../img/Menu/icon_map_B.png'
import menu2icon from '../img/Menu/icon_map.png'
import menu3iconB from '../img/Menu/icon_user_B.png'
import menu3icon from '../img/Menu/icon_user.png'
import { Link, useLocation } from 'react-router-dom'

const NavBottom = () => {

  const [menu1img, setMenu1Img] = useState(menu1icon)
  const [menu2img, setMenu2Img] = useState(menu2icon)
  const [menu3img, setMenu3Img] = useState(menu3icon)

  const [currentTab, setCurrentTab] = useState(0)

  const menuArr =[
    {id:0, img: menu1img, nimg:menu1iconB, title: '역 목록', link: '/'},
    {id:1,img: menu2img, nimg:menu2iconB, title: '위치보기', link: '/map'},
    {id:2,img: menu3img, nimg:menu3iconB, title: '내 정보', link: '/mypage'}
  ]

  const selectMenu = (index) =>{
    setCurrentTab(index)
  }

  //특정 페이지 navbottom 안 보이기
  const locationNow = useLocation();
  if(locationNow.pathname === '/login') return null
  if(locationNow.pathname === '/signup') return null
  if(locationNow.pathname === '/bookmark') return null
  if(locationNow.pathname === '/notice') return null
  if(locationNow.pathname === '/faq') return null

  return (
    <ul className='nav_bottom'>
        {menuArr.map((menu, index)=>(
            <Link to={menu.link} key={menu.id}>
            <li className={index == currentTab ? 'on' : ''}
            onClick={()=>selectMenu(index)}>
                <img src={index == currentTab ? menu.img : menu.nimg} />
                <h2>{menu.title}</h2>
            </li>
            </Link>
          ))}
    </ul>
  )
}

export default NavBottom