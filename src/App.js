import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 37.5665,  // 기본 위도 (서울)
  lng: 126.9780  // 기본 경도 (서울)
};

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB-ANrA2sKJzmA5LKbzEtoLnawOvDyhB44', // 발급받은 Google Maps API 키 입력
  });

  const [location, setLocation] = useState(center);  // 기본 위치는 서울

  // 위치 가져오기 함수
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // 위치를 구글 맵 좌표로 설정
    setLocation({
      lat: latitude,
      lng: longitude
    });
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("위치 정보 사용이 거부되었습니다.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("위치 정보를 사용할 수 없습니다.");
        break;
      case error.TIMEOUT:
        alert("위치 정보 요청 시간이 초과되었습니다.");
        break;
      case error.UNKNOWN_ERROR:
        alert("알 수 없는 오류가 발생했습니다.");
        break;
      default:
        alert("예상치 못한 오류가 발생했습니다.");
    }
  };

  return (
      <div className="App">
        <header className="App-header">
          <h1>Google Map에서 현재 위치 표시</h1>
          <button type="button" onClick={getLocation}>
            현재 위치 가져오기
          </button>

          {/* 구글 맵 표시 */}
          {isLoaded ? (
              <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={location}
                  zoom={10}
              >
                {/* 마커 표시 */}
                <Marker position={location} />
              </GoogleMap>
          ) : <p>지도 로딩 중...</p>}
        </header>
      </div>
  );
}

export default App;
