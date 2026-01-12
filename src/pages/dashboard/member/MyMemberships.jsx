import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { FiUsers, FiSearch } from 'react-icons/fi';
import MemberClubCard from '../../../components/member/MemberClubCard';
import { Link } from 'react-router-dom';

const MyMemberships = () => {
    const axiosSecure = useAxiosSecure();
    const { data: clubs = [], isLoading, error } = useQuery({
        queryKey: ['memberClubs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/member/clubs'); 
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="text-error p-4 bg-error/10 rounded-2xl font-bold">Error loading clubs: {error.message}</div>;

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3 text-base-content">
                <FiUsers className="text-indigo-500" /> My Clubs & Memberships
            </h2>
            
            {clubs.length === 0 ? (
                <div className="text-center py-20 bg-base-100 rounded-2xl border border-dashed border-base-content/20 shadow-sm">
                    <FiSearch className="mx-auto text-5xl text-base-content/20 mb-4" />
                    <p className="text-base-content/50 text-lg font-bold">You haven't joined any clubs yet.</p>
                    <Link to="/clubs" className="btn btn-primary btn-sm mt-6 rounded-2xl px-8 font-bold">
                        Explore Clubs
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clubs.map((club) => (
                        <MemberClubCard key={club._id} club={club} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyMemberships;