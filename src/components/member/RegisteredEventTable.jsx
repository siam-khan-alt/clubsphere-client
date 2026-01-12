import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

const RegisteredEventsTable = ({ registrations }) => {
    if (registrations.length === 0) {
        return (
            <div className="text-center py-16 bg-base-100 rounded-2xl border border-dashed border-base-content/20 shadow-sm">
                <FiCalendar className="mx-auto text-5xl text-base-content/20 mb-4" />
                <p className="text-base-content/50 text-lg font-bold">You have not registered for any events yet.</p>
                <Link to="/events" className="btn btn-primary btn-sm mt-6 rounded-2xl px-8">
                    Explore Events
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-base-100 rounded-2xl border border-base-content/5 shadow-sm overflow-hidden">
            <table className="table w-full">
                <thead className="bg-base-200/50">
                    <tr className="border-b border-base-content/5">
                        <th className="bg-transparent text-base-content/70 font-bold uppercase text-[10px] tracking-widest">Event Title</th>
                        <th className="bg-transparent text-base-content/70 font-bold uppercase text-[10px] tracking-widest">Club</th>
                        <th className="bg-transparent text-base-content/70 font-bold uppercase text-[10px] tracking-widest">Date</th>
                        <th className="bg-transparent text-base-content/70 font-bold uppercase text-[10px] tracking-widest">Status</th>
                        <th className="bg-transparent"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-base-content/5">
                    {registrations.map((reg) => (
                        <tr key={reg._id} className="hover:bg-base-200/30 transition-colors">
                            <td className="font-bold text-base-content">{reg.eventTitle}</td>
                            <td className="text-base-content/70 font-medium">{reg.clubName}</td>
                            <td className="text-sm text-base-content/60">
                                {reg.eventDate ? format(new Date(reg.eventDate), 'MMM d, yyyy') : 'N/A'}
                            </td>
                            <td>
                                <span className="badge badge-success badge-soft rounded-2xl font-bold text-[10px] px-3 border-none bg-success/10 text-success">
                                    {reg.status.toUpperCase()}
                                </span>
                            </td>
                            <td className="text-right">
                                <Link to={`/events/${reg.eventId}`} className="btn btn-ghost btn-xs text-primary rounded-2xl hover:bg-primary/10">
                                    Details <FiArrowRight />
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