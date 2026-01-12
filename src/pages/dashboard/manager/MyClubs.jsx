import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { FiPlusCircle, FiLayers } from 'react-icons/fi';
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
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Your club has been deleted successfully.',
                showConfirmButton: false,
                timer: 1500
            });
        },
        onError: (error) => {
            Swal.fire('Error!', error.response?.data?.message || 'Failed to delete.', 'error');
        },
        onSettled: () => setDeletingClubId(null)
    });
    
    const handleDelete = (clubId, clubName) => {
        Swal.fire({
            title: `Delete "${clubName}"?`,
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
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

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div className="p-4 bg-error/10 text-error rounded-2xl font-black uppercase text-xs tracking-widest">Failed to fetch club data.</div>;

    return (
        <div className="p-4 container mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black flex items-center gap-3 text-base-content">
                        <FiLayers className="text-primary" /> My Managed Clubs
                    </h2>
                    <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest mt-1">Total Clubs: {myClubs.length}</p>
                </div>
                <Link 
                    to="/dashboard/manager/create-club" 
                    className="btn btn-primary rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/20"
                >
                    <FiPlusCircle size={18} /> Create New Club
                </Link>
            </div>
            
            {myClubs.length === 0 ? (
                <div className="text-center py-20 bg-base-100 rounded-2xl border border-dashed border-base-content/20">
                    <FiPlusCircle className="w-16 h-16 mx-auto text-base-content/10 mb-4" />
                    <p className="text-sm font-black uppercase tracking-widest text-base-content/40">You are not managing any clubs yet.</p>
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
        </div>
    );
};

export default MyClubs;