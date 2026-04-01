import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Users, ShieldCheck, LogOut, Menu, X, Bell, Search, User as UserIcon, Settings, ChevronRight } from 'lucide-react';
import { PropsWithChildren, useState } from 'react';

export default function AuthenticatedLayout({ children, header }: PropsWithChildren<{ header?: string }>) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard },
        { name: 'Người dùng', href: route('users.index'), icon: Users },
        { name: 'Vai trò', href: route('roles.index'), icon: ShieldCheck },
        { name: 'Quyền hạn', href: route('permissions.index'), icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
            {/* Sidebar Overlay for Mobile */}
            {!isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
                    onClick={() => setSidebarOpen(true)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-white/5 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}>
                <div className="flex flex-col h-full">
                    {/* Brand */}
                    <div className="p-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <ShieldCheck className="text-white w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Taki Auth</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                        <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Danh mục chính</p>
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                                    route().current(item.href.replace(window.location.origin + '/', '')) 
                                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]' 
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                <span className="font-medium">{item.name}</span>
                                {route().current(item.href.replace(window.location.origin + '/', '')) && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-white/5 bg-slate-900/50 backdrop-blur-sm">
                        <div className="flex items-center gap-3 p-2 rounded-xl border border-white/5 bg-white/5">
                            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-white/10 overflow-hidden">
                                {user.image ? (
                                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon className="w-5 h-5 text-slate-400" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate">{user.name}</p>
                                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                            </div>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="mt-4 flex items-center justify-center gap-2 w-full px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors border border-transparent hover:border-red-500/20"
                        >
                            <LogOut className="w-4 h-4" />
                            Đăng xuất
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`lg:ml-72 transition-all duration-300 min-h-screen flex flex-col`}>
                {/* Header */}
                <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/5 p-4 lg:px-8">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <button 
                                onClick={() => setSidebarOpen(!isSidebarOpen)}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white lg:hidden"
                            >
                                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                            
                            <div className="relative group max-w-md w-full hidden md:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500" />
                                <input 
                                    type="text" 
                                    placeholder="Tìm kiếm..." 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="relative p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
                            </button>
                            <div className="w-px h-6 bg-white/10 mx-1" />
                            <div className="flex items-center gap-2 px-1 py-1 rounded-full cursor-pointer hover:bg-white/5 pr-3 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold ring-2 ring-blue-500/20">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-medium hidden sm:inline">{user.display_name || user.name}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-8">
                    {header && (
                        <div className="mb-8 flex items-center gap-2">
                             <Link href={route('dashboard')} className="text-sm text-slate-500 hover:text-white transition-colors">Trang chủ</Link>
                             <ChevronRight className="w-4 h-4 text-slate-700" />
                             <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-widest">{header}</h2>
                        </div>
                    )}
                    {children}
                </main>

                <footer className="p-6 text-center border-t border-white/5">
                    <p className="text-xs text-slate-600 font-medium">© 2026 Taki Auth Package by Khiemnt. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
