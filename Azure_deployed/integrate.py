import json
from functions import crawling, get_json_title, dump_result_list, firebase_update
from keys import url

def excute():
    firebase_credential_key_path = "YOUR_FIREBASE_CREDENTIAL_KEY"
    result_list = []
    
    news_data = crawling(result_list)
    time = get_json_title()
    dump_result_list(news_data, time)
    firebase_update(firebase_credential_key_path, url, time)