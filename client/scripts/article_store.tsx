import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Article } from '@/scripts/api/get_articles';

interface LoadedArticles {
    articles: Article[];
    setArticles: (data: Article[]) => void;
    getDate: Date;
    rehydrated?: boolean;
    setRehydrated: () => void;
}

const useArticleStore = create(persist<LoadedArticles>((set) => ({
    articles: [],
    setArticles: (data) => { set({ articles: data, getDate: new Date() }); },
    getDate: new Date(),
    setRehydrated: () => set({ rehydrated: true })
}), {
    name: 'articleStorage',
    onRehydrateStorage: () => (state) => {
        state?.setRehydrated();
    }
}));

export default useArticleStore;

