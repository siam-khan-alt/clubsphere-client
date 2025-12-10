import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { FiPlusCircle } from 'react-icons/fi';
import ClubCard from '../../../components/dashboard/manager/ClubCard';
import UpdateClubModal from '../../../components/dashboard/manager/UpdateClubModal';
import { Link, useNavigate } from 'react-router-dom';

const MyClubs = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClub, setSelectedClub] = useState(null);
    const [deletingClubId, setDeletingClubId] = useState(null); 

    const { data: myClubs = [], isLoading, isError } = useQuery({
        queryKey: ['myClubsForManager'],
        queryFn: async () => {
            const res = await axiosSecure.get('/manager/clubs'); 
            return res.data;
        }
    });

    const deleteClubMutation = useMutation({
        mutationFn: async (clubId) => {
            setDeletingClubId(clubId);
            return axiosSecure.delete(`/clubs/${clubId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myClubsForManager'] });
            Swal.fire('Deleted!', 'Your club has been deleted successfully.', 'success');
        },
        onError: (error) => {
            console.error(error);
            Swal.fire('Error!', error.response?.data?.message || 'Failed to delete the club.', 'error');
        },
        onSettled: () => {
             setDeletingClubId(null); 
        }
    });
    
    const handleDelete = (clubId, clubName) => {
        Swal.fire({
            title: `Are you sure you want to delete "${clubName}"?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteClubMutation.mutate(clubId);
            }
        });
    };
    
    const handleEdit = (club) => {
        setSelectedClub(club);
        setIsModalOpen(true);
    };
    const handleViewMembers = (clubId) => {
        navigate(`/dashboard/clubManager/members/${clubId}/`);
    };


    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div className="text-center p-10 text-red-600">Failed to fetch club data.</div>;
    }

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Managed Clubs</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Clubs List ({myClubs.length})</h2>
            
            {myClubs.length === 0 ? (
                <div className="text-center p-16 border-2 border-dashed border-gray-300 rounded-lg bg-white shadow-sm">
                    <FiPlusCircle className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                    <p className="text-xl font-semibold text-gray-700">You are not managing any clubs yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {myClubs.map((club) => (
                        <ClubCard 
                            key={club._id}
                            club={club}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            onViewMembers={handleViewMembers}
                            isDeleting={deletingClubId === club._id}
                        />
                    ))}
                </div>
            )}
            
            {isModalOpen && selectedClub && (
                <UpdateClubModal 
                    club={selectedClub} 
                    onClose={() => setIsModalOpen(false)}
                />
            )}
             <div className="mt-5 flex justify-end">
                <Link 
                    to="/dashboard/manager/create-club" 
                    className="flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                >
                    <FiPlusCircle className="w-5 h-5 mr-2" /> Create New Club
                </Link>
            </div>

        </div>
    );
};

export default MyClubs;


