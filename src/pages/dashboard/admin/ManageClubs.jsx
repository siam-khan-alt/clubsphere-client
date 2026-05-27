import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FiClock, FiXCircle, FiActivity } from 'react-icons/fi';
import DashboardHeader from '../../../components/shared/ui/DashboardHeader';
import AdminClubTable from '../../../components/dashboard/admin/AdminClubTable';
import ManageClubsSkeleton from '../../../components/shared/skeletons/admin/ManageClubsSkeleton';

const ManageClubs = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState('pending');

    const { data: clubs = [], isLoading, isFetching, isError } = useQuery({
        queryKey: ['allClubsForAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/clubs');
            return res.data;
        }
    });

    const filteredClubs = clubs.filter(club => club.status.toLowerCase() === activeTab);

    const updateClubStatusMutation = useMutation({
        mutationFn: async ({ clubId, newStatus }) => {
            const res = await axiosSecure.patch(`/admin/clubs/status/${clubId}`, { status: newStatus });
            return res.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['allClubsForAdmin']);
            Swal.fire({
                icon: 'success',
                title: `Club ${variables.newStatus === 'approved' ? 'Approved' : 'Rejected'}!`,
                background: 'var(--color-card)',
                color: 'var(--color-text-heading)',
                confirmButtonColor: 'var(--color-primary)',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });

    const deleteClubMutation = useMutation({
        mutationFn: async (clubId) => {
            const res = await axiosSecure.delete(`/admin/clubs/${clubId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['allClubsForAdmin']);
            Swal.fire({
                icon: 'success',
                title: 'Club Deleted!',
                background: 'var(--color-card)',
                color: 'var(--color-text-heading)',
                confirmButtonColor: 'var(--color-primary)',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });

    const handleApprove = (clubId) => updateClubStatusMutation.mutate({ clubId, newStatus: 'approved' });
    const handleReject = (clubId) => updateClubStatusMutation.mutate({ clubId, newStatus: 'rejected' });
    const handleDelete = (clubId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the club and all its data.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#0284c7',
            confirmButtonText: 'Yes, delete it!',
            background: 'var(--color-card)',
            color: 'var(--color-text-heading)'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteClubMutation.mutate(clubId);
            }
        });
    };

    if (isError) return (
        <div className="p-8 text-center min-h-[400px] flex flex-col items-center justify-center bg-card rounded-3xl border-standard">
            <FiXCircle size={40} className="text-secondary mb-4" />
            <div className="text-text-heading font-black uppercase tracking-widest">Connection lost. Failed to fetch data.</div>
        </div>
    );

    if (isLoading) return <ManageClubsSkeleton />;
    return (
        <div className="space-y-6 md:space-y-10 pb-10">
            <DashboardHeader 
                title="Club Directory"
                description="Monitor and manage all campus clubs. Review pending registration requests."
                badgeText="Administrative Node"
                showSmile={false}
            />

            {/* Tab Bar Section */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-standard/20 pb-6">
                <div className="flex flex-wrap justify-center gap-2 bg-card border-standard p-1.5 rounded-2xl w-full lg:w-auto">
                    {['pending', 'approved', 'rejected'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 lg:flex-none px-6 md:px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                                activeTab === tab 
                                ? 'bg-primary text-white shadow-lg' 
                                : 'text-text-body opacity-50 hover:opacity-100 hover:bg-background'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-3 px-6 py-3 bg-card border-standard rounded-2xl w-full lg:w-auto shadow-sm">
                    <FiActivity className="text-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-heading">
                        Total {activeTab}: {clubs.filter(c => c.status.toLowerCase() === activeTab).length} Units
                    </span>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative">
                {isFetching ? (
                    /* Tab change-er somoy shudhu table skeleton */
                    <div className="w-full overflow-hidden rounded-2xl bg-card border-standard shadow-sm p-6 space-y-4">
                         {[1, 2, 3].map((i) => (
                             <div key={i} className="h-20 w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl animate-pulse"></div>
                         ))}
                    </div>
                ) : filteredClubs.length > 0 ? (
                    <div className="w-full max-w-[85vw] md:max-w-full overflow-hidden rounded-2xl bg-card border-standard shadow-sm">
                        <AdminClubTable 
                            clubs={filteredClubs} 
                            handleApprove={handleApprove} 
                            handleReject={handleReject}
                            handleDelete={handleDelete}
                            isMutating={updateClubStatusMutation.isPending || deleteClubMutation.isPending}
                        />
                    </div>
                ) : (
                    /* No Data State */
                    <div className="bg-card border-standard rounded-2xl py-32 text-center flex flex-col items-center shadow-sm">
                        <div className="h-20 w-20 bg-background rounded-full flex items-center justify-center mb-6">
                            <FiClock className="text-primary opacity-20" size={40} />
                        </div>
                        <p className="text-text-heading font-black uppercase tracking-[0.4em] text-xs">No {activeTab} records found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageClubs;