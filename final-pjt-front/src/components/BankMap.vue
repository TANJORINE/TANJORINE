<!-- 1  -->
<template>
    <select name="si" id="si"></select>
    <select name="gu" id="gu"></select>
    <select name="bank" id="bank"></select>
    <input type="text" id="keyword" value="삼성전자" @keyup.enter="searchPlaces">
    <!-- <button @click="searchPlaces">찾기</button> -->
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
    setup() {},
    created() {},
    mounted() {
        // 카카오 객체 있고 맵그릴 준비가 되었으면 맵실행
        if (window.kakao && window.kakao.maps) {
            this.loadMap()
        // 없다면 카카오 스크립트 추가 후 맵실행
        } else {
            this.loadScript()
        }
    },
    unmounted() {},
    methods: {
        loadScript() {
            const script = document.createElement('script')
            const API_KEY = import.meta.env.VITE_MAP_API_KEY
            script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}&libraries=services`;
            script.onload = () => window.kakao.maps.load(this.loadMap)

            document.head.appendChild(script)
        },
        loadMap() {
            const container = document.getElementById('map')
            const options = {
                center: new window.kakao.maps.LatLng(36.108184, 128.413968),
                level: 3,
            }
            var keyword = ref('은행')
            this.map = new window.kakao.maps.Map(container, options)
            // this.loadMarker()
            const ps = new kakao.maps.services.Places(this.map)
            // ps.keywordSearch(keyword.value, this.placesSearchCB, {
            //     useMapBounds: true,
            // })
            const infowindow = new kakao.maps.InfoWindow({zIndex:1})
            this.searchPlaces()
        },
        loadMarker() {
            const markerPosition = new window.kakao.maps.LatLng(36.108184, 128.413968)

            const marker = new window.kakao.maps.Marker({
                position: markerPosition
            })

            marker.setMap(this.map)
        },
        searchPlaces() {
            const ps = new window.kakao.maps.services.Places()
            var keyword = document.getElementById('keyword').value
            console.log(keyword)
            if (!keyword.replace(/^\s+|\s+$/g, '')) {
                alert('키워드 입력')
                return false
            }
            ps.keywordSearch(keyword, this.placesSearchCB, {
                useMapBounds: true,
            })
        },
        placesSearchCB(data, status) {
            if (status === kakao.maps.services.Status.OK) {
                var bounds = new kakao.maps.LatLngBounds()
                for (var i=0; i<data.length; i++) {
                    this.displayMarker(data[i])
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
                }
                map.setBounds(bounds)
            }
        },
        displayMarker(place) {
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
            })

            
        }
    },
}
</script>

<style scoped>
#map {
    width: 100%;
    height: 400px;
}
</style>