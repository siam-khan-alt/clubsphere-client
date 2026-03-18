import React, { useContext } from 'react';
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
  FiArrowRight, FiCheckCircle, FiInfo, FiLayers, FiZap, FiActivity
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
      Swal.fire({ icon: 'success', title: 'Access Granted!', text: data.message, confirmButtonColor: '#0284c7' });
      refetch();
    },
    onError: (error) => {
      Swal.fire({ icon: 'error', title: 'System Error', text: error.response?.data?.message || 'Registration failed.' });
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
      Swal.fire('Identity Required', 'Please sync your account to register.', 'warning');
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
  if (!eventData?.event) return <div className="min-h-screen bg-background flex items-center justify-center text-primary font-black uppercase tracking-[0.5em]">Anomaly Detected: Event Missing</div>;

  const { event, isRegistered } = eventData;
  const isPaidEvent = event.isPaid && event.eventFee > 0;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-primary selection:text-white transition-colors duration-500">
      
      {/* Dynamic Background Elements (Same as ClubDetails) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 plaid-bg opacity-30" />
      </div>

      {/* Hero Section (Split Layout) */}
      <div className="relative pt-24 pb-12 container mx-auto px-6">
        <div className=" grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-8 relative z-10"
          >
            <div className="flex items-center gap-3">
              <span className="px-5 py-1.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/20">
                {event.isPaid ? 'Premium Event' : 'Community Event'}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-secondary">
                <FiLayers /> {event.clubDetails?.clubName}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl text-primary md:font-extrabold text-text-heading leading-[0.9] tracking-tighter">
              {event.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "text-primary  block md:inline" : "block md:inline"}>
                  {word}{' '}
                </span>
              ))}
            </h1>

            <div className="flex flex-wrap gap-8 py-4 border-y border-primary">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-body/40">Temporal Mark</p>
                <p className="text-text-heading font-bold flex items-center gap-2">
                  <FiCalendar className="text-primary"/> {format(new Date(event.eventDate), 'MMM dd, yyyy')}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-body/40">Sync Time</p>
                <p className="text-text-heading font-bold flex items-center gap-2">
                  <FiActivity className="text-secondary"/> {format(new Date(event.eventDate), 'h:mm a')}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-body/40">Capacitance</p>
                <p className="text-text-heading font-bold flex items-center gap-2 ">
                  <FiUsers className="text-primary"/> {event.maxAttendees || 'Open Access'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <img 
              src={event.bannerImage || 'https://via.placeholder.com/1200x800'} 
              alt={event.title}
              className="relative w-full aspect-[4/5] object-cover rounded-2xl border-2 border-standard shadow-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8 space-y-16">
            <section className="relative">
              <div className="absolute -left-10 top-0 w-1 h-20 bg-gradient-to-b from-primary to-transparent" />
              <h3 className="text-left text-secondary text-4xl mb-8 flex items-center gap-4">
                <FiInfo className="text-primary" /> Transmission Info
              </h3>
              <p className="text-2xl text-text-body leading-relaxed font-medium opacity-80 ">
                "{event.description}"
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 rounded-2xl bg-card border border-standard hover:border-primary/30 transition-all group">
                <FiMapPin className="text-4xl text-primary mb-6 group-hover:rotate-12 transition-transform" />
                <h4 className="text-xl text-primary text-text-heading mb-3 uppercase tracking-tight">Transmission Hub</h4>
                <p className="text-text-body font-medium">{event.location}</p>
              </div>
              
              <div className="p-10 rounded-2xl bg-card border border-standard hover:border-secondary/30 transition-all group">
                <FiZap className="text-4xl text-secondary mb-6 group-hover:-rotate-12 transition-transform" />
                <h4 className="text-xl text-primary text-text-heading mb-3 uppercase tracking-tight">Host Node</h4>
                <p className="text-text-body font-medium truncate">{event.clubDetails?.clubName || "Verified Partner"}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <div className="p-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl  backdrop-blur-xl">
                <div className="bg-card rounded-2xl p-10 text-center space-y-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-background border border-standard/10 text-primary">
                    <FiDollarSign size={30} className="animate-pulse" />
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-body/40 mb-2">Access Credentials</p>
                    <h2 className="text-5xl font-black mb-0 ">
                       {isPaidEvent ? `$${event.eventFee}` : "Free"}
                    </h2>
                  </div>

                  <p className="text-sm font-medium text-text-body/60 px-4">
                    Sync your account now to reserve your spot and receive direct entry protocols.
                  </p>

                  <div className="space-y-4">
                    {isRegistered ? (
                      <div className="py-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center gap-3">
                         <FiCheckCircle className="text-emerald-500 text-2xl" />
                         <span className="text-emerald-500 font-black uppercase tracking-widest text-sm">System Synced</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRegister(event)}
                        disabled={freeRegistrationMutation.isPending || paidRegistrationMutation.isPending}
                        className="btn-primary-gradient w-full py-6 text-xl rounded-2xl flex items-center justify-center gap-4 group shadow-xl"
                      >
                        {freeRegistrationMutation.isPending || paidRegistrationMutation.isPending ? (
                          <span className="loading loading-infinity loading-lg"></span>
                        ) : (
                          <>
                            Initialize Sync <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Slots Available Now
                  </div>
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