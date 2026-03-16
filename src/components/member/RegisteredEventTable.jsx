import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { FiCalendar, FiArrowRight, FiActivity } from 'react-icons/fi';

const RegisteredEventsTable = ({ registrations }) => {
    if (registrations.length === 0) {
        return (
            <div className="text-center py-20 bg-card rounded-[2rem] border-2 border-dashed border-standard/30 shadow-sm mx-4 my-6">
                <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-primary/20">
                    <FiCalendar size={40} />
                </div>
                <h3 className="!text-xl font-black text-text-heading !mb-2 italic">No Bookings Yet</h3>
                <p className="text-text-body opacity-60 mb-8 max-w-xs mx-auto text-sm font-medium">
                    You haven't registered for any events. Start exploring and join the community!
                </p>
                <Link to="/events" className="btn-primary-gradient inline-flex items-center gap-2">
                    Explore Events <FiArrowRight />
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-2xl overflow-hidden">
            <table className="table w-full border-collapse">
                {/* --- Table Head --- */}
                <thead className="bg-background/50 border-b border-standard/20">
                    <tr>
                        <th className="py-5 bg-transparent text-text-heading font-black uppercase text-[10px] tracking-[0.15em] pl-6">Event Details</th>
                        <th className="py-5 bg-transparent text-text-heading font-black uppercase text-[10px] tracking-[0.15em]">Host Club</th>
                        <th className="py-5 bg-transparent text-text-heading font-black uppercase text-[10px] tracking-[0.15em]">Event Date</th>
                        <th className="py-5 bg-transparent text-text-heading font-black uppercase text-[10px] tracking-[0.15em]">Status</th>
                        <th className="py-5 bg-transparent text-right pr-6"></th>
                    </tr>
                </thead>

                {/* --- Table Body --- */}
                <tbody className="divide-y divide-standard/10">
                    {registrations.map((reg) => (
                        <tr key={reg._id} className="group hover:bg-primary/5 transition-all duration-300">
                            {/* Title with Icon */}
                            <td className="py-5 pl-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <FiActivity size={14} />
                                    </div>
                                    <span className="font-bold text-text-heading text-sm md:text-base">{reg.eventTitle}</span>
                                </div>
                            </td>

                            {/* Club Name */}
                            <td className="py-5">
                                <span className="text-xs font-black text-secondary bg-secondary/5 px-3 py-1 rounded-full border border-secondary/10">
                                    {reg.clubName}
                                </span>
                            </td>

                            {/* Date */}
                            <td className="py-5">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-text-heading">
                                        {reg.eventDate ? format(new Date(reg.eventDate), 'MMM d, yyyy') : 'N/A'}
                                    </span>
                                    <span className="text-[10px] text-text-body opacity-50 uppercase font-bold tracking-tighter">Confirmed</span>
                                </div>
                            </td>

                            {/* Status Badge */}
                            <td className="py-5">
                                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-green-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    {reg.status}
                                </span>
                            </td>

                            {/* Action Button */}
                            <td className="py-5 pr-6 text-right">
                                <Link 
                                    to={`/events/${reg.eventId}`} 
                                    className="inline-flex items-center gap-2 text-xs font-black text-primary hover:text-secondary transition-colors uppercase tracking-widest group/btn"
                                >
                                    View <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
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