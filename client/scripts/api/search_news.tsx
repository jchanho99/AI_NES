import axios from "axios";

export interface News {
    id?: number;
    title: string;
    originallink: string;
    link: string;
    description: string;
    pubDate: Date;
}

interface SearchResult {
    status?: number;
    lastBuildDate?: Date;
    total?: number;
    start?: number;
    display?: number;
    items?: News[];
}

async function SearchNews(query: string): Promise<SearchResult> {
    const storage = JSON.parse(window.localStorage.authStorage);
    const token = storage.state.jwt_token;
    if (!token) {
        return { status: 401 };
    }
    try {
        console.log(
            { chatbot_query: query },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        const response = await axios.post<SearchResult>(
            "/service/search/news",
            { query: query },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status != 201 || response.data.items == null) {
            return { status: response.status };
        }
        // Debug
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const searchResult = response.data;
        searchResult.status = response.status;
        let index = 0;
        for (const news of searchResult.items as News[]){
            news.id = index++;
        }
        return searchResult;
    } catch (err) {
        console.error(err);
        return { status: 500 };
    }
}

export { SearchNews };