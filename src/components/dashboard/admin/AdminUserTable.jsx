import React from 'react';
import { FiMail, FiShield, FiUserCheck, FiTrash2 } from 'react-icons/fi';

const AdminUserTable = ({ users, handleChangeRole, handleDeleteUser }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full border-separate  border-spacing-y-2">
                <thead>
                    <tr className="border-none text-text-body/70">
                        <th className="font-black uppercase text-[10px] tracking-[0.2em] bg-transparent">User Profile</th>
                        <th className="hidden lg:table-cell font-black uppercase text-[10px] tracking-[0.2em] bg-transparent">Contact</th>
                        <th className="font-black uppercase text-[10px] tracking-[0.2em] bg-transparent">Access Level</th>
                        <th className="text-right font-black uppercase text-[10px] tracking-[0.2em] bg-transparent">Control</th>
                    </tr>
                </thead>
                <tbody className="space-y-2">
                    {users.map((user) => (
                        <tr key={user._id} className="bg-card hover:border-primary/60 transition-all group">
                            <td className="rounded-l-2xl border-y border-l border-standard/5">
                                <div className="flex items-center gap-4">
                                    <div className="avatar placeholder">
                                        <div className="bg-primary/10 text-primary rounded-xl w-12 border border-primary/20">
                                            <span className="text-xl font-black uppercase">{user.name?.slice(0, 1)}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-black text-text-heading text-sm uppercase tracking-tight">{user.name || "Anonymous"}</div>
                                        <div className="text-[10px] font-bold text-primary/60 lg:hidden">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="hidden lg:table-cell border-y border-standard/5">
                                <div className="flex items-center gap-2 font-medium text-text-body text-xs">
                                    <FiMail className="text-primary/40" /> {user.email}
                                </div>
                            </td>
                            <td className="border-y border-standard/5">
                                <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg border shadow-sm ${
                                    user.role === "admin" 
                                    ? "bg-secondary/10 text-secondary border-secondary/20" 
                                    : user.role === "clubManager"
                                    ? "bg-primary/10 text-primary border-primary/20"
                                    : "bg-slate-100 text-slate-500 border-slate-200"
                                }`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="rounded-r-2xl border-y border-r border-standard/5 text-right">
                                <div className="dropdown dropdown-left dropdown-end">
                                    <button tabIndex={0} className="btn btn-ghost btn-sm text-primary hover:bg-primary/10 rounded-xl">
                                        <FiShield size={18} />
                                    </button>
                                    <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow-2xl bg-card border border-standard/20 rounded-2xl w-52 overflow-hidden">
                                        <div className="px-4 py-2 text-[9px] font-black uppercase text-text-body/40 tracking-widest">Assign Authority</div>
                                        {user.role !== "admin" && (
                                            <li><button onClick={() => handleChangeRole(user, "admin")} className="flex items-center gap-3 py-3 text-xs font-bold hover:bg-secondary/10 hover:text-secondary"><FiShield /> Promote to Admin</button></li>
                                        )}
                                        {user.role !== "clubManager" && user.role !== "admin" && (
                                            <li><button onClick={() => handleChangeRole(user, "clubManager")} className="flex items-center gap-3 py-3 text-xs font-bold hover:bg-primary/10 hover:text-primary"><FiUserCheck /> Make Club Manager</button></li>
                                        )}
                                        <div className="divider my-0 opacity-5"></div>
                                        <li><button onClick={() => handleDeleteUser(user)} className="text-error flex items-center gap-3 py-3 text-xs font-bold hover:bg-error/10"><FiTrash2 /> Terminate User</button></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUserTable;