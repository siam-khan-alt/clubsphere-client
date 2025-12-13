import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiCheckCircle } from 'react-icons/fi';

const RegisteredEventsTable = ({ registrations }) => {
    if (registrations.length === 0) {
        return (
            <div className="text-center py-10 bg-white rounded-lg shadow-md">
                <p className="text-gray-500 text-lg">You have not registered for any events yet.</p>
                <Link to="/events" className="mt-4 inline-block text-amber-600 hover:text-amber-800 font-medium">
                    Explore Events &rarr;
                </Link>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-amber-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Event Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Club</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Registration Status</th>
                        <th className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {registrations.map((reg) => (
                        <tr key={reg._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <p className="text-sm font-medium text-gray-900">{reg.eventTitle}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {reg.clubName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {reg.eventDate ? format(new Date(reg.eventDate), 'MMM d, yyyy h:mm a') : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {reg.status.toUpperCase()}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link to={`/events/${reg.eventId}`} className="text-indigo-600 hover:text-indigo-900">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegisteredEventsTable;