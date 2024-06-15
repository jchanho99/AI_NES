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
0. **Test.ipynb 노트북 이용**
      - 해당 노트북파일을 이용하여, 간단히 function들을 실행해 볼 수 있다. function 들을 독립적으로 호출해 실행해 각 함수들이 어떤것을 리턴하는지 직접적으로 볼 수 있다(단, API Key나 Firebase realtimeDB에 관한 설정이 되어 있을 것).
      - 아래에서 다루는 내용들은 crawling 폴더 내에 있는 파일들을 Azure의 Timer trigger를 이용하여 배포한 것이다.  
1. **Azure CLI 설치**
   a. Azure CLI를 Mac 환경에서 설치하려면 Homebrew가 필요하다.
   b.
   `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

      - Azure CLI 설치가 정상적으로 진행되었다면 두가지 경로로 접근할 수 있습니다(Azure Portal(web), Azure CLI (local)
3. **가상환경 설치**
   - Python 3.11 버전으로 가상환경을 설치하고 crawling 에 있는 파일들을 다운로드 받습니다.
4. **Key 입력**
   - 필요한 키들을 입력합니다 ex) keys.py 내부에 있는 Realtime database url 혹은 openai api key, firebase admin json file생성 등
5. **Azure deploy**
   - Azure Function apps 의 timer tirgger로 Azure deploy하위의 파일들을 가상환경자체로 deploy 시킵니다. function_apps.py 가 timetrigger파일입니다! (가상환경을 activate하고, 터미널 상에서 azure에 로그인 합니다. 리소스 그룹, 구독 생성 등등은 개인이 생성하는 것 이므로 생략합니다.)
   - Timetrigger
6. **Mac OS환경 혹은 Azure 실행에 문제가 있을때 아래 노션 참고**
   - 아래 노션을 참고하여 Azure venv를 만들고, 해당 venv폴더를 deploy하면 된다.(만약 Azure를 사용한 적이 있고, 리소스 그룹 및 어카운트같은 것을 설정한 적이 있다면, 17번을 참고하면된다.)
   https://www.notion.so/Azure-b4b4ad55e6974931949b9a9846e7e4dc?pvs=4
   
