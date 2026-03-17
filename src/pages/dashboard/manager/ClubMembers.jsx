import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FiUsers } from 'react-icons/fi';
import MemberTable from '../../../components/dashboard/manager/MemberTable';
import DashboardHeader from '../../../components/shared/ui/DashboardHeader';
import ClubMembersSkeleton from '../../../components/shared/skeletons/manager/ClubMembersSkeleton';

const ClubMembers = () => {
    const { clubId } = useParams();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: memberData = {}, isLoading, isError } = useQuery({
        queryKey: ['clubMembers', clubId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/manager/clubs/${clubId}/members`);
            return res.data;
        },
        enabled: !!clubId,
    });

    const expireMutation = useMutation({
        mutationFn: async (memberId) => {
            return axiosSecure.patch(`/manager/memberships/${memberId}`, { status: 'expired' });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clubMembers', clubId] });
            Swal.fire({
                icon: 'success',
                title: 'Membership Expired',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: "rounded-2xl border-standard bg-card",
                }
            });
        },
        onError: (error) => {
            Swal.fire('Error!', error.response?.data?.message || 'Failed to update.', 'error');
        }
    });

    const handleExpireMember = (memberId) => {
        Swal.fire({
            title: 'Set as Expired?',
            text: "This will restrict the member's access!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, expire',
            customClass: {
                popup: "rounded-2xl border-standard bg-card",
                confirmButton: "btn-primary-gradient",
            }
        }).then((result) => {
            if (result.isConfirmed) {
                expireMutation.mutate(memberId);
            }
        });
    };

    const { clubName, members = [] } = memberData;

   if (isLoading) {
        const dynamicRows = members.length > 0 ? members.length : 5;
        return <ClubMembersSkeleton rowCount={dynamicRows} />;
    }

    if (isError) {
        return (
            <div className="m-4 p-6 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-black uppercase text-xs tracking-widest text-center">
                Failed to load member data. Please try again.
            </div>
        );
    }

    return (
        <div className="pb-10 animate-in fade-in duration-700">
            {/* Custom Dashboard Header */}
            <DashboardHeader 
                title="Members Management"
                description="Monitor and manage all active memberships for your club."
                badgeText="Manager"
            />

            <div className="container mx-auto mt-8 space-y-6">
                {/* Club Identity Card */}
                <div className="bg-card border-standard p-8 rounded-2xl relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
                    <div className="absolute right-[-20px] top-[-20px] opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-transform duration-700 text-text-heading">
                        <FiUsers size={200} />
                    </div>
                    
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                            Active Club
                        </p>
                        <h1 className="text-3xl md:text-4xl font-black text-text-heading mt-2 tracking-tighter">
                            {clubName || 'Club Directory'}
                        </h1>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <div className="px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                {members.length} Total Members
                            </div>
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                            <p className="text-xs font-bold text-text-body/60 italic">
                                Authorized Personnel Only
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                {members.length === 0 ? (
                    <div className="text-center py-20 bg-card border-standard border-dashed rounded-3xl">
                        <div className="w-20 h-20 mx-auto bg-slate-100 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                            <FiUsers className="w-10 h-10 text-text-body/20" />
                        </div>
                        <p className="text-sm font-black uppercase tracking-widest text-text-body/40">
                            No members found in this club
                        </p>
                    </div>
                ) : (
                    <div className=" w-full max-w-[80vw] md:max-w-full overflow-hidden rounded-2xl bg-card border-standard shadow-sm">
                            <MemberTable 
                                members={members} 
                                onExpireMember={handleExpireMember} 
                            />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClubMembers;