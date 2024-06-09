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


## indtructions
### 0. Need Environment
- Python v3.9
- Click to Install Python 3.9 -> <a src=https://www.python.org/downloads/release/python-3918><img src="https://img.shields.io/badge/Python-3776AB.svg?&style=for-the-badge&logo=Python&logoColor=white"></a>
- or via commands:
  ```
  sudo yum install python39-pip (on centOS based)
  sudo apt install python3.9 (on Ubuntu)
  brew install python3.9 (on macOS)
  ```

### 1. Set Environment
- Execute as venv.
  ```bash
  1.   git clone https://github.com/jchanho99/AI_NES
  2.   cd AI
  3.   python3 -m venv .venv
  4-1. source .venv/bin/activate (on macOS, linux)
  4-2. .\venv\Scripts\activate (on windows powershell)
  5.   pip install -r requirements.txt
  
  6.   deactivate (if you are done)
  ```

## 라이브러리 라이선스 정보
- **azure-functions**
  - 라이선스: MIT License
  - 재배포: 가능
  - 상업적 이용: 가능
  - [라이선스 바로가기](https://github.com/Azure/azure-functions-python-library/blob/dev/LICENSE)

- **googletrans**
  - 라이선스: MIT License
  - 재배포: 가능
  - 상업적 이용: 가능
  - [라이선스 바로가기](https://github.com/ssut/py-googletrans/blob/master/LICENSE)

- **firebase_admin**
  - 라이선스: Apache License 2.0
  - 재배포: 가능
  - 상업적 이용: 가능
  - [라이선스 바로가기](https://github.com/firebase/firebase-admin-python/blob/master/LICENSE)

- **tensorflow**
  - 라이선스: Apache License 2.0
  - 재배포: 가능
  - 상업적 이용: 가능
  - [라이선스 바로가기](https://github.com/tensorflow/tensorflow/blob/master/LICENSE)

- **transformers**
  - 라이선스: Apache License 2.0
  - 재배포: 가능
  - 상업적 이용: 가능
  - [라이선스 바로가기](https://github.com/huggingface/transformers/blob/main/LICENSE)

- **pandas**
  - 라이선스: BSD 3-Clause License
  - 재배포: 가능
  - 상업적 이용: 가능
  - [라이선스 바로가기](https://github.com/pandas-dev/pandas/blob/main/LICENSE)
