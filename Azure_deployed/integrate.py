import json
import logging
from functions import crawling, get_json_title, dump_result_list, firebase_update
from keys import url


def excute():
    firebase_credential_key_path = "./oss24-9d001-firebase-adminsdk-fozty-495464c3a8.json"
    result_list = []
    news_data = crawling(result_list)
    time = get_json_title()
    json_dict=dump_result_list(news_data)
    firebase_update(firebase_credential_key_path, url, time, json_dict)
    