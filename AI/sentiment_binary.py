import pandas as pd
from transformers import pipeline
from googletrans import Translator
from data_preprocessing import load_news, save_sentiment

# 감정 분석을 위한 pipeline, translator 생성
emotion_classifier = pipeline('sentiment-analysis')
translator = Translator()

# print(date)

# # 문장을 영어로 변환
texts = [i for i in load_news()]
sentiment = []
for i in texts:
    txt = translator.translate(i, dest='en').text

    # 감정 분석 수행
    results = emotion_classifier(txt)

    # 결과 출력
    for result in results:
        print(f"Text: {txt}")
        print(f"Sentiment: {result['label']}, Score: {result['score']:.4f}\n")
        sentiment.append(result['label'])
print(sentiment, sep='\n')
save_sentiment(sentiment)