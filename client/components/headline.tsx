'use client'

import { Popover, Transition } from "@headlessui/react"
import { articles } from "../scripts/api/get_articles"
import { Fragment } from "react"

export default function Headline() {
    return (
        <div id="headline" className="bg-white py-24 sm:py-32 relative isolate overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">이슈 토픽</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        지금 이슈가 되는 기사들을 분석해보세요.
                    </p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {articles.map((article) => (
                        <article key={article.id} className="flex max-w-xl flex-col items-start justify-between">
                            <div className="relative flex items-center gap-x-4">
                                <img src={article.thumbnail} alt="" className="h-40 bg-gray-50" />
                                <div className="">
                                    <div className="flex items-center gap-x-4 text-xs">
                                        <time dateTime={article.datetime} className="text-gray-500">
                                            {article.date}
                                        </time>
                                        <a
                                            href="#"
                                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                        >
                                            {article.section}
                                        </a>
                                    </div>
                                    <div className="mt-2 group relative">
                                        <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                            <a href={`/article/${article.id}`}>
                                                <span className="absolute inset-0" />
                                                {article.title}
                                            </a>
                                        </h3>
                                        <Popover className="relative">
                                            <Popover.Button className="focus:outline-none">
                                                <p className="mt-1 line-clamp-3 text-sm leading-6 text-gray-600">{article.description}</p>
                                            </Popover.Button>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="opacity-0 translate-y-1"
                                                enterTo="opacity-100 translate-y-0"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="opacity-100 translate-y-0"
                                                leaveTo="opacity-0 translate-y-1"
                                            >
                                                <Popover.Panel className="p-1.5 absolute z-10 overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 bg-white">
                                                    <p className="line-clamp-3 text-sm leading-6 text-gray-600">
                                                        {article.summary}
                                                    </p>
                                                </Popover.Panel>
                                            </Transition>
                                        </Popover>
                                    </div>
                                    <div className="mt-3 relative flex items-center gap-x-4">
                                        <img src={article.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                        <div className="text-sm leading-6">
                                            <p className="font-semibold text-gray-900">
                                                <a href={article.author.href}>
                                                    <span className="absolute inset-0" />
                                                    {article.author.name}
                                                </a>
                                            </p>
                                            <p className="text-gray-600">{article.author.press}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div >
    )
}

