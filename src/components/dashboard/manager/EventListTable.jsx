import React from 'react';
import { FiEdit, FiTrash2, FiUsers, FiCalendar, FiMapPin } from 'react-icons/fi'; 
import { format } from 'date-fns';

const EventListTable = ({ events, onViewRegistrations, onEditEvent, onDeleteEvent }) => { 
    return (
        <div className="bg-base-100 rounded-2xl border border-base-content/5 shadow-2xl overflow-hidden">
            <table className="table w-full border-separate border-spacing-y-2 px-4">
                <thead>
                    <tr className="border-none text-base-content/40 italic">
                        <th className="font-black uppercase text-[10px] tracking-[0.2em] py-6">Event Details</th>
                        <th className="font-black uppercase text-[10px] tracking-[0.2em]">Club</th>
                        <th className="font-black uppercase text-[10px] tracking-[0.2em]">Schedule</th>
                        <th className="font-black uppercase text-[10px] tracking-[0.2em]">Fee</th>
                        <th className="font-black uppercase text-[10px] tracking-[0.2em]">Registrations</th>
                        <th className="text-right font-black uppercase text-[10px] tracking-[0.2em]">Control</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event._id} className="hover:bg-base-200/30 transition-colors border-base-content/5">
                            <td>
                                <div className="font-bold text-base-content">{event.title}</div>
                                <div className="flex items-center gap-1 text-[10px] text-base-content/50 uppercase font-black">
                                    <FiMapPin className="text-primary" /> {event.location}
                                </div>
                            </td>
                            <td className="text-sm font-bold text-base-content/70">
                                {event.clubName}
                            </td>
                            <td className="text-sm">
                                <div className="font-bold text-base-content/80">
                                    {format(new Date(event.eventDate), 'MMM d, yyyy')}
                                </div>
                                <div className="text-[10px] font-black opacity-40 uppercase tracking-tighter">
                                    {event.eventTime}
                                </div>
                            </td>
                            <td>
                                {event.isPaid ? (
                                    <span className="font-bold text-base-content">${event.eventFee.toFixed(2)}</span>
                                ) : (
                                    <span className="text-green-500 font-black uppercase text-[10px]">Free</span>
                                )}
                            </td>
                            <td>
                                <div className="flex items-center gap-2">
                                    <div className="radial-progress text-primary h-8 w-8 text-[8px] font-black" 
                                         style={{ "--value": (event.registrationCount / (event.maxAttendees || 100)) * 100, "--size": "2rem" }}>
                                        {event.registrationCount}
                                    </div>
                                    <span className="text-[10px] font-black text-base-content/30 uppercase">
                                        / {event.maxAttendees || '∞'}
                                    </span>
                                </div>
                            </td>
                            <td className="text-right">
                                <div className="flex justify-end gap-1">
                                    <button 
                                        onClick={() => onViewRegistrations(event._id, event.title)}
                                        className="btn btn-ghost btn-xs text-green-600 hover:bg-green-50 rounded-2xl"
                                    >
                                        <FiUsers size={16} />
                                    </button>
                                    <button 
                                        onClick={() => onEditEvent(event)} 
                                        className="btn btn-ghost btn-xs text-blue-600 hover:bg-blue-50 rounded-2xl"
                                    >
                                        <FiEdit size={16} />
                                    </button>
                                    <button 
                                        onClick={() => onDeleteEvent(event._id, event.title)} 
                                        className="btn btn-ghost btn-xs text-red-600 hover:bg-red-50 rounded-2xl"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EventListTable;