import { Article } from "@/scripts/api/get_articles";
import SummaryTooltip from "./summary_tooltip";
import { formatDateString } from "@/scripts/date_format";

interface ArticleItemProps {
    article: Article;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
    return (
        <SummaryTooltip content={article.summary as string}>
            <div className="relative flex items-center gap-x-4">
                <div>
                    <div className="flex items-center gap-x-4 text-xs">
                        <time dateTime={new Date(article.date as Date).toDateString()} className="text-gray-500">
                            {formatDateString(article.date as Date)}
                        </time>
                        <a
                            href="#"
                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                        >
                            {article.section}
                        </a>
                    </div>
                    <div className="mt-2 group relative">
                        <h3 className="cursor-pointer text-left text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
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
        </SummaryTooltip>
    );
}

export default ArticleItem;