import React, { useState } from 'react';
import searchimg from '../../img/icon_search.png';
import styles from './search.module.css';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작(페이지 새로고침) 방지
    onSearch(searchTerm);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
          <input 
            type="text"  
            placeholder='역 이름으로 검색'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type='submit'>
            <img src={searchimg} alt="검색하기" />
          </button>
      </form>
    </div>
  );
};

export default Search;
