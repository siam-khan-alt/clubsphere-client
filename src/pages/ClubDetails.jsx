import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { 
  FiMapPin, FiTag, FiLayers, FiUsers, 
  FiMail, FiClock, FiArrowRight, FiShield, FiStar
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
        const res = await axiosSecure.post("/payment/create-checkout-session", {
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
  if (isError || !club) return <div className="min-h-screen flex items-center justify-center">Error loading club details.</div>;

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300">
      <div className="relative h-[50vh] lg:h-[65vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full object-cover"
          src={club.bannerImage}
          alt={club.clubName}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-6 pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="px-6 py-2 bg-primary/20 backdrop-blur-md text-primary border border-primary/30 rounded-full text-sm font-bold tracking-widest uppercase">
              {club.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-base-content tracking-tighter">
              {club.clubName}
            </h1>
            <div className="flex flex-wrap gap-6 text-base-content/70 font-medium">
              <span className="flex items-center gap-2"><FiMapPin className="text-primary"/> {club.location}</span>
              <span className="flex items-center gap-2"><FiUsers className="text-primary"/> {club.members?.length || 0} Members</span>
              <span className="flex items-center gap-2"><FiShield className="text-primary"/> Verified Club</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-base-200/40 p-10 rounded-2xl border border-base-content/5 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                  <FiLayers size={22} />
                </div>
                <h3 className="text-3xl font-bold mb-0">The Story</h3>
              </div>
              <p className="text-xl text-base-content/80 leading-relaxed font-light">
                {club.description}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-8 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl border border-primary/10">
                  <FiClock className="text-primary text-3xl mb-4" />
                  <h4 className="text-xl font-bold mb-2">Meeting Time</h4>
                  <p className="text-base-content/70">{club.meetingSchedule || "Every weekend (TBA)"}</p>
               </div>
               <div className="p-8 bg-gradient-to-br from-secondary/10 to-transparent rounded-2xl border border-secondary/10">
                  <FiMail className="text-secondary text-3xl mb-4" />
                  <h4 className="text-xl font-bold mb-2">Connect</h4>
                  <p className="text-base-content/70 truncate">{club.managerEmail}</p>
               </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="bg-base-100 p-8 rounded-2xl border-2 border-base-content/5 shadow-2xl shadow-primary/5 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mb-6 border border-base-content/5">
                  <FiTag className="text-primary text-3xl" />
                </div>
                <h4 className="text-base-content/50 uppercase tracking-widest text-xs font-black">Membership Access</h4>
                <div className="text-5xl font-black my-4 text-base-content">
                  {club.membershipFee === 0 ? "FREE" : `$${club.membershipFee}`}
                </div>
                <p className="text-sm text-base-content/60 mb-8">Get full access to all events, workshops, and our private community circle.</p>
                
                <button
                  onClick={handleJoinClub}
                  disabled={isJoining}
                  className="w-full btn-primary-gradient py-5 text-xl flex items-center justify-center gap-3 rounded-2xl"
                >
                  {isJoining ? "Processing..." : (
                    <>
                      Secure My Spot <FiArrowRight />
                    </>
                  )}
                </button>
                
                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-success/80 bg-success/5 px-4 py-2 rounded-full">
                  <FiStar /> Instant Approval Available
                </div>
              </div>

              <div className="bg-base-200/50 p-6 rounded-2xl border border-base-content/5 text-center">
                <p className="text-sm font-medium text-base-content/40 italic">
                  Need help? Contact our support team for any membership inquiries.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClubDetails;