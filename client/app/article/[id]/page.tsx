'use client'

import {
    TagIcon,
    CalendarIcon,
    UserCircleIcon,
    ShareIcon,
    LinkIcon,
    MagnifyingGlassPlusIcon,
    MagnifyingGlassMinusIcon
} from '@heroicons/react/20/solid';
import { useState } from 'react';
import classNames from 'classnames';

export default function Article() {
    const [isZoomIn, setIsZoomIn] = useState<Boolean>(false);
    const [isCopied, setIsCopied] = useState<Boolean>(false);

    function copyToCliboard() {
        if (!isCopied) {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            })
        }
    }

    return (
        <div className="mx-auto max-w-4xl psm:static px-4 sm:px-6 lg:px-8 pt-4 sm:pt-24 lg:pt-16 pb-80 sm:pb-40 lg:pb-48">
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        기사 제목
                    </h2>
                    <div className="mt-1 flex flex-col sm:mt-2 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <img className="mr-1.5 h-5 w-5 flex-shrink-0 rounded-xl" aria-hidden="true" src="https://yt3.googleusercontent.com/w7ColCSgsKVMJuh6izq4oRlYn-ZkJ8roQuHQy1Nvc75ONCH7uzLmoUE5YMJtZqFCHb4ZFPxAOg=s900-c-k-c0x00ffffff-no-rj" />
                            언론사
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <TagIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            경제
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            2024-05-22
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <UserCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            기자 이름
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                    <span className="block">
                        <button
                            type="button"
                            onClick={() => setIsZoomIn(isZoomIn ? false : true)}
                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            <MagnifyingGlassPlusIcon className={classNames('-ml-0.5 -mr-0.5 h-5 w-5 text-gray-400', { hidden: isZoomIn })} aria-hidden="true" />
                            <MagnifyingGlassMinusIcon className={classNames('-ml-0.5 -mr-0.5 h-5 w-5 text-gray-400', { hidden: !isZoomIn })} aria-hidden="true" />
                        </button>
                    </span>

                    <span className="ml-3 block relative">
                        <button
                            type="button"
                            onClick={copyToCliboard}
                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            <ShareIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            공유
                        </button>
                        <div className={classNames("w-[95px] text-center absolute -top-8 -left-2.5 ring-1 rounded-md ring-gray-300 p-0.5 px-1 shadow-sm", { 'block': isCopied, 'hidden': !isCopied })}>
                            <p className="line-clamp-3 text-xs leading-6 text-gray-500">
                                링크 복사 완료!
                            </p>
                        </div>
                    </span>

                    <span className="ml-3 block">
                        <a href="#">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                원문
                            </button>
                        </a>
                    </span>
                </div>
            </div>
            <div className="mt-5">
                <p className={classNames('', { 'text-xl': isZoomIn, 'text-base': !isZoomIn })}>
                    기사 내용
                </p>
            </div>
        </div>
    )
}
