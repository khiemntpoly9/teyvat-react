import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Users,
    ShieldCheck,
    Activity,
    Key,
    TrendingUp,
    MoreVertical,
    Search,
    Plus,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    UserPlus,
    FileText,
} from 'lucide-react';

export default function Dashboard({ stats }: { stats?: any }) {
    const defaultStats = [
        {
            name: 'Tổng người dùng',
            value: '1,280',
            change: '+12%',
            icon: Users,
            color: 'bg-blue-600',
        },
        {
            name: 'Phiên hoạt động',
            value: '452',
            change: '+5%',
            icon: Activity,
            color: 'bg-purple-600',
        },
        {
            name: 'Vai trò',
            value: '8',
            change: '0%',
            icon: ShieldCheck,
            color: 'bg-green-600',
        },
        {
            name: 'Yêu cầu 24h',
            value: '8.4k',
            change: '-2%',
            icon: TrendingUp,
            color: 'bg-amber-600',
        },
    ];

    const activities = [
        {
            user: 'Nguyễn Văn A',
            action: 'Đã tạo vai trò [Editor]',
            time: '2 phút trước',
            type: 'create',
        },
        {
            user: 'Trần Thị B',
            action: 'Đã gán quyền [Quản lý bài viết] cho [Editor]',
            time: '15 phút trước',
            type: 'assign',
        },
        {
            user: 'Lê Văn C',
            action: 'Đăng nhập từ IP 192.168.1.1',
            time: '1 giờ trước',
            type: 'login',
        },
        {
            user: 'Hệ thống',
            action: 'Đã sao lưu cơ sở dữ liệu định kỳ',
            time: '5 giờ trước',
            type: 'system',
        },
    ];

    return (
        <AuthenticatedLayout header="Tổng quan">
            <Head title="Dashboard" />

            <div className="animate-in space-y-8 duration-500 fade-in">
                {/* Greeting */}
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Chào mừng! 👋
                        </h1>
                        <p className="text-slate-400">
                            Dưới đây là một số thống kê chính cho hệ thống xác
                            thực của bạn.
                        </p>
                    </div>
                    <div className="mt-4 flex items-center gap-3 md:mt-0">
                        <Link
                            href={route('users.create')}
                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 active:scale-95"
                        >
                            <UserPlus className="h-4 w-4" />
                            Thêm người dùng
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {defaultStats.map((stat) => (
                        <div
                            key={stat.name}
                            className="group relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900 p-6 transition-all hover:bg-slate-800/80 hover:shadow-[0_20px_50px_rgba(37,99,235,0.05)]"
                        >
                            <div
                                className={`absolute top-0 right-0 h-24 w-24 ${stat.color}/10 translate-x-12 -translate-y-12 rounded-full blur-2xl transition-transform group-hover:scale-125`}
                            />

                            <div className="relative z-10 flex flex-col gap-4">
                                <div
                                    className={`h-12 w-12 rounded-xl ${stat.color} flex items-center justify-center p-3 shadow-lg shadow-${stat.color.split('-')[1]}-500/20`}
                                >
                                    <stat.icon className="h-full w-full text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        {stat.name}
                                    </p>
                                    <div className="flex items-end gap-2">
                                        <h3 className="text-2xl font-bold text-white">
                                            {stat.value}
                                        </h3>
                                        <div
                                            className={`mb-1 flex items-center text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-400' : stat.change.startsWith('-') ? 'text-red-400' : 'text-slate-500'}`}
                                        >
                                            {stat.change.startsWith('+') ? (
                                                <ArrowUpRight className="mr-0.5 h-3 w-3" />
                                            ) : stat.change.startsWith('-') ? (
                                                <ArrowDownRight className="mr-0.5 h-3 w-3" />
                                            ) : null}
                                            {stat.change}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Activity Feed */}
                    <div className="space-y-6 lg:col-span-2">
                        <div className="self-start overflow-hidden rounded-3xl border border-white/5 bg-slate-900/50 backdrop-blur-sm">
                            <div className="flex items-center justify-between border-b border-white/5 p-6">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                                    <Activity className="h-5 w-5 text-blue-500" />
                                    Hoạt động gần đây
                                </h3>
                                <Link className="text-xs font-semibold text-blue-400 hover:text-blue-300">
                                    Xem tất cả
                                </Link>
                            </div>
                            <div className="divide-y divide-white/5">
                                {activities.map((activity, i) => (
                                    <div
                                        key={i}
                                        className="group p-4 transition-colors hover:bg-white/5"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-800 transition-colors group-hover:border-blue-500/30">
                                                <FileText className="h-5 w-5 text-slate-500 transition-colors group-hover:text-blue-500" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between">
                                                    <p className="truncate text-sm font-semibold text-slate-200">
                                                        {activity.user}
                                                    </p>
                                                    <span className="ml-2 text-[10px] font-bold whitespace-nowrap text-slate-600 uppercase">
                                                        {activity.time}
                                                    </span>
                                                </div>
                                                <p className="mt-0.5 text-sm text-slate-400">
                                                    {activity.action}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Access */}
                    <div className="space-y-6">
                        <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900 p-6 shadow-sm">
                            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-600/10 blur-[50px] transition-all group-hover:bg-blue-600/20" />
                            <h3 className="relative z-10 mb-6 text-lg font-bold text-white">
                                Lối tắt cấu hình
                            </h3>
                            <div className="relative z-10 space-y-3">
                                <Link
                                    href={route('roles.index')}
                                    className="group/item flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-3 transition-all hover:border-blue-500/30"
                                >
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="h-5 w-5 text-green-500" />
                                        <span className="text-sm font-semibold">
                                            Phân quyền vai trò
                                        </span>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-slate-600 transition-all group-hover/item:translate-x-1 group-hover/item:text-blue-500" />
                                </Link>
                                <Link
                                    href={route('permissions.index')}
                                    className="group/item flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-3 transition-all hover:border-blue-500/30"
                                >
                                    <div className="flex items-center gap-3">
                                        <Key className="h-5 w-5 text-amber-500" />
                                        <span className="text-sm font-semibold">
                                            Quản lý khoá bảo mật
                                        </span>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-slate-600 transition-all group-hover/item:translate-x-1 group-hover/item:text-blue-500" />
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-linear-to-tr from-blue-600 to-purple-700 p-6 shadow-xl shadow-blue-500/20">
                            <h4 className="mb-2 text-lg font-bold text-white">
                                Taki Auth Pro v1.0
                            </h4>
                            <p className="mb-4 text-xs leading-relaxed text-blue-100/70">
                                Gói xác thực của bạn đang hoạt động ổn định. Đã
                                kiểm tra 0 lỗi bảo mật trong tuần này.
                            </p>
                            <button className="w-full rounded-xl bg-white py-3 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-50">
                                Hướng dẫn sử dụng nâng cao
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
