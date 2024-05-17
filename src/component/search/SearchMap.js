import React, { useState } from 'react'
import searchimg from '../../img/icon_search.png'
import styles from './search.module.css'
import Map from '../../pages/map/Map'

const SearchMap = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("화곡");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
  };

  return (
    <div>
      <div className={styles.searcch_from}>
        <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text"  placeholder='역 이름으로 검색'
            onChange={onChange} value={inputText}/>
            <button type='submit'><img src={searchimg} alt="검색하기" /></button>
        </form>
      </div>


      <Map searchPlace={place}/>
    </div>
  )
}

export default SearchMap