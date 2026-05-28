const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Get all available achievements
 * @returns {Promise<Array>} All achievements
 */
export const getAllAchievements = async () => {
  const response = await fetch(`${API_BASE}/achievements/`);
  if (!response.ok) {
    throw new Error("Failed to get achievements");
  }
  return response.json();
};

/**
 * Get user's earned achievements
 * @param {string} token - Firebase auth token
 * @returns {Promise<Object>} User achievements with stats
 */
export const getUserAchievements = async (token) => {
  const response = await fetch(`${API_BASE}/achievements/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to get user achievements");
  }
  return response.json();
};

/**
 * Get user stats for progress tracking
 * @param {string} token - Firebase auth token
 * @returns {Promise<Object>} User stats
 */
export const getUserStats = async (token) => {
  const response = await fetch(`${API_BASE}/achievements/user/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to get user stats");
  }
  return response.json();
};
