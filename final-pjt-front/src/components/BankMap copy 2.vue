<!-- 2 카테고리 검색 -->
<template>
    <select name="si" id="si"></select>
    <select name="gu" id="gu"></select>
    <select name="bank" id="bank"></select>
    <button>찾기</button>
    <div id="map"></div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'BankMap',
    data() {
        return {
            map: null
        }
    },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            this.loadMap()
        } else {
            this.loadScript()
        }
    },

    methods: {
        loadScript() {
            const script = document.createElement('script')
            const API_KEY = import.meta.env.VITE_MAP_API_KEY
            script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}&libraries=services`;
            script.onload = () => window.kakao.maps.load(this.loadMap)

            document.head.appendChild(script)
        },
        loadMap() {

            // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
            var infowindow = new kakao.maps.InfoWindow({zIndex:1});
    
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
                mapOption = {
                    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
                };  
    
            // 지도를 생성합니다    
            var map = new kakao.maps.Map(mapContainer, mapOption); 
    
            // 장소 검색 객체를 생성합니다
            var ps = new kakao.maps.services.Places(map); 
    
            // 카테고리로 은행을 검색합니다
            ps.categorySearch('BK9', placesSearchCB, {useMapBounds:true}); 
    
            // 키워드 검색 완료 시 호출되는 콜백함수 입니다
            function placesSearchCB (data, status, pagination) {
                if (status === kakao.maps.services.Status.OK) {
                    for (var i=0; i<data.length; i++) {
                        displayMarker(data[i]);    
                    }       
                }
            }
    
            // 지도에 마커를 표시하는 함수입니다
            function displayMarker(place) {
                // 마커를 생성하고 지도에 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(place.y, place.x) 
                });
    
                // 마커에 클릭이벤트를 등록합니다
                kakao.maps.event.addListener(marker, 'click', function() {
                    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                    infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                    infowindow.open(map, marker);
                });
            }
        },
    }
}
</script>

<style scoped>
#map {
    width: 100%;
    height: 400px;
}
</style>