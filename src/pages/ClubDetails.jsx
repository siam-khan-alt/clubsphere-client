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
  FiMail, FiClock, FiArrowRight, FiShield, FiStar, FiZap, FiLogOut, 
  FiMessageSquare, FiThumbsUp, FiHeart, FiSmile, FiEye, FiEdit2, FiTrash2
} from "react-icons/fi";
import Swal from "sweetalert2";

const ClubDetails = () => {
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [isUpdatingComment, setIsUpdatingComment] = useState(false);

  const { data: club, isLoading, isError } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/clubs/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ["clubComments", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/clubs/${id}/comments`);
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

  const handleLeaveClub = async () => {
    if (loading || isLeaving) return;
    if (!user) {
      toast.error("Please login first!");
      return navigate("/login");
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will lose access to all club resources and events.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, leave club",
      background: "var(--color-card)",
      color: "var(--color-text-body)",
    });

    if (result.isConfirmed) {
      setIsLeaving(true);
      try {
        await axiosSecure.post(`/clubs/leave/${club._id}`);
        toast.success(`You have left ${club.clubName}`);
        queryClient.invalidateQueries(["club", id]);
        queryClient.invalidateQueries(["memberClubs"]);
        navigate("/dashboard/member/clubs");
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to leave club");
      } finally {
        setIsLeaving(false);
      }
    }
  };

  const handlePostComment = async () => {
    if (loading || isPostingComment || !commentText.trim()) return;
    if (!user) {
      toast.error("Please login first!");
      return navigate("/login");
    }

    setIsPostingComment(true);
    try {
      await axiosSecure.post(`/clubs/${club._id}/comments`, { text: commentText });
      toast.success("Comment posted successfully!");
      setCommentText("");
      queryClient.invalidateQueries(["clubComments", id]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post comment");
    } finally {
      setIsPostingComment(false);
    }
  };

  const handleToggleReaction = async (commentId, type) => {
    if (loading || !user) {
      toast.error("Please login first!");
      return navigate("/login");
    }

    try {
      await axiosSecure.post(`/clubs/${club._id}/comments/${commentId}/react`, { type });
      queryClient.invalidateQueries(["clubComments", id]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update reaction");
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffMs = now - commentTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return commentTime.toLocaleDateString();
  };

  const getReactionCounts = (reactions) => {
    const counts = { like: 0, love: 0, haha: 0, wow: 0 };
    reactions.forEach((r) => {
      if (counts[r.type] !== undefined) counts[r.type]++;
    });
    return counts;
  };

  const getUserReaction = (reactions) => {
    if (!user) return null;
    return reactions.find((r) => r.userEmail === user.email)?.type || null;
  };

  const handleEditComment = async () => {
    if (loading || isUpdatingComment || !editCommentText.trim()) return;
    if (!user) {
      toast.error("Please login first!");
      return navigate("/login");
    }

    setIsUpdatingComment(true);
    try {
      await axiosSecure.patch(`/clubs/${club._id}/comments/${editingCommentId}`, {
        text: editCommentText,
      });
      toast.success("Comment updated successfully!");
      setEditingCommentId(null);
      setEditCommentText("");
      queryClient.invalidateQueries(["clubComments", id]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update comment");
    } finally {
      setIsUpdatingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (loading || !user) {
      toast.error("Please login first!");
      return navigate("/login");
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, delete it",
      background: "var(--color-card)",
      color: "var(--color-text-body)",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/clubs/${club._id}/comments/${commentId}`);
        toast.success("Comment deleted successfully!");
        queryClient.invalidateQueries(["clubComments", id]);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete comment");
      }
    }
  };

  const startEditingComment = (comment) => {
    setEditingCommentId(comment._id);
    setEditCommentText(comment.text);
  };

  const cancelEditingComment = () => {
    setEditingCommentId(null);
    setEditCommentText("");
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError || !club) return <div className="min-h-screen bg-background flex items-center justify-center text-primary font-bold">Error loading club details.</div>;

  const isMember = user && (club.members?.includes(user.email) || club.managerEmail === user.email);

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

                  {isMember ? (
                    <button
                      onClick={handleLeaveClub}
                      disabled={isLeaving}
                      className="w-full py-6 text-xl rounded-2xl flex items-center justify-center gap-4 group shadow-2xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:from-red-600 hover:to-red-700 transition-all"
                    >
                      {isLeaving ? "Leaving..." : (
                        <>
                          Leave Club <FiLogOut className="group-hover:translate-x-2 transition-transform" />
                        </>
                      )}
                    </button>
                  ) : (
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
                  )}

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

      {/* Club Discussion & Reviews Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <section className="relative">
            <div className="absolute -left-10 top-0 w-1 h-20 bg-gradient-to-b from-primary to-transparent" />
            <h3 className="text-left text-4xl mb-8 flex items-center gap-3">
              <FiMessageSquare className="text-primary" />
              Club Discussion & Reviews
            </h3>

            {/* Comment Input Box */}
            {isMember ? (
              <div className="mb-12 p-6 rounded-2xl bg-card border border-standard backdrop-blur-xl">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts about this club..."
                  className="w-full bg-background border border-standard rounded-xl p-4 text-text-body placeholder-text-body/40 resize-none focus:outline-none focus:border-primary transition-colors"
                  rows={3}
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-text-body/40">
                    {commentText.length}/1000
                  </span>
                  <button
                    onClick={handlePostComment}
                    disabled={isPostingComment || !commentText.trim()}
                    className="btn-primary-gradient px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPostingComment ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-12 p-6 rounded-2xl bg-card border border-standard backdrop-blur-xl text-center">
                <p className="text-text-body/60 font-medium">
                  Only club members can participate in discussions. Join now to comment!
                </p>
              </div>
            )}

            {/* Comments Feed */}
            {commentsLoading ? (
              <div className="text-center py-12">
                <LoadingSpinner />
              </div>
            ) : comments && comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map((comment) => {
                  const reactionCounts = getReactionCounts(comment.reactions || []);
                  const userReaction = getUserReaction(comment.reactions || []);

                  return (
                    <motion.div
                      key={comment._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-2xl bg-card border border-standard backdrop-blur-xl"
                    >
                      <div className="flex items-start gap-4">
                        {/* User Avatar */}
                        <div className="flex-shrink-0">
                          {comment.userAvatar ? (
                            <img
                              src={comment.userAvatar}
                              alt={comment.userName}
                              className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                              {comment.userName.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        {/* Comment Content */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <h4 className="font-bold text-text-heading">{comment.userName}</h4>
                              <span className="text-xs text-text-body/40">
                                {formatTimestamp(comment.createdAt)}
                              </span>
                            </div>
                            {/* Conditional Actions Panel */}
                            {user && (
                              <div className="flex items-center gap-2">
                                {comment.userEmail === user.email && (
                                  <button
                                    onClick={() => startEditingComment(comment)}
                                    className="text-text-body/40 hover:text-primary transition-colors"
                                    title="Edit comment"
                                  >
                                    <FiEdit2 size={16} />
                                  </button>
                                )}
                                {(comment.userEmail === user.email || club.managerEmail === user.email) && (
                                  <button
                                    onClick={() => handleDeleteComment(comment._id)}
                                    className="text-text-body/40 hover:text-red-500 transition-colors"
                                    title="Delete comment"
                                  >
                                    <FiTrash2 size={16} />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                          {editingCommentId === comment._id ? (
                            <div className="space-y-3">
                              <textarea
                                value={editCommentText}
                                onChange={(e) => setEditCommentText(e.target.value)}
                                className="w-full bg-background border border-standard rounded-xl p-3 text-text-body placeholder-text-body/40 resize-none focus:outline-none focus:border-primary transition-colors"
                                rows={3}
                                maxLength={1000}
                              />
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-text-body/40">
                                  {editCommentText.length}/1000
                                </span>
                                <div className="flex gap-2">
                                  <button
                                    onClick={cancelEditingComment}
                                    className="px-4 py-2 rounded-lg bg-background border border-standard text-text-body hover:border-primary transition-colors"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={handleEditComment}
                                    disabled={isUpdatingComment || !editCommentText.trim()}
                                    className="px-4 py-2 rounded-lg bg-primary text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                                  >
                                    {isUpdatingComment ? "Saving..." : "Save"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p className="text-text-body leading-relaxed">{comment.text}</p>
                          )}

                          {/* Reaction Bar */}
                          <div className="flex items-center gap-2 mt-4">
                            {user ? (
                              <>
                                <button
                                  onClick={() => handleToggleReaction(comment._id, "like")}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                                    userReaction === "like"
                                      ? "bg-blue-500 text-white"
                                      : "bg-background text-text-body/60 hover:text-primary"
                                  }`}
                                >
                                  <FiThumbsUp size={14} />
                                  {reactionCounts.like > 0 && reactionCounts.like}
                                </button>
                                <button
                                  onClick={() => handleToggleReaction(comment._id, "love")}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                                    userReaction === "love"
                                      ? "bg-red-500 text-white"
                                      : "bg-background text-text-body/60 hover:text-primary"
                                  }`}
                                >
                                  <FiHeart size={14} />
                                  {reactionCounts.love > 0 && reactionCounts.love}
                                </button>
                                <button
                                  onClick={() => handleToggleReaction(comment._id, "haha")}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                                    userReaction === "haha"
                                      ? "bg-yellow-500 text-white"
                                      : "bg-background text-text-body/60 hover:text-primary"
                                  }`}
                                >
                                  <FiSmile size={14} />
                                  {reactionCounts.haha > 0 && reactionCounts.haha}
                                </button>
                                <button
                                  onClick={() => handleToggleReaction(comment._id, "wow")}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                                    userReaction === "wow"
                                      ? "bg-purple-500 text-white"
                                      : "bg-background text-text-body/60 hover:text-primary"
                                  }`}
                                >
                                  <FiEye size={14} />
                                  {reactionCounts.wow > 0 && reactionCounts.wow}
                                </button>
                              </>
                            ) : (
                              <span className="text-xs text-text-body/40">
                                {Object.values(reactionCounts).reduce((a, b) => a + b, 0)} reactions
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-text-body/40 font-medium">No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;