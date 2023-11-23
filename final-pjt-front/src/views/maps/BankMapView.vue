<template >
  <div class="container">
    <div class="row g-2">

  <div id="left-container" class="box col-4 col-sm-12 col-md-6 col-lg-4">
    <div class="search-bank-box">

      <ul class="nav nav-underline" id="search-bar">
        <li class="nav-item" @click="selectOrSearch('select')">
          <div class="nav-link" style="color: black;">지역 선택</div>
        </li>
        <li class="nav-item" @click="selectOrSearch('search')">
          <div class="nav-link" style="color: black;">직접 검색</div>
        </li>
      </ul>
      <div v-if="findBankMethod" id="select-bank">
        <div> <!-- (시도 시군구) (은행) div -->
          <div> <!-- 시도 시군구 div -->
            <label for="sido"></label>
            <select v-model="siDo" @change="changeSido" name="sido" id="sido">
              <option value="" selected>시/도</option>
              <option v-for="sido in store.siDo" :value="sido">
                {{ sido.name }}
              </option>
            </select>
            
            <label for="sigungu"></label>
            <select v-model="siGunGu" name="sigungu" id="sigungu">
              <option value="" selected>시/군/구</option>
              <option v-for="sigungu in store.siGunGu" :value="sigungu">
                {{ sigungu }}
              </option>
            </select>
          </div> <!-- 시도 시군구 div -->
            
          <label for="bank"></label>
          <select v-model="bank" name="bank" id="bank">
            <option value="" selected>은행</option>
            <option v-for="bank in store.banks" :value="bank">
              {{ bank }}
            </option>
          </select>
        </div> <!-- (시도 시군구) (은행) div -->
        <button class="select-button btn btn-secondary brown" @click="search(siDo.name + ' ' + siGunGu + ' ' + bank)">검색</button>
      </div> <!-- "select-bank" -->
      <div v-else id="search-bank">
        <input class="input-bank" type="text" v-model="inputBank">
        <button class="search-button btn btn-secondary brown" @click="search(inputBank)">검색</button>
      </div> <!-- "search-bank" -->
    </div> <!-- "search-bank-box" -->
  <div class="list-group list-group-flush" id="bankList"></div>
  </div> <!-- "left-container" -->
  <!-- <div class="box col-1">

  </div> -->
    <div id="right-container" class="box col-8 col-sm-12 col-md-6 col-lg-8">

      <div id="detail-bank">
        <div id="placeInfoWindow"> <!-- placeInfo -->
          <div v-if="details.length" v-for="detail in details">
            <div id="placeInfo" class="card placeInfo">  <!-- openPlaceInfo -->
              <div style="display: flex; font-size:15px; font-weight: 600; justify-content: center;">{{ detail.name }}</div>
              <div class="detail-content">
                <hr style="margin: 5px 0 10px;">
                <div style="font-size: 13px;">{{ detail.address }}</div>
                <div style="font-size: 11px; margin-left: 22px;">{{ detail.subAddress }}</div>
                <div style="font-size: 12px;">{{ detail.phone }}</div>
                <a :href="detail.kakao" style="font-size: 11px;">카카오맵</a>
              </div>
            </div>
          </div>

          <div v-else class="font-brown" style="display: flex;">
            <div>
              마커 또는 목록을 클릭하면 상세 정보를 볼 수 있어요!
            </div>
          </div>
  
          <!-- <p id="closePlaceInfo" @click="closePlaceInfo"></p> -->
        </div>

      </div>
      <div id="map-container">
        <div id="map"></div>
      </div>
      </div> <!-- "right-container" -->
    </div> <!-- "row" -->
  </div> <!-- "container" -->
</template>

<script>
import { ref } from 'vue'

