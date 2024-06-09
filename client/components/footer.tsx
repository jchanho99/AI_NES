export default function Footer() {
    return (
        <footer className="mx-auto mt-16 w-full max-w-container px-4 sm:px-6 lg:px-8">
            <div className="border-t border-slate-900/5 py-10">
                <p className="mt-5 text-center text-sm leading-6 text-slate-400/80">
                    This website is built using open-source software licensed under the MIT License.<br />
                    The copyright and license information of the used open-source software are retained by their respective owners.<br />
                    For detailed information about the source code, please refer to the <a className="text-indigo-500" href="https://github.com/jchanho99/AI_NES">GitHub Repository</a>.
                </p>
                <div className="mt-16 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-500/80">
                    <a href="#">Documents</a>
                    <div className="h-4 w-px bg-slate-400/20"></div>
                    <a href="./about">About</a>
                </div>
            </div>
        </footer>
    )
}