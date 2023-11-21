<template>
  <select v-model="siDo" @change="changeSido" name="sido" id="sido">
    <option v-for="sido in store.siDo" :value="sido">
      <p>{{ sido.name }}</p>
    </option>
  </select>
  
  <select v-model="siGunGu" name="sigungu" id="sigungu">
    <option v-for="sigungu in store.siGunGu" :value="sigungu">
      <p>{{ sigungu }}</p>
    </option>
  </select>
  <select v-model="selectBank" name="selectBank" id="selectBank">
      <option v-for="bank in store.banks" :value="bank">
        <p>{{ bank }}</p>
      </option>
  </select>
  <button @click="search(siDo.name + ' ' + siGunGu + ' ' + selectBank)">검색</button>
  <div id="map"></div>
  <div id="bankList">
    <ul>
      <li v-for="(place, index) in searchBank" :key="index" @click="selectPlace(place)">
        <!-- <p>ㅇㅇㅇㅇ {{ place.place_name }} - {{ place.address_name }}</p> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      markers: [],
      infowindow: null,
      searchBank: [],
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
          level: 7,
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

    search(keyword) {
      // 기존 마커 제거
      this.markers.forEach((marker) => {
        marker.setMap(null)
      })
      this.markers = []
      this.infowindow.close()
      this.searchBank = []

      // 키워드 검색
      const ps = new kakao.maps.services.Places()
      ps.keywordSearch(keyword, this.placesSearchCB)
      // console.log(keyword)
    },

    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        this.searchBank = data
        this.displayResults()
        // for (let i = 0; i < data.length; i++) {
        //   this.displayMarker(data[i]);
        // }
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 없습니다.");
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("오류가 발생했습니다.");
      }
    },
    displayResults() {
      this.displayBanks()
      this.displayMarkers()
    },

    displayBanks() {
      // 기존 목록 제거
      const bankList = document.getElementById("bankList")
      while (bankList.firstChild) {
        bankList.removeChild(bankList.firstChild)
      }

      // 새로운 목록 추가
      this.searchBank.forEach((place, index) => {
        const bank = ref({})
        bank.value = {name: place.place_name, address: place.address_name}


        // 속도 느려짐 ...
        // const bankInfo = document.createElement("div")
        // bankInfo.textContent = '은행: ' + place.place_name + ' / 위치: ' + place.address_name
        // // bankInfo.innerHTML = `<p>이름: ${bank.value.name}</p><p>주소: ${bank.value.address}</p>`;
        // bankList.addEventListener("click", () => this.selectPlace(place))
        // bankList.appendChild(bankInfo)

        // const liTag = document.createElement("li")
        // // liTag.textContent = '은행: ' + place.place_name + ' / 위치: ' + place.address_name
        // liTag.innerHTML = `<p>이름: ${bank.value.name}</p><p>주소: ${bank.value.address}</p>`;

        // liTag.addEventListener("click", () => this.selectPlace(place))
        // bankList.appendChild(liTag)

        const pTag = document.createElement("p")
        // liTag.textContent = '은행: ' + place.place_name + ' / 위치: ' + place.address_name
        pTag.innerHTML = `<p>이름: ${bank.value.name}</p><p>주소: ${bank.value.address}</p><hr>`;

        pTag.addEventListener("click", () => this.selectPlace(place))
        bankList.appendChild(pTag)
      })
    },
    displayMarkers() {
        this.searchBank.forEach((place) => {
          const marker = new kakao.maps.Marker({
            // map: this.map,
            position: new kakao.maps.LatLng(place.y, place.x),
          });

          // 마커에 마우스 이벤트 등록
          kakao.maps.event.addListener(marker, "mouseover", () => {
            this.infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
            this.infowindow.open(this.map, marker);
          });

          // 새로운 마커 표시
          marker.setMap(this.map);
          this.markers.push(marker);
        }) 
    },

    selectPlace(place) {

      this.displayMarkers()

      // // 기존 마커 제거
      // this.markers.forEach((marker) => marker.setMap(null));
      // this.markers = [];
      // this.infowindow.close();


      // 정보창 열기
      this.infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
      this.infowindow.open(this.map, this.markers[0]);
      // for (let i = 0; i < data.length; i++) {
      //   this.displayMarker(data[i]);
      // }

      // 지도 이동
      // this.map.setLevel(3);
      this.map.panTo(new kakao.maps.LatLng(place.y, place.x));
      // this.map.panTo(new kakao.maps.LatLng(place.y, place.x), 3);
      // this.map.setLevel(3, { anchor: new kakao.maps.LatLng(place.y, place.x) });
      
      
      // kakao.maps.event.addListener(marker, "mouseout", () => {
      //   this.infowindow.close();
      // });
      
      // this.map.panTo(new kakao.maps.LatLng(place.y, place.x));
    },
  },
};

</script>
<script setup>
import { useBankMapStore } from '@/stores/bankMap'
import { ref, onMounted } from 'vue'

const store = useBankMapStore()
const siDo = ref(null)

const changeSido = function() {
    store.getSiGunGu(siDo.value.code.slice(0, 2))
}

console.log(store.banks)

onMounted(() => {
    store.getSiDo()
    store.resetSiGunGu()
    store.getBank()
})
</script>


<style scoped>
#map {
  width: 100%;
  height: 400px;
}
select{
  width: 200px;
}
</style>