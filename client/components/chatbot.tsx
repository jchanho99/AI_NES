"use client"

import React, { useState, useRef, useEffect } from 'react'
import { UserCircleIcon, CpuChipIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import SearchNews from '@/scripts/api/search_news'
import classNames from 'classnames'
import useChatbotStore from '@/scripts/chatbot_store'

const Chatbot: React.FC = () => {
  const { messages, setMessages, disableHint, setDisableHint } = useChatbotStore();
  const [disableButton, setDisableButton] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = async () => {
    const message = inputRef.current!.value
    inputRef.current!.value = ''
    setDisableButton(true)
    setDisableHint(true)
    setMessages([...messages, { text: message, sender: 'user' }, { text: '', sender: 'loading' }])

    const searchResult = await SearchNews(message);
    if (searchResult.status != 201) {
      console.error(searchResult.status);
    } else {
      const news = searchResult.result;
      //setMessages(messages.slice(0, -1));
      if (!news || news.length === 0) {
        setMessages([...messages, { text: message, sender: 'user' }, { text: "검색 결과가 없습니다.", sender: 'bot' }])
      } else {
        setMessages([...messages, { text: message, sender: 'user' }, { text: news, sender: 'bot' }])
      }
    }
    setDisableButton(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])
	
	// todo: 히스토리 삭제 버튼
	// todo: 채팅 로딩바 수정
	// todo: 챗봇 정보 작성
  // todo: 메시지 z-index 수정

  return (
    <div className='mt-6 mx-auto max-w-4xl px-6 lg:px-12 h-[80vh]'>
      <ul role="list" className="relative overflow-y-auto h-full">
        {messages.map((message, index) => (
          <li key={index} className="relative flex justify-between gap-x-6 py-5 z-50">
            <div className="flex min-w-0 gap-x-4">
              {message.sender === 'user' ? (
                <UserCircleIcon className="h-12 w-12 flex-none" />
              ) : (
                <CpuChipIcon className="h-12 w-12 flex-none" />
              )}
              <div className="min-w-0 flex-auto">
                <div className="font-semibold leading-6 text-gray-900">
                  {message.sender === 'user' ? (<p>유저</p>) : (<p>챗봇</p>)}
                </div>
                <p className="mt-1 whitespace-normal break-all leading-5 text-gray-500"
                  dangerouslySetInnerHTML={{ __html: message.text }}></p>
                {message.sender === 'loading' ? (
                  <div role="status">
                    <svg aria-hidden="true" className={classNames(!disableButton ? "hidden" : "", "w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600")} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
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
            (<div className="absolute p-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-sm text-gray-300">AI-NES</p>
            </div>) :
            (<div className="absolute p-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <CpuChipIcon className='mx-auto h-16 m-2' />
              <p className="text-2xl font-semibold">챗봇에게 물어보세요.</p>
              <p className="mt-0.5 text-sm text-gray-400">{"오늘 주목할만한 뉴스 분석해줘"}</p>
            </div>)}
        </div>
      </ul>
      <div>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500">-</span>
          </div>
          <input
            type="text"
            placeholder="메시지 입력"
            ref={inputRef}
            disabled={disableButton}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !disableButton) {
                handleSendMessage();
              }
            }}
            className="block w-full rounded-2xl border-0 py-4 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 outline-none"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              disabled={disableButton}
              className="h-3/5 rounded-lg border-0 bg-indigo-600 mr-3 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-700"
              onClick={handleSendMessage}
            >
              <PaperAirplaneIcon className='h-full w-full' />
            </button>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="mt-5 text-xs text-gray-400">챗봇 정보</p>
      </div>

    </div>
  )
}

export default Chatbot
