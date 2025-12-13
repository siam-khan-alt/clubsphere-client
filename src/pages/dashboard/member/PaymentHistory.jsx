import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { FiCreditCard } from 'react-icons/fi';
import PaymentHistoryTable from '../../../components/member/PaymentHistoryTable';


const PaymentHistory = () => {
     const axiosSecure = useAxiosSecure();
    
    const { data: payments = [], isLoading, error } = useQuery({
        queryKey: ['memberPaymentHistory'],
        queryFn: async () => {
            const res = await axiosSecure.get('/member/payments'); 
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500 p-4">Error loading payment history: {error.message}</div>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <FiCreditCard className="w-6 h-6 mr-2 text-blue-600" /> Payment History
            </h1>
            
            <PaymentHistoryTable payments={payments} />
        </div>
    );
};

export default PaymentHistory;