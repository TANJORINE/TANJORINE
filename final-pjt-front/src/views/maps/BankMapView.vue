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
  <select v-model="bank" name="bank" id="bank">
      <option v-for="bank in store.banks" :value="bank">
        <p>{{ bank }}</p>
      </option>
  </select>
  <button @click="search(siDo.name + ' ' + siGunGu + ' ' + bank)">검색</button>
  
  <div id="container">
    <div id="map"></div>
    <!-- <div id="placesInfo" class="bg_white"> -->
      <!-- <p>테스트</p> -->
      <!-- <ul id="placesInfo"></ul> -->
    <!-- </div> -->
  </div>
    <div id="bankList"></div>
</template>

<script>
export default {
  data() {
    return {
      // keyword: "",
      map: null,
      markers: [],
      searchBank: [],
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
        marker.setMap(null);
      });
      this.markers = [];
      this.searchBank = []
      this.infowindow.close();

      // 키워드 검색
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(keyword, this.placesSearchCB);
      console.log(keyword)
    },

    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < data.length; i++) {
          this.displayMarker(data[i]);
        }
        this.searchBank = data
        this.displayBanks(data)

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정 하기위해
        // LatLngBounds 객체에 좌표를 추가
        var bounds = new kakao.maps.LatLngBounds();

        for (var i=0; i<data.length; i++) {
            this.displayMarker(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        this.map.setBounds(bounds);

      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 없습니다.");
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
      }
    },

    displayMarker(place) {
      // this.searchBank.forEach((place) => {
        const marker = new kakao.maps.Marker({
          map: this.map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });
        this.markers.push(marker);

        // 마커에 마우스 이벤트 등록
        kakao.maps.event.addListener(marker, "mouseover", () => {
          this.infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
          this.infowindow.open(this.map, marker);

          // const infoEl = document.getElementById("placeInfo")
          // // console.log(infoEl)
          // if (infoEl.firstChild) {
          //   // while (infoEl.firstChild) {
          //     infoEl.removeChild(infoEl.firstChild)
          //   // }
          // }
          // const pTag = document.createElement("p")
          // pTag.innerHTML = `<p>이름</p>`
          // infoEl.appendChild(pTag)

        })

        kakao.maps.event.addListener(marker, "click", () => {
          this.map.setLevel(5)
          this.map.panTo(new kakao.maps.LatLng(place.y, place.x))
        });

        kakao.maps.event.addListener(marker, "mouseout", () => {
          this.infowindow.close();
        });
    // }) 

      this.map.panTo(new kakao.maps.LatLng(place.y, place.x));
    },

    displayBanks(place) {
      /* 
      [ place ]
        address_name: "서울 종로구 혜화동 132-1"
        category_group_code: "BK9"
        category_group_name: "은행"
        category_name: "금융,보험 > 금융서비스 > 은행 > 우리은행"
        distance: ""
        id: "20557417"
        phone: "02-766-5321"
        place_name: "우리은행 혜화동지점"
        place_url: "http://place.map.kakao.com/20557417"
        road_address_name: "서울 종로구 창경궁로 270"
        x: "127.001082364298"
        y: "37.5849595434228"
      */

      // 기존 목록 제거
      const bankList = document.getElementById("bankList")
      // bankList.innerHTML = '';
      while (bankList.firstChild) {
        bankList.removeChild(bankList.firstChild)
      }
      // removeAllChildNods(bankList);

      // 새 목록 추가
      this.searchBank.forEach((place) => {
        const pTag = document.createElement("p")
        pTag.innerHTML = `<p>이름: ${place.place_name}</p><p>주소: ${place.address_name}</p><hr>`;
        pTag.addEventListener("click", () => {
          this.clickPlace(place)
        })
        bankList.appendChild(pTag)
      })

    },
    clickPlace(place) {
      this.infowindow.close()
      
      const marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      
      this.infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
      this.infowindow.open(this.map, marker);

      kakao.maps.event.addListener(marker, "mouseover", () => {
        this.infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
        this.infowindow.open(this.map, marker);
      })

      kakao.maps.event.addListener(marker, "click", () => {
        this.map.setLevel(5)
        this.map.panTo(new kakao.maps.LatLng(place.y, place.x))
      });

      kakao.maps.event.addListener(marker, "mouseout", () => {
        this.infowindow.close();
      });

      this.map.setLevel(5)
      this.map.panTo(new kakao.maps.LatLng(place.y, place.x));
      console.log(this.markers)


      // const infoEl = document.getElementById("placeInfo")
      // console.log(infoEl)
      // if (infoEl.firstChild) {
      //   // while (infoEl.firstChild) {
      //     infoEl.removeChild(infoEl.firstChild)
      //   // }
      // }
      // const pTag = document.createElement("p")
      // pTag.innerHTML = `<p>이름</p>`
      // infoEl.appendChild(pTag)
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

onMounted(() => {
    store.getSiDo()
    store.resetSiGunGu()
    store.getBank()
})
</script>


<style scoped>
#container {
  position:relative;
}
#map {
  width: 100%;
  height: 400px;
}
select{
  width: 200px;
}
#placesInfo {
  position:absolute;
  top:0px;
  left:0;
  bottom:0;
  width:250px;
  height: 250px;
  /* height : x */
  margin:10px 0 30px 10px;
  padding:5px;
  overflow-y:auto;
  background:rgba(255, 255, 255, 0.7);
  z-index: 1;
  font-size:12px;
  border-radius: 10px;
}
.bg_white {background:#fff;}
</style>