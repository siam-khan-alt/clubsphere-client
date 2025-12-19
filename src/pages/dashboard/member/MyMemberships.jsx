import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { FiUsers } from 'react-icons/fi';
import MemberClubCard from '../../../components/member/MemberClubCard';
import { Link } from 'react-router-dom';



const MyClubs = () => {
    const axiosSecure = useAxiosSecure();
    const { data: clubs = [], isLoading, error } = useQuery({
        queryKey: ['memberClubs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/member/clubs'); 
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500 p-4">Error loading clubs: {error.message}</div>;

    return (
        <div className="p-4">
            <h2 className=" mb-6 flex items-center">
                <FiUsers className="w-6 h-6 mr-2 text-indigo-600" /> My Clubs & Memberships
            </h2>
            
            {clubs.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500 text-lg">You haven't joined any clubs yet.</p>
                    <Link to="/clubs" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
                        Explore Clubs &rarr;
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

export default MyClubs;