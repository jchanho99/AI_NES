import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    jwt_token: string | null;
    id: string | null;
    provider: string | null;
    login: (jwt_token: string, id: string, provider: string) => void;
    logout: () => void;
}

const useAuthStore = create(persist<AuthState>((set) => ({
    jwt_token: null,
    id: null,
    provider: null,
    login: (token, userId, prov) => {
        set({ jwt_token: token, id: userId, provider: prov});
        window.location.reload();
    },
    logout: () => {
        set({ jwt_token: null, id: null, provider: null});
        window.location.reload();
    },
}), {
    name: 'authStorage'
}));

export default useAuthStore;
