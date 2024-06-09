import tensorflow as tf
from googletrans import Translator
from transformers import TextClassificationPipeline
from data_preprocessing import load_news, save_sentiment
from transformers import AutoTokenizer, TFAutoModelForSequenceClassification

def run_analysis():
    # 기존의 main 함수 코드를 여기로 이동
    print("Running analysis...")
    
    # load pre-trained BERT model
    model_name = "bhadresh-savani/distilbert-base-uncased-emotion"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = TFAutoModelForSequenceClassification.from_pretrained(model_name)

    # init pipeline for sentiment analysis
    pipeline = TextClassificationPipeline(model=model, tokenizer=tokenizer, framework='tf')

    # init Translator
    translator = Translator()

    # texts for analysis, and sentiment list to save
    texts = [translator.translate(i, dest='en').text for i in load_news()]
    sentiment = []

    # analysis process
    results = pipeline(texts)

    # print outputs
    for result in results:
        if isinstance(result, list):
            for res in result:
                sentiment.append(res['label'])
        else:
            sentiment.append(result['label'])

    save_sentiment(sentiment)
    print('Done!')

if __name__ == "__main__":
    run_analysis()