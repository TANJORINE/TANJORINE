import { ref } from 'vue';

export default (await import('vue')).defineComponent({
name: 'BankMap',
data() {
return {
map: null
};
},
setup() { },
created() { },
mounted() {
// 카카오 객체 있고 맵그릴 준비가 되었으면 맵실행
if (window.kakao && window.kakao.maps) {
this.loadMap();
// 없다면 카카오 스크립트 추가 후 맵실행
} else {
this.loadScript();
}
},
unmounted() { },
methods: {
loadScript() {
const script = document.createElement('script');
const API_KEY = import.meta.env.VITE_MAP_API_KEY;
script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}&libraries=services`;
script.onload = () => window.kakao.maps.load(this.loadMap);

document.head.appendChild(script);
},
loadMap() {
const container = document.getElementById('map');
const options = {
center: new window.kakao.maps.LatLng(36.108184, 128.413968),
level: 3,
};
var keyword = ref('은행');
this.map = new window.kakao.maps.Map(container, options);
// this.loadMarker()
const ps = new kakao.maps.services.Places(this.map);
// ps.keywordSearch(keyword.value, this.placesSearchCB, {
//     useMapBounds: true,
// })
const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
this.searchPlaces();
},
loadMarker() {
const markerPosition = new window.kakao.maps.LatLng(36.108184, 128.413968);

const marker = new window.kakao.maps.Marker({
position: markerPosition
});

marker.setMap(this.map);
},
searchPlaces() {
var keyword = document.getElementById('keyword').value;
if (!keyword.replace(/^\s+|\s+$/g, '')) {
alert('키워드 입력');
return false;
}
ps.keywordSearch(keyword.value, this.placesSearchCB, {
useMapBounds: true,
});
},
placesSearchCB(data, status) {
if (status === kakao.maps.services.Status.OK) {
var bounds = new kakao.maps.LatLngBounds();
for (var i = 0; i < data.length; i++) {
this.displayMarker(data[i]);
bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
}
map.setBounds(bounds);
}
},
displayMarker(place) {
var marker = new kakao.maps.Marker({
map: map,
position: new kakao.maps.LatLng(place.y, place.x)
});


}
},
});
const __VLS_componentsOption = {};
const __VLS_name = 'BankMap' as const;
function __VLS_template() {
let __VLS_ctx!: InstanceType<import('./__VLS_types.js').PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_localComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption & typeof __VLS_ctx;
let __VLS_otherComponents!: typeof __VLS_localComponents & import('./__VLS_types.js').GlobalComponents;
let __VLS_own!: import('./__VLS_types.js').SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & typeof __VLS_publicComponent & (new () => { $slots: typeof __VLS_slots; }) >;
let __VLS_components!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_templateComponents!: {};
{
({} as JSX.IntrinsicElements).select;
({} as JSX.IntrinsicElements).select;
(__VLS_x as JSX.IntrinsicElements)['select'] = { name: ("si"), id: ("si"), };
}
{
({} as JSX.IntrinsicElements).select;
({} as JSX.IntrinsicElements).select;
(__VLS_x as JSX.IntrinsicElements)['select'] = { name: ("gu"), id: ("gu"), };
}
{
({} as JSX.IntrinsicElements).select;
({} as JSX.IntrinsicElements).select;
(__VLS_x as JSX.IntrinsicElements)['select'] = { name: ("bank"), id: ("bank"), };
}
{
({} as JSX.IntrinsicElements).button;
({} as JSX.IntrinsicElements).button;
(__VLS_x as JSX.IntrinsicElements)['button'] = {};
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { id: ("map"), };
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
declare var __VLS_slots: {};
return __VLS_slots;
}
let __VLS_internalComponent!: typeof import('./BankMap copy.vue')['default'];
