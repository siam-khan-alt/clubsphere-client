import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../context/AuthContext";
import { getUserAchievements, getAllAchievements, getUserStats } from "../../../utils/achievementService";
import { FiAward, FiTrophy, FiTarget, FiLock, FiUnlock } from "react-icons/fi";
import DashboardHeader from "../../../components/shared/ui/DashboardHeader";

const Achievements = () => {
  const { user } = React.useContext(AuthContext);

  const { data: userAchievements, isLoading: isLoadingUser } = useQuery({
    queryKey: ["userAchievements"],
    queryFn: async () => {
      const token = await user.getIdToken();
      return await getUserAchievements(token);
    },
    enabled: !!user,
  });

  const { data: allAchievements, isLoading: isLoadingAll } = useQuery({
    queryKey: ["allAchievements"],
    queryFn: async () => await getAllAchievements(),
  });

  const { data: userStats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["userStats"],
    queryFn: async () => {
      const token = await user.getIdToken();
      return await getUserStats(token);
    },
    enabled: !!user,
  });

  if (isLoadingUser || isLoadingAll || isLoadingStats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const earnedBadges = userAchievements?.achievements || [];
  const totalPoints = userAchievements?.totalPoints || 0;
  const totalEarned = userAchievements?.totalEarned || 0;
  const allBadges = allAchievements || [];

  const earnedBadgeIds = earnedBadges.map((b) => b.achievementId);

  return (
    <div className="pb-10">
      <DashboardHeader
        title="Achievements"
        description="Track your progress and earn badges for completing various activities"
        badgeText="Member"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border-standard rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-amber-500/20 rounded-xl">
              <FiAward className="text-amber-500 text-xl" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-body/40">
                Badges Earned
              </p>
              <p className="text-2xl font-black text-text-heading">{totalEarned}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border-standard rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-primary/20 rounded-xl">
              <FiTrophy className="text-primary text-xl" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-body/40">
                Total Points
              </p>
              <p className="text-2xl font-black text-primary">{totalPoints}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border-standard rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <FiTarget className="text-emerald-500 text-xl" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-body/40">
                Progress
              </p>
              <p className="text-2xl font-black text-emerald-500">
                {totalEarned} / {allBadges.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* All Achievements Grid */}
      <div className="bg-card border-standard rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-black text-text-heading uppercase tracking-tight mb-6">
          All Achievements
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allBadges.map((badge) => {
            const isEarned = earnedBadgeIds.includes(badge.id);
            const userValue = userStats?.[badge.condition.field] || 0;
            const requiredValue = badge.condition.value;
            const progress = Math.min((userValue / requiredValue) * 100, 100);

            return (
              <div
                key={badge.id}
                className={`relative p-5 rounded-2xl border transition-all ${
                  isEarned
                    ? "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300 dark:from-amber-900/20 dark:to-amber-800/20 dark:border-amber-700"
                    : "bg-background border-standard opacity-60"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
                      isEarned
                        ? "bg-gradient-to-br from-amber-400 to-amber-600"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    {isEarned ? badge.icon : <FiLock className="text-gray-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-black text-text-heading">{badge.name}</h4>
                      {isEarned ? (
                        <FiUnlock className="text-emerald-500" size={16} />
                      ) : (
                        <FiLock className="text-text-body/40" size={16} />
                      )}
                    </div>
                    <p className="text-xs text-text-body/70 mb-3">{badge.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            isEarned
                              ? "bg-emerald-500"
                              : "bg-primary"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-text-body/60">
                        {userValue} / {requiredValue}
                      </span>
                    </div>
                  </div>
                </div>

                {isEarned && (
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    +{badge.points} pts
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
