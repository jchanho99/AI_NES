from bs4 import BeautifulSoup
import json
import requests 
import trafilatura
import datetime

from summarization import get_summarization
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from kor_template import kor_prompt_template




# news link -> get origin news source
def get_news(link):
    response = trafilatura.fetch_url(link)
    origin_news = trafilatura.extract(response)
    if origin_news == None:
        return "Crawling Error : Trafilatura can't scrap the news in HTML"
    return origin_news


# json list
result_list = []


# Naver News section list
def crawling(result_list):    
    section_list = [("politic", "100"), ("economics", "101"), ("social", "102"), ("culture", "103"), ("worlds","104"), ("Tech", "105")]
    for section, site in section_list:
        page= "https://news.naver.com/section/" 
        page += site
        # HTTPS request
        response = requests.get(page)
        html = response.content
        soup = BeautifulSoup(html, 'html.parser')
        # get <li> tag
        all_li = soup.find_all('li', class_="sa_item _SECTION_HEADLINE")
        for li in all_li:
            a = li.find('a') # <a> tag's class a has 'href' -> link
            strong = li.find('strong', class_="sa_text_strong") # <strong> tag has sa_text_strong is title
            div = li.find('div', class_="sa_text_press") # <div> tag has sa_text_press is press
            result = {
                'link': a['href'] if a else None, # news link
                'title': strong.text if strong else None, # title
                'press': div.text if div else None, # press
                'section': section, #news section
                'origin_news' : get_news(a['href']), # origin news
                'summary' : get_summarization(get_news(a['href']),kor_prompt_template)
            }
            result_list.append(result)

    return result_list


def get_json_title():
    timenow = datetime.datetime.now().strftime("%Y_%m_%d")
    return timenow
    

def dump_result_list(data, timenow):
    with open(timenow+".json",'w', encoding='utf-8') as f:
        json.dump(data,f,ensure_ascii=False, indent=4)


## firebase update
def firebase_update(firebase_admin_key_path, databaseURL, timenow):
    cred = credentials.Certificate(firebase_admin_key_path)
    firebase_admin.initialize_app(cred, databaseURL)

    with open(timenow+".json",'r') as file:
        data = json.load(file)
    db_path = "news_data/"+timenow
    ref = db.reference(db_path)
    ref.set(data)

