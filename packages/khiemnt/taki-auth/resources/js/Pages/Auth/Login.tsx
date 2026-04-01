import { Head, Link, useForm } from '@inertiajs/react';
import { Chrome, Github, Lock, Mail, ArrowRight, Github as GithubIcon } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword?: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />

            <Head title="Đăng nhập" />

            <div className="w-full max-w-md z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 mb-6 shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
                        <Lock className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Chào mừng trở lại</h1>
                    <p className="text-slate-400 mt-2">Vui lòng đăng nhập vào tài khoản của bạn</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            {errors.email && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5 ml-1">
                                <label className="block text-sm font-medium text-slate-300">Mật khẩu</label>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                                        Quên mật khẩu?
                                    </Link>
                                )}
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            {errors.password && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500/50 focus:ring-offset-slate-900"
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-slate-400">Ghi nhớ đăng nhập</label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center group"
                        >
                            Đăng nhập
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-slate-900 px-2 text-slate-500">Hoặc tiếp tục với</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <a
                            href="/auth/google/redirect"
                            className="flex items-center justify-center gap-2 bg-slate-800/50 border border-slate-700 text-slate-200 hover:bg-slate-700/50 hover:border-slate-600 py-3 rounded-xl transition-all active:scale-[0.98]"
                        >
                            <Chrome className="w-5 h-5 text-red-500" />
                            <span className="text-sm font-medium">Google</span>
                        </a>
                        <a
                            href="/auth/github/redirect"
                            className="flex items-center justify-center gap-2 bg-slate-800/50 border border-slate-700 text-slate-200 hover:bg-slate-700/50 hover:border-slate-600 py-3 rounded-xl transition-all active:scale-[0.98]"
                        >
                            <Github className="w-5 h-5 text-white" />
                            <span className="text-sm font-medium">Github</span>
                        </a>
                    </div>
                </div>

                <p className="text-center mt-8 text-slate-500 text-sm">
                    Bạn chưa có tài khoản?{' '}
                    <Link href={route('register')} className="text-blue-400 font-medium hover:text-blue-300 transition-colors">
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
