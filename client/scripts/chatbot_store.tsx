import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { News } from './api/search_news';

interface Message {
    text?: string;
    sender: 'user' | 'bot' | 'loading';
    news?: News[];
    currentPage?: number;
}

interface ChatbotHistory {
    messages: Message[];
    disableHint: boolean;
    setMessages: (msg: Message[]) => void;
    setDisableHint: (disabledHint: boolean) => void;
    setCurrentPage: (index: number, page: number) => void;
}

const useChatbotStore = create(persist<ChatbotHistory>((set) => ({
    messages: [],
    disableHint: false,
    setMessages: (msgs) => { set({ messages: msgs }); },
    setDisableHint: (disableHint) => set({ disableHint }),
    setCurrentPage: (index, page) => {
        set((state) => {
            const updatedMessages = state.messages.map((message, i) => 
                i === index ? { ...message, currentPage: page } : message
            );
            return { messages: updatedMessages };
        });
    }
}), {
    name: 'chatbotStorage'
}));

export default useChatbotStore;
