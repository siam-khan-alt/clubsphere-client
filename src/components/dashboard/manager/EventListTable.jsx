import React from 'react';
import { FiEdit, FiTrash2, FiUsers } from 'react-icons/fi'; 
import { format } from 'date-fns';

const EventListTable = ({ events, onViewRegistrations, onEditEvent, onDeleteEvent }) => { 
    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl mt-6">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {events.map((event) => (
                        <tr key={event._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {event.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {event.clubName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {format(new Date(event.eventDate), 'MMM d, yyyy')} at {event.eventTime}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {event.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {event.isPaid ? `$${event.eventFee.toFixed(2)}` : 'Free'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {event.registrationCount} {event.maxAttendees ? `/ ${event.maxAttendees}` : ''}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button 
                                    onClick={() => onViewRegistrations(event._id, event.title)}
                                    className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50 transition"
                                >
                                    <FiUsers className="w-4 h-4" />
                                </button>
                                
                                <button 
                                    onClick={() => onEditEvent(event)} 
                                    className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition"
                                >
                                    <FiEdit className="w-4 h-4" />
                                </button>
                                
                                <button 
                                    onClick={() => onDeleteEvent(event._id, event.title)} 
                                    className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition"
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EventListTable;