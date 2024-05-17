import React, { useEffect, useState, useMemo } from 'react'
import './map.css'
import locationData from '../../data/locationData.json'
const { kakao } = window;

const Map = ({searchPlace}) => {
  // 지하철 위치 JSON담기
  const [locationDataState, setLocationDataState] = useState([])

   // 현재위치 담는 곳
   const [location, setLocation] = useState("");
 
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
         latitude: 37.541513,
         longitude: 126.840461
       });
       console.log("위치 받기 실패");
     }
   }, [navigator.geolocation.getCurrentPosition]);
 
  
  useEffect(()=>{
    const fetchData = async () =>{
      //데이터
      try{
        setLocationDataState(locationData.DATA)
        //console.log(locationDataState)

        const locationName = locationDataState.find(item => item.statn_nm === searchPlace)
        console.log(locationName)
        
      }catch(error){
        console.error('Error fetching data:', error);
      }
    }
    fetchData();

     //맵
     const container = document.getElementById('Mymap')
      const options = {
        center: new kakao.maps.LatLng(location.latitude, location.longitude),
        level: 2,
      }
      
      //지도 생성
      const map = new kakao.maps.Map(container, options)
      
      //장소 검색 객체 생성
      const ps = new kakao.maps.services.Places()
  
      //키워드 검색('입력값', 작동)
      ps.keywordSearch(searchPlace, placesSearchCB)

      function placesSearchCB(data, status) {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
        data.map(data => {
          bounds.extend(new kakao.maps.LatLng(data.y, data.x));
        });
        map.setBounds(bounds);
        }
      }
  },[searchPlace, location])


  return (
    <div className='container'>
      
      {/* <div className="search_area">
        <Search />
      </div> */}      

      <div id='Mymap'>
        {
          searchPlace ? null : <p className='marker' kakao={kakao}><span>현재위치</span></p>
        }
        
      </div>

    </div>
  )
}

export default Map