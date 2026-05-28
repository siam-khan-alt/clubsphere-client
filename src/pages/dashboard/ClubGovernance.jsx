import React, { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiVote, FiPlus, FiClock, FiCheckCircle, FiXCircle, FiInfo, FiTrendingUp } from "react-icons/fi";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import toast from "react-hot-toast";

const ClubGovernance = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreatingProposal, setIsCreatingProposal] = useState(false);
  const [isVoting, setIsVoting] = useState(null);

  const [proposalForm, setProposalForm] = useState({
    title: "",
    description: "",
    type: "other",
    options: ["Yes", "No"],
    durationDays: 7,
  });

  const { data: governanceData, isLoading, isError, refetch } = useQuery({
    queryKey: ["clubProposals", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}/proposals`);
      return res.data;
    },
    enabled: !!id,
  });

  const handleCreateProposal = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    setIsCreatingProposal(true);
    try {
      await axiosSecure.post(`/clubs/${id}/proposals`, proposalForm);
      toast.success("Proposal created successfully!");
      setShowCreateModal(false);
      setProposalForm({
        title: "",
        description: "",
        type: "other",
        options: ["Yes", "No"],
        durationDays: 7,
      });
      queryClient.invalidateQueries(["clubProposals", id]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create proposal");
    } finally {
      setIsCreatingProposal(false);
    }
  };

  const handleCastVote = async (proposalId, optionId) => {
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    setIsVoting(proposalId);
    try {
      await axiosSecure.post(`/clubs/${id}/proposals/${proposalId}/vote`, { optionId });
      toast.success("Vote cast successfully!");
      queryClient.invalidateQueries(["clubProposals", id]);
      queryClient.invalidateQueries(["votingPower", id]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cast vote");
    } finally {
      setIsVoting(null);
    }
  };

  const handleAddOption = () => {
    if (proposalForm.options.length < 5) {
      setProposalForm({
        ...proposalForm,
        options: [...proposalForm.options, ""],
      });
    } else {
      toast.error("Maximum 5 options allowed");
    }
  };

  const handleRemoveOption = (index) => {
    if (proposalForm.options.length > 2) {
      const newOptions = proposalForm.options.filter((_, i) => i !== index);
      setProposalForm({
        ...proposalForm,
        options: newOptions,
      });
    } else {
      toast.error("Minimum 2 options required");
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...proposalForm.options];
    newOptions[index] = value;
    setProposalForm({
      ...proposalForm,
      options: newOptions,
    });
  };

  const getTimeRemaining = (votingEndsAt) => {
    const now = new Date();
    const end = new Date(votingEndsAt);
    const diff = end - now;

    if (diff <= 0) return "Voting ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  const calculateVotePercentage = (votes, totalVotes) => {
    if (totalVotes === 0) return 0;
    return ((votes / totalVotes) * 100).toFixed(1);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "budget":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "rule_change":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "event":
        return "bg-purple-500/20 text-purple-400 border-purple-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "budget":
        return "💰 Budget";
      case "rule_change":
        return "📜 Rule Change";
      case "event":
        return "🎉 Event";
      default:
        return "📋 Other";
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-primary font-bold">
        Error loading governance data.
      </div>
    );
  }

  const { proposals, userVotingPower } = governanceData;

  const activeProposals = proposals.filter((p) => p.status === "active");
  const pastProposals = proposals.filter((p) => p.status !== "active");

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 plaid-bg opacity-30" />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-black mb-4 flex items-center gap-4">
            <FiVote className="text-primary" />
            Club Governance
          </h1>
          <p className="text-xl text-text-body/80">Decentralized decision-making for the community</p>
        </motion.div>

        {/* Voting Power Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-standard backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-text-body/60 uppercase tracking-widest mb-2">Your Voting Power</div>
              <div className="text-4xl font-black text-primary flex items-center gap-3">
                {userVotingPower.toFixed(2)} Votes 🗳️
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-body/60 bg-background/50 px-4 py-2 rounded-full">
              <FiInfo />
              <span>Base: 1 + Contribution Bonus</span>
            </div>
          </div>
        </motion.div>

        {/* Create Proposal Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full p-6 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
          >
            <FiPlus size={24} />
            Create New Proposal
          </button>
        </motion.div>

        {/* Active Proposals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <FiClock className="text-primary" />
            Active Proposals
          </h2>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {activeProposals.length === 0 ? (
                <div className="p-8 rounded-2xl bg-card border border-standard text-center">
                  <p className="text-text-body/40 font-medium">No active proposals. Be the first to propose a change!</p>
                </div>
              ) : (
                activeProposals.map((proposal) => {
                  const hasVoted = proposal.votes.some((v) => v.userId === user?.email);
                  const totalVotes = proposal.options.reduce((sum, opt) => sum + opt.votes, 0);

                  return (
                    <motion.div
                      key={proposal._id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-8 rounded-2xl bg-card border border-standard backdrop-blur-xl"
                    >
                      {/* Proposal Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getTypeColor(proposal.type)}`}>
                              {getTypeLabel(proposal.type)}
                            </span>
                            <span className="text-sm text-text-body/60 flex items-center gap-1">
                              <FiClock />
                              {getTimeRemaining(proposal.votingEndsAt)}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-text-heading mb-2">{proposal.title}</h3>
                          <p className="text-text-body/70">{proposal.description}</p>
                        </div>
                        {hasVoted && (
                          <div className="ml-4 px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-bold flex items-center gap-2">
                            <FiCheckCircle />
                            Voted
                          </div>
                        )}
                      </div>

                      {/* Voting Options */}
                      <div className="space-y-4">
                        {proposal.options.map((option) => {
                          const percentage = calculateVotePercentage(option.votes, totalVotes);
                          const isSelected = hasVoted && proposal.votes.find((v) => v.userId === user?.email)?.optionId === option.id;

                          return (
                            <div key={option.id} className="relative">
                              <div
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                  isSelected
                                    ? "border-primary bg-primary/10"
                                    : hasVoted
                                    ? "border-standard bg-background/50 cursor-not-allowed"
                                    : "border-standard hover:border-primary hover:bg-primary/5"
                                }`}
                                onClick={() => !hasVoted && handleCastVote(proposal._id, option.id)}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-bold text-text-heading">{option.text}</span>
                                  <span className="text-sm text-text-body/60">{percentage}%</span>
                                </div>
                                <div className="w-full h-3 bg-background rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 0.5 }}
                                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                                  />
                                </div>
                                <div className="text-xs text-text-body/40 mt-1">{option.votes.toFixed(2)} weighted votes</div>
                              </div>
                              {isVoting === proposal._id && (
                                <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-xl">
                                  <LoadingSpinner />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Proposal Footer */}
                      <div className="mt-6 pt-6 border-t border-standard flex items-center justify-between text-sm text-text-body/60">
                        <div className="flex items-center gap-4">
                          <span>{proposal.votes.length} voters</span>
                          <span>•</span>
                          <span>Quorum: {proposal.quorum}</span>
                        </div>
                        <div>Created by {proposal.createdBy}</div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Past Proposals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <FiTrendingUp className="text-primary" />
            Past Proposals
          </h2>

          <div className="space-y-6">
            {pastProposals.length === 0 ? (
              <div className="p-8 rounded-2xl bg-card border border-standard text-center">
                <p className="text-text-body/40 font-medium">No past proposals yet.</p>
              </div>
            ) : (
              pastProposals.map((proposal) => {
                const totalVotes = proposal.options.reduce((sum, opt) => sum + opt.votes, 0);
                const winningOption = proposal.options.reduce((max, opt) => (opt.votes > max.votes ? opt : max), proposal.options[0]);

                return (
                  <motion.div
                    key={proposal._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-8 rounded-2xl bg-card border border-standard backdrop-blur-xl opacity-75"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getTypeColor(proposal.type)}`}>
                            {getTypeLabel(proposal.type)}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            proposal.status === "passed"
                              ? "bg-green-500/20 text-green-400 border-green-500/50"
                              : "bg-red-500/20 text-red-400 border-red-500/50"
                          }`}>
                            {proposal.status === "passed" ? (
                              <>
                                <FiCheckCircle className="inline mr-1" />
                                Passed
                              </>
                            ) : (
                              <>
                                <FiXCircle className="inline mr-1" />
                                Rejected
                              </>
                            )}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-text-heading mb-2">{proposal.title}</h3>
                        <p className="text-text-body/70 text-sm">{proposal.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {proposal.options.map((option) => {
                        const percentage = calculateVotePercentage(option.votes, totalVotes);
                        const isWinner = option.id === winningOption.id;

                        return (
                          <div key={option.id} className="p-3 rounded-xl border border-standard bg-background/50">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`font-medium ${isWinner ? "text-primary" : "text-text-body/70"}`}>
                                {option.text} {isWinner && "👑"}
                              </span>
                              <span className="text-xs text-text-body/60">{percentage}%</span>
                            </div>
                            <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${isWinner ? "bg-gradient-to-r from-primary to-secondary" : "bg-text-body/20"}`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 pt-4 border-t border-standard text-sm text-text-body/40">
                      Ended on {new Date(proposal.votingEndsAt).toLocaleDateString()}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>

      {/* Create Proposal Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-standard rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold mb-6">Create New Proposal</h2>

              <form onSubmit={handleCreateProposal} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-text-heading">Title</label>
                  <input
                    type="text"
                    value={proposalForm.title}
                    onChange={(e) => setProposalForm({ ...proposalForm, title: e.target.value })}
                    className="w-full p-4 rounded-xl bg-background border border-standard focus:border-primary focus:outline-none transition-colors"
                    placeholder="Enter proposal title..."
                    required
                    minLength={5}
                    maxLength={200}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-text-heading">Description</label>
                  <textarea
                    value={proposalForm.description}
                    onChange={(e) => setProposalForm({ ...proposalForm, description: e.target.value })}
                    className="w-full p-4 rounded-xl bg-background border border-standard focus:border-primary focus:outline-none transition-colors min-h-[120px]"
                    placeholder="Describe your proposal in detail..."
                    required
                    minLength={10}
                    maxLength={2000}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-text-heading">Type</label>
                  <select
                    value={proposalForm.type}
                    onChange={(e) => setProposalForm({ ...proposalForm, type: e.target.value })}
                    className="w-full p-4 rounded-xl bg-background border border-standard focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="budget">💰 Budget</option>
                    <option value="rule_change">📜 Rule Change</option>
                    <option value="event">🎉 Event</option>
                    <option value="other">📋 Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-text-heading">Voting Options</label>
                  <div className="space-y-3">
                    {proposalForm.options.map((option, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          className="flex-1 p-4 rounded-xl bg-background border border-standard focus:border-primary focus:outline-none transition-colors"
                          placeholder={`Option ${index + 1}`}
                          required
                        />
                        {proposalForm.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveOption(index)}
                            className="px-4 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                          >
                            <FiXCircle />
                          </button>
                        )}
                      </div>
                    ))}
                    {proposalForm.options.length < 5 && (
                      <button
                        type="button"
                        onClick={handleAddOption}
                        className="w-full p-4 rounded-xl border-2 border-dashed border-standard text-text-body/60 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                      >
                        <FiPlus />
                        Add Option
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-text-heading">Voting Duration</label>
                  <select
                    value={proposalForm.durationDays}
                    onChange={(e) => setProposalForm({ ...proposalForm, durationDays: parseInt(e.target.value) })}
                    className="w-full p-4 rounded-xl bg-background border border-standard focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value={1}>1 Day</option>
                    <option value={3}>3 Days</option>
                    <option value={7}>7 Days</option>
                    <option value={14}>14 Days</option>
                    <option value={30}>30 Days</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 p-4 rounded-xl bg-background border border-standard font-bold hover:bg-background/80 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingProposal}
                    className="flex-1 p-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isCreatingProposal ? "Creating..." : "Create Proposal"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClubGovernance;
