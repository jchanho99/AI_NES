import { formatDateString } from "@/scripts/date_format";
import { News } from "@/scripts/api/search_news";
import { LinkIcon } from "@heroicons/react/20/solid";

interface NewsItemProps {
    news: News;
}

const NewsItem: React.FC<NewsItemProps> = ({ news }) => {
    return (
        <div className="relative flex items-center gap-x-4">
            <div className="bg-gray-100 p-4 rounded-xl">
                <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={new Date(news.pubDate).toDateString()} className="text-gray-500">
                        {formatDateString(news.pubDate)}
                    </time>
                    <a
                        href={news.originallink}
                        target="_blank"
                        className="flex relative z-10 rounded-full bg-gray-50 px-2 py-1.5 font-medium text-gray-600 hover:bg-gray-200"
                    >
                        <LinkIcon className="w-3 h-3" />
                        <span className="leading-3 px-1">원문</span>
                    </a>
                </div>
                <div className="mt-2 group relative">
                    <a href={news.link} 
                    target="_blank"
                    className="cursor-pointer text-left text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                    dangerouslySetInnerHTML={{__html: news.title}}>
                    </a>
                </div>
                <div className="mt-3 relative flex items-center gap-x-4">
                    <div className="text-sm leading-6">
                        <p className="text-gray-900"
                        dangerouslySetInnerHTML={{__html: news.description}}>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsItem;