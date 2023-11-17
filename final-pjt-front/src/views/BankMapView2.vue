<template>
    <div id="map" style="width:500px; height:400px;"></div>
</template>

<!-- <div id="map" style="width:500px; height:400px;"></div> -->
<!-- <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=4877c72fe8e8381ae73f77bc60183b10&libraries=services">
</script> -->
<script>
import { ref } from 'vue'

export default {
    mounted() {
      if (window.kakao && window.kakao.maps) {
        this.initMap();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}&libraries=services`;
        document.head.appendChild(script);
      }
    },
    methods: {
      initMap() {
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  
        var mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOption = {
            // center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            center: new kakao.maps.LatLng(36.107071, 128.419289), // 지도의 중심좌표
            level: 7, // 지도의 확대 레벨
          };
        var keyword = ref("은행");
  
        // 지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption);
        map.setMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT);
        var ps = new kakao.maps.services.Places(map);
        ps.keywordSearch(keyword.value, placesSearchCB, {
          useMapBounds: true,
        });
  
        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            var bounds = new kakao.maps.LatLngBounds();
            for (var i = 0; i < data.length; i++) {
              displayMarker(data[i]);
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }
            map.setBounds(bounds);
          }
        }
  
        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {
          // 마커를 생성하고 지도에 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
          });
  
          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "click", function () {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent(
              '<div style="padding:5px;font-size:12px;">' +
                place.place_name +
                "</div>"
            );
            infowindow.open(map, marker);
          });
        }
      },
    },
  };
  </script>

<script setup>

</script>

<!-- <script>
var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
};

var map = new kakao.maps.Map(container, options);
</script> -->

<!-- <script setup>

</script> -->

<!-- <script>
var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
}; -->

<!-- var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴 -->
<!-- </script> -->

<style scoped>

</style>