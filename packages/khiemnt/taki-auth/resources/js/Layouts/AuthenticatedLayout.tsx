import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    User as UserIcon,
    Settings,
    ChevronRight,
} from 'lucide-react';
import { PropsWithChildren, useState } from 'react';

export default function AuthenticatedLayout({
    children,
    header,
}: PropsWithChildren<{ header?: string }>) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard },
        { name: 'Người dùng', href: route('users.index'), icon: Users },
        { name: 'Vai trò', href: route('roles.index'), icon: ShieldCheck },
        { name: 'Quyền hạn', href: route('permissions.index'), icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-blue-500/30">
            {/* Sidebar Overlay for Mobile */}
            {!isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/5 bg-slate-900 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}
            >
                <div className="flex h-full flex-col">
                    {/* Brand */}
                    <div className="p-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20">
                                <ShieldCheck className="h-6 w-6 text-white" />
                            </div>
                            <span className="bg-linear-to-r from-white to-slate-400 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                                Taki Auth
                            </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
                        <p className="mb-4 px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                            Danh mục chính
                        </p>
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all ${
                                    route().current(
                                        item.href.replace(
                                            window.location.origin + '/',
                                            '',
                                        ),
                                    )
                                        ? 'border border-blue-500/20 bg-blue-600/10 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.1)]'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                                <span className="font-medium">{item.name}</span>
                                {route().current(
                                    item.href.replace(
                                        window.location.origin + '/',
                                        '',
                                    ),
                                ) && (
                                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="border-t border-white/5 bg-slate-900/50 p-4 backdrop-blur-sm">
                        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-2">
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-slate-800">
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <UserIcon className="h-5 w-5 text-slate-400" />
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold">
                                    {user.name}
                                </p>
                                <p className="truncate text-xs text-slate-500">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:border-red-500/20 hover:bg-red-500/10"
                        >
                            <LogOut className="h-4 w-4" />
                            Đăng xuất
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div
                className={`flex min-h-screen flex-col transition-all duration-300 lg:ml-72`}
            >
                {/* Header */}
                <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/80 p-4 backdrop-blur-md lg:px-8">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-1 items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(!isSidebarOpen)}
                                className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-400 hover:text-white lg:hidden"
                            >
                                {isSidebarOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </button>

                            <div className="group relative hidden w-full max-w-md md:block">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pr-4 pl-10 text-sm transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="relative rounded-xl p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500" />
                            </button>
                            <div className="mx-1 h-6 w-px bg-white/10" />
                            <div className="flex cursor-pointer items-center gap-2 rounded-full px-1 py-1 pr-3 transition-colors hover:bg-white/5">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold ring-2 ring-blue-500/20">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden text-sm font-medium sm:inline">
                                    {user.display_name || user.name}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-8">
                    {header && (
                        <div className="mb-8 flex items-center gap-2">
                            <Link
                                href={route('dashboard')}
                                className="text-sm text-slate-500 transition-colors hover:text-white"
                            >
                                Trang chủ
                            </Link>
                            <ChevronRight className="h-4 w-4 text-slate-700" />
                            <h2 className="text-sm font-semibold tracking-widest text-blue-400 uppercase">
                                {header}
                            </h2>
                        </div>
                    )}
                    {children}
                </main>

                <footer className="border-t border-white/5 p-6 text-center">
                    <p className="text-xs font-medium text-slate-600">
                        © 2026 Taki Auth Package by Khiemnt. All rights
                        reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
}
