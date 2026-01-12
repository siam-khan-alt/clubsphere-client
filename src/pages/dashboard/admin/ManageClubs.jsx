import React from 'react';
import ClubTableRow from '../../../components/dashboard/admin/ClubTableRow'; 
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../components/shared/LoadingSpinner'
import { FiLayout, FiAlertCircle } from 'react-icons/fi';

const ManageClubs = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: clubs = [], isLoading, isFetching, isError } = useQuery({
        queryKey: ['allClubsForAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/clubs');
            return res.data;
        }
    });

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
                text: `Status updated to ${variables.newStatus.toUpperCase()}`,
                timer: 1500,
                showConfirmButton: false
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Operation Failed',
                text: error.response?.data?.message || 'Could not update club status.',
            });
        }
    });

    const handleApprove = (clubId) => updateClubStatusMutation.mutate({ clubId, newStatus: 'approved' });
    const handleReject = (clubId) => updateClubStatusMutation.mutate({ clubId, newStatus: 'rejected' });

    if (isError) return (
        <div className="p-8 text-center bg-base-100 min-h-[400px] flex flex-col items-center justify-center">
            <FiAlertCircle size={40} className="text-error mb-4" />
            <div className="text-error font-black uppercase tracking-widest">Failed to fetch clubs data.</div>
        </div>
    );
    
    const isMutating = updateClubStatusMutation.isPending;

    return (
        <div className="p-4 container mx-auto space-y-6"> 
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black flex items-center gap-3 text-base-content uppercase italic tracking-tighter">
                    <FiLayout className="text-primary" /> Manage All <span className="text-primary not-italic">Clubs</span>
                </h2>
                <div className="px-4 py-2 bg-base-200 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-base-content/60 border border-base-content/5">
                    Live Directory: {clubs.length} Units
                </div>
            </div>
            
            <div className="relative w-full max-w-[80vw] md:max-w-full bg-base-100 rounded-[32px] border border-base-content/5 shadow-2xl overflow-hidden">
                
                {(isLoading || isFetching) && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-base-100/40 backdrop-blur-md transition-all">
                        <LoadingSpinner />
                    </div>
                )}

                <div className="overflow-x-auto w-full min-h-[400px]">
                    <div className="inline-block min-w-full align-middle">
                        <table className="table w-full border-separate border-spacing-y-2 px-4">
                            <thead>
                                <tr className="border-none text-base-content/40 italic">
                                    <th className="font-black uppercase text-[10px] tracking-[0.2em] py-6">Club Identity</th>
                                    <th className="hidden lg:table-cell font-black uppercase text-[10px] tracking-[0.2em]">Authority</th>
                                    <th className="font-black uppercase text-[10px] tracking-[0.2em]">Valuation</th>
                                    <th className="font-black uppercase text-[10px] tracking-[0.2em]">Verification</th>
                                    <th className="hidden lg:table-cell font-black uppercase text-[10px] tracking-[0.2em]">Activity</th>
                                    <th className="text-right font-black uppercase text-[10px] tracking-[0.2em]">Control</th>
                                </tr>
                            </thead>
                            <tbody className="relative">
                                {clubs.map((club) => (
                                    <ClubTableRow 
                                        key={club._id}
                                        club={club}
                                        handleApprove={handleApprove}
                                        handleReject={handleReject}
                                        isMutating={isMutating}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="h-1 w-12 bg-primary rounded-full"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-base-content/30 italic">
                    ClubSphere Administrative Console v2.0
                </p>
            </div>
        </div>
    );
};

export default ManageClubs;