import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Message {
    text: string
    sender: 'user' | 'bot' | 'loading'
}

interface ChatbotHistory {
    messages: Message[];
    disableHint: boolean;
    setMessages: (msg: Message[]) => void;
    setDisableHint: (disabledHint: boolean) => void;
}

const useChatbotStore = create(persist<ChatbotHistory>((set) => ({
    messages: [],
    disableHint: false,
    setMessages: (msgs) => { set({ messages: msgs }); },
    setDisableHint: (disableHint) => set({disableHint})
}), {
    name: 'chatbotStorage'
}));

export default useChatbotStore;

