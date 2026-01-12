import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiLoader, FiArrowRight } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [status, setStatus] = useState('Verifying Payment...');
    const [paymentType, setPaymentType] = useState(null);
    const sessionId = new URLSearchParams(location.search).get('session_id');
    const hasCalledVerify = useRef(false);

    useEffect(() => {
        if (!sessionId) {
            setStatus('Error: No payment session found.');
            return;
        }
        if (hasCalledVerify.current) return;
        hasCalledVerify.current = true;

        const verifyPayment = async () => {
            try {
                const response = await axiosSecure.get(`/payment/success?session_id=${sessionId}`);
                const data = response.data;
                setPaymentType(data.type);
                
                const navigatePath = data.type === 'membership' && data.clubId 
                    ? `/clubs/${data.clubId}` 
                    : (data.type === 'event' && data.eventId ? `/events/${data.eventId}` : `/dashboard/member/home`);

                setStatus('Payment Successful!');
                setTimeout(() => navigate(navigatePath, { replace: true }), 3000);
            } catch (error) {
                setStatus(`Failed: ${error.response?.data?.message || "Verification failed."}`);
            }
        };
        verifyPayment();
    }, [sessionId, axiosSecure, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] bg-base-200/50 p-6">
            <div className="bg-base-100 p-10 rounded-2xl shadow-2xl border border-base-content/5 text-center max-w-md w-full">
                {status === 'Payment Successful!' ? (
                    <FiCheckCircle className="text-7xl text-success mx-auto mb-6 animate-bounce" />
                ) : status.includes('Failed') || status.includes('Error') ? (
                    <FiXCircle className="text-7xl text-error mx-auto mb-6" />
                ) : (
                    <FiLoader className="text-7xl text-primary mx-auto mb-6 animate-spin" />
                )}

                <h1 className={`text-3xl font-black mb-4 ${status.includes('Successful') ? 'text-success' : (status.includes('Failed') ? 'text-error' : 'text-primary')}`}>
                    {status}
                </h1>
                <p className="text-base-content/60 font-medium mb-8">
                    {status.includes('Successful') ? 'Your transaction was completed. Redirecting shortly...' : 'Please wait while we confirm your payment details.'}
                </p>
                
                {!status.includes('Successful') && !status.includes('Failed') && (
                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <p className="text-sm text-primary font-bold">Do not refresh or close this page.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default PaymentSuccess;