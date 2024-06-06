# 프론트엔드

## 패키지
- nodejs-nextjs
- Tailwind CSS
- Headless UI
- Heroicons
- Firebase
- classNames
- Zustand
- Axios
- Flowbite

## 라우터

- app(localhost:3000)
    - about
    - ~~api(for dev)~~
        - ~~getData~~
    - ~~auth(for dev)~~
        - ~~getToken~~
        - ~~getUser~~
        - ~~login~~
        - ~~logout~~
        - ~~signup~~
    - login
        - kakao
    - register
    - ~~search(for dev)~~
        - ~~news~~

## 컴포넌트

| 이름 | 설명 |
| --- | --- |
| article.tsx | 뉴스 기사 페이지 |
| article_modal.tsx | 뉴스 기사 모달 |
| dashboard.tsx | 서비스 개요 대시보드 |
| footer.tsx | 페이지 하단 서비스 정보 |
| headline.tsx | 헤드라인 뉴스 그리드 |
| headline_carousel.tsx | 헤드라인 Carousel |
| navbar.tsx | 페이지 상단 네비게이션 바 |
| login.tsx | 로그인 페이지 |
| login_modal.tsx | 로그인 모달 |
| register.tsx | 회원가입 페이지 |
| register_modal.tsx | 회원가입 모달 |
| chatbot.tsx | 챗봇 페이지 |
| chatbot_modal.tsx | 챗봇 모달 |

## 스크립트

| 이름 | 설명 |
| --- | --- |
| article_store.tsx | 기사 헤드라인 전역 관리 |
| auth_store.tsx | 로그인 세션 전역 관리 |
| chatbot_store.tsx | 챗봇 히스토리 전역 관리 |
| config_firebase.tsx | 파이어베이스 소셜 로그인 구성 |
| config_kakao.tsx | 카카오 소셜 로그인 구성 |
| api/get_articles.tsx | 백엔로부터 기사 가져오기 |
| api/get_auth.tsx | 백엔드로부터 인증 및 토큰 발급 |
| api/logout.tsx | 백엔드에 로그아웃 요청 |
| api/register_native.tsx | 백엔드에 회원가입 요청 |
| api/search_news.tsx | 백엔드로부터 네이버 뉴스 api 검색 결과 가져오기 |

## .env.local

```bash
NEXT_PUBLIC_API_KEY= "API_KEY"
NEXT_PUBLIC_AUTH_DOMAIN= "AUTH_DOMAIN"
NEXT_PUBLIC_DATABASE_URL= "DATABASE_URL"
NEXT_PUBLIC_PROJECT_ID= "PROJECT_ID"
NEXT_PUBLIC_STORAGE_BUCKET= "STORAGE_BUCKET"
NEXT_PUBLIC_MESSAGING_SENDER_ID= "MESSAGING_SENDER_ID"
NEXT_PUBLIC_APP_ID= "APP_ID"
NEXT_PUBLIC_MEASUREMENT_ID= "MEASUREMENT_ID"
NEXT_PUBLIC_API_URL= "BACKEND_URL"
NEXT_PUBLIC_SERVER_URL= "FRONTEND_URL"
NEXT_PUBLIC_KAKAO_API_KEY= "KAKAO_CLIENT_ID"
```
환경변수에 위 값들을 작성하여 root 디렉토리에 위치시켜야함
`NEXT_PUBLIC_API_URL`에 `http://localhost:3000`입력하여 로컬에서 테스트 가능
`NEXT_PUBLIC_SERVER_URL`필드에는 프론트엔드 서버의 root 주소(`http://localhost:3000` 등)지정

# 참조
[오픈소스 이미지](https://unsplash.com/ko)
[Tailwind CSS](https://tailwindui.com)
[Flowbite React](https://flowbite-react.com/)
[Customized Scrollbar](https://www.geeksforgeeks.org/how-to-change-style-of-scrollbar-using-tailwind-css/)
