import React, { useState, useMemo } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { FiLayers, FiSearch, FiFilter, FiCheck, FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ClubCard from '../../../components/dashboard/manager/ClubCard';
import UpdateClubModal from '../../../components/dashboard/manager/UpdateClubModal';
import DashboardHeader from '../../../components/shared/ui/DashboardHeader';
import { useNavigate } from 'react-router-dom';
import MyClubsSkeleton from '../../../components/shared/skeletons/manager/MyClubsSkeleton';

const MyClubs = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    // UI States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClub, setSelectedClub] = useState(null);
    const [deletingClubId, setDeletingClubId] = useState(null); 
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const sortOptions = [
        { label: "Newest Created", value: "newest" },
        { label: "Oldest First", value: "oldest" },
        { label: "Name A-Z", value: "alphabetical" }
    ];

    // Data Fetching
    const { data: myClubs = [], isLoading, isError } = useQuery({
        queryKey: ['myClubsForManager'],
        queryFn: async () => {
            const res = await axiosSecure.get('/manager/clubs'); 
            return res.data;
        }
    });

    // Delete Mutation
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

    // Filtering & Sorting Logic
    const filteredClubs = useMemo(() => {
        let result = myClubs.filter(club => 
            club.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            club.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortBy === "newest") result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        else if (sortBy === "oldest") result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        else if (sortBy === "alphabetical") result.sort((a, b) => a.clubName.localeCompare(b.clubName));

        return result;
    }, [myClubs, searchTerm, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredClubs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedClubs = filteredClubs.slice(startIndex, startIndex + itemsPerPage);

    // Handlers
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

    if (isLoading) return <MyClubsSkeleton />;
    if (isError) return <div className="p-4 bg-error/10 text-error rounded-2xl font-black uppercase text-xs tracking-widest">Failed to fetch club data.</div>;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* --- Reusable Header Section --- */}
            <DashboardHeader 
                title="My Managed Clubs"
                description={
                    <p>
                        You are currently overseeing <span className="text-secondary font-bold">{myClubs.length} professional</span> clubs in your jurisdiction.
                    </p>
                }
                buttonText="Create New Club"
                buttonLink="/dashboard/manager/create-club"
                badgeText="Manager Workspace"
                showSmile={true}
            />

            {/* --- Filter & Search Bar --- */}
            <div className="flex flex-col md:flex-row items-center gap-4 sticky top-0 z-30 py-4 bg-background/80 backdrop-blur-md">
                <div className="relative flex-1 w-full group">
                    <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-primary opacity-50 group-focus-within:opacity-100 transition-opacity" />
                    <input 
                        type="text" 
                        placeholder="Search by club name or category..." 
                        className="input-field-custom w-full pl-12 shadow-sm"
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                
                {/* Custom Sort Dropdown */}
                <div className="relative w-full md:w-auto">
                    <button 
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="w-full md:w-[220px] flex items-center justify-between bg-card border-standard px-5 py-3.5 rounded-2xl font-bold text-text-heading hover:border-primary transition-all shadow-sm active:scale-95"
                    >
                        <div className="flex items-center gap-2">
                            <FiFilter className="text-secondary" />
                            <span className="text-sm">{sortOptions.find(opt => opt.value === sortBy)?.label}</span>
                        </div>
                        <FiChevronDown className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isSortOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)}></div>
                            <div className="absolute right-0 mt-3 w-full md:w-64 bg-card border-standard rounded-[1.5rem] shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="p-2 space-y-1">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setSortBy(option.value);
                                                setIsSortOpen(false);
                                                setCurrentPage(1);
                                            }}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                                                sortBy === option.value 
                                                ? 'bg-primary/10 text-primary' 
                                                : 'text-text-body hover:bg-background hover:text-text-heading'
                                            }`}
                                        >
                                            {option.label}
                                            {sortBy === option.value && <FiCheck className="text-primary" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* --- Grid Content --- */}
            {paginatedClubs.length === 0 ? (
                <div className="text-center py-24 bg-card border-standard border-dashed rounded-[3rem] space-y-4">
                    <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center mx-auto text-primary/20">
                        <FiLayers size={48} />
                    </div>
                    <h3 className="!mb-0 !text-xl font-black text-text-heading">No Clubs Found</h3>
                    <p className="text-text-body opacity-60">Try adjusting your search filters or create a new club.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {paginatedClubs.map((club) => (
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

            {/* --- Pagination --- */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-10">
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-4 rounded-2xl bg-card border-standard hover:border-primary text-text-heading transition-all disabled:opacity-20 group"
                    >
                        <FiChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <div className="hidden sm:flex items-center gap-2 bg-card border-standard p-1.5 rounded-2xl shadow-sm">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`w-11 h-11 rounded-xl font-black transition-all duration-300 ${
                                    currentPage === index + 1 
                                    ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20 scale-105' 
                                    : 'hover:bg-background text-text-body'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-4 rounded-2xl bg-card border-standard hover:border-primary text-text-heading transition-all disabled:opacity-20 group"
                    >
                        <FiChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            )}
            
            {/* --- Modals --- */}
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