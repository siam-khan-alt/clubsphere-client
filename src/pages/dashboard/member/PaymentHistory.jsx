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
    if (error) return <div className="text-error p-4 bg-error/10 rounded-2xl font-bold">Error loading payment history: {error.message}</div>;

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3 text-base-content">
                <FiCreditCard className="text-blue-500" /> Payment History
            </h2>

            <div className="w-full max-w-[80vw] md:max-w-full overflow-hidden bg-base-100 mx-auto rounded-2xl border border-base-content/5 shadow-sm">
                <div className="overflow-x-auto w-full">
                    <div className="inline-block min-w-full align-middle">
                        <PaymentHistoryTable payments={payments} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;