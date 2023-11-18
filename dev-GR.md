### 11월 16일
- 환율계산기
  - 변수, 함수 ..
    - country1, country2: 국가1, 국가2
    - inputCost1, inputCost2: 국가1 input값, 국가2 input값 (환율 변경시 input 값이 변경됨)
    - changeCost1, changeCost2: 국가1 input 변경시 국가2 input 변경해주는 함수, 국가2 input 변경시 국가1 input 변경해주는 함수
    - currencyUnit1, currencyUnit2 : 통화단위 처리 (유로, 위안화 -> 국가명 & 통화단위 모두 '유로', '위안화'로 뜨도록)
  - 초기화면 : 국가1 국가2 선택 x
  - 국가1 국가2 모두 선택시 -> 국가1 inputCost: 1(단위), 국가2 inputCost: 계산된금액(단위)
  - 국가1 === 국가2 일 때, 국가1 국가2 inputCost = 1(단위)
  - 국가1 국가2 모두 선택된 상태에서 국가1 or 국가2 변경시 국가1 기준으로 국가2 inputCost 금액 변경

### 11월 17일
- 환율계산기 기능 완성
  - (수정) 국가1 === 국가2 일 때, 국가1 국가2 inputCost를 무조건 1로 설정한 코드 변경.
  - 국가1 === 국가2 가 되면, 국가1 기준으로 국가2 inputCost 변경
- 지도
  - 초기화면: 서울시청
  - input 창에 검색어 입력 후, 엔터 or 검색버튼 클릭시 검색 관련 장소 나옴.
    - (input -> select 시도 / 시군구 / 은행 선택 변경해야 함.)
    - (level 등 세부사항 수정해야 함..)
  - 시도 option
    - 시도(O) 시군구(하는 중) 은행(아직 안함)

### 11월 18일
- 지도
  - select 시도 / 시군구 / 은행 선택 하면 지도화면에 검색결과 나옴
    - (input -> select 변경했음)
    - (목록, level, .. 세부사항 수정필요)
