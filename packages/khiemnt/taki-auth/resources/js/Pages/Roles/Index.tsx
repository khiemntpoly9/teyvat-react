import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { ShieldAlert, ShieldCheck, MoreVertical, Plus, Search, Edit3, Trash2, Key, Users, Info, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export default function RolesIndex({ roles }: { roles: any[] }) {
    const [search, setSearch] = useState('');

    const mockRoles = [
        { id: 1, name: 'super-admin', permissions_count: 45, users_count: 2, description: 'Toàn quyền truy cập hệ thống' },
        { id: 2, name: 'admin', permissions_count: 28, users_count: 5, description: 'Quản trị viên thông thường' },
        { id: 3, name: 'editor', permissions_count: 12, users_count: 8, description: 'Quản lý nội dung và bài viết' },
        { id: 4, name: 'user', permissions_count: 2, users_count: 1240, description: 'Người dùng cuối mặc định' },
    ];

    const displayRoles = roles || mockRoles;

    return (
        <AuthenticatedLayout header="Quản lý Vai trò">
            <Head title="Vai trò" />

            <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-sm group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500" />
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm vai trò..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-900 border border-white/5 rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                    <button className="bg-linear-to-tr from-blue-600 to-blue-500 text-white px-5 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2 hover:shadow-[0_10px_30px_rgba(37,99,235,0.2)] active:scale-95 transition-all">
                        <Plus className="w-5 h-5" />
                        Tạo vai trò mới
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {displayRoles.map((role) => (
                        <div key={role.id} className="group bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-[32px] overflow-hidden hover:bg-slate-900 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-blue-600/20 to-purple-600/20 border border-blue-500/20 flex items-center justify-center p-3 group-hover:scale-110 transition-transform">
                                        <ShieldCheck className="text-blue-400 w-full h-full" />
                                    </div>
                                    <button className="p-2 -mr-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-colors">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-white tracking-tight">{role.name}</h3>
                                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{role.description || 'Chưa có mô tả chi tiết cho vai trò này.'}</p>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Quyền hạn</span>
                                            <span className="text-lg font-bold text-slate-200">{role.permissions_count}</span>
                                        </div>
                                        <div className="w-px h-8 bg-white/5 self-end mb-1" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Người dùng</span>
                                            <span className="text-lg font-bold text-slate-200">{role.users_count}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 flex items-center justify-between gap-3">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-7 h-7 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[10px] text-slate-400 font-bold overflow-hidden ring-1 ring-white/5">
                                                {i === 3 ? '+' + (role.users_count - 2) : <Users className="w-3 h-3" />}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1.5 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <button className="p-2 rounded-xl bg-white/5 text-amber-500 hover:bg-amber-500/10 transition-colors border border-transparent hover:border-amber-500/20" title="Chỉnh sửa">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 rounded-xl bg-white/5 text-blue-500 hover:bg-blue-500/10 transition-colors border border-transparent hover:border-blue-500/20" title="Quyền hạn">
                                            <Key className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 rounded-xl bg-white/5 text-red-500 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20" title="Xoá">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-linear-to-r from-blue-900/20 to-slate-900 border border-blue-500/10 p-6 rounded-[32px] flex flex-col md:flex-row items-center gap-6 justify-between mt-12 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-600/5 blur-[80px] -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 ring-4 ring-blue-500/10">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold">Bạn cần hỗ trợ phân quyền?</h4>
                            <p className="text-sm text-slate-500">Mọi vai trò và quyền hạn được lưu trữ tập trung theo chuẩn Spatie Permission.</p>
                        </div>
                    </div>
                    <button className="bg-white/10 hover:bg-white text-white hover:text-blue-600 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all relative z-10 flex items-center gap-2 group/btn">
                        Xem tài liệu hướng dẫn
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
