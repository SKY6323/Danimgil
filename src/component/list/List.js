import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import imgStar from "../../img/Categorie/icon_star.png";
import imgStarW from "../../img/Categorie/icon_start_W.png";
import imgElevator from "../../img/Categorie/icon_elevator_B.png";
import imgEscalator from "../../img/Categorie/icon_escalator_B.png";
import imgWheelchair from "../../img/Categorie/icon_wheelchair_B.png";
import imgRamp from "../../img/Categorie/icon_ramp_B.png";
import imgBaby from "../../img/Categorie/icon_baby_B.png";
import rampData from '../../data/rampData.json';
import styles from '../list/list.module.css'
import convertLineNameToClassName from "./LineNameConverter";
import { useAuthContext } from "../../hooks/useAuthContext";
const API_KEY = process.env.REACT_APP_LINE_API_KEY;

const List = ({ searchTerm }) => {
    const [stationData, setStationData] = useState([]);
    const [convenienceData, setConvenienceData] = useState([]);
    const [escalatorData, setEscalatorData] = useState([]);
    const [rampDataState, setRampDataState] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 노선별 지하철 역 데이터
                const stationResponse = await axios.get(`http://openapi.seoul.go.kr:8088/${API_KEY}/JSON/SearchSTNBySubwayLineInfo/1/800`);
                const stationData = stationResponse.data.SearchSTNBySubwayLineInfo.row;
                setStationData(stationData);

                // 편의시설 유무 데이터
                const convenienceResponse = await axios.get(`http://openapi.seoul.go.kr:8088/${API_KEY}/JSON/TbSeoulmetroStConve/1/300`);
                const convenienceData = convenienceResponse.data.TbSeoulmetroStConve.row;
                setConvenienceData(convenienceData);

                // 에스컬레이터 갯수 데이터
                const escalatorResponse = await axios.get(`http://openapi.seoul.go.kr:8088/${API_KEY}/JSON/OdblrDspsnCvntl/1/300`);
                const escalatorData = escalatorResponse.data.OdblrDspsnCvntl.row;
                setEscalatorData(escalatorData)

                // 경사로 위치 데이터 (json)
                setRampDataState(rampData.DATA);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // 편의시설 유무
    const getConvenienceByStation = (stationName) => {
        const station = convenienceData.find(item => item.STATION_NAME === stationName);
        return station ? station : null;
    }

    // 에스컬레이터 갯수가 0이면 불투명도 0.2
    const getEscalatorOpacity = (stationName) => {
        const stationEscalators = escalatorData.filter(item => item.STATN_NM === stationName);
        const escalatorCount = stationEscalators.length;
        return escalatorCount > 0 ? 1 : 0.2;
    }

    // 경사로 위치 값이 없으면 불투명도 0.2
    const getRampOpacity = (stationName) => {
        const stationRamps = rampDataState.find(item => item.statn_nm === stationName);
        return stationRamps ? 1 : 0.2;
    }

    // 검색어에 따라 필터링된 지하철 역을 반환
    const filteredStations = stationData.filter(station =>
        station.STATION_NM.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    //즐겨찾기
    const {user} = useAuthContext();
    const [mark, setMark] = useState(false);
    const navigator = useNavigate();

    const userMark = (e )=>{
        e.preventDefault();
        user ? getBookmark(): locationLogin();
    }

    const getBookmark = () =>{
        setMark(mark => !mark)
    }

    const locationLogin = () =>{
        if(window.confirm('로그인 후 이용 가능합니다.\n로그인 하시겠습니까?')){
            navigator('/login')
        }else{
            return false
        }
    }

    return (
        <div className={styles.list_area}>
            {filteredStations.map(station => (
                <Link key={`${station.LINE_NUM}-${station.STATION_NM}`} to={`/list/${station.STATION_NM}`}>
                    <div className={styles.list_box}>
                        <div className={`list_top ${convertLineNameToClassName(station.LINE_NUM)}`}>
                            <div className={`hosun ${convertLineNameToClassName(station.LINE_NUM)}`}>
                                {parseInt(station.LINE_NUM) >= 1 && parseInt(station.LINE_NUM) <= 9 ? (
                                    <span className={styles.hosun_num}>{parseInt(station.LINE_NUM)}</span>
                                ) : (
                                    <span className={styles.hosun_text}>{station.LINE_NUM}</span>
                                )}
                            </div>
                            <div className={styles.station}>{station.STATION_NM}</div>
                            <button className={styles.btn_box}
                            onClick={userMark}>
                                <img className={styles.btn_star} src={!mark ? imgStar : imgStarW} alt="즐겨찾기" />
                            </button>

                        </div>
                        <ul className="convenience">
                            <li className="list_bottom">
                                <div className="elevator" style={{ opacity: getConvenienceByStation(station.STATION_NM)?.EL === 'Y' ? 1 : 0.2 }}>
                                    <img src={imgElevator} alt="Elevator" />
                                    <p>엘리베이터</p>
                                </div>
                            </li>
                            <li className="list_bottom">
                                <div className="escalator" style={{ opacity: getEscalatorOpacity(station.STATION_NM) }}>
                                    <img src={imgEscalator} alt="Escalator" />
                                    <p>에스컬레이터</p>
                                </div>
                            </li>
                            <li className="list_bottom">
                                <div className="wheelchair" style={{ opacity: getConvenienceByStation(station.STATION_NM)?.WL === 'Y' ? 1 : 0.2 }}>
                                    <img src={imgWheelchair} alt="Wheelchair" />
                                    <p>휠체어리프트</p>
                                </div>
                            </li>
                            <li className="list_bottom">
                                <div className="ramp" style={{ opacity: getRampOpacity(station.STATION_NM) }}>
                                    <img src={imgRamp} alt="Ramp" />
                                    <p>경사로</p>
                                </div>
                            </li>
                            <li className="list_bottom" style={{ opacity: getConvenienceByStation(station.STATION_NM)?.FDROOM === 'Y' ? 1 : 0.2 }}>
                                <div className="baby">
                                    <img src={imgBaby} alt="Baby" />
                                    <p>유아수유방</p>
                                </div>
                            </li>
                        </ul>
                        <div className={`list_line ${convertLineNameToClassName(station.LINE_NUM)}`}></div>
                        <div className="divider"></div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default List;
