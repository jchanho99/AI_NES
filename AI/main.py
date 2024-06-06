import tensorflow as tf
from googletrans import Translator
from transformers import AutoTokenizer, TFAutoModelForSequenceClassification
from transformers import TextClassificationPipeline
from data_preprocessing import load_news, save_sentiment

# 문장 번역기 로드
translator = Translator()

# 사전 학습된 BERT 모델과 토크나이저 로드
model_name = "bhadresh-savani/distilbert-base-uncased-emotion"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = TFAutoModelForSequenceClassification.from_pretrained(model_name)

# 감정 분석을 위한 pipeline 생성
pipeline = TextClassificationPipeline(model=model, tokenizer=tokenizer, framework='tf')

# 테스트용 문장
texts = [i for i in load_news()]
sentiment = []

for i in texts:
    txt = translator.translate(i, dest='en').text
    
    # 감정 분석 수행
    results = pipeline(texts)

    # 결과 출력
    for result in results:
        if isinstance(result, list):
            for res in result:
                print(f"Emotion: {res['label']}, Score: {res['score']:.4f}")
                sentiment.append(result['label'])
        else:
            print(f"Emotion: {result['label']}, Score: {result['score']:.4f}")
            sentiment.append(result['label'])
        print()

save_sentiment(sentiment)