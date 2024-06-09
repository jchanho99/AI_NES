# AI News Thumbnail Webpage - Crawling

## 프로젝트 개요
이 프로젝트는 AI 기술을 활용하여 뉴스 헤드라인과 링크를 스크래핑하고, 뉴스 기사의 원문을 요약하여 사용자에게 제공합니다. Azure Function apps를 사용하여 자동화된 시스템을 구축합니다.

## 주요 기능
1. **뉴스 헤드라인 및 링크 스크래핑**
   - 뉴스 사이트에서 최신 헤드라인과 링크를 스크래핑합니다.
2. **뉴스 기사 원문 가져오기**
   - 스크래핑한 링크를 따라가 trafilatura를 사용하여 뉴스 기사 원문을 가져옵니다.
3. **기사 요약 생성**
   - 가져온 뉴스 기사를 OpenAI API를 활용하여 요약합니다.
4. **데이터 저장**
   - 요약된 뉴스, 뉴스원문, 언론사 등 데이터들을 JSON 형태로 Firebase에 저장합니다.

## 기술 스택
- **스크래핑**: BeautifulSoup, Requests
- **기사 원문 추출**: Trafliatura
- **요약 생성**: OpenAI API, Langchain
- **데이터베이스**: Firebase
- **클라우드 환경**: Azure Portal, Azure CLI
- **언어**: Python

## 라이브러리 라이선스 정보
- **azure-functions**
  - 라이선스: MIT License
  - 재배포: 가능
  - 상업적 이용: 가능
  - [라이선스 내용](https://github.com/Azure/azure-functions-python-library/blob/dev/LICENSE)

- **requests**
  - 라이선스: Apache License 2.0
  - 재배포: 가능
  - 상업적 이용: 가능
  - [라이선스 내용](https://github.com/psf/requests/blob/main/LICENSE)

- **trafilatura**
  - 라이선스: MIT License
  - 재배포: 가능
  - 상업적 이용: 가능
  - [라이선스 내용](https://github.com/adbar/trafilatura/blob/main/LICENSE)

- **firebase_admin**
  - 라이선스: Apache License 2.0
  - 재배포: 가능
  - 상업적 이용: 가능
  - [라이선스 내용](https://github.com/firebase/firebase-admin-python/blob/master/LICENSE)

- **lxml**
  - 라이선스: BSD License
  - 재배포: 가능
  - 상업적 이용: 가능
  - [라이선스 내용](https://github.com/lxml/lxml/blob/master/LICENSE.txt)

- **BeautifulSoup (bs4)**
  - 라이선스: MIT License
  - 재배포: 가능
  - 상업적 이용: 가능
  - [라이선스 내용](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#license)

- **langchain, langchain-openai, langchain-core**
  - 라이선스: MIT License
  - 재배포: 가능
  - 상업적 이용: 가능
  - [라이선스 내용](https://github.com/hwchase17/langchain/blob/master/LICENSE)

- **json**
  - 라이선스: JSON License (The Software shall be used for Good, not Evil.)
  - 재배포: 제한적 가능 (Good, not Evil 조건)
  - 상업적 이용: 제한적 가능 (Good, not Evil 조건)
  - [라이선스 내용](http://www.json.org/license.html)

- **openai**
  - 라이선스: MIT License
  - 재배포: 가능
  - 상업적 이용: 가능
  - [라이선스 내용](https://github.com/openai/openai-python/blob/main/LICENSE)

## 설치 및 설정 방법
### 사전 요구사항
- Azure 계정
- Firebase 프로젝트 (realtime DB)
- OpenAI API 키

### 환경 설정
1. **Azure 설정**
   - Azure Function App를 생성하고 Timer Trigger Function app을 설정합니다.
   - Azure CLI, Azure Core Tools를 설치하고 구성합니다.
   - VScode(IDE) 상에서 Azure CLI와 Azure Core Tools 등 여러 Extension들을 설치합니다.

2. **Firebase 설정**
   - Firebase 프로젝트를 생성하고, 실시간 데이터베이스를 설정합니다.
   - Firebase Admin SDK를 설정하고, 서비스 계정 키 json 파일을 생성합니다.

3. **OpenAI API 설정**
   - OpenAI API 키를 발급받습니다.
  
### 실행
1. **Azure 설치**
      - Azure설치가 정상적으로 진행되었다면 두가지 경로로 접근할 수 있습니다(Azure    Portal(web), Azure CLI (local)
2. **가상환경 설치**
   - Python 3.11 버전으로 가상환경을 설치하고 git에 있는 파일들을 다운로드 받습니다.
3. **Key 입력**
   - 필요한 키들을 입력합니다 ex) keys.py 내부에 있는 Realtime database url 혹은 openai api key, firebase admin json file생성 등
5. **Azure deploy**
