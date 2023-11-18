## 11월 16일 개발 일지
- 작업 목록
    - back, front 기본 환경 구축
        - DRF(back), Vue(front)
        - 라이브러리 설치 (requirements.txt / package.json)
    - 기능 구현
        - Accounts.User Model 생성(AbstractBaseUser Model 커스터마이징)
        - 회원가입 기능 구현

## 11월 17일 개발 일지
- 작업 목록
    - 기능 구현
        - 회원정보 수정
        - 로그인 기능 구현
        - 로그인시 Token 발행 및 확인
        - front에서 로그인시 로그인이 유지가 되지 않는 현상 확인 및 수정
            - localstoreage에 토큰을 저장하는 것을 구현하지 않아 발생한 문제
            - 해결
        - 금융 상품 조회 기능 구현(30%)
            - 관리자가 아닌 이상 front단에서 필요하지 않은 기능이라 판단
            - 관리자가 요청을 누를시 front단에서 금감원 API에 다이렉트로 요청을 날리는 것이 아닌 front->back->금감원API 방식으로 진행

## 11월 18일 개발 일지
- 작업 목록
    - 기능 구현
        - 로그아웃 기능 구현
            - 로그아웃시 Token 삭제 및 localstoreage 정리
        - 

