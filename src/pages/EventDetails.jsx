import React, { useContext} from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { motion } from "framer-motion";
import { 
  FiCalendar, FiMapPin, FiDollarSign, FiUsers, 
  FiArrowRight, FiCheckCircle, FiInfo, FiLayers 
} from "react-icons/fi";

const EventDetails = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useContext(AuthContext);
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
      Swal.fire({ icon: 'success', title: 'Registration Successful!', text: data.message, confirmButtonColor: '#7C3AED' });
      refetch();
    },
    onError: (error) => {
      Swal.fire({ icon: 'error', title: 'Oops...', text: error.response?.data?.message || 'Registration failed.' });
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
  });

  const handleRegister = (event) => {
    if (!user) {
      Swal.fire('Login Required', 'Please log in to register for this event.', 'warning');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    if (event.isPaid && event.eventFee > 0) {
      paidRegistrationMutation.mutate(event);
    } else {
      freeRegistrationMutation.mutate();
    }
  };

  if (isLoading || authLoading) return <LoadingSpinner />;
  if (!eventData?.event) return <div className="min-h-screen flex items-center justify-center text-error font-bold">Event not found!</div>;

  const { event, isRegistered } = eventData;
  const isPaidEvent = event.isPaid && event.eventFee > 0;

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300">
      <div className="relative h-[50vh] lg:h-[60vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full object-cover"
          src={event.bannerImage || 'https://via.placeholder.com/1200x600'}
          alt={event.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/20 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-6 pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="px-6 py-2 bg-secondary/20 backdrop-blur-md text-secondary border border-secondary/30 rounded-full text-xs font-black tracking-widest uppercase inline-block">
              {event.isPaid ? 'Premium Event' : 'Community Event'}
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-base-content tracking-tighter leading-none">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-base-content/70 font-medium">
              <span className="flex items-center gap-2"><FiLayers className="text-primary"/> {event.clubDetails.clubName}</span>
              <span className="flex items-center gap-2"><FiMapPin className="text-primary"/> {event.location}</span>
              <span className="flex items-center gap-2">
                <FiUsers className="text-primary"/> {event.maxAttendees ? `${event.maxAttendees} Slots` : 'Unlimited'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-10 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-10">
            <section className="bg-base-200/40 p-8 md:p-12 rounded-2xl border border-base-content/5 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
                  <FiInfo size={24} />
                </div>
                <h3 className="text-3xl font-bold mb-0">Event Overview</h3>
              </div>
              <p className="text-xl text-base-content/80 leading-relaxed font-light whitespace-pre-line">
                {event.description}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-8 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl border border-primary/10 group hover:shadow-lg transition-all">
                  <FiCalendar className="text-primary text-4xl mb-6" />
                  <h4 className="text-xl font-bold mb-2">Schedule</h4>
                  <p className="text-base-content/70 text-lg">
                    {format(new Date(event.eventDate), 'MMMM do yyyy')} <br/>
                    <span className="text-primary font-semibold">{format(new Date(event.eventDate), 'h:mm a')}</span>
                  </p>
               </div>
               <div className="p-8 bg-gradient-to-br from-secondary/10 to-transparent rounded-2xl border border-secondary/10 group hover:shadow-lg transition-all">
                  <FiMapPin className="text-secondary text-4xl mb-6" />
                  <h4 className="text-xl font-bold mb-2">Venue</h4>
                  <p className="text-base-content/70 text-lg">{event.location}</p>
               </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="bg-base-100 p-8 rounded-2xl border-2 border-base-content/5 shadow-2xl shadow-primary/5 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-base-200 rounded-2xl flex items-center justify-center mb-6 border border-base-content/5 rotate-3">
                  <FiDollarSign className="text-primary text-4xl" />
                </div>
                <h4 className="text-base-content/50 uppercase tracking-widest text-xs font-black">Registration Fee</h4>
                <div className="text-6xl font-black my-4 text-base-content">
                  {isPaidEvent ? `$${event.eventFee}` : "FREE"}
                </div>
                
                <div className="w-full space-y-4 mt-6">
                  {isRegistered ? (
                    <div className="flex flex-col items-center gap-3 p-4 bg-success/10 rounded-2xl border border-success/20">
                      <FiCheckCircle className="text-success text-3xl" />
                      <span className="text-success font-bold text-lg">You're on the list!</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRegister(event)}
                      disabled={freeRegistrationMutation.isPending || paidRegistrationMutation.isPending}
                      className="w-full btn-primary-gradient py-5 text-xl flex items-center justify-center gap-3 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95"
                    >
                      {freeRegistrationMutation.isPending || paidRegistrationMutation.isPending ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <>
                          Reserve My Spot <FiArrowRight />
                        </>
                      )}
                    </button>
                  )}
                </div>
                
                <p className="mt-6 text-sm text-base-content/50 leading-tight">
                  {isPaidEvent ? "* Secure payment handled via Stripe" : "* Free registration for club members"}
                </p>
              </div>

              <div className="bg-base-200/50 p-6 rounded-2xl border border-base-content/5 flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-xl text-primary"><FiUsers /></div>
                <div>
                  <p className="text-xs font-bold opacity-50 uppercase tracking-tighter">Availability</p>
                  <p className="text-sm font-semibold">Hurry! Limited slots left.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetails;