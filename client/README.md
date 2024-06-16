# 프론트엔드

next.js 기반의 프로젝트입니다.

## 목차
- [설치](#설치)
  * [요구 사항](#요구사항)
  * [사전 설정](#사전-설정)
    + [파이어베이스 연동](#파이어베이스-연동)
    + [카카오 로그인 연동](#카카오-로그인-연동)
  * [빌드](#빌드)
    + [1. 프로젝트 폴더로 이동](#1-프로젝트-폴더로-이동)
    + [2. 패키지 설치](#2-패키지-설치)
    + [3. 환경변수 파일 생성](#3-환경변수-파일-생성)
    + [4. Dev 빌드 실행](#4-dev-빌드-실행)
  * [트러블슈팅](#트러블슈팅)
- [프로젝트 정보](#프로젝트-정보)
  * [패키지](#패키지)
  * [라우터](#라우터)
  * [컴포넌트](#컴포넌트)
  * [스크립트](#스크립트)
  * [캐싱 로컬 스토리지](#캐싱-로컬-스토리지)
  * [참조](#참조)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


## 설치

### 요구사항

- node.js 18.17 이상 [(다운로드)](https://nodejs.org/en)

### 사전 설정

#### 파이어베이스 연동
- 파이어베이스 앱 설정의 Authentication->로그인 방법->제공업체에 Google 추가
- 파이어베이스 앱 설정의 Authentication->설정->도메인->승인된 도메인에 프론트엔드 도메인 추가

[참고 링크](https://ilimes.github.io/web/post37/)

#### 카카오 로그인 연동
- 카카오 앱 설정에서 Redirect URI 에 `{프론트엔드 도메인}/login/kakao` 추가 

[참고 링크](https://developers.kakao.com/docs/latest/ko/kakaologin/prerequisite#kakao-login-redirect-uri)

### 빌드

`/client` 디렉토리로 이동후 npm 패키지 설치와 환경변수 파일 생성을 마치면 빌드 가능합니다.

#### 1. 프로젝트 폴더로 이동

```bash
$ cd .../AI_NES/client
```

#### 2. 패키지 설치

```bash
$ npm install
```

#### 3. 환경변수 파일 생성

`.env.local` 파일 생성

```bash
NEXT_PUBLIC_FIREBASE_API_KEY= "FIREBASE_API_KEY"
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

`.env.local` 파일에 위 값들을 입력하여 root 디렉토리에 위치시켜야함<br>
1~8행은 Firebase App 설정에 따름 [(참고)](https://yzlosmik.tistory.com/160)<br>
- `NEXT_PUBLIC_API_URL` : 백엔드 서버 주소 입력 혹은 테스트 빌드시 `http://localhost:3000`입력
- `NEXT_PUBLIC_SERVER_URL` : 프론트엔드 서버 주소 입력
- `NEXT_PUBLIC_KAKAO_API_KEY` : 카카오 로그인 APP KEY 입력 [(참고)](https://notspoon.tistory.com/34)

#### 4. Dev 빌드 실행

```bash
$ npm run dev
```

`http://localhost:3000` 로 접속

### 트러블슈팅

- Unknown Error

```
⨯ [Error: UNKNOWN: unknown error, open 'D:\oss\AI_NES\client\.next\static\chunks\app\layout.js'] {
  errno: -4094,
  code: 'UNKNOWN',
  syscall: 'open',
  path: 'D:\\oss\\AI_NES\\client\\.next\\static\\chunks\\app\\layout.js'
}
```

백신 프로그램 종료 혹은 디렉토리 권한 확인

- Rewrite Error

```
`destination` does not start with `/`, `http://`, or `https://` for route {"source":"/service/:start/:end","destination":"http:/localhost:3000/:start/:end"}


Error: Invalid rewrite found
```

.env.local 의 `NEXT_PUBLIC_API_URL` 확인<br>
`http://localhost:3000`와 같이 주소 끝의 `/`를 제외한 root 주소를 입력해야함

## 프로젝트 정보

### 패키지

- nodejs-nextjs
- Tailwind CSS
- Headless UI
- Heroicons
- Firebase
- classNames
- Zustand
- Axios
- Flowbite

### 라우터

- app(localhost:3000)
  * about
  * ~~api(for dev)~~
    + ~~getData~~
  * article
    + [date]
      - [id]
  * ~~auth(for dev)~~
    + ~~getToken~~
    + ~~getUser~~
    + ~~login~~
    + ~~logout~~
    + ~~signup~~
  * list
  * login
    + kakao
  * ~~search(for dev)~~
    + ~~news~~

[3. 환경변수 파일 생성](#3-환경변수-파일-생성) 에서 `NEXT_PUBLIC_API_URL`을 로컬호스트로 설정 시 테스트 라우터들이 사용됨

### 컴포넌트

| 이름                  | 설명                      |
| --------------------- | ------------------------- |
| article.tsx           | 뉴스 기사 페이지          |
| article_item.tsx      | 뉴스 기사 아이템          |
| article_list.tsx      | 뉴스 기사 모아보기        |
| article_modal.tsx     | 뉴스 기사 모달            |
| chatbot.tsx           | 챗봇 페이지               |
| chatbot_modal.tsx     | 챗봇 모달                 |
| dashboard.tsx         | 서비스 개요 대시보드      |
| footer.tsx            | 페이지 하단 서비스 정보   |
| headline.tsx          | 헤드라인 뉴스 그리드      |
| headline_carousel.tsx | 헤드라인 Carousel         |
| login.tsx             | 로그인 페이지             |
| login_modal.tsx       | 로그인 모달               |
| navbar.tsx            | 페이지 상단 네비게이션 바 |
| news_item.tsx         | 챗봇 뉴스 검색 아이템     |
| register.tsx          | 회원가입 페이지           |
| register_modal.tsx    | 회원가입 모달             |
| summary_tooltip.tsx   | 기사 요약 툴팁            |

### 스크립트

| 이름                    | 설명                                            |
| ----------------------- | ----------------------------------------------- |
| api/get_articles.tsx    | 백엔로부터 기사 가져오기                        |
| api/get_auth.tsx        | 백엔드로부터 인증 및 토큰 발급                  |
| api/logout.tsx          | 백엔드에 로그아웃 요청                          |
| api/register_native.tsx | 백엔드에 회원가입 요청                          |
| api/search_news.tsx     | 백엔드로부터 네이버 뉴스 api 검색 결과 가져오기 |
| article_store.tsx       | 기사 헤드라인 전역 관리                         |
| auth_store.tsx          | 로그인 세션 전역 관리                           |
| chatbot_store.tsx       | 챗봇 히스토리 전역 관리                         |
| config_firebase.tsx     | 파이어베이스 소셜 로그인 구성                   |
| config_kakao.tsx        | 카카오 소셜 로그인 구성                         |
| date_format.tsx         | 날짜 형식 포맷                                  |

### 캐싱 로컬 스토리지

```js
articleStorage {
    articles: Article[];
    getDate: Date;
    rehydrated?: Boolean;
}
```

```js
authStorage {
    jwt_token: string | null;
    id: string | null;
    provider: string | null;
}
```

```js
chatbotStorage {
    messages: Message[];
    disableHint: boolean;
}
```

### 참조

[오픈소스 이미지](https://unsplash.com/ko)<br>
[Tailwind CSS](https://tailwindui.com)<br>
[Flowbite React](https://flowbite-react.com/)<br>
[Heroicons](https://heroicons.com/)<br>
[Headless UI](https://headlessui.com/)<br>
[Customized Scrollbar](https://www.geeksforgeeks.org/how-to-change-style-of-scrollbar-using-tailwind-css/)<br>
