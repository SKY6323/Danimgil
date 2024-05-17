import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';
import imgStar from "../../img/Categorie/icon_star.png";
import imgElevator from "../../img/Categorie/icon_elevator.png";
import imgEscalator from "../../img/Categorie/icon_escalator.png";
import imgWheelchair from "../../img/Categorie/icon_wheelchair.png";
import imgRamp from "../../img/Categorie/icon_ramp.png";
import imgBaby from "../../img/Categorie/icon_baby.png";
import dtclose from "../../img/Arrow/icon_left.png";
import dtlocation from "../../img/Title/icon_location.png"
import img1 from "../../img/Categorie/icon_elevator_W.png"
import img2 from "../../img/Categorie/icon_escalator_W.png"
import img3 from "../../img/Categorie/icon_wheelchair_W.png"
import img4 from "../../img/Categorie/icon_ramp_W.png"
import img5 from "../../img/Categorie/icon_baby_W.png"
import styles from "../listdetail/ListDetail.module.css";
import convertLineNameToClassName from "../../component/list/LineNameConverter";
import getLineClass from "./GetLineClass";
import rampData from "../../data/rampData.json";
import escalatorData from "../../data/escalatorData.json";
import elevatorData from "../../data/elevatorData.json";
import liftData from "../../data/liftData.json"
const { kakao } = window;
const API_KEY = process.env.REACT_APP_LINE_API_KEY;

