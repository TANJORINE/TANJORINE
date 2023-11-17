<!-- 3 : 키워드 검색 1 -->

<template>
    <select name="si" id="si"></select>
    <select name="gu" id="gu"></select>
    <select name="bank" id="bank"></select>
    <input type="text" v-model="inputt">
    <button @click="findBank">찾기</button>
    <div id="map"></div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'BankMap',

    // headers = {'Authorization':`KakaoAK ${API_KEY}`}


    data() {
        return {
            map: null
        }
    },
    mounted() {
        
        const inputt = ref('')

        console.log(inputt.value)

        if (window.kakao && window.kakao.maps) {
            this.loadMap()
        } else {
            this.loadScript()
        }
    },

    methods: {
        findBank() {
        // async findBank() {
            // const API_KEY = import.meta.env.VITE_MAP_API_KEY
            // const url = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}&libraries=services`;

            // const response = await fetch(url, {
            //     method: 'GET',
            //     headers: {
            //         'Authorization':`KakaoAK ${API_KEY}`,
            //         'Content-Type': 'application/json'
            //     }
            // })

            // const data = await response.json()
            // console.log(data)

            // 장소 검색 객체를 생성합니다
            var ps = new kakao.maps.services.Places(); 
    
            // 키워드로 장소를 검색합니다
            ps.keywordSearch(this.inputt.value, placesSearchCB); 
    
            // 키워드 검색 완료 시 호출되는 콜백함수 입니다
            function placesSearchCB (data, status, pagination) {
                if (status === kakao.maps.services.Status.OK) {

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                    // LatLngBounds 객체에 좌표를 추가합니다
                    var bounds = new kakao.maps.LatLngBounds();

                    for (var i=0; i<data.length; i++) {
                        displayMarker(data[i]);    
                        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                    }       

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                    map.setBounds(bounds);
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
            var ps = new kakao.maps.services.Places(); 
    
            // 키워드로 장소를 검색합니다
            ps.keywordSearch('싸피', placesSearchCB); 
    
            // 키워드 검색 완료 시 호출되는 콜백함수 입니다
            function placesSearchCB (data, status, pagination) {
                if (status === kakao.maps.services.Status.OK) {

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                    // LatLngBounds 객체에 좌표를 추가합니다
                    var bounds = new kakao.maps.LatLngBounds();

                    for (var i=0; i<data.length; i++) {
                        displayMarker(data[i]);    
                        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                    }       

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                    map.setBounds(bounds);
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