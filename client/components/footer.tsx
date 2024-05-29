export default function Footer() {
    return (
        <footer className="mx-auto mt-16 w-full max-w-container px-4 sm:px-6 lg:px-8">
            <div className="border-t border-slate-900/5 py-10">
                <svg className="mx-auto h-5 w-auto text-slate-900" aria-hidden="true" viewBox="0 0 160 24" fill="none">

                </svg>
                <p className="mt-5 text-center text-sm leading-6 text-slate-500">
                    This website is built using open-source software licensed under the MIT License.<br />
                    The copyright and license information of the used open-source software are retained by their respective owners.<br />
                    For detailed information about the source code, please refer to the <a className="text-sky-500" href="https://github.com/jchanho99/AI_NES">GitHub Repository</a>.
                </p>
                <div className="mt-16 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700">
                    <a href="#">Privacy policy</a>
                    <div className="h-4 w-px bg-slate-500/20"></div>
                    <a href="#">Changelog</a>
                </div>
            </div>
        </footer>
    )
}