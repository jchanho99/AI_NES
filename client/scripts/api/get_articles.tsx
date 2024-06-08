import axios from "axios";

export interface Article {
    id?: number;
    link: string;
    origin_news: string;
    press: string;
    section: string;
    title: string;
    summary?: string;
}

interface GetArticlesResult {
    status: number;
    items?: Article[];
}

export default async function GetArticles(): Promise<GetArticlesResult> {
    try {
        const response = await axios.get<Article[]>("/service/api/getData");
        if (response.status != 201 || response.data == null) {
            return { status: response.status };
        }

        let index = 0;
        for (const article of response.data) {
            article.id = index++;
            // todo: 실제 요약 구현
            article.summary = "기사 내용 요약";
        }
        const getArticlesResult = { status: response.status, items: response.data };
        // Debug
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        return getArticlesResult;
    } catch (err) {
        console.error(err);
        return { status: 500 };
    }
}
