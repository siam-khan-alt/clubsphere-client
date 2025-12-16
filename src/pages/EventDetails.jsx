import React, { use } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaCalendar, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import { format } from 'date-fns';
import LoadingSpinner from '../components/shared/LoadingSpinner';


const EventDetails = () => {
     const { id } = useParams();
    const { user, loading: authLoading } = use(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    const eventId = id;

    const { data: eventData, isLoading, refetch } = useQuery({
        queryKey: ['eventDetails', eventId, user?.email],
        enabled: !authLoading,
        queryFn: async () => {
            const [eventResponse, registrationResponse] = await Promise.all([
                axiosSecure.get(`/events/${eventId}`),
                axiosSecure.get(`/member/event-registration-status/${eventId}`, {
                    params: { userEmail: user?.email }
                }).catch(() => ({ data: { isRegistered: false } }))
            ]);
            
            return {
                event: eventResponse.data,
                isRegistered: registrationResponse.data.isRegistered,
            };
        },
    });

    const freeRegistrationMutation = useMutation({
        mutationFn: async () => {
            const response = await axiosSecure.post(`/events/register/${eventId}`, {});
            return response.data;
        },
        onSuccess: (data) => {
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: data.message,
            });
            refetch();
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.response?.data?.message || 'Could not register for the event.',
            });
        },
    });

    const paidRegistrationMutation = useMutation({
        mutationFn: async (event) => {
            const response = await axiosSecure.post(`/event-payment/create-checkout-session`, {
                eventFee: event.eventFee,
                eventId: event._id,
                userEmail: user.email,
            });
            return response.data;
        },
        onSuccess: (data) => {
            window.location.replace(data.url);
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Payment Setup Failed',
                text: error.response?.data?.message || 'Could not initiate payment session.',
            });
        },
    });
    
    const handleRegister = (event) => {
        if (!user) {
            Swal.fire('Login Required', 'You must log in to register for an event.', 'warning');
            navigate('/login', { state: { from: location.pathname } });
            return;
        }

        if (event.isPaid && event.eventFee > 0) {
            paidRegistrationMutation.mutate(event);
        } else {
            freeRegistrationMutation.mutate();
        }
    };
    
    if (isLoading || authLoading) {
        return <LoadingSpinner/>
    }
    
    if (!eventData?.event) {
        return <div className="text-center py-20 text-error">Event not found.</div>;
    }
    
    const { event, isRegistered } = eventData;
    const isPaidEvent = event.isPaid && event.eventFee > 0;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-lg overflow-hidden" 
                 data-aos="fade-up">
                
                <img 
                    src={event.bannerImage || 'https://via.placeholder.com/800x400?text=Event+Image'} 
                    alt={`${event.title} Banner`} 
                    className="w-full h-80 object-cover"
                />

                <div className="p-8">
                    <h2 className=" mb-2">{event.title}</h2>
                    <p className="text-lg text-gray-600 mb-6">Hosted by: <span className="font-semibold">{event.clubDetails.clubName}</span></p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-t pt-4">
                        <div className="flex items-center space-x-3">
                            <FaCalendar className="text-secondary text-2xl" />
                            <div>
                                <p className="font-bold">Date & Time</p>
                                <p>{format(new Date(event.eventDate), 'MMMM do yyyy, h:mm a')}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaMapMarkerAlt className="text-secondary text-2xl" />
                            <div>
                                <p className="font-bold">Location</p>
                                <p>{event.location}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <FaDollarSign className="text-secondary text-2xl" />
                            <div>
                                <p className="font-bold">Fee</p>
                                <p className="font-bold text-xl">
                                    {isPaidEvent ? `$${event.eventFee}` : 'Free'}
                                </p>
                            </div>
                        </div>

                         <div className="flex items-center space-x-3">
                            <FaCalendar className="text-secondary text-2xl" />
                            <div>
                                <p className="font-bold">Max Attendees</p>
                                <p>{event.maxAttendees || 'Unlimited'}</p>
                            </div>
                        </div>
                    </div>
                    
                    <h4 className=" mb-3 mt-4 border-b pb-2">Event Details</h4>
                    <p className="text-gray-700 whitespace-pre-line mb-8">{event.description}</p>
                    
                    <div className="mt-8">
                        {isRegistered ? (
                            <button className="btn btn-success btn-lg text-white w-full" disabled>
                                You Are Registered!
                            </button>
                        ) : (
                            <button 
                                onClick={() => handleRegister(event)} 
                                className="btn btn-primary btn-lg w-full"
                                disabled={freeRegistrationMutation.isPending || paidRegistrationMutation.isPending}
                            >
                                {freeRegistrationMutation.isPending || paidRegistrationMutation.isPending ? (
                                    <span className="loading loading-spinner"></span>
                                ) : isPaidEvent ? (
                                    `Pay $${event.eventFee} & Register`
                                ) : (
                                    'Register for Free'
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;

 