# AI-NES(News Emotion Service) Project: AI Guide


## Used Stacks
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">: 코드 문서 정리

<img src="https://img.shields.io/badge/VScode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">: 코드 에디터

<img src="https://img.shields.io/badge/Python-3776AB.svg?&style=for-the-badge&logo=Python&logoColor=white"> <img src="https://img.shields.io/badge/pandas-3776AB?style=for-the-badge&logo=pandas&logoColor=white"> <img src="https://img.shields.io/badge/Tensorflow-FF8C00?style=for-the-badge&logo=Tensorflow&logoColor=white">  <img src="https://img.shields.io/badge/scikit--learn-FF8C00?style=for-the-badge&logo=scikit-learn&logoColor=white">: 사용 언어 및 라이브러리

<img src="https://img.shields.io/badge/azure-61DAFB?style=for-the-badge&logo=azure&logoColor=white">: 클라우드 서버


## Service Overview
1. **Firebase Realtime DB에 연결**
  - 저장된 뉴스 데이터를 불러오기 위해 Firebase에 연결합니다.
2. **최신 날짜의 뉴스 데이터 불러오기**
  - 뉴스 데이터를 pandas의 DataFrame으로 저장합니다.
3. **뉴스 기사를 영문으로 번역하기**
  - 한국어를 사용하는 것보다 영어로 번역한 후 수행하는 것이 성능이 좋았습니다.
4. **뉴스 감정 분석**
  - Pre-trained BERT model인 distilbert-base-uncased-emotion을 사용합니다.
5. **분석한 감정을 Firebase에 저장**
  - 데이터를 JSON 형태로 저장합니다.


## Instructions - on local
- 실제로는 Azure Function에서 돌아가기에 자동으로 실행된다. 이 부분은 직접 컴퓨터에서 설치, 실행하는 방법을 다룬다.
### 0. Need Environment
- Python v3.9
  - [Click here to Install Python 3.9](https://www.python.org/downloads/release/python-3918)
  - or via commands:
    ```
    sudo yum install python39-pip (on centOS based)
    sudo apt install python3.9 (on Ubuntu)
    brew install python3.9 (on macOS)
    ```
### 1. Set Environment and Essential file
- Execute as venv.
  ```bash
  1.   git clone https://github.com/jchanho99/AI_NES
  2.   cd AI
  3.   python3 -m venv .venv
  4-1. source .venv/bin/activate (on macOS, linux)
  4-2. .\venv\Scripts\activate (on windows powershell)
  5.   pip install -r requirements.txt
  ```

- get Access key from Firebase Realtime DB.
  1. Firebase에 접속한다.
  2. 새 프로젝트를 만든다.
  3. Realtime Database를 선택한 후 개설한다. 이때 나오는 보안규칙은 우선 초기 설정 그대로 진행한다.
  4. 프로젝트 개요 - 프로젝트 설정으로 들어간다.
  5. "서비스 계정" 탭에서 "새 비공개 키 생성"을 클릭한다.
  6. 생성한 키를 AI 폴더의 json 폴더 안에 "AccountKey.json" 이름으로 저장한다.

### 2. Execute 
- Execute main.py only.
  ```
  python3 main.py
  ```

## Library License
Name | License | Commrcial Use | sites
--- | --- | --- | --- |
**azure-functions** | MIT License | Able | [라이선스 바로가기](https://github.com/Azure/azure-functions-python-library/blob/dev/LICENSE)
**googletrans** | MIT License | Able | [라이선스 바로가기](https://github.com/ssut/py-googletrans/blob/master/LICENSE)
**firebase_admin** | Apache License 2.0 | Able | [라이선스 바로가기](https://github.com/firebase/firebase-admin-python/blob/master/LICENSE)
**tensorflow** | Apache License 2.0 | Able | [라이선스 바로가기](https://github.com/tensorflow/tensorflow/blob/master/LICENSE)
**transformers** | Apache License 2.0 | Able | [라이선스 바로가기](https://github.com/huggingface/transformers/blob/main/LICENSE)
**pandas** | BSD 3-Clause License | Able | [라이선스 바로가기](https://github.com/pandas-dev/pandas/blob/main/LICENSE)