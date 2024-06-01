import os

from keys import OPENAI_API_KEY
from langchain.chains.llm import LLMChain
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

def get_summarization(news, prompt_template):
    prompt = PromptTemplate(input_variables=["text"], template=prompt_template)
    inputtext = {"text":news}
    llm = ChatOpenAI(
                        temperature=0, 
                        model_name = "gpt-4o",
                        api_key=OPENAI_API_KEY)
    llm_chain = LLMChain(llm=llm, prompt=prompt)
    llm_chain = prompt | llm
    result = llm_chain.invoke(inputtext)
    return result.content