function ListDetail() {
    const { id } = useParams();
    const [subwayLineNumber, setSubwayLineNumber] = useState(null);
    const [isLetterLine, setIsLetterLine] = useState(false);
    const [lineInfo, setLineInfo] = useState(null);
    const [convenienceData, setConvenienceData] = useState([]);
    const [escalatorDataState, setEscalatorDataState] = useState([]);
    const [rampDataState, setRampDataState] = useState([]);
    const [escalatorLocation, setEscalatorLocation] = useState([]);


    useEffect(() => {
        const container = document.getElementById('Mymap')
      const options = {
        center: new kakao.maps.LatLng(37.541513, 126.840461),
        level: 2,
      }
      
      const map = new kakao.maps.Map(container, options)
    }, [])

    useEffect(() => {
        const fetchSubwayLineNumber = async () => {
            //노선별 지하철역 데이터
            try {
                const response = await axios.get(`http://openapi.seoul.go.kr:8088/${API_KEY}/JSON/SearchSTNBySubwayLineInfo/1/800`);
                const stationData = response.data.SearchSTNBySubwayLineInfo.row;
                const station = stationData.find(station => station.STATION_NM === id);
                if (station) {
                    let lineNumber;
                    if (station.LINE_NUM === "GTX-A") {
                        lineNumber = "GTX-A";
                    } else if (!isNaN(parseInt(station.LINE_NUM, 10))) {
                        lineNumber = parseInt(station.LINE_NUM, 10);
                    } else {
                        lineNumber = station.LINE_NUM;
                    }
                    setSubwayLineNumber(lineNumber);
                    setIsLetterLine(isNaN(lineNumber));

                    // 호선 정보를 설정
                    setLineInfo(station.LINE_NUM);
                }
            } catch (error) {
                console.error('Error fetching subway station data:', error);
            }
        };

        fetchSubwayLineNumber();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 편의시설 유무 데이터
                const convenienceResponse = await axios.get(`http://openapi.seoul.go.kr:8088/${API_KEY}/JSON/TbSeoulmetroStConve/1/300`);
                const convenienceData = convenienceResponse.data.TbSeoulmetroStConve.row;
                setConvenienceData(convenienceData);

                // 에스컬레이터 갯수 데이터
                const escalatorResponse = await axios.get(`http://openapi.seoul.go.kr:8088/${API_KEY}/JSON/OdblrDspsnCvntl/1/300`);
                const escalatorData = escalatorResponse.data.OdblrDspsnCvntl.row;
                setEscalatorDataState(escalatorData) // Update the state variable name

                // 경사로 위치 데이터 (json)
                setRampDataState(rampData.DATA);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    //편의시설 유무
    const getConvenienceByStation = () => {
        const station = convenienceData.find(item => item.STATION_NAME === id);
        return station ? station : null;
    }

    //에스컬레이터 갯수를 기반으로 유무확인 후 불투명도
    const getEscalatorOpacity = () => {
        const stationEscalators = escalatorDataState.filter(item => item.STATN_NM === id); // Update to filter
        const escalatorCount = stationEscalators.length;
        return escalatorCount > 0 ? 1 : 0.2;
    }

    //경사로 위치 데이터
    const getRampLocation = () => {
        const stationRamp = rampDataState.find(item => item.statn_nm === id && item.no === 1);

        if (stationRamp && stationRamp.no) {
            return {
                no: stationRamp.no,
                installationPlace: stationRamp.installation_place
            };
        } else {
            return null;
        }
    };

    // 에스컬레이터 위치 데이터 가져오기
    const getEscalatorLocation = () => {
        const stationEscalators = escalatorData.DATA.filter(item => item.역명 === id);
        return stationEscalators.map(escalator => escalator.설치위치);
    };

    //경사로 위치값을 기반으로 유무확인 후 불투명도 
    const getRampOpacity = () => {
        const stationRamps = rampDataState.find(item => item.statn_nm === id);
        return stationRamps ? 1 : 0.2;
    }

    const rampLocation = getRampLocation();

    useEffect(() => {
        // 에스컬레이터 위치 데이터 
        const location = getEscalatorLocation();
        setEscalatorLocation(location);
    }, [id]);

    //엘리베이터 위치 데이터
    const getElevatorLocation = () => {
        const stationElevators = elevatorData.DATA.filter(item => item.역명 === id);
        return stationElevators.map(elevator => elevator.설치위치);
    };
    const elevatorLocation = getElevatorLocation();

    //휠체어리프트 위치 데이터
    const getLiftLocation = () => {
        const stateionLift = liftData.DATA.filter(item => item.역명 == id);
        return stateionLift.map(lite => lite.설치위치);
    }
    const liftLocation = getLiftLocation();

    return (
        <div className="container">
            <div id="Mymap" style={{ width: "100%", height: "250px" }}>
                <Link to="/">
                    <img src={dtclose} className={styles.dtclose} />
                </Link>
            </div>

            <div className={styles.dtlist}>
                <div className={styles.dtlist_box}>
                    <div className={`${styles.dtlist_top} ${lineInfo ? convertLineNameToClassName(lineInfo) : ''} ${lineInfo ? getLineClass(lineInfo) : ''}`}>
                        <div className={`${styles.dthosun} ${lineInfo ? getLineClass(lineInfo) : ''}`}>
                            {isLetterLine ? (
                                <span className={styles.dthosun_text}>{subwayLineNumber}</span>
                            ) : (
                                <div className={styles.dthosun_num}>{subwayLineNumber}</div>
                            )}
                        </div>
                        <div className={styles.dtstation}>{id}</div>
                        <button className={styles.dtbtn_box}><img className={styles.dtbtn_star} src={imgStar} alt="Star" /></button>
                    </div>

                    <ul className="convenience">
                        <li className="list_bottom">
                            <div className="elevator" style={{ opacity: (getConvenienceByStation()?.EL === 'Y' || elevatorLocation.length > 0) ? 1 : 0.2 }} >
                                <img src={imgElevator} alt="Elevator" />
                                <p className={styles.dtlist_text}>엘리베이터</p>
                            </div>
                        </li>
                        <li className="list_bottom">
                            <div className="escalator" style={{ opacity: getEscalatorOpacity() }}>
                                <img src={imgEscalator} alt="Escalator" />
                                <p className={styles.dtlist_text}>에스컬레이터</p>
                            </div>
                        </li>
                        <li className="list_bottom">
                            <div className="wheelchair" style={{ opacity: (getConvenienceByStation()?.WL === 'Y' || liftLocation.length > 0) ? 1 : 0.2 }}>
                                <img src={imgWheelchair} alt="Wheelchair" />
                                <p className={styles.dtlist_text}>휠체어리프트</p>
                            </div>

                        </li>
                        <li className="list_bottom">
                            <div className="ramp" style={{ opacity: getRampOpacity() }}>
                                <img src={imgRamp} alt="Ramp" />
                                <p className={styles.dtlist_text}>경사로</p>
                            </div>
                        </li>
                        <li className="list_bottom">
                            <div className="baby" style={{ opacity: getConvenienceByStation()?.FDROOM === 'Y' ? 1 : 0.2 }}>
                                <img src={imgBaby} alt="Baby" />
                                <p className={styles.dtlist_text}>유아수유방</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="divider"></div>

            <div className={styles.dtplace}>
                <img src={dtlocation} className={styles.dtlocation} />
                <strong>편의시설 위치</strong>
            </div>
            <ul className={styles.dtplace_list}>
                {elevatorLocation && elevatorLocation.map((location, index) => (
                    <li key={index} className={styles.dtplace_dtlist}>
                        <div><img src={img1} /></div>
                        <p>{location}</p>
                    </li>
                ))}
                {escalatorLocation && escalatorLocation.map((location, index) => (
                    <li key={index} className={styles.dtplace_dtlist}>
                        <div><img src={img2} /></div>
                        <p>{location}</p>
                    </li>
                ))}
                {liftLocation && liftLocation.map((location, index) =>
                    <li key={index} className={styles.dtplace_dtlist}>
                        <div><img src={img3} /></div>
                        <p>{location}</p>
                    </li>
                )}

                {rampLocation && (
                    <li className={styles.dtplace_dtlist}>
                        <div><img src={img4} /></div>
                        <p>{`${rampLocation.installationPlace}`}</p>
                    </li>
                )}
                <li className={styles.dtplace_dtlist}>
                    <div><img src={img5} /></div>
                    <p>1번 출구 좌측</p>
                </li>
            </ul>
        </div>
    );
}

export default ListDetail;
