import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Key, Plus, Search, Trash2, Edit3, Grid, Filter, Info, ShieldCheck, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function PermissionsIndex({ permissions }: { permissions: any[] }) {
    const [search, setSearch] = useState('');

    const mockPermissions = [
        { id: 1, name: 'view dashboard', guard_name: 'taki-auth', created_at: '2024-03-24' },
        { id: 2, name: 'manage users', guard_name: 'taki-auth', created_at: '2024-03-25' },
        { id: 3, name: 'manage roles', guard_name: 'taki-auth', created_at: '2024-03-26' },
        { id: 4, name: 'edit posts', guard_name: 'web', created_at: '2024-03-27' },
        { id: 5, name: 'delete comments', guard_name: 'web', created_at: '2024-03-28' },
    ];

    const displayPermissions = permissions || mockPermissions;

    return (
        <AuthenticatedLayout header="Danh sách Quyền hạn">
            <Head title="Quyền hạn" />

            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-sm group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500" />
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm quyền hạn..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-900 border border-white/5 rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                         <button className="p-2.5 rounded-xl border border-white/5 bg-slate-900 text-slate-400 hover:text-white transition-colors">
                            <Filter className="w-5 h-5" />
                        </button>
                        <button className="bg-gradient-to-tr from-blue-600 to-blue-500 text-white px-5 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2 hover:shadow-[0_10px_30px_rgba(37,99,235,0.2)] active:scale-95 transition-all">
                            <Plus className="w-5 h-5" />
                            Thêm quyền mới
                        </button>
                    </div>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[32px] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest uppercase">ID</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest uppercase">Tên quyền hạn</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest uppercase">Guard</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest uppercase">Ngày tạo</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-bold text-slate-500 uppercase tracking-widest uppercase">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {displayPermissions.map((permission) => (
                                    <tr key={permission.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-bold text-slate-600">#{permission.id}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center p-2 group-hover:bg-blue-600 transition-all">
                                                    <Key className="text-blue-500 w-full h-full group-hover:text-white" />
                                                </div>
                                                <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{permission.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-800 border border-white/10 text-slate-400">
                                                {permission.guard_name}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs text-slate-500 font-medium">{permission.created_at}</span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 rounded-xl bg-white/5 text-amber-500 hover:bg-amber-500/10 transition-colors border border-transparent hover:border-amber-500/20">
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 rounded-xl bg-white/5 text-red-500 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4">
                    <p className="text-xs text-slate-500 font-medium">Hiển thị {displayPermissions.length} quyền hạn trên hệ thống.</p>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-bold opacity-50 cursor-not-allowed">Trước</button>
                        <div className="flex gap-1">
                            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-bold leading-8 text-center ring-4 ring-blue-600/20">1</button>
                            <button className="w-8 h-8 rounded-lg bg-white/5 text-slate-400 text-xs font-bold leading-8 text-center hover:bg-white/10">2</button>
                        </div>
                        <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-bold hover:bg-white/10 transition-colors">Tiếp</button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
