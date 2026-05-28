const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Get user's referral code and stats
 * @param {string} token - Firebase auth token
 * @returns {Promise<Object>} Referral data
 */
export const getReferralCode = async (token) => {
  const response = await fetch(`${API_BASE}/referrals/code`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to get referral code");
  }
  return response.json();
};

/**
 * Track referral sign-up
 * @param {string} referralCode - Referral code
 * @param {string} token - Firebase auth token
 * @returns {Promise<Object>} Tracking result
 */
export const trackReferralSignup = async (referralCode, token) => {
  const response = await fetch(`${API_BASE}/referrals/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ referralCode }),
  });
  if (!response.ok) {
    throw new Error("Failed to track referral");
  }
  return response.json();
};

/**
 * Get referral stats
 * @param {string} token - Firebase auth token
 * @returns {Promise<Object>} Referral stats
 */
export const getReferralStats = async (token) => {
  const response = await fetch(`${API_BASE}/referrals/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to get referral stats");
  }
  return response.json();
};
