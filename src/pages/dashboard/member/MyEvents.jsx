import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { FiCalendar } from 'react-icons/fi';
import RegisteredEventsTable from '../../../components/member/RegisteredEventTable';


const MyEvents = () => {
    const axiosSecure = useAxiosSecure();

    const { data: registrations = [], isLoading, error } = useQuery({
        queryKey: ['memberEvents'],
        queryFn: async () => {
            const res = await axiosSecure.get('/member/events'); 
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500 p-4">Error loading events: {error.message}</div>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <FiCalendar className="w-6 h-6 mr-2 text-amber-600" /> My Event Registrations
            </h1>
            
            <RegisteredEventsTable registrations={registrations} />
        
        </div>
    );
};

export default MyEvents;