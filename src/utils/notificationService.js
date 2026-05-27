const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

/**
 * Get user notifications
 * @param {string} token - Firebase auth token
 * @returns {Promise<Array>} User notifications
 */
export const getNotifications = async (token) => {
  const response = await fetch(`${API_BASE}/notifications/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
};

/**
 * Mark notification as read
 * @param {string} notificationId - Notification ID
 * @param {string} token - Firebase auth token
 * @returns {Promise<Object>} Update result
 */
export const markNotificationAsRead = async (notificationId, token) => {
  const response = await fetch(
    `${API_BASE}/notifications/${notificationId}/read`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to mark notification as read");
  }

  return response.json();
};

/**
 * Mark all notifications as read
 * @param {string} token - Firebase auth token
 * @returns {Promise<Object>} Update result
 */
export const markAllNotificationsAsRead = async (token) => {
  const response = await fetch(`${API_BASE}/notifications/read-all`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to mark all notifications as read");
  }

  return response.json();
};

/**
 * Delete notification
 * @param {string} notificationId - Notification ID
 * @param {string} token - Firebase auth token
 * @returns {Promise<Object>} Delete result
 */
export const deleteNotification = async (notificationId, token) => {
  const response = await fetch(`${API_BASE}/notifications/${notificationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete notification");
  }

  return response.json();
};
