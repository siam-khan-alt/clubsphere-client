import React from 'react';
import ClubTableRow from '../../../components/dashboard/admin/ClubTableRow'; 
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../components/shared/LoadingSpinner'

const ManageClubs = () => {
 
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: clubs = [], isLoading, isError } = useQuery({
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

                
            });
        },
        onError: (error) => {
            console.error("Status Update Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Operation Failed',
                text: error.response?.data?.message || 'Could not update club status.',
            });
        }
    });

    const handleApprove = (clubId) => {
       updateClubStatusMutation.mutate({ clubId, newStatus: 'approved' });
    };

    const handleReject = (clubId) => {updateClubStatusMutation.mutate({ clubId, newStatus: 'rejected' });
    };

    if (isLoading) {
        return <LoadingSpinner/>
    }

    if (isError) {
        return <div className="text-center p-10 text-red-600">Failed to fetch clubs data.</div>;
    }
    
    const isMutating = updateClubStatusMutation.isPending;

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden"> 
            
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage All Clubs 🏢</h1>
            
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Club Name
                            </th>
                            <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Manager Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fee
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Basic Stats
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
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
            
            <div className="mt-4 text-sm text-gray-600">
                Total clubs shown: {clubs.length}
            </div>
        </div>
    );
};

export default ManageClubs;


