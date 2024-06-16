import datetime
import pandas as pd
from connect import init_db

# Connect to db
now = datetime.datetime.now().date()
date = now.strftime("%Y_%m_%d")
ref = init_db("date")

def load_news():
    # Collecting all news data from db
    print("Loading News...")
    data_ref = ref.get()
    df = pd.DataFrame()
    for news in data_ref:
        news = {i: [v] for i, v in news.items()}
        temp = pd.DataFrame(news)
        df = pd.concat([df, temp], ignore_index=True)

    return df['summary']

def save_sentiment(sentiment):
    print("Saving sentiments...")
    for i, v in enumerate(sentiment):
        child_ref = ref.child(f"{i}")
        sent = {
            'sentiment': v
        }
        child_ref.update(sent)