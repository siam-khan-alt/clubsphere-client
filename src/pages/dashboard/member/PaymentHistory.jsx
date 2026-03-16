import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import PaymentHistoryTable from '../../../components/member/PaymentHistoryTable';
import DashboardHeader from '../../../components/shared/ui/DashboardHeader';
import DashboardHeaderSkeleton from '../../../components/shared/skeletons/dashboadCommon/DashboardHeaderSkeleton';
import { TableSkeleton } from '../../../components/shared/skeletons/user/payment/TableSkeletons';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading, error } = useQuery({
        queryKey: ['memberPaymentHistory'],
        queryFn: async () => {
            const res = await axiosSecure.get('/member/payments'); 
            return res.data;
        }
    });

    if (isLoading) return (
        <div className="space-y-8">
            <DashboardHeaderSkeleton />
            <div className="w-full max-w-[80vw] md:max-w-full overflow-hidden bg-card mx-auto rounded-2xl border-standard shadow-sm p-2">
                <TableSkeleton rows={payments.length > 0 ? payments.length : 8} />
            </div>
        </div>
    );

    if (error) return (
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 font-bold animate-in fade-in">
            Error loading payment history: {error.message}
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* --- Reusable Header Section --- */}
            <DashboardHeader 
                title="Payment History"
                description="Track all your club memberships and event registrations in one place securely."
                badgeText="Billing Workspace"
                showSmile={false} 
            />

            {/* Table Container */}
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