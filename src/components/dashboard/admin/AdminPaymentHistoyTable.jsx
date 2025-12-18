import React from 'react';
import { format } from 'date-fns';
import { FiDollarSign } from 'react-icons/fi';

const AdminPaymentHistoryTable = ({ payments }) => {
    if (payments.length === 0) {
        return (
            <div className="text-center py-10 bg-white rounded-lg shadow-md">
                <p className="text-gray-500 text-lg">No payment records found yet.</p>
            </div>
        );
    }

    return (
        <div className=" bg-white rounded-xl shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-red-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">User Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Source (Club/Event)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment) => (
                        <tr key={payment._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {format(new Date(payment.createdAt), 'MMM d, yyyy')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {payment.userEmail}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700">
                                <FiDollarSign className="inline w-4 h-4 mr-1" />{payment.amount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                                {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)} 
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {payment.type === 'event' ? (
                                    <>
                                        <span className='font-medium'>{payment.eventName}</span><br/>
                                        <span className='text-xs italic'>({payment.clubName})</span>
                                    </>
                                ) : (
                                    <span className='font-medium'>{payment.clubName}</span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    payment.paymentStatus === 'paid' || payment.paymentStatus === 'succeeded' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {(payment.paymentStatus || 'unknown').toUpperCase()}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPaymentHistoryTable;