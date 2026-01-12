import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { FiDollarSign, FiCreditCard, FiTrendingUp } from 'react-icons/fi';
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
    if (error) return <div className="text-error p-4 bg-error/10 rounded-2xl font-bold">Error loading payments: {error.message}</div>;

    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

    return (
        <div className="p-4 space-y-8">
            <h2 className="text-2xl font-black flex items-center gap-3 text-base-content">
                <FiCreditCard className="text-primary" /> Platform Payment Overview
            </h2>

            <div className="bg-base-100 p-4 rounded-2xl border border-base-content/5 shadow-sm relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                    <FiTrendingUp size={100} />
                </div>
                <div className="relative z-10">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-base-content/50">Total Revenue Generated</p>
                    <div className="flex items-center gap-1 mt-2">
                        <span className="text-2xl md:text-3xl font-black text-primary">$</span>
                        <span className="text-3xl md:text-4xl font-black text-base-content tracking-tighter">
                            {totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-sm font-black text-base-content/30 ml-2 uppercase">USD</span>
                    </div>
                    <div className="mt-6 flex items-center gap-2">
                        <div className="px-3 py-1 bg-success/10 text-success rounded-lg text-xs font-black uppercase">
                            {payments.length} Transactions
                        </div>
                        <p className="text-xs font-bold text-base-content/40 italic">Live platform data</p>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[80vw] md:max-w-full overflow-hidden bg-base-100 rounded-2xl border border-base-content/5 shadow-sm">
                <AdminPaymentHistoryTable payments={payments} />
            </div>
        </div>
    );
};

export default ViewPayments;