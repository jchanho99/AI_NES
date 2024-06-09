import axios from "axios";
import { formatDateDB } from "../date_format";

export interface Article {
    id?: number;
    date?: Date;
    link: string;
    origin_news: string;
    press: string;
    section: string;
    title: string;
    summary: string;
    sentiment: string;
}
interface GetArticleResult {
    status: number;
    item?: Article;
}
interface GetArticlesResult {
    status: number;
    items?: Article[];
}

async function GetArticle(date: Date, index: number): Promise<GetArticleResult> {
    try {
        const response = await axios.post<Article>("/service/api/getData", { date: formatDateDB(date), index: index });
        if (response.status != 201 || response.data == null) {
            return { status: response.status };
        }
        response.data.id = index;
        response.data.date = date;

        const getArticleResult = { status: response.status, item: response.data };
        // Debug
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return getArticleResult;
    } catch (err) {
        console.error(err);
        return { status: 500 };
    }
}

async function GetArticles(date?: Date): Promise<GetArticlesResult> {
    try {
        const response = await axios.post<Article[]>("/service/api/getData", { date: date ? formatDateDB(date) : undefined });
        if (response.status != 201 || response.data == null) {
            return { status: response.status };
        }

        let index = 0;
        let today = new Date();
        for (const article of response.data) {
            article.id = index++;
            article.date = date ? date : today;
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

export { GetArticle, GetArticles };