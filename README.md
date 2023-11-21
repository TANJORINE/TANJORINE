# 웹 프로젝트 개발일지 (박병조, 박규리)
## 1일차
---
1. 구현 아이디어(목표 기본 사항 + 추가 개발)
    1. 예금 / 적금 금리 비교
    2. 환율 계산기
    3. 주변 은행 검색
    4. 금융 상품 추천(중요함!)
    5. 추가 개발
        - 신혼 부부나 사회초년생 대상으로???(지자체 지원금 등등)
        - 신생아 적금 보호자가 가입하는...? 은행별로 상이하다

2. 개발 환경 + 라이브러리
    - IDE
        - VS Code
    - back
        - Django
            - DRF
            - cors
            - pandas(고려해봐야할 사항)
            - numpy(고려해봐야할 사항)
    - front
        - Vue
            - axios
            - bootstrap(5.2.3)

3. 개발 기간(~11/23)
- 22일/오전까지는 최종본이 나와야하고
    - 이번주 주말안에 api관련 + 기본 기능 끝을 내야함.
    - 월요일에는 알고리즘 구현.
    - 화요일에는 디자인만.(CSS 및 세부 사항 조율)
- 23일까지 배포 테스트 구동 잘 되는지
- 문서작업

4. 업무분담
- 공통
    - DB 세팅 100 %
        - ERD
    - 컴포넌트 구조 설정 0 %
        - 
    - api 0 %
        - 금융 상품 호출 및 처리 (DB파트 후처리 까지) 
    - 상품 추천 알고리즘 0 %
        - 나이별
        - 자본별
        - 개인별
    - 추가 개발 0 %
        - 미정
- 규리
    - api 관련 처리
        - 카카오맵 api 호출 및 처리 0 %
        - 환율 계산기 api 호출 및 처리 0 % 
- 병조
    - 프로젝트 로그인/인증 기능 구현 
        - DRF 구현 40 %
        - 사용자 계정 관련 DRF 구현 70% (회원가입, 로그인, 로그아웃) # 11월 18일 #19일 퍼센트 수정
        - 추가
            - 커뮤니티 간략한 게시글 및 댓글 작성 계획(20일)
            - 상품 비교 구현 마무리(20일)
    - Vue 컴포넌트 작업 0 %

    