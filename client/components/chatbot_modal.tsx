'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Chatbot from './chatbot'
import LoginModal from './login_modal'
import useAuthStore from '@/scripts/auth_store'

export default function ChatbotModal() {
  const [open, setOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { jwt_token } = useAuthStore();

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-2xl bg-white">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute right-0 top-0 p-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <Chatbot />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="fixed right-4 bottom-4">
        <button
          type="button"
          className="rounded-3xl bg-indigo-600 text-white p-3 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
          onClick={() => jwt_token ? setOpen(true) : setIsLoginOpen(true)}
        >
          <span className="sr-only">Open chatbot</span>
          <ChatBubbleLeftRightIcon className="h-12 w-12" aria-hidden="true" />
        </button>
      </div>
      <LoginModal open={isLoginOpen} setOpen={setIsLoginOpen} />
    </div>
  )
}
