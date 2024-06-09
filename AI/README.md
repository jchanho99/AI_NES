# Backend Guide
### Using Stack
<div align=center>
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
<img src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white">
<img src="https://img.shields.io/badge/Python-3776AB.svg?&style=for-the-badge&logo=Python&logoColor=white">
<img src="https://img.shields.io/badge/azure-61DAFB?style=for-the-badge&logo=azure&logoColor=white">
</div>

### Service Wiki
- To Notion ver.
  - https://www.notion.so/a2fc390465314eaabbc2005a3a5659cd?pvs=4


# To Start
## 0. Need Environment
- Python v3.9
- Click to Install Python 3.9 -> <a src=https://www.python.org/downloads/release/python-3918><img src="https://img.shields.io/badge/Python-3776AB.svg?&style=for-the-badge&logo=Python&logoColor=white"></a>
- or via commands:
    ```
    sudo yum install python39-pip (on centOS based)
    sudo apt install python3.9 (on Ubuntu)
    brew install python3.9 (on macOS)
    ```

## 1. Set Environment
- Execute as venv.
  ```bash
  git clone https://github.com/jchanho99/AI_NES
  cd AI
  python3 -m venv .venv
  source .venv/bin/activate (on macOS, linux)
  .\venv\Scripts\activate (on windows powershell)
  pip install -r requirements.txt

  (execute model)
  
  deactivate (if you are done)
  ```

## 2. If you want start server in local
```bash
python3 main.py
```
