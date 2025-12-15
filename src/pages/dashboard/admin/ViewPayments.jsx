import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { FiDollarSign, FiCreditCard } from 'react-icons/fi';
import AdminPaymentHistoryTable from '../../../components/dashboard/admin/AdminPaymentHistoyTable';


const ViewPayments = () => {
    const axiosSecure = useAxiosSecure();
    const { data: payments = [], isLoading, error } = useQuery({
        queryKey: ['adminAllPayments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/payments'); 
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500 p-4">Error loading payments: {error.message}</div>;

    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

    return (
        <div className="p-4">
            <h2 className=" mb-6 flex items-center">
                <FiCreditCard className="w-6 h-6 mr-2 text-[#7C3AED]" /> Platform Payment Overview
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border-l-4 border-[#7C3AED]">
                <p className="text-lg font-medium text-gray-600">Total Revenue Generated</p>
                <p className="text-4xl font-extrabold text-[#7C3AED] mt-1 flex items-center">
                    <FiDollarSign className="w-6 h-6" /> {totalRevenue.toFixed(2)} USD
                </p>
                <p className="text-sm text-gray-500 mt-2">{payments.length} total transactions recorded.</p>
            </div>
            <div className='overflow-x-auto max-w-64 md:max-w-2xl lg:max-w-3xl'>
            <AdminPaymentHistoryTable payments={payments} /></div>
        </div>
    );
};

export default ViewPayments;