export default {
  data() {
    return {
      // keyword: "",
      map: null,
      markers: [],
      searchBank: [],
      infowindow: null,
      findBankMethod: true,  // select: true / search: false
      details: [],
    };
  },

  mounted() {
    const inputBank = ref("")
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

    selectOrSearch(mthd) {
      const bankList = document.getElementById("bankList")
      while (bankList.firstChild) {
        bankList.removeChild(bankList.firstChild)
      }
      if (mthd === 'select') {
        this.findBankMethod = true
      } else if (mthd === 'search') {
        this.findBankMethod = false
      }
    },

    search(keyword) {
      console.log(keyword)
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
      const marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      this.markers.push(marker);

      // 마커에 마우스 이벤트 등록
      kakao.maps.event.addListener(marker, "mouseover", () => {
        this.infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
        this.infowindow.open(this.map, marker);       
      })
      
      kakao.maps.event.addListener(marker, "click", () => {
        this.map.setLevel(5)
        this.map.panTo(new kakao.maps.LatLng(place.y, place.x))

        const placeDetail = {
        'pk': place.id,
        'name': place.place_name, 
        'address': `📍 ${place.road_address_name}`, 
        'subAddress': place.address_name, 
        'phone': `📞 ${place.phone}`, 
        'kakao': place.place_url,
        }

        if (!this.details.find(info => info.pk === placeDetail.pk)) {
          this.details.unshift(placeDetail)
          if (this.details.length > 5) {
            this.details.pop()
          }
        }
      });
      
      kakao.maps.event.addListener(marker, "mouseout", () => {
        this.infowindow.close();
      });

      this.map.panTo(new kakao.maps.LatLng(place.y, place.x));
    },

    displayBanks(place) {
      // 기존 목록 제거
      const bankList = document.getElementById("bankList")
      while (bankList.firstChild) {
        bankList.removeChild(bankList.firstChild)
      }

      // 새 목록 추가
      this.searchBank.forEach((place) => {
        const divTag = document.createElement("div")
        divTag.innerHTML = `
        <div style="display: flex;">
        <div style="font-size: 23px;">📍</div>
        <div style="width: 100%;">
          <strong style="font-size:15px;">${place.place_name}</strong>
          <div style="font-size:13px;">${place.address_name}</div><hr>
        </div>
        </div>
        `;
        divTag.addEventListener("click", () => {
          this.clickPlace(place)
        })
        bankList.appendChild(divTag)
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

      const placeDetail = {
        'pk': place.id,
        'name': place.place_name, 
        'address': `📍 ${place.road_address_name}`, 
        'subAddress': place.address_name, 
        'phone': `📞 ${place.phone}`, 
        'kakao': place.place_url,
      }
    

      if (!this.details.find(info => info.pk === placeDetail.pk)) {
        this.details.unshift(placeDetail)
        if (this.details.length > 5) {
          this.details.pop()
        }
      }

    },
  },
};

</script>
<script setup>
import { useBankMapStore } from '@/stores/bankMap'
import { ref, onMounted } from 'vue'

const store = useBankMapStore()
const siDo = ref('')
const siGunGu = ref('')
const bank = ref('')

// const details = ref([])

const changeSido = function() {
    store.getSiGunGu(siDo.value.code.slice(0, 2))
    console.log(details)
}

onMounted(() => {
    store.getSiDo()
    store.resetSiGunGu()
    store.getBank()
})
</script>


<style scoped>
.search-bank-box{
  height: 160px;
}
#search-bar{
  display: flex;
  justify-content: space-evenly;
  /* width: 300px; */
}
#select-bank{
  display: flex;
  /* width: 300px; */
  height: 100px;

  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}
#search-bank{
  display: flex;
  height: 100px;
  justify-content: space-evenly;
  align-items: center;
  /* width: 300px; */
}
#sido{
  width: 140px;
  margin-right: 3px;
  font-size: 15px;
}
#sigungu{
  width: 120px;
  margin-left: 3px;
  font-size: 15px;
}
#bank{
  width: 100%;
  margin-top: 5px;
  /* width: 200px; */
  font-size: 15px;
}
.select-button{
  height: 45px;
}
.search-button{
  /* height: 45px; */
  /* height: 20px; */
  height: 40px;
}
.input-bank{
  /* width: 70%;
  height: 40px;
  font-size: 13px; */
  width: 260px;
  margin-right: 20px;
}
/* #left-container{
  border-radius: 5px;
  box-shadow: 2px 2px 3px #6C5F5B;
} */
/* #right-container{
  border-radius: 5px;
  box-shadow: 2px 2px 3px #6C5F5B;
} */
#bankList{
  border-radius: 15px;
  margin: 0px 5px;
  padding: 15px;
  height: 550px;
  overflow-y: scroll;
  background-color: white;
}

#detail-bank{
  /* border-radius: 15px; */
  height: 200px;
  width: 100%;
  overflow-x: scroll;
  display: flex;
  align-items: center;
}
#map-container {
  position:relative;
  display: flex;
}
#map {
  width: 100%;
  /* width: 600px; */
  height: 500px;
  margin-top: 10px;
}
select{
  width: 200px;
}
.placeInfoTest {
  display: flex;
  justify-content: center;
  /* position:absolute; */
  top:0px;
  /* top:100px; */
  left:0;
  bottom:0;
  width: 250px;
  height: 150px;
  /* height : x */
  margin:10px 0 30px 10px;
  padding:15px;
  overflow-y:auto;
  /* background:rgba(255, 255, 255, 0.7); */
  /* background:rgba(167, 188, 243, 0.7); */
  /* font-size:12px; */
  border-radius: 10px;
  /* border: 1px black solid;   */
}
.placeInfo {
  display: flex;
  justify-content: center;
  top:0px;
  left:0;
  bottom:0;
  width:250px;
  height: 150px;
  margin:0px 3px;
  padding: 0px 5px;
  /* overflow-y:auto; */
  border-radius: 10px;
}
.detail-content{
  padding: 0px 15px;
}
#placeInfoWindow{
  display: flex;
  /* position: absolute; */
}
#closePlaceInfo{
  /* color: rgba(0, 0, 0, 0); */
  /* position: absolute; */
}
.infoPTag{
  margin-bottom: 0px;
}
/* .bg_white {
  background:#fff;
} */
</style>