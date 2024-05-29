// posts.tsx
// 백엔드로부터 기사 정보를 얻어올 스크립트

class Article {
    id: number;
    title: string;
    description: string;
    summary: string;
    date: string;
    datetime: string;
    section: string;
    author: { name: string; press: string; href: string; imageUrl: string };
    thumbnail: string;

    constructor(
        id: number,
        title: string,
        description: string,
        summary: string,
        date: string,
        datetime: string,
        section: string,
        author: { name: string; press: string; href: string, imageUrl: string },
        thumbnail: string
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.summary = summary;
        this.date = date;
        this.datetime = datetime;
        this.section = section;
        this.author = author;
        this.thumbnail = thumbnail;
    }
}

const articles: Article[] = [];

// 디버깅용
for (let i = 1; i <= 6; i++) {
    const article = new Article(
        i,
        '기사 제목',
        '기사 내용',
        '기사 요약',
        '2024년 4월 12일',
        '2024-04-12',
        '정치',
        {
            name: '기자',
            press: '언론사',
            href: '#',
            imageUrl: 'https://yt3.googleusercontent.com/w7ColCSgsKVMJuh6izq4oRlYn-ZkJ8roQuHQy1Nvc75ONCH7uzLmoUE5YMJtZqFCHb4ZFPxAOg=s900-c-k-c0x00ffffff-no-rj',
        },
        'https://yt3.googleusercontent.com/w7ColCSgsKVMJuh6izq4oRlYn-ZkJ8roQuHQy1Nvc75ONCH7uzLmoUE5YMJtZqFCHb4ZFPxAOg=s900-c-k-c0x00ffffff-no-rj'
    );
    articles.push(article);
}

export { Article, articles };
