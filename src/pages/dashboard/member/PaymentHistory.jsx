import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { FiCreditCard } from 'react-icons/fi';
import PaymentHistoryTable from '../../../components/member/PaymentHistoryTable';


const PaymentHistory = () => {
     const axiosSecure = useAxiosSecure();
     const queryClient = useQueryClient(); 

    React.useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['memberPaymentHistory'] });
    }, [queryClient]); 
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
            <h2 className=" mb-6 flex items-center">
                <FiCreditCard className="w-6 h-6 mr-2 text-blue-600" /> Payment History
            </h2>
            <div className='overflow-x-auto max-w-64 md:max-w-2xl lg:max-w-3xl'>
                  <PaymentHistoryTable payments={payments} />
            </div>
            
        </div>
    );
};

export default PaymentHistory;