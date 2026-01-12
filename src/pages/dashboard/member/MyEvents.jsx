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
    if (error) return <div className="text-error p-4 bg-error/10 rounded-2xl font-bold">Error loading events: {error.message}</div>;

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3 text-base-content">
                <FiCalendar className="text-amber-500" /> My Event Registrations
            </h2>

            <div className="w-full max-w-[80vw] md:max-w-full overflow-hidden bg-base-100 mx-auto rounded-2xl border border-base-content/5 shadow-sm transition-all duration-300">
                <div className="overflow-x-auto w-full">
                    <div className="inline-block min-w-full align-middle">
                        <RegisteredEventsTable registrations={registrations} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyEvents;