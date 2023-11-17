<template>
    <div id="map"></div>
</template>

<script>
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
            this.map = new window.kakao.maps.Map(container, options)
            this.loadMarker()
        },
        loadMarker() {
            const markerPosition = new window.kakao.maps.LatLng(36.108184, 128.413968)

            const marker = new window.kakao.maps.Marker({
                position: markerPosition
            })

            marker.setMap(this.map)
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