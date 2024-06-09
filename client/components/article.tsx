'use client'

import {
    TagIcon,
    ShareIcon,
    LinkIcon,
    MagnifyingGlassPlusIcon,
    MagnifyingGlassMinusIcon,
    CalendarIcon,
    NewspaperIcon
} from '@heroicons/react/20/solid';
import { useState } from 'react';
import classNames from 'classnames';
import { Article } from '@/scripts/api/get_articles';
import { formatDateRoute, formatDateString } from '@/scripts/date_format';

interface ArticlePageProps {
    article: Article;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => {
    const [isZoomIn, setIsZoomIn] = useState<Boolean>(false);
    const [isCopied, setIsCopied] = useState<Boolean>(false);

    function copyToCliboard() {
        if (!isCopied) {
            const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/article/${formatDateRoute(article.date as Date)}/${article.id}`;
            navigator.clipboard.writeText(url).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            })
        }
    }

    function filterSentiment(sent: string) {
        switch (sent) {
            case "anger":
                return "😠";
            case "sadness":
                return "😥";
            case "fear":
                return "😰";
            case "joy":
                return "😃";
        }
    }

    return (
        <div className="mx-auto psm:static px-4 sm:px-6 lg:px-8 pt-4 sm:pt-24 lg:pt-16 pb-16 sm:pb-12 lg:pb-8">
            <div className="lg:items-center lg:justify-between">
                <div className="min-w-0">
                    <div>
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight">
                            {article.title}
                        </h2>
                    </div>
                    <div className="mt-1 flex flex-col sm:mt-2 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <NewspaperIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            {article.press}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <TagIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            {article.section}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            {formatDateString(article.date as Date)}
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col sm:mt-2 sm:flex-row sm:flex-wrap sm:space-x-3 justify-end">
                        <div>
                            <button
                                type="button"
                                onClick={() => setIsZoomIn(isZoomIn ? false : true)}
                                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <MagnifyingGlassPlusIcon className={classNames('-ml-0.5 -mr-0.5 h-5 w-5 text-gray-400', { hidden: isZoomIn })} aria-hidden="true" />
                                <MagnifyingGlassMinusIcon className={classNames('-ml-0.5 -mr-0.5 h-5 w-5 text-gray-400', { hidden: !isZoomIn })} aria-hidden="true" />
                            </button>
                        </div>
                        <div className="relative">
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
                        </div>
                        <div>
                            <a href={article.link} target='_blank'>
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    원문
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <p className={classNames('', { 'text-xl': isZoomIn, 'text-base': !isZoomIn }, 'tracking-wider leading-7')}>
                    {article.origin_news}
                </p>
            </div>
            <div className="border-t border-slate-900/10 mt-5">
                <div className="text-center mt-5 w-full h-full bg-gray-100 p-4 rounded-2xl">
                    <p className="text-3xl">{filterSentiment(article.sentiment)}</p>
                    <p className="text-base mt-2">AI가 이 기사를 읽고 분석한 감정은 <b>{article.sentiment}</b> 입니다.</p>
                </div>
            </div>
        </div>
    )
}

export default ArticlePage;