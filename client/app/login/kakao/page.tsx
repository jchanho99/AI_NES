'use client';

import { Spinner } from 'flowbite-react/components/Spinner';
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function LoginKakao() {
    const KakaoAuthCode = useSearchParams().get('code');

    useEffect(() => {
        if (KakaoAuthCode) {
            // 로그인 페이지에 인가 코드 전송
            window.opener.postMessage(KakaoAuthCode, window.location.origin);
        } else {
            console.error("Failed to issue authorization code");
        }
        window.close();
    }, [KakaoAuthCode]);

    return (
        <div className="absolute w-screen h-screen bg-gray-200 z-50 flex items-center justify-center">
            <div role="status" className="flex flex-col items-center justify-center">
                <Spinner color="purple" aria-label="loading.." size="xl"/>
                <span className="sr-only">Redirecting...</span>
                <p className="text-center">리디렉션 중..</p>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginKakao />
        </Suspense>
    );
}
