'use client'

import { Article, GetArticles } from "@/scripts/api/get_articles";
import { Datepicker } from "flowbite-react/components/Datepicker"
import { Pagination } from "flowbite-react/components/Pagination";
import { useEffect, useState } from "react";
import ArticleItem from "./article_item";
import ArticleModal from "./article_modal";
import classNames from "classnames";
import { Spinner } from "flowbite-react";

export default function ArticleList() {

    const [articles, setArticles] = useState<Article[]>();
    const [articleChunks, setArticleChunks] = useState<Article[][]>();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isArticleOpen, setIsArticleOpen] = useState<boolean>(false);
    const [openedArticleId, setOpenedArticleId] = useState<number>(1);
    const [isLoaded, setIsLoaded] = useState(false);

    // 기사 정보 불러오기
    const handleGetArticles = async (date: Date) => {
        const getArticleResult = await GetArticles(date);
        if (getArticleResult.status != 201) {
            console.error(getArticleResult.status);
        }
        else {
            if (!getArticleResult.items || getArticleResult.items.length == 0) {
                // todo: 해당 날짜 기사가 없을 경우 에러 처리
            }
            else {
                console.log("articles loaded");
                setArticles(getArticleResult.items);
            }
        }
        setIsLoaded(true);
    }

    // 페이지네이션
    const chunkArray = (array: Article[], size: number) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        setPageLength(result.length);
        console.log("chunk generated");
        return result;
    };

    const onPageChange = (page: number) => setCurrentPage(page);

    useEffect(() => {
        handleGetArticles(new Date());
    }, []);

    useEffect(() => {
        if (articles) {
            setArticleChunks(chunkArray(articles, 9));
        }
    }, [articles]);

    return (
        <div className="bg-white py-12 sm:py-16 rounded-2xl">
            <div className="mx-auto max-w-6xl sm:max-w-4xl">
                <div className="w-full">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">기사 모아보기</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        날짜별 기사를 탐색해보세요.
                    </p>
                </div>
                <div className="mt-2 w-[18.5rem]">
                    <Datepicker
                        language="kr-KR"
                        minDate={new Date(2024, 5, 1)}
                        maxDate={new Date()}
                        labelTodayButton="오늘"
                        showClearButton={false}
                        onSelectedDateChanged={(date: Date) => { setIsLoaded(false); handleGetArticles(date); }}
                    />
                </div>
                <div className="relative my-3 p-4 h-[32rem] bg-gray-100 rounded-2xl">
                    {articleChunks && isLoaded ? (articleChunks?.map((chunk, index) => (
                        <div key={index} className={classNames(index + 1 == currentPage ? '' : 'hidden',
                            "mx-auto grid max-w-2xl grid-cols-1 gap-x-4 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3")}>
                            {chunk.map((article) => (
                                <article key={article.id} className="flex max-w-xl flex-col items-start justify-between" onClick={() => { setIsArticleOpen(true); setOpenedArticleId(article.id as number) }}>
                                    <ArticleItem article={article} />
                                </article>
                            ))}
                        </div>
                    ))) : (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <Spinner color="purple" aria-label="loading.." size="xl"/>
                        </div>
                    )}
                </div>
                <div className="flex overflow-x-auto sm:justify-center">
                    <Pagination 
                    currentPage={currentPage} 
                    totalPages={pageLength} 
                    onPageChange={onPageChange} 
                    previousLabel="이전"
                    nextLabel="다음" 
                    showIcons />
                </div>
            </div>
            {articles ? <ArticleModal article={articles[openedArticleId]} open={isArticleOpen} setOpen={setIsArticleOpen} /> : ""}
        </div>
    )
}