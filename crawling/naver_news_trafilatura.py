from bs4 import BeautifulSoup
import json
import requests 
import trafilatura
import datetime

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db



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
            'origin_news' : get_news(a['href']) # origin news
        }
        result_list.append(result)

json_result = json.dumps(result_list, ensure_ascii=False, indent=3)
print(json_result)

timenow = datetime.datetime.now().strftime("%Y_%m_%d")
with open(timenow+".json",'w', encoding='utf-8') as f:
    json.dump(result_list,f,ensure_ascii=False, indent=4)

## firebase update

cred = credentials.Certificate('/Users/loyola/Dev/OSS/AI_NES/dbtest-551fa-firebase-adminsdk-p5eys-1db77a7442.json')
firebase_admin.initialize_app(cred, {'databaseURL' : 'https://oss24-9d001-default-rtdb.firebaseio.com'})

with open(timenow+".json",'r') as file:
    data = json.load(file)

ref = db.reference(timenow)

ref.set(data)

## AWS update - lambda -> Microosft Azure Function App, Timertrigger 로 변경
