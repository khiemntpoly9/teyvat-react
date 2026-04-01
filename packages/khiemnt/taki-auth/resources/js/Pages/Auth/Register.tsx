import { Head, Link, useForm } from '@inertiajs/react';
import { User, Mail, Lock, ArrowRight, UserPlus } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 p-6">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-10%] h-[40%] w-[40%] animate-pulse rounded-full bg-blue-600/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] h-[40%] w-[40%] animate-pulse rounded-full bg-purple-600/20 blur-[120px]" />

            <Head title="Đăng ký" />

            <div className="z-10 w-full max-w-md">
                <div className="mb-10 text-center">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-tr from-purple-600 to-blue-600 shadow-lg ring-1 shadow-purple-500/20 ring-white/20">
                        <UserPlus className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Tạo tài khoản mới
                    </h1>
                    <p className="mt-2 text-slate-400">
                        Bắt đầu hành trình của bạn ngay hôm nay
                    </p>
                </div>

                <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="mb-1.5 ml-1 block text-sm font-medium text-slate-300">
                                Họ và tên
                            </label>
                            <div className="group relative">
                                <User className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-purple-500" />
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3 pr-4 pl-11 text-white transition-all outline-none placeholder:text-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                                    placeholder="Nguyễn Văn A"
                                    required
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1.5 ml-1 text-xs text-red-400">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 ml-1 block text-sm font-medium text-slate-300">
                                Email
                            </label>
                            <div className="group relative">
                                <Mail className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-purple-500" />
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3 pr-4 pl-11 text-white transition-all outline-none placeholder:text-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
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
                            <label className="mb-1.5 ml-1 block text-sm font-medium text-slate-300">
                                Mật khẩu
                            </label>
                            <div className="group relative">
                                <Lock className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-purple-500" />
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3 pr-4 pl-11 text-white transition-all outline-none placeholder:text-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
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

                        <div>
                            <label className="mb-1.5 ml-1 block text-sm font-medium text-slate-300">
                                Xác nhận mật khẩu
                            </label>
                            <div className="group relative">
                                <Lock className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-purple-500" />
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3 pr-4 pl-11 text-white transition-all outline-none placeholder:text-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="group flex w-full items-center justify-center rounded-xl bg-linear-to-r from-purple-600 to-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:from-purple-500 hover:to-blue-500 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
                        >
                            Tạo tài khoản
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-sm text-slate-500">
                    Bạn đã có tài khoản?{' '}
                    <Link
                        href={route('login')}
                        className="font-medium text-blue-400 transition-colors hover:text-blue-300"
                    >
                        Đăng nhập ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
