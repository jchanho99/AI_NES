from connect import init_db
import pandas as pd

# Connect to db

def load_news(date): # date = '2024년05월22일 , 10시26분56초 네이버 기사 헤드라인'
    # Collecting all news data from db
    ref = init_db(date)
    data_ref = ref.get()
    
    df = pd.DataFrame()
    for news in data_ref:
        news = {i: [v] for i, v in news.items()}
        temp = pd.DataFrame(news)
        df = pd.concat([df, temp], ignore_index=True)

    return df['summary']

def save_sentiment(date, sentiment):
    ref = init_db(date)
    # data_ref = ref.get()
    
    for i, v in enumerate(sentiment):
        sent = {
            'sentiment': v
        }
        ref[i].set(sent)