'use client'

import ArticlePage from "@/components/article";
import { Article, GetArticle } from "@/scripts/api/get_articles";
import { formatDateObject } from "@/scripts/date_format";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Error from "next/error";
import { Spinner } from "flowbite-react";

export default function SingleArticle() {
    const path = usePathname().split('/');
    const date = path[2];
    const index = Number(path[3]);
    const [article, setArticle] = useState<Article>();
    const [isLoaded, setIsLoaded] = useState(false);

    // 기사 정보 불러오기
    const handleGetArticle = async (date: Date, index: number) => {
        const getArticleResult = await GetArticle(date, index);
        if (getArticleResult.status != 201) {
            console.error(getArticleResult.status);
        }
        else {
            if (!getArticleResult.item) {
                // todo: 해당 기사가 없을 경우 에러 처리
            }
            else {
                setArticle(getArticleResult.item);
                console.log("articles loaded");
            }
        }
        setIsLoaded(true);
    }

    useEffect(() => {
        if (date && index) {
            handleGetArticle(formatDateObject(date as string), index);
        }
        else {
            setIsLoaded(true);
        }
    }, []);

    return (
        <div className="bg-white rounded-2xl mt-3 mx-auto max-w-xl xl:max-w-3xl lg:max-w-2xl">
            {isLoaded ?
                article ? <ArticlePage article={article} />
                    : <Error statusCode={404} />
                : <div className="flex justify-center h-[80vh]">
                    <div className="absolute top-1/2 transform -translate-y-1/2">
                        <Spinner color="purple" aria-label="loading.." size="xl" />
                    </div>
                </div>
            }
        </div>
    );
}