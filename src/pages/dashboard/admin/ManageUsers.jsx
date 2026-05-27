import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FiActivity, FiClock } from "react-icons/fi";
import DashboardHeader from "../../../components/shared/ui/DashboardHeader";
import AdminUserTable from "../../../components/dashboard/admin/AdminUserTable";
import ManageUsersSkeleton from "../../../components/shared/skeletons/admin/ManageUsersSkeleton";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('all');

  // Fetching Users
  const { data: users = [], isLoading, isFetching } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  // Filter Logic
  const filteredUsers = users.filter(user => {
    if (activeTab === 'all') return true;
    return user.role === activeTab;
  });

  // Role Update Mutation
  const { mutateAsync: updateRoleMutate } = useMutation({
    mutationFn: async ({ email, role }) => {
      const res = await axiosSecure.patch(`/admin/users/role/${email}`, { role });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminUsers"]);
      Swal.fire({ 
        icon: "success", 
        title: "Updated!", 
        background: 'var(--color-card)', 
        color: 'var(--color-text-heading)', 
        showConfirmButton: false, 
        timer: 1500 
      });
    },
  });

  // Delete User Mutation
  const { mutateAsync: deleteUserMutate } = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.delete(`/admin/users/${email}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminUsers"]);
      Swal.fire({ 
        icon: "success", 
        title: "Removed!", 
        background: 'var(--color-card)', 
        color: 'var(--color-text-heading)', 
        showConfirmButton: false, 
        timer: 1500 
      });
    },
  });

  const handleChangeRole = (user, newRole) => {
    Swal.fire({
      title: 'Modify Permissions?',
      text: `Grant ${newRole.toUpperCase()} access to ${user.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-primary)',
      cancelButtonColor: '#ef4444',
      background: 'var(--color-card)',
      color: 'var(--color-text-heading)',
    }).then(async (result) => {
      if (result.isConfirmed) await updateRoleMutate({ email: user.email, role: newRole });
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: 'Remove User?',
      text: "This action will permanently revoke all access!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      background: 'var(--color-card)',
      color: 'var(--color-text-heading)',
    }).then(async (result) => {
      if (result.isConfirmed) await deleteUserMutate(user.email);
    });
  };

  if (isLoading) return <ManageUsersSkeleton />;

  return (
    <div className="space-y-6 md:space-y-10 pb-10">
      <DashboardHeader 
        title="User Management"
        description="Oversee system access levels. Manage roles for administrators, managers, and general members."
        badgeText="Core Authority"
      />

      {/* Tab & Info Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-primary/50 pb-6">
        <div className="flex flex-wrap justify-center gap-2 bg-card border-standard p-1.5 rounded-2xl w-full lg:w-auto">
          {['all', 'admin', 'clubManager', 'member'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 lg:flex-none px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-body opacity-50 hover:opacity-100 hover:bg-background'
              }`}
            >
              {tab === 'clubManager' ? 'Managers' : tab === 'member' ? 'Members' : tab}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3 px-6 py-3 bg-card border-standard rounded-2xl w-full lg:w-auto shadow-sm">
          <FiActivity className="text-secondary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-text-heading">
            {activeTab} Population: {filteredUsers.length} Units
          </span>
        </div>
      </div>

      {/* Table Area */}
      <div className="relative">
        {isFetching ? (
          <div className="w-full space-y-4 p-6 bg-card border-standard rounded-2xl">
              {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-16 w-full bg-slate-100 dark:bg-slate-800/40 rounded-xl animate-pulse"></div>
              ))}
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="w-full max-w-[85vw] border-standard md:max-w-full rounded-2xl px-2">
             <AdminUserTable 
                users={filteredUsers} 
                handleChangeRole={handleChangeRole} 
                handleDeleteUser={handleDeleteUser} 
             />
          </div>
        ) : (
          <div className="bg-card border-standard rounded-2xl py-32 text-center flex flex-col items-center shadow-sm">
            <FiClock className="text-primary opacity-20 mb-6" size={50} />
            <p className="text-text-heading font-black uppercase tracking-[0.4em] text-xs opacity-40">No records in this sector</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;