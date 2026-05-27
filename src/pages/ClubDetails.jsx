import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  FiMapPin, FiLayers, FiUsers, 
  FiMail, FiClock, FiArrowRight, FiShield, FiStar, FiZap
} from "react-icons/fi";

const ClubDetails = () => {
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [isJoining, setIsJoining] = useState(false);

  const { data: club, isLoading, isError } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/clubs/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const handleJoinClub = async () => {
    if (loading || isJoining) return;
    if (!user) {
      toast.error("Please login first!");
      return navigate("/login");
    }

    setIsJoining(true);
    try {
      if (club.membershipFee > 0) {
        const res = await axiosSecure.post("/payments/membership-payment/create-checkout-session", {
          membershipFee: club.membershipFee,
          clubId: club._id,
          userEmail: user.email,
        });
        if (res.data.url) window.location.replace(res.data.url);
      } else {
        await axiosSecure.post(`/clubs/join/${club._id}`, { membershipFee: 0, paymentStatus: "free" });
        toast.success(`Welcome to ${club.clubName}!`);
        queryClient.invalidateQueries(["club", id]);
        navigate("/dashboard/member/clubs");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setIsJoining(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError || !club) return <div className="min-h-screen bg-background flex items-center justify-center text-primary font-bold">Error loading club details.</div>;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-primary selection:text-white">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 plaid-bg opacity-30" />
      </div>

      {/* Hero Section with Parallax Effect */}
      <div className="relative pt-24 pb-12 container mx-auto px-6">
        <div className=" grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-8 relative z-10"
          >
            <div className="flex items-center gap-3">
              <span className="px-5 py-1.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-primary/20">
                {club.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-secondary">
                <FiShield /> Verified Organization
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl text-primary md:font-extrabold text-text-heading leading-[0.9] tracking-tighter">
              {club.clubName.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "text-primary  block md:inline" : "block md:inline"}>
                  {word}{' '}
                </span>
              ))}
            </h1>

            <div className="flex flex-wrap gap-8 py-4 border-y border-primary">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-body/40">Location</p>
                <p className="text-text-heading font-bold flex items-center gap-2"><FiMapPin className="text-primary"/> {club.location}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-body/40">Community</p>
                <p className="text-text-heading font-bold flex items-center gap-2"><FiUsers className="text-secondary"/> {club.members?.length || 0} Members</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-body/40">Fee Structure</p>
                <p className="text-text-heading font-bold flex items-center gap-2 ">
                  <FiZap className="text-primary"/> {club.membershipFee === 0 ? "Open Access" : `$${club.membershipFee}`}
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
              src={club.bannerImage} 
              alt={club.clubName}
              className="relative w-full aspect-[4/5] object-cover rounded-2xl border-2 border-standard shadow-xl"
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
              <h3 className="text-left text-4xl mb-8">The Philosophy</h3>
              <p className="text-2xl text-text-body leading-relaxed font-medium opacity-80 ">
                "{club.description}"
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 rounded-2xl bg-card border border-standard hover:border-primary/30 transition-all group">
                <FiClock className="text-4xl text-primary mb-6 group-hover:rotate-12 transition-transform" />
                <h4 className="text-xl text-primary font-bold text-text-heading mb-3 uppercase tracking-tight">Meeting Schedule</h4>
                <p className="text-text-body font-medium">{club.meetingSchedule || "Every weekend (Coordinate with Manager)"}</p>
              </div>
              
              <div className="p-10 rounded-2xl bg-card border border-standard hover:border-secondary/30 transition-all group">
                <FiMail className="text-4xl text-secondary mb-6 group-hover:-rotate-12 transition-transform" />
                <h4 className="text-xl text-primary font-bold text-text-heading mb-3 uppercase tracking-tight">Direct Channel</h4>
                <p className="text-text-body font-medium truncate">{club.managerEmail}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <div className="p-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl  backdrop-blur-xl">
                <div className="bg-card rounded-2xl p-10 text-center space-y-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-background border border-standard text-primary">
                    <FiStar size={30} className="animate-pulse" />
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-body/40 mb-2">Membership Status</p>
                    <h2 className="text-4xl md:text-6xl font-black mb-0 ">
                       {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
                    </h2>
                  </div>

                  <p className="text-sm font-medium text-text-body/60 px-4">
                    Unlock exclusive access to all digital resources, events, and networking hubs.
                  </p>

                  <button
                    onClick={handleJoinClub}
                    disabled={isJoining}
                    className="btn-primary-gradient w-full py-6 text-xl rounded-2xl flex items-center justify-center gap-4 group shadow-2xl"
                  >
                    {isJoining ? "Syncing..." : (
                      <>
                        Join Now <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>

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

export default ClubDetails;