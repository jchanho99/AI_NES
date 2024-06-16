export default function NotFound() {
    return (
        <section className="flex items-center justify-center h-[70vh]">
            <div className="py-8">
                <div className="text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-indigo-500">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-200 md:text-4xl dark:text-white">페이지를 찾을 수 없습니다.</p>
                    <p className="mb-4 text-lg font-light text-gray-300">존재하지 않는 페이지입니다. 올바른 주소로 접근했는지 확인하세요.</p>
                    <a href="../" className="inline-flex text-gray-100 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-centermy-4">홈으로 돌아가기</a>
                </div>
            </div>
        </section>
    );
}
