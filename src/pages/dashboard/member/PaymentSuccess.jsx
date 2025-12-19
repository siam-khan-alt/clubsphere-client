import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [status, setStatus] = useState('Verifying Payment...');
    const [clubId, setClubId] = useState(null);
    const [eventId, setEventId] = useState(null);
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
                const data= response.data 
                setClubId(data.clubId || null);
                setEventId(data.eventId || null);
                setPaymentType(data.type);
                let navigatePath = ''; 
                let successMessage = 'Payment Successful! Redirecting...';
                if (data.type === 'membership' && data.clubId) {
                    successMessage = 'Payment Successful! Membership Activated.';
                    navigatePath = `/clubs/${data.clubId}`; 
                } else if (data.type === 'event' && data.eventId) {
                    successMessage = 'Payment Successful! Event Registration Complete.';
                    navigatePath = `/events/${data.eventId}`;
                } else {
                    navigatePath = `/dashboard/member/${data.type === 'event' ? 'events' : 'clubs'}`;
                }
                setStatus(successMessage); 
                
                setTimeout(() => {
                    navigate(navigatePath, { replace: true });
                }, 5000);

            } catch (error) {
                
                console.error("Payment Verification Failed:", error);
                const errorMessage = error.response?.data?.message || "Verification failed. Please check your dashboard.";
                setStatus(`Failed: ${errorMessage}`);
            }
        };

        verifyPayment();
    }, [sessionId, axiosSecure, navigate,]);

    const getButtonPath = () => {
        if (paymentType === 'membership' && clubId) {
            return `/clubs/${clubId}`;
        }
        if (paymentType === 'event' && eventId) {
            return `/events/${eventId}`;
        }
        return `/dashboard/member/${paymentType === 'event' ? 'events' : 'clubs'}`;
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
            <div className="bg-white p-10 rounded-xl shadow-2xl text-center">
               {status.includes('Successful') && <div className="text-6xl text-success mb-4">🎉</div>}
                {status.includes('Failed') || status.includes('Error') ? 
                    <div className="text-6xl text-error mb-4">❌</div> : 
                    !status.includes('Successful') && <span className="loading loading-spinner loading-lg mb-4 text-primary"></span>
                }
                <h1 className="text-3xl font-bold mb-4 text-green-600">
                    {status.includes('Successful') ? '🎉 Payment Success!' : (status.includes('Error') ? '❌ Verification Failed' : '... Processing ...')}
                </h1>
                <p className="text-gray-600 mb-6">{status}</p>
                
                {status.includes('Successful') && (
                    <button 
                        onClick={() => navigate(getButtonPath())}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                      {paymentType === 'event' ? 'Go to Event' : 'Go to Club / Dashboard'}
                    </button>
                )}
                
                {!status.includes('Successful') && !status.includes('Error') && (
                    <p className="text-sm text-gray-500 mt-4">
                        Do not refresh this page.
                    </p>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccess;