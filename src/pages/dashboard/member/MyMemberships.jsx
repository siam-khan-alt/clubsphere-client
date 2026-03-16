import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight, FiChevronDown, FiCheck } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import MemberClubCard from '../../../components/member/MemberClubCard';
import { MyMembershipsSkeleton } from '../../../components/shared/skeletons/user/membership/MyMembershipsSkeleton';
import DashboardHeader from '../../../components/shared/ui/DashboardHeader';

const MyMemberships = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const sortOptions = [
        { label: "Newest Joined", value: "newest" },
        { label: "Oldest First", value: "oldest" },
        { label: "Name A-Z", value: "alphabetical" }
    ];

    const { data: memberships = [], isLoading } = useQuery({
        queryKey: ['memberClubs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/member/clubs');
            return res.data;
        }
    });

    const filteredMemberships = useMemo(() => {
        let result = memberships.filter(m => 
            m.clubDetails?.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.clubDetails?.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortBy === "newest") result.sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt));
        else if (sortBy === "oldest") result.sort((a, b) => new Date(a.joinedAt) - new Date(b.joinedAt));
        else if (sortBy === "alphabetical") result.sort((a, b) => a.clubDetails.clubName.localeCompare(b.clubDetails.clubName));

        return result;
    }, [memberships, searchTerm, sortBy]);

    const totalPages = Math.ceil(filteredMemberships.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filteredMemberships.slice(startIndex, startIndex + itemsPerPage);

    if (isLoading) return <MyMembershipsSkeleton />;
    
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* --- Reusable Header Section --- */}
            <DashboardHeader 
                title="My Memberships"
                description={
                    <p>
                        Manage and explore your <span className="text-secondary font-bold">{memberships.length} active</span> club connections.
                    </p>
                }
                buttonText="Explore New Clubs"
                buttonLink="/clubs"
                badgeText="Member Workspace"
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
                
                {/* --- Custom Selection UI --- */}
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
            {paginatedItems.length === 0 ? (
                <div className="text-center py-24 bg-card border-standard border-dashed rounded-[3rem] space-y-4">
                    <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center mx-auto text-primary/20">
                        <FiSearch size={48} />
                    </div>
                    <h3 className="!mb-0 !text-xl font-black text-text-heading">No Results Found</h3>
                    <p className="text-text-body opacity-60">Try searching for something else.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-10">
                    {paginatedItems.map((membership) => (
                        <MemberClubCard key={membership._id} membership={membership} />
                    ))}
                </div>
            )}

            {/* --- Pagination --- */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-6 border-t border-standard">
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
        </div>
    );
};

export default MyMemberships;