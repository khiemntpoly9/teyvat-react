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
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />

            <Head title="Đăng ký" />

            <div className="w-full max-w-md z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 mb-6 shadow-lg shadow-purple-500/20 ring-1 ring-white/20">
                        <UserPlus className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Tạo tài khoản mới</h1>
                    <p className="text-slate-400 mt-2">Bắt đầu hành trình của bạn ngay hôm nay</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Họ và tên</label>
                            <div className="relative group">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="Nguyễn Văn A"
                                    required
                                />
                            </div>
                            {errors.name && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            {errors.email && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Mật khẩu</label>
                            <div className="relative group">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            {errors.password && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Xác nhận mật khẩu</label>
                            <div className="relative group">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-purple-500/25 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center group"
                        >
                            Tạo tài khoản
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-slate-500 text-sm">
                    Bạn đã có tài khoản?{' '}
                    <Link href={route('login')} className="text-blue-400 font-medium hover:text-blue-300 transition-colors">
                        Đăng nhập ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
