import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../context/AuthContext";
import { getUserAchievements } from "../../../utils/achievementService";
import { FiAward, FiTrophy } from "react-icons/fi";
import { Link } from "react-router-dom";

const BadgeDisplay = ({ limit = 3 }) => {
  const { user } = React.useContext(AuthContext);

  const { data: achievementData, isLoading } = useQuery({
    queryKey: ["userAchievements"],
    queryFn: async () => {
      const token = await user.getIdToken();
      return await getUserAchievements(token);
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="bg-card border-standard rounded-2xl p-6 shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 w-12 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </div>
    );
  }

  const achievements = achievementData?.achievements || [];
  const totalPoints = achievementData?.totalPoints || 0;
  const displayBadges = achievements.slice(0, limit);

  return (
    <div className="bg-card border-standard rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 rounded-xl">
            <FiAward className="text-amber-500 text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-black text-text-heading uppercase tracking-tight">
              Achievements
            </h3>
            <p className="text-xs text-text-body/60">
              {achievements.length} earned • {totalPoints} points
            </p>
          </div>
        </div>
        {achievements.length > limit && (
          <Link
            to="/dashboard/member/achievements"
            className="text-xs font-bold text-primary hover:underline"
          >
            View All
          </Link>
        )}
      </div>

      {displayBadges.length === 0 ? (
        <div className="py-8 text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-background rounded-full flex items-center justify-center">
            <FiTrophy className="text-text-body/30 text-2xl" />
          </div>
          <p className="text-xs text-text-body/50 font-medium">
            No achievements yet. Start exploring!
          </p>
        </div>
      ) : (
        <div className="flex gap-3 flex-wrap">
          {displayBadges.map((badge) => (
            <div
              key={badge.achievementId}
              className="relative group"
              title={`${badge.name}: ${badge.description} (+${badge.points} pts)`}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
                {badge.icon}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                {badge.points}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;
