import { ServiceUri } from "../config_native"
import axios from "axios";

interface News {
    "title": string,
    "originallink": string,
    "link": string,
    "description": string,
    "pubDate": Date
}

interface SearchResponse {
    "lastBuildDate"?: Date
    "total"?: number
    "start"?: number
    "display"?: number
    "items"?: News[]
}

interface SearchResult {
    "status": number,
    "result"?: string
}

function formatNews(news: News) {
    return `
    ${news.title}</br>
    ${news.pubDate}</br>
    <a href=${news.link}>링크</a></br>
    ${news.description}
    `;
}

export default async function SearchNews(query: string): Promise<SearchResult> {
    const storage = JSON.parse(window.localStorage.authStorage);
    const token = storage.state.jwt_token;
    if (!token) {
        return { status: 401 };
    }
    try {
        const response = await axios.post<SearchResponse>(ServiceUri + "api/news",
            { chatbot_query: query }, { headers: { Authorization: "Bearer " + token } });
        if (response.status != 200 || response.data.items == null) {
            return { status: response.status };
        }
        // Debug
        // await new Promise(resolve => setTimeout(resolve, 2000));

        const searchResult = { status: response.status, result: formatNews(response.data.items[0]) };
        return searchResult;
    }
    catch (err) {
        console.error(err);
        return { status: 500 };
    }
}