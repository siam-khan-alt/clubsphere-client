import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { FiUsers } from 'react-icons/fi';
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
            Swal.fire('Updated!', 'Membership status set to expired.', 'success');
        },
        onError: (error) => {
            Swal.fire('Error!', error.response?.data?.message || 'Failed to update membership.', 'error');
        }
    });

    const handleExpireMember = (memberId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to manually set this membership as expired?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, expire it!'
        }).then((result) => {
            if (result.isConfirmed) {
                expireMutation.mutate(memberId);
            }
        });
    };

    const { clubName, members = [] } = memberData;

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div className="text-center p-10 text-red-600">Failed to load member data.</div>;
    }

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className=" mb-2">Club Members Management</h2>
            <h4 className="text-xl text-indigo-600 mb-6 border-b pb-2">Club: {clubName || 'N/A'} ({members.length} Members)</h4>
            
            {members.length === 0 ? (
                <div className="text-center p-16 border-2 border-dashed border-gray-300 rounded-lg bg-white shadow-sm">
                    <FiUsers className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                    <p className="text-xl font-semibold text-gray-700">No members have joined this club yet.</p>
                </div>
            ) : (<div className='overflow-x-auto max-w-64 md:max-w-2xl lg:max-w-3xl'>
                <MemberTable 
                    members={members} 
                    onExpireMember={handleExpireMember} 
                /></div>
            )}
        </div>
    );
};

export default ClubMembers;




