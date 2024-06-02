"use client"

import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { KakaoAuthUri } from "@/scripts/config_kakao";
import { useCallback, useEffect, useState } from 'react';
import RegisterModal from './register_modal';
import { KakaoAuth, GoogleAuth, NativeAuth } from '@/scripts/api/get_auth';
import useAuthStore from '@/scripts/auth_store';
import classNames from 'classnames';

export default function Login() {

    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginFail, setIsLoginFail] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuthStore();
    const router = useRouter();

    // native, 소셜 로그인 핸들러
    const handleLogin = async (provider?: string, id?: string, password?: string, code?: string) => {
		setIsLoaded(false);
        setIsLoading(true);
        setIsLoginFail(false);
        let authResult;
        switch (provider) {
            case undefined:
                authResult = await NativeAuth({id: id as string, password: password as string});
                break;
            case 'google':
                authResult = await GoogleAuth();
                break;
            case 'kakao':
                authResult = await KakaoAuth(code as string);
                break;
            default:
                throw new Error('Unsupported authentication provider');
        }
        if (authResult.status == 201) {
            login(authResult.jwt_token as string, authResult.id as string, authResult.provider as string);
            router.push('/');
        } else {
            setIsLoginFail(true);
            if (authResult.error) console.error(authResult.error);
        }
        setIsLoaded(true);
    };

    useEffect(() => {
        setIsLoading(false);
    }, [isLoaded]);

    // 카카오 로그인 관련
    // 파이어베이스 처럼 모듈화 하고싶은데 어떻게 한건지 모르겠음
    // 로그인 팝업 열기
    const openKakaoLogin = useCallback(() => {
        window.open(
            KakaoAuthUri,
            'popupWindow',
            'width=600,height=800,scrollbars=yes'
        );
    }, []);

    // 인가코드 받기
    const handlePopupMessage = useCallback((event: MessageEvent) => {
        // 유효성 검사
        if (event.origin !== window.location.origin) {
            return;
        }

        if (event.data) {
            handleLogin('kakao', undefined, undefined, event.data);
        }
    }, []);

    // 메시지 수신 이벤트
    useEffect(() => {
        window.addEventListener('message', handlePopupMessage);

        return () => {
            window.removeEventListener('message', handlePopupMessage);
        };
    }, [handlePopupMessage]);

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-16 py-10 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-16 w-auto"
                        src="../images/service_logo.png"
                        alt="Logo"
                    />
                    <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        계정에 로그인하기
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={(event) => { event.preventDefault(); handleLogin(undefined, id, password) }} method="POST">
                        <div>
                            <label htmlFor="id" className="block text-sm font-medium leading-6 text-gray-900">
                                아이디
                            </label>
                            <div className="mt-2">
                                <input
                                    id="id"
                                    name="id"
                                    disabled={isLoading}
                                    required
                                    onChange={(e) => setId(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    비밀번호
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        비밀번호를 잊어버리셨나요?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    disabled={isLoading}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                                />
                            </div>
                        </div>

                        <div>
                            <p className={classNames(isLoginFail ? "" : "hidden", "text-pink-600 text-sm")}>
                                이메일 혹은 비밀번호가 올바르지 않습니다.
                            </p>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <p className={isLoading ? 'hidden' : ''}>로그인</p>
                                <div role="status">
                                    <svg aria-hidden="true" className={classNames(!isLoading ? "hidden" : "", "w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600")} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </button>
                            <button
                                type="button"
                                className="relative flex w-full h-10 mx-auto justify-center items-center rounded-md mt-2"
                                disabled={isLoading}
                                onClick={openKakaoLogin}
                            >
                                <div className="relative w-full h-full flex justify-center items-center">
                                    <Image src="/images/kakao_login_large_wide.png" alt="Kakao Login" layout="fill" objectFit="contain" />
                                </div>
                            </button>
                            <button
                                type="button"
                                className="relative flex w-full h-10 mx-auto justify-center items-center rounded-md mt-2"
                                disabled={isLoading}
                                onClick={() => handleLogin('google')}
                            >
                                <div className="relative w-full h-full flex justify-center items-center">
                                    <Image src="/images/google_login_SI.png" alt="Google Login" layout="fill" objectFit="contain" />
                                </div>
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        계정이 없으신가요?{' '}
                        <button onClick={() => setIsRegisterOpen(true)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            가입하기
                        </button>
                    </p>
                </div>
            </div>
            <RegisterModal open={isRegisterOpen} setOpen={setIsRegisterOpen} />
        </div>
    )
}