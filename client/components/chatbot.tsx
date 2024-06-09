"use client"

import React, { useState, useRef, useEffect } from 'react'
import { UserCircleIcon, CpuChipIcon, PaperAirplaneIcon, CalendarIcon, MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon, LinkIcon, QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/20/solid'
import { SearchNews } from '@/scripts/api/search_news'
import classNames from 'classnames'
import useChatbotStore from '@/scripts/chatbot_store'
import { Pagination, Spinner, Tooltip } from 'flowbite-react'
import NewsItem from './news_item'

const Chatbot: React.FC = () => {
  const { messages, setMessages, disableHint, setDisableHint, setCurrentPage } = useChatbotStore();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    const message = inputRef.current!.value;
    inputRef.current!.value = '';
    setIsLoading(true);
    setDisableHint(true);
    setMessages([...messages, { text: message, sender: 'user' }, { text: '', sender: 'loading' }]);

    const searchResult = await SearchNews(message);
    if (searchResult.status != 201) {
      console.error(searchResult.status);
    }
    else {
      const news = searchResult.items;
      if (!news || news.length === 0) {
        setMessages([...messages, { text: message, sender: 'user' }, { text: "검색 결과가 없습니다.", sender: 'bot' }]);
      }
      else {
        setMessages([...messages, { text: message, sender: 'user' }, { news: news, sender: 'bot', currentPage: 1 }]);
      }
    }
    setIsLoading(false);
  };

  const handleRemoveMessages = () => {
    if (isLoading) return;
    setMessages([]);
    setDisableHint(false)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  }, [isLoading])

  return (
    <div className='mt-6 mx-auto px-6 lg:px-12 h-[80vh]'>
      <ul role="list" className="relative overflow-y-auto h-full">
        {messages.map((message, index) => (
          <li key={index} className="relative flex justify-between py-5 z-50">
            <div className="flex min-w-0 gap-x-4">
              {message.sender === 'user' ? (
                <UserCircleIcon className="h-12 w-12 flex-none text-gray-700" />
              ) : (
                <CpuChipIcon className="h-12 w-12 flex-none text-indigo-700" />
              )}
              <div className="min-w-0 flex-auto">
                <div className="font-semibold leading-6 text-gray-900">
                  {message.sender === 'user' ? (<p>나</p>) : (<p>챗봇</p>)}
                </div>
                {message.sender === 'bot' && message.news ? (
                  <div className="w-full h-full relative mt-2 pr-2">
                    {message.news.map((news, nIndex) => (
                      <article key={news.id} className={classNames(nIndex + 1 == message.currentPage ? "" : "hidden")}>
                        <NewsItem news={news} />
                      </article>
                    ))}
                    <div className="text-center">
                      <p className="text-gray-400 text-xs mt-1">{`${message.currentPage}/${message.news.length}`}</p>
                      <Pagination
                        className=""
                        layout="navigation"
                        currentPage={message.currentPage as number}
                        totalPages={message.news.length}
                        onPageChange={(page) => { setCurrentPage(index, page); }}
                        previousLabel=''
                        nextLabel=''
                        showIcons />
                    </div>
                  </div>
                ) :
                  (<p className="mt-1 whitespace-normal break-all leading-5 text-gray-500">
                    {message.text}
                  </p>)}
                <p className="mt-1 whitespace-normal break-all leading-5 text-gray-500">
                </p>
                {message.sender === 'loading' ? (
                  <div role="status">
                    <Spinner className={classNames(!isLoading ? "hidden" : "")} color="purple" aria-label="loading.." size="md" />
                  </div>
                ) : ''}
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            </div>
          </li>
        ))}
        <div ref={messagesEndRef} />
        <div className="absolute inset-0">
          {disableHint ?
            '' :
            (<div className="absolute p-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <CpuChipIcon className='mx-auto h-16 m-2' />
              <p className="text-2xl font-semibold">챗봇에게 물어보세요.</p>
              <p className="mt-0.5 text-sm text-gray-400">{"오늘 주목할만한 뉴스 분석해줘"}</p>
            </div>)}
        </div>
      </ul>
      <div>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <button onClick={handleRemoveMessages}>
              <TrashIcon className="w-6 h-6 text-gray-400 hover:text-gray-500" />
            </button>

          </div>
          <input
            type="text"
            placeholder="메시지 입력"
            ref={inputRef}
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isLoading) {
                handleSendMessage();
              }
            }}
            className="block w-full rounded-2xl border-0 py-4 pl-12 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 outline-none"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              disabled={isLoading}
              className="h-3/5 rounded-lg border-0 bg-indigo-600 mr-3 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-700"
              onClick={handleSendMessage}
            >
              <PaperAirplaneIcon className='h-full w-full' />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center flex justify-center text-gray-400">
        <Tooltip style="light" placement="bottom" content="사용자가 전송한 키워드로 네이버 뉴스 API에서 기사를 제공받습니다.">
          <div className="flex">
            <p className="cursor-default text-xs leading-4">챗봇 정보</p>
            <QuestionMarkCircleIcon className="ml-0.5 w-4 h-4" />
          </div>
        </Tooltip>
      </div>

    </div>
  )
}

export default Chatbot
