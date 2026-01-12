import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { FiUsers, FiUserCheck, FiTrendingUp } from 'react-icons/fi';
import MemberTable from '../../../components/dashboard/manager/MemberTable';

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
                timer: 1500
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
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, expire'
        }).then((result) => {
            if (result.isConfirmed) {
                expireMutation.mutate(memberId);
            }
        });
    };

    const { clubName, members = [] } = memberData;

    if (isLoading) return <LoadingSpinner />;

    if (isError) {
        return (
            <div className="p-4 bg-error/10 text-error rounded-2xl font-black uppercase text-xs tracking-widest">
                Failed to load member data.
            </div>
        );
    }

    return (
        <div className="p-4 space-y-8">
            <h2 className="text-2xl font-black flex items-center gap-3 text-base-content tracking-tight">
                <FiUserCheck className="text-primary" /> Members Management
            </h2>

            <div className="bg-base-100 p-8 rounded-2xl border border-base-content/5 shadow-sm relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                    <FiUsers size={120} />
                </div>
                <div className="relative z-10">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-base-content/50">Club Name</p>
                    <h1 className="text-2xl md:text-4xl font-black text-base-content mt-2 tracking-tighter">
                        {clubName || 'N/A'}
                    </h1>
                    <div className="mt-6 flex items-center gap-2">
                        <div className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-black uppercase tracking-widest">
                            {members.length} Total Members
                        </div>
                        <p className="text-xs font-bold text-base-content/40 italic">Managed by you</p>
                    </div>
                </div>
            </div>
            
            {members.length === 0 ? (
                <div className="text-center py-20 bg-base-100 rounded-3xl border border-dashed border-base-content/20 shadow-sm">
                    <FiUsers className="w-16 h-16 mx-auto text-base-content/10 mb-4" />
                    <p className="text-sm font-black uppercase tracking-widest text-base-content/40">No members have joined yet.</p>
                </div>
            ) : (
                <div className="w-full max-w-[80vw] md:max-w-full overflow-hidden bg-base-100 rounded-2xl border border-base-content/5 shadow-sm">
                    <MemberTable 
                        members={members} 
                        onExpireMember={handleExpireMember} 
                    />
                </div>
            )}
        </div>
    );
};

export default ClubMembers;