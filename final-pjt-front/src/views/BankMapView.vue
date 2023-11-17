<template>
    <input v-model="keyword" @keyup.enter="search" placeholder="검색어를 입력하세요" />
    <select v-model="sidoCode" @change="changeSido" name="sido" id="sido">
        <option v-for="sido in store.siDo" :value="sido.code.slice(0, 2)">
        <p>{{ sido.name }}</p>
        </option>
    </select>
    
    <select name="sigungu" id="sigungu">
        <option v-for="sido in store.siDo" :value="sido.code.slice(0, 2)">
        <p>{{ sido.name }}</p>
        </option>
    </select>
    <select name="bank" id="bank"></select>
    <button @click="search">검색</button>
    <div id="map"></div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      map: null,
      markers: [],
      infowindow: null,
    };
  },


  mounted() {
    // 카카오맵 초기화
    if (window.kakao && window.kakao.maps) {
        this.loadMap()
        
    } else {
        this.loadScript()
    }
  },


  methods: {
    loadMap() {
        const container = document.getElementById("map");
        const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울시청 좌표
        level: 5,
        };
        this.map = new window.kakao.maps.Map(container, options);
        this.infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    },

    loadScript() {
        const scriptTag = document.createElement('script')
        const API_KEY = import.meta.env.VITE_MAP_API_KEY
        scriptTag.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}&libraries=services`;
        scriptTag.onload = () => window.kakao.maps.load(this.loadMap)
        document.head.appendChild(scriptTag)   
    },

    search() {
      // 기존 마커 제거
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
      this.markers = [];
      this.infowindow.close();

      // 키워드 검색
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(this.keyword, this.placesSearchCB);
    },

    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < data.length; i++) {
          this.displayMarker(data[i]);
        }
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 없습니다.");
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
      }
    },

    displayMarker(place) {
      const marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      this.markers.push(marker);

      // 마커에 마우스 이벤트 등록
      kakao.maps.event.addListener(marker, "mouseover", () => {
        this.infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
        this.infowindow.open(this.map, marker);
      });

      kakao.maps.event.addListener(marker, "mouseout", () => {
        this.infowindow.close();
      });

      this.map.panTo(new kakao.maps.LatLng(place.y, place.x));
    },
  },
};

</script>
<script setup>
import { useBankMapStore } from '@/stores/bankMap'
import { ref, onMounted } from 'vue'
// import { onMounted } from 'vue';
const store = useBankMapStore()
const sidoCode = ref(null)

const changeSido = function() {
    store.dispatch('getSiGunGu', sidoCode.value)
}

onMounted(() => {
    store.getSiDo()
})
</script>


<style scoped>
#map {
  width: 100%;
  height: 400px;
}
</style>