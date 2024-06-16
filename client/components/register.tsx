'use client'

import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import useAuthStore from '@/scripts/auth_store'
import NativeRegister from '@/scripts/api/register_native'
import { NativeAuth } from '@/scripts/api/get_auth'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { FloatingLabel, Spinner } from 'flowbite-react'

export default function Register() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDuplicatedID, setIsDuplicatedID] = useState(false);
  const [isAgreeRequired, setIsAgreeRequired] = useState(false);
  const [isError, setIsError] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const initState = () =>{
    setIsLoading(true);
    setIsDuplicatedID(false);
    setIsAgreeRequired(false);
    setIsError(false);
  }

  // native 회원가입 핸들러
  const handleRegister = async (id: string, email: string, password: string) => {
    if (!agreed) {
      setIsAgreeRequired(true);
      setIsLoading(false);
      return;
    }
    const registerResult = await NativeRegister({ id: id, email: email, password: password });
    if (registerResult.success) {
      const authResult = await NativeAuth({ id: id, password: password });
      login(authResult.jwt_token as string, authResult.id as string, "native");
      router.push('/');
    }
    else if (registerResult.status == 400) {
      setIsDuplicatedID(true);
    }
    else{
      setIsError(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="isolate bg-white px-16 py-20 pb-32 lg:px-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">회원가입</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          AI-NES에 가입하여 더 편리한 서비스를 제공받으세요.
        </p>
      </div>
      <form method="POST" className="mx-auto mt-8 max-w-xl"
        onSubmit={
          (event) => {
            event.preventDefault();
            initState();
            handleRegister(id, email, password);
          }}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FloatingLabel
              variant="outlined"
              label="아이디"
              name="id"
              id="id"
              disabled={isLoading}
              onChange={(e) => setId(e.target.value)}
              required />
          </div>
          <div className="sm:col-span-2">
            <FloatingLabel
              variant="outlined"
              label="이메일"
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>
          <div className="sm:col-span-2">
            <FloatingLabel
              variant="outlined"
              label="비밀번호"
              type="password"
              name="password"
              id="password"
              autoComplete="password"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? 'bg-indigo-600' : 'bg-gray-200',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? 'translate-x-3.5' : 'translate-x-0',
                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              회원가입을 위한 개인정보 수집에 동의합니다.
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ?
              <div role="status" className="flex justify-center">
                <Spinner color="purple" aria-label="loading.." size="md" />
              </div>
              : <p className={isLoading ? 'hidden' : ''}>가입하기</p>}
          </button>
        </div>
        <div className="text-pink-600 text-sm mt-1">
          <p className={classNames(isDuplicatedID ? "" : "hidden")}>
            이미 사용중인 아이디 입니다.
          </p>
          <p className={classNames(isAgreeRequired ? "" : "hidden")}>
            개인정보 수집에 동의해주세요.
          </p>
          <p className={classNames(isError ? "" : "hidden")}>
            회원가입에 실패했습니다.
          </p>
        </div>
      </form>
    </div>
  )
}
