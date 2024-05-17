import React, { useState } from 'react';
import styles from './filter.module.css';
import filterimg from '../../img/Menu/icon_filter.png';
import closeimg from '../../img/Menu/icon_close.png';
import { Link } from 'react-router-dom';

const Filter = () => {

    const [checkboxes, setCheckboxes] = useState({
        line1: false,
        line2: false,
        line3: false,
        line4: false,
        line5: false,
        line6: false,
        line7: false,
        line8: false,
        line9: false,
        line10: false,
        facility: false,
        facility2: false,
        facility3: false,
        facility4: false,
        facility5: false,
    });

    // 전체 선택 함수
    const handleSelectAll = () => {
        setCheckboxes(prevState => {
            const updatedCheckboxes = {};
            for (let key in prevState) {
                updatedCheckboxes[key] = true;
            }
            return updatedCheckboxes;
        });
    };

    // 전체 해제 함수
    const handleDeselectAll = () => {
        setCheckboxes(prevState => {
            const updatedCheckboxes = {};
            for (let key in prevState) {
                updatedCheckboxes[key] = false;
            }
            return updatedCheckboxes;
        });
    };

    return (
        <div className="container">
            <div className={styles.title_area1}>
                <div className={styles.title}>
                    <img src={filterimg} alt="" />
                    <h2>필터</h2>
                </div>

                <Link to='/'>
                    <div className={styles.close}>
                        <img src={closeimg} alt="" />
                        <p>닫기</p>
                    </div>
                </Link>
            </div>

            <div className={styles.form_area}>
                <form className={styles.form}>
                    <ul>
                        <li>
                            <ul>
                                <li>호선</li>
                                <li>
                                    <ul>
                                        {Object.keys(checkboxes)
                                            .filter(key => key.startsWith('line'))
                                            .map((key, index) => {
                                                const lineNumber = key.replace('line', ''); // 'line'을 빈 문자열로 대체하여 숫자만 추출
                                                return (
                                                    <li key={index}>
                                                        <p>{`${lineNumber}호선`}</p>
                                                        <input
                                                            type="checkbox"
                                                            id={key}
                                                            checked={checkboxes[key]}
                                                            onChange={() =>
                                                                setCheckboxes(prevState => ({
                                                                    ...prevState,
                                                                    [key]: !prevState[key],
                                                                }))
                                                            }
                                                        />
                                                        <label htmlFor={key}></label>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul>
                                <li>편의시설</li>
                                <li>
                                    <ul>
                                        {Object.keys(checkboxes)
                                            .filter(key => key.startsWith('facility'))
                                            .map((key, index) => (
                                                <li key={index}>
                                                    <p>
                                                        {key === 'facility' && '엘리베이터'}
                                                        {key === 'facility2' && '에스컬레이터'}
                                                        {key === 'facility3' && '휠체어리프트'}
                                                        {key === 'facility4' && '경사로'}
                                                        {key === 'facility5' && '유아수유방'}
                                                    </p>
                                                    <input
                                                        type="checkbox"
                                                        id={key}
                                                        checked={checkboxes[key]}
                                                        onChange={() =>
                                                            setCheckboxes(prevState => ({
                                                                ...prevState,
                                                                [key]: !prevState[key],
                                                            }))
                                                        }
                                                    />
                                                    <label htmlFor={key}></label>
                                                </li>
                                            ))}
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div className={styles.btn_area}>
                        <button type="button" onClick={handleSelectAll}>
                            전체선택
                        </button>
                        <button type="button" onClick={handleDeselectAll}>
                            전체해제
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Filter;
