"use client"

import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { KakaoAuthUri } from "@/scripts/config_kakao";
import { useCallback, useEffect, useState } from 'react';
import RegisterModal from './register_modal';
import { KakaoAuth, GoogleAuth, NativeAuth } from '@/scripts/api/get_auth';
import useAuthStore from '@/scripts/auth_store';
import classNames from 'classnames';
import { Spinner } from 'flowbite-react';

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
        if (authResult.status == 201 && authResult.jwt_token) {
            login(authResult.jwt_token as string, authResult.id as string, authResult.provider as string);
            router.push('/');
        } else {
            setIsLoginFail(true);
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
                                {isLoading? <Spinner color="purple" aria-label="loading.." size="md"/> : ''}
                            </button>
                            <button
                                type="button"
                                className="mt-2 flex w-full justify-center rounded-lg bg-[#FEE500] px-3 py-2.5 text-sm font-semibold"
                                disabled={isLoading}
                                onClick={openKakaoLogin}
                            >
                                <div className="mr-2 flex justify-center items-center">
                                    <img className="h-4" src="/images/kakao_logo.png" alt="Kakao Login"/>
                                </div>
                                <p className="text-black/85 leading-4">카카오 로그인</p>
                            </button>
                            <button
                                type="button"
                                className="mt-2 flex w-full justify-center rounded-lg bg-white px-3 py-2.5 text-sm font-semibold shadow-md"
                                disabled={isLoading}
                                onClick={() => handleLogin('google')}
                            >
                                <div className="mr-2 flex justify-center items-center">
                                    <img className="h-[18px]" src="/images/google_logo.png" alt="Google Login"/>
                                </div>
                                <p className="text-[#5f6368] leading-[18px] roboto-bold">구글 로그인</p>
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
