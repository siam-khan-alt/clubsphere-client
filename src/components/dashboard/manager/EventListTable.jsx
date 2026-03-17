import React from 'react';
import { FiEdit, FiTrash2, FiUsers, FiCalendar, FiMapPin, FiClock } from 'react-icons/fi'; 
import { format } from 'date-fns';

const EventListTable = ({ events, onViewRegistrations, onEditEvent, onDeleteEvent }) => { 
    return (
        <div className="w-full overflow-x-auto custom-scrollbar">
            <table className="table w-full border-separate border-spacing-y-3">
                <thead>
                    <tr className="text-text-body/40 border-none">
                        <th className="bg-transparent font-black uppercase text-[11px] tracking-widest pl-6">Event Details</th>
                        <th className="bg-transparent font-black uppercase text-[11px] tracking-widest text-center">Schedule</th>
                        <th className="bg-transparent font-black uppercase text-[11px] tracking-widest text-center">Type & Fee</th>
                        <th className="bg-transparent font-black uppercase text-[11px] tracking-widest text-center">Registration</th>
                        <th className="bg-transparent font-black uppercase text-[11px] tracking-widest text-right pr-6">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event._id} className="bg-card border-standard shadow-sm hover:shadow-md transition-all duration-300">
                            {/* Event Details */}
                            <td className="rounded-l-2xl border-y border-l border-primary/10 pl-6 py-5">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl">
                                        {event.title.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-black text-base text-text-heading">{event.title}</div>
                                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-text-body/50 uppercase mt-1">
                                            <FiMapPin className="text-primary" /> {event.location}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            {/* Schedule */}
                            <td className="border-y border-primary/10 text-center">
                                <div className="inline-flex flex-col items-center">
                                    <span className="font-bold text-sm text-text-body flex items-center gap-2">
                                        <FiCalendar className="text-primary/60" /> {format(new Date(event.eventDate || event.date), 'MMM d, yyyy')}
                                    </span>
                                    <span className="text-[10px] font-black text-text-body/30 uppercase tracking-tighter mt-1">
                                        {event.eventTime || "TBA"}
                                    </span>
                                </div>
                            </td>

                            {/* Fee */}
                            <td className="border-y border-primary/10 text-center">
                                {event.isPaid ? (
                                    <span className="bg-primary/5 text-primary border border-primary/20 px-3 py-1.5 rounded-xl text-xs font-black">
                                        ${event.eventFee?.toFixed(2)}
                                    </span>
                                ) : (
                                    <span className="bg-secondary/5 text-secondary border border-secondary/20 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase">
                                        Free Entry
                                    </span>
                                )}
                            </td>

                            {/* Registration Stats */}
                            <td className="border-y border-primary/10">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div 
                                            className="bg-primary h-full transition-all duration-700" 
                                            style={{ width: `${Math.min((event.registrationCount / (event.maxAttendees || 100)) * 100, 100)}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-black uppercase text-text-body/40">
                                        <span className="text-text-heading">{event.registrationCount}</span> / {event.maxAttendees || '∞'}
                                    </span>
                                </div>
                            </td>

                            {/* Control Buttons (Always Visible) */}
                            <td className="rounded-r-2xl border-y border-r border-primary/10 pr-6 text-right">
                                <div className="flex justify-end gap-2">
                                    <button 
                                        onClick={() => onViewRegistrations(event._id, event.title)}
                                        className="h-9 w-9 flex items-center justify-center rounded-xl bg-card border border-primary/20 text-text-body hover:bg-primary hover:text-white transition-all active:scale-90"
                                        title="View Participants"
                                    >
                                        <FiUsers size={16} />
                                    </button>
                                    <button 
                                        onClick={() => onEditEvent(event)} 
                                        className="h-9 w-9 flex items-center justify-center rounded-xl bg-card border border-primary/20 text-text-body hover:bg-primary hover:text-white transition-all active:scale-90"
                                        title="Edit Event"
                                    >
                                        <FiEdit size={16} />
                                    </button>
                                    <button 
                                        onClick={() => onDeleteEvent(event._id, event.title)} 
                                        className="h-9 w-9 flex items-center justify-center rounded-xl bg-card border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90"
                                        title="Delete Event"
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