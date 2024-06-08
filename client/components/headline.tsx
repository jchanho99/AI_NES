'use client'

import GetArticles, { Article } from "@/scripts/api/get_articles"
import useArticleStore from "@/scripts/article_store"
import { useEffect, useState } from "react"
import ArticleModal from "./article_modal"
import HeadlineCarousel from "./headline_carousel"
import { ArrowPathIcon } from "@heroicons/react/20/solid"

// todo: 기사 마우스 호버시 요약 보여주기

export default function Headline() {

    const { articles, setArticles, rehydrated, getDate } = useArticleStore();
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const [isReloaded, setIsReloaded] = useState<boolean>(false);
    const [articleChunks, setArticleChunks] = useState<Article[][]>();
    const [isArticleOpen, setIsArticleOpen] = useState<boolean>(false);
    const [openedArticleId, setOpenedArticleId] = useState<number>(1);

    // 기사 정보 불러오기
    const handleGetArticles = async () => {
        const getArticleResult = await GetArticles();
        if (getArticleResult.status != 201) {
            console.error(getArticleResult.status);
        }
        else {
            if (!getArticleResult.items || getArticleResult.items.length == 0) {
                // todo: 당일 기사가 없을 경우 에러 처리
            }
            else {
                console.log("articles loaded");
                setArticles(getArticleResult.items);
                setIsUpdated(true);
                setIsReloaded(false);
            }
        }
    }

    // 페이지네이션
    const chunkArray = (array: Article[], size: number) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        console.log("chunk generated");
        return result;
    };

    // outdated 확인
    const isOutdated = (date: Date) => {
        const today = new Date();
        return (
            today.getFullYear() != date.getFullYear() ||
            today.getMonth() != date.getMonth() ||
            today.getDate() != date.getDate()
        );
    };

    // articleStorage 유효성 검사
    useEffect(() => {
        if (rehydrated) {
            if (articles.length == 0 || isOutdated(new Date(getDate)) || isReloaded) {
                handleGetArticles();
            }
            else {
                setArticleChunks(chunkArray(articles, Math.floor(articles.length / 5)));
            }
        }
    }, [rehydrated, isReloaded]);

    // 데이터 갱신 시 렌더링 수행
    useEffect(() => {
        if (isUpdated) {
            setArticleChunks(chunkArray(articles, Math.floor(articles.length / 5)));
        }
    }, [isUpdated]);

    return (
        <div id="headline" className="bg-white py-24 sm:py-32 relative isolate overflow-hidden rounded-[3rem] -translate-y-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">이슈 토픽</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        지금 이슈가 되는 기사들을 분석해보세요.
                    </p>
                </div>
                <div className="h-96 sm:h-96 xl:h-[26rem] 2xl:h-[26rem] mt-4 relative">
                    <div className="absolute right-0 top-0 p-4 z-50">
                        <button
                            type="button"
                            disabled={isReloaded}
                            className="cursor-pointer rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white disabled:text-gray-300"
                            onClick={() => { setIsReloaded(true); setArticleChunks(undefined); }}
                        >
                            <span className="sr-only">Refresh articles</span>
                            <ArrowPathIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <HeadlineCarousel>
                        {articleChunks ? (articleChunks?.map((chunk, index) => (
                            <div key={index} className="mx-auto grid max-w-2xl grid-cols-1 gap-x-4 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                {chunk.map((article) => (
                                    <article key={article.id} className="flex max-w-xl flex-col items-start justify-between" onClick={() => { setIsArticleOpen(true); setOpenedArticleId(article.id as number) }}>
                                        <div className="relative flex items-center gap-x-4">
                                            <div className="">
                                                <div className="flex items-center gap-x-4 text-xs">
                                                    <time dateTime={new Date(getDate).toDateString()} className="text-gray-500">
                                                        {`${new Date(getDate).getFullYear()}년 ${new Date(getDate).getMonth() + 1}월 ${new Date(getDate).getDate()}일`}
                                                    </time>
                                                    <a
                                                        href="#"
                                                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                                    >
                                                        {article.section}
                                                    </a>
                                                </div>
                                                <div className="mt-2 group relative">
                                                    <h3 className="text-left text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                                        {article.title}
                                                    </h3>
                                                </div>
                                                <div className="mt-3 relative flex items-center gap-x-4">
                                                    <div className="text-sm leading-6">
                                                        <p className="font-semibold text-gray-900">
                                                            <a>
                                                                <span className="absolute inset-0" />
                                                                {article.press}
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ))) : (
                            <div role="status" className="flex justify-center items-center">
                                <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                    </HeadlineCarousel>
                </div>
            </div>
            <ArticleModal articleId={openedArticleId} open={isArticleOpen} setOpen={setIsArticleOpen} />
        </div >
    )
}

