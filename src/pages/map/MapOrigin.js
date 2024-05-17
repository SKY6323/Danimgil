import React, { useEffect,useState,useMemo } from 'react'
import './map.css'
import Search from '../../component/search/Search';
const { kakao } = window;

const Map = () => {
  const [location, setLocation] = useState("");
  const [map, setMap] = useState();

  // 현재위치 세부조정
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  // 현재 위치 가져오기
  useMemo(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }

    function success(position) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    function error() {
      setLocation({
        latitude: 37.5413121,
        longitude: 126.8381744,
      });
      console.log("위치 받기 실패");
    }
  }, [navigator.geolocation.getCurrentPosition]);

  //지도 API
  const kakaoMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(location.latitude, location.longitude),
      level: 3,
    };
    setMap(new kakao.maps.Map(container, options));
  };

  // 화면에 랜더링
  useEffect(() => {
    kakaoMap();
  }, [location]);

  return (
    <div className='container'>
      
      <div className="search_area">
        <Search />
      </div>

      <div id='Mymap'>
        <p className='marker' kakao={kakao}><span>현재위치</span></p>
      </div>
    </div>
  )
}

export default Map