'use client'

import { GetArticles, Article } from "@/scripts/api/get_articles"
import useArticleStore from "@/scripts/article_store"
import { useEffect, useState } from "react"
import ArticleModal from "./article_modal"
import HeadlineCarousel from "./headline_carousel"
import { ArrowPathIcon } from "@heroicons/react/20/solid"
import { formatTimeDiff } from "@/scripts/date_format"
import ArticleItem from "./article_item"
import { Spinner } from "flowbite-react"

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
        date = new Date(date);
        return (
            today.getFullYear() != date.getFullYear() ||
            today.getMonth() != date.getMonth() ||
            today.getDate() != date.getDate()
        );
    };

    // articleStorage 유효성 검사
    useEffect(() => {
        if (rehydrated) {
            if (articles.length == 0 || isOutdated(getDate) || isReloaded) {
                handleGetArticles();
            }
            else {
                setArticleChunks(chunkArray(articles, 6));
            }
        }
    }, [rehydrated, isReloaded]);

    // 데이터 갱신 시 렌더링 수행
    useEffect(() => {
        if (isUpdated) {
            setArticleChunks(chunkArray(articles, 6));
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
                <div className="h-96 sm:h-96 xl:h-[28rem] 2xl:h-[28rem] mt-4 relative">
                    <div className="absolute flex right-0 top-0 p-4 z-20">
                        {articleChunks ? (<p className="text-xs mr-2 leading-6 text-gray-400">마지막 업데이트: {formatTimeDiff(getDate)}</p>) : ""}
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
                                        <ArticleItem article={article}/>
                                    </article>
                                ))}
                            </div>
                        ))) : (
                            <div role="status" className="flex justify-center items-center">
                                <Spinner color="purple" aria-label="loading.." size="xl"/>
                            </div>
                        )}
                    </HeadlineCarousel>
                </div>
            </div>
            <ArticleModal article={articles[openedArticleId]} open={isArticleOpen} setOpen={setIsArticleOpen} />
        </div >
    )
}

