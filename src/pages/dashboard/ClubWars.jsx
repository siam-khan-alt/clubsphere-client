import React, { useContext, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrophy, FiUsers, FiMessageSquare, FiActivity, FiZap } from "react-icons/fi";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

const ClubWars = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [socket, setSocket] = useState(null);
  const [localLeaderboard, setLocalLeaderboard] = useState([]);

  const { data: seasonData, isLoading, isError } = useQuery({
    queryKey: ["clubWars"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/clubs/club-wars/current-season`);
      return res.data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds as fallback
  });

  // Initialize Socket.io connection
  useEffect(() => {
    if (user) {
      const newSocket = io(SOCKET_URL, {
        auth: {
          email: user.email,
        },
      });

      newSocket.on("connect", () => {
        console.log("Connected to Club Wars socket");
      });

      newSocket.on("leaderboardUpdate", (updatedSeason) => {
        console.log("Received leaderboard update:", updatedSeason);
        setLocalLeaderboard(updatedSeason.leaderboard);
        queryClient.setQueryData(["clubWars"], updatedSeason);
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from Club Wars socket");
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user, queryClient]);

  // Update local leaderboard when season data changes
  useEffect(() => {
    if (seasonData?.leaderboard) {
      setLocalLeaderboard(seasonData.leaderboard);
    }
  }, [seasonData]);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !seasonData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-primary font-bold">
        Error loading Club Wars data.
      </div>
    );
  }

  const { season, leaderboard } = seasonData;
  const displayLeaderboard = localLeaderboard.length > 0 ? localLeaderboard : leaderboard;

  // Calculate time remaining
  const timeRemaining = new Date(season.endDate) - new Date();
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 plaid-bg opacity-30" />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Top Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-8 rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-standard backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-black mb-4 flex items-center gap-4">
                <FiTrophy className="text-yellow-500" />
                Club Wars ⚔️
              </h1>
              <p className="text-xl text-text-body/80">
                Active Season: <span className="font-bold text-primary">{season.seasonName}</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black text-primary mb-2">{daysRemaining}</div>
              <div className="text-sm text-text-body/60 uppercase tracking-widest">Days Remaining</div>
            </div>
          </div>
        </motion.div>

        {/* #1 Club Highlight */}
        {displayLeaderboard.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 p-8 rounded-3xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 backdrop-blur-xl"
          >
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white text-4xl font-black">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  {displayLeaderboard[0].clubLogo ? (
                    <img
                      src={displayLeaderboard[0].clubLogo}
                      alt={displayLeaderboard[0].clubName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-yellow-500"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl">
                      {displayLeaderboard[0].clubName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <h2 className="text-3xl font-black text-text-heading">{displayLeaderboard[0].clubName}</h2>
                  <FiTrophy className="text-yellow-500 text-3xl" />
                </div>
                <div className="text-2xl font-bold text-primary">{displayLeaderboard[0].points} pts</div>
              </div>
              <div className="flex gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-text-heading">{displayLeaderboard[0].metrics?.totalComments || 0}</div>
                  <div className="text-xs text-text-body/60 uppercase tracking-widest flex items-center gap-1 justify-center">
                    <FiMessageSquare /> Comments
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-heading">{displayLeaderboard[0].metrics?.memberGrowth || 0}</div>
                  <div className="text-xs text-text-body/60 uppercase tracking-widest flex items-center gap-1 justify-center">
                    <FiUsers /> Members
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-heading">{displayLeaderboard[0].metrics?.totalEvents || 0}</div>
                  <div className="text-xs text-text-body/60 uppercase tracking-widest flex items-center gap-1 justify-center">
                    <FiActivity /> Events
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Live Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-card border border-standard backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold flex items-center gap-3">
              <FiZap className="text-primary" />
              Live Leaderboard
            </h3>
            <div className="flex items-center gap-2 text-sm text-text-body/60">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Real-time Updates
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {displayLeaderboard.map((club, index) => (
                <motion.div
                  key={club.clubId}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`p-6 rounded-2xl border backdrop-blur-xl transition-all ${
                    index === 0
                      ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50"
                      : index === 1
                      ? "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50"
                      : index === 2
                      ? "bg-gradient-to-r from-orange-700/20 to-orange-800/20 border-orange-700/50"
                      : "bg-background border-standard"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    {/* Rank */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl ${
                        index === 0
                          ? "bg-gradient-to-br from-yellow-500 to-orange-500 text-white"
                          : index === 1
                          ? "bg-gradient-to-br from-gray-400 to-gray-500 text-white"
                          : index === 2
                          ? "bg-gradient-to-br from-orange-700 to-orange-800 text-white"
                          : "bg-background text-text-body/40"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Club Info */}
                    <div className="flex items-center gap-4 flex-1">
                      {club.clubLogo ? (
                        <img
                          src={club.clubLogo}
                          alt={club.clubName}
                          className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                          {club.clubName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-lg text-text-heading">{club.clubName}</h4>
                        <div className="text-sm text-text-body/60">Rank #{index + 1}</div>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-3xl font-black text-primary">{club.points} pts</div>

                    {/* Metrics */}
                    <div className="flex gap-6 text-center">
                      <div>
                        <div className="text-lg font-bold text-text-heading">{club.metrics?.totalComments || 0}</div>
                        <div className="text-xs text-text-body/40 uppercase tracking-wider flex items-center gap-1 justify-center">
                          <FiMessageSquare size={12} /> Comments
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-text-heading">{club.metrics?.memberGrowth || 0}</div>
                        <div className="text-xs text-text-body/40 uppercase tracking-wider flex items-center gap-1 justify-center">
                          <FiUsers size={12} /> Members
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-text-heading">{club.metrics?.totalEvents || 0}</div>
                        <div className="text-xs text-text-body/40 uppercase tracking-wider flex items-center gap-1 justify-center">
                          <FiActivity size={12} /> Events
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {displayLeaderboard.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-body/40 font-medium">No clubs participating yet. Be the first to join the battle!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ClubWars;
