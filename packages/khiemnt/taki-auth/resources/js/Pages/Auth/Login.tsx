import { Head, Link, useForm } from '@inertiajs/react';
import {
    Chrome,
    Github,
    Lock,
    Mail,
    ArrowRight,
    Github as GithubIcon,
} from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword?: boolean;
}) {
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
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 p-6">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] animate-pulse rounded-full bg-blue-600/20 blur-[120px]" />
            <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] animate-pulse rounded-full bg-purple-600/20 blur-[120px]" />

            <Head title="Đăng nhập" />

            <div className="z-10 w-full max-w-md">
                <div className="mb-10 text-center">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-tr from-blue-600 to-purple-600 shadow-lg ring-1 shadow-blue-500/20 ring-white/20">
                        <Lock className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Chào mừng trở lại
                    </h1>
                    <p className="mt-2 text-slate-400">
                        Vui lòng đăng nhập vào tài khoản của bạn
                    </p>
                </div>

                <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="mb-1.5 ml-1 block text-sm font-medium text-slate-300">
                                Email
                            </label>
                            <div className="group relative">
                                <Mail className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-500" />
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3 pr-4 pl-11 text-white transition-all outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1.5 ml-1 text-xs text-red-400">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <div className="mb-1.5 ml-1 flex items-center justify-between">
                                <label className="block text-sm font-medium text-slate-300">
                                    Mật khẩu
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs text-blue-400 transition-colors hover:text-blue-300"
                                    >
                                        Quên mật khẩu?
                                    </Link>
                                )}
                            </div>
                            <div className="group relative">
                                <Lock className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-500" />
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3 pr-4 pl-11 text-white transition-all outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 ml-1 text-xs text-red-400">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500/50 focus:ring-offset-slate-900"
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2 text-sm text-slate-400"
                            >
                                Ghi nhớ đăng nhập
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="group flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-blue-400 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
                        >
                            Đăng nhập
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-slate-900 px-2 text-slate-500">
                                Hoặc tiếp tục với
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <a
                            href="/auth/google/redirect"
                            className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 py-3 text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-700/50 active:scale-[0.98]"
                        >
                            <Chrome className="h-5 w-5 text-red-500" />
                            <span className="text-sm font-medium">Google</span>
                        </a>
                        <a
                            href="/auth/github/redirect"
                            className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 py-3 text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-700/50 active:scale-[0.98]"
                        >
                            <Github className="h-5 w-5 text-white" />
                            <span className="text-sm font-medium">Github</span>
                        </a>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-slate-500">
                    Bạn chưa có tài khoản?{' '}
                    <Link
                        href={route('register')}
                        className="font-medium text-blue-400 transition-colors hover:text-blue-300"
                    >
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
