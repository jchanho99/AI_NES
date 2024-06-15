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
      - 해당 노트북파일을 이용하여, 간단히 Crawling에 사용되는 함수들을 실행해 볼 수 있다. 각 함수들은 독립적으로 호출이 가능하며, 이를 직접 실행해 각 함수들이 어떤것을 리턴하는지 직접적으로 볼 수 있다(단, API Key나 Firebase realtimeDB에 관한 설정이 되어 있을 것).
      - 아래에서 다루는 내용들은 crawling 폴더 내에 있는 파일들을 Azure의 Timer trigger를 이용하여 배포한 것이다.  
1. **Azure CLI 설치**
      - MacOS에서 VScode 를 사용하는 local environment 기준으로 이루어 집니다.
      - Homebrew 설치(아래 커맨드를 터미널에서 입력하고, 나오는 homebrew의 지시를 확인하고 따를 것.)
   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
      - 터미널에서 다음과 같이 Azure CLI 설치와 homebrew를 최신으로 설치한다.
        ```
        $ brew update && brew install azure-cli
        ```
      - Azure CLI 설치가 정상적으로 진행되었다면 두가지 경로로 Azure를 사용할 수 있습니다(Azure Portal(web), Azure CLI(local)
2. **Azure CLI 실행**
      - Azure CLI가 제대로 설치가 되었다면 az 커맨드 명령이 정상적으로 작동할 것이다. 다음과 같이 터미널에서 Azure 로그인을 진행할 수 있다. 
   ```
   $ az -login
   ```
      - 위와같은 커맨드 실행 시 Azure 서비스 로그인 창이 AzurePortal을 통하여 뜰 것이다. 로그인해주고, 가입이 안되어 있다면 Azure Portal로 가서 회원가입을 해야한다(이때 구독설정 및 카드등록 등의 절차를 마쳐야 한다).
      - Azure 서비스 로그인을 Azure Portal에서 마치고 나면, 터미널창에 다음과 같은 구독 선택이 나오게 된다. 본인이 원하는 Azure 구독을 선택한다.
      - 그렇게 되면 터미널에서 Azure Portal에서 제공하는 서비스를 커맨드로 작동시킬 수 있다.
        
3. **Azure functions core tools 설치**
      - homebrew로 간단하게 설치할 수 있다.
        ```
        brew tap azure/functions
        brew install azure-functions-core-tools@4
        ```
      - 이때 func의 경로설정이 제대로 되었는지 확인해야한다
        ```
        'export PATH="/usr/local/opt/azure-functions-core-tools@4/bin:$PATH"' >> ~/.zshrc
        source ~/.zshrc
        ```
      - Azure function core tool을 정상적으로 설치하였다면 터미널에서 Azure function과 관련된 func 커맨드를 사용할 수 있다.
        ```
         func start
        ```
      - 해당 커맨드로 Azure func을 실행할 수 있다. (해당 커맨드까지 정상적으로 실행되어야, 제대로 설치된것.)
4. **VScode**
      - vscode를 실행하고 다음 Extension들을 추가한다(Azure Account, Azure App Service, Azure Container Apps, Azure Database, Azure Developer CLI, Azure Functions, Azure resources).
5. **VScode에서 Azure실행**
      - VScode의 사이드바에 Azure가 생성되었다면 Azure 탭에 들어가서 Create New Project -> Browse( 가상환경 프로젝트 폴더로 사용할 폴더 생성 혹은 경로설정)
   <img width="998" alt="스크린샷 2024-06-02 오전 12 31 07" src="https://github.com/jchanho99/AI_NES/assets/71568851/32dbb6e6-9af3-4184-b711-efec4589d659">
      - 가상환경에서 사용할 언어 설정
   <img width="880" alt="스크린샷 2024-06-02 오전 12 33 06" src="https://github.com/jchanho99/AI_NES/assets/71568851/b3f08eb7-2908-48c3-9d35-1bbf176e5218">
      - Programming model 설정<img width="857" alt="스크린샷 2024-06-02 오전 12 33 51" src="https://github.com/jchanho99/AI_NES/assets/71568851/87f8a124-e98c-4f55-a9c4-b9fa19fff620">
      - venv 설정(후에 해당 venv의 설정 및 내용들이 통째로 Azure에 배포된다.)
   <img width="956" alt="스크린샷 2024-06-02 오전 12 35 04" src="https://github.com/jchanho99/AI_NES/assets/71568851/eaf79f7b-6828-4def-b480-999fdf3e66de">

6. **function trigger**
   - 다음 function trigger를 설정하라는 내용이 나온다. (serverless환경에서 일정 시간마다 실행할 예정이라 Timer trigger로 설정하였고 나중에 function들을 추가할수도, 나중에 바꿔서 설정할수도 있다.)
   - Function name 설정
   - cron 식 해당 function을 언제 실행할 것인지 Azure portal에서 설정한 region 기준 시간대로 지정되어 있으니 주의 할것.  (< 초 분 시 일 월 연 > - 부등호는 제외. / * 등등 많은 기호로 응용하여 작성할 수 있다. 본 프로젝트는 매일 21시마다 실행할 예정이라 0 0 21 * * * 로 설정.)
   - 해당 과정이 모두 끝났다면, 5. 에서 설정한 폴더에 가상환경이 세팅된다.

   **가상환경 설치**
   - Python 3.11 버전으로 가상환경을 설치하고 crawling 에 있는 파일들을 다운로드 받습니다.
8. **Key 입력**
   - 필요한 키들을 입력합니다 ex) keys.py 내부에 있는 Realtime database url 혹은 openai api key, firebase admin json file생성 등
9. **Azure deploy**
   - Azure Function apps 의 timer tirgger로 Azure deploy하위의 파일들을 가상환경자체로 deploy 시킵니다. function_apps.py 가 timetrigger파일입니다! (가상환경을 activate하고, 터미널 상에서 azure에 로그인 합니다. 리소스 그룹, 구독 생성 등등은 개인이 생성하는 것 이므로 생략합니다.)
   - Timetrigger
10. **Mac OS환경 혹은 Azure 실행에 문제가 있을때 아래 노션 참고**
   - 아래 노션을 참고하여 Azure venv를 만들고, 해당 venv폴더를 deploy하면 된다.(만약 Azure를 사용한 적이 있고, 리소스 그룹 및 어카운트같은 것을 설정한 적이 있다면, 17번을 참고하면된다.)
   https://www.notion.so/Azure-b4b4ad55e6974931949b9a9846e7e4dc?pvs=4
   
