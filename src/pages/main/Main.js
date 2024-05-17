import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import filterimg from '../../img/Menu/icon_filter.png';
import styles from './main.module.css';
import Search from '../../component/search/Search';
import List from '../../component/list/List';

const Main = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // 검색어를 받아와 처리하는 함수
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className='container'>
      <div className={styles.title_area1}>
        <Search onSearch={handleSearch} />
        <Link to='/filter' className={styles.filter}>
          <img src={filterimg} alt="" />
          <p>필터</p>
        </Link>
      </div>

      <div className={styles.list_area}>
        <List searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Main;
