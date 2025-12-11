import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [status, setStatus] = useState('Verifying Payment...');
    const [clubId, setClubId] = useState(null);
    const sessionId = new URLSearchParams(location.search).get('session_id');

    useEffect(() => {
        if (!sessionId) {
            setStatus('Error: No payment session found.');
            return;
        }
        const verifyPayment = async () => {
            try {
                const response = await axiosSecure.get(`/payment/success?session_id=${sessionId}`);
                
                setStatus('Payment Successful! Membership Activated.');
                setClubId(response.data.clubId); 
                
                setTimeout(() => {
                    navigate(clubId ? `/clubs/${response.data.clubId}` : '/dashboard/member/clubs');
                }, 3000);

            } catch (error) {
                
                console.error("Payment Verification Failed:", error);
                const errorMessage = error.response?.data?.message || "Verification failed. Please check your dashboard.";
                setStatus(`Failed: ${errorMessage}`);
            }
        };

        verifyPayment();
    }, [sessionId, axiosSecure, navigate, clubId]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
            <div className="bg-white p-10 rounded-xl shadow-2xl text-center">
                <h1 className="text-3xl font-bold mb-4 text-green-600">
                    {status.includes('Successful') ? '🎉 Payment Success!' : (status.includes('Error') ? '❌ Verification Failed' : '... Processing ...')}
                </h1>
                <p className="text-gray-600 mb-6">{status}</p>
                
                {status.includes('Successful') && (
                    <button 
                        onClick={() => navigate(clubId ? `/clubs/${clubId}` : '/dashboard/member/clubs')}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Go to Club / Dashboard
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