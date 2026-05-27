import React, { useState, useEffect, useRef } from "react";
import { FiBell, FiX, FiCheck, FiClock, FiCalendar, FiUser, FiAlertCircle } from "react-icons/fi";
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } from "../../utils/notificationService";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const { user } = use(AuthContext);

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user?.accessToken) return;
    
    setLoading(true);
    try {
      const data = await getNotifications(user.accessToken);
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.isRead).length);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and periodic refresh
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [user?.accessToken]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mark notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId, user.accessToken);
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, isRead: true, readAt: new Date() } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead(user.accessToken);
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true, readAt: new Date() }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  // Delete notification
  const handleDelete = async (notificationId, event) => {
    event.stopPropagation();
    try {
      await deleteNotification(notificationId, user.accessToken);
      setNotifications((prev) => {
        const deleted = prev.find((n) => n._id === notificationId);
        if (deleted && !deleted.isRead) {
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
        return prev.filter((n) => n._id !== notificationId);
      });
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "club_join":
        return <FiUser className="text-primary" />;
      case "event_registration":
        return <FiCalendar className="text-secondary" />;
      case "membership_status":
        return <FiCheck className="text-green-500" />;
      case "membership_expiration":
        return <FiAlertCircle className="text-orange-500" />;
      default:
        return <FiBell className="text-primary" />;
    }
  };

  // Format notification time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-primary/5 text-primary hover:bg-primary/10 transition-all active:scale-95"
        title="Notifications"
      >
        <FiBell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div
          style={{ backgroundColor: "var(--color-card)" }}
          className="absolute right-0 top-12 w-96 max-h-[500px] rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-lg text-primary">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs font-semibold text-primary hover:text-secondary transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto max-h-[400px]">
            {loading ? (
              <div className="p-8 flex justify-center">
                <LoadingSpinner />
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center">
                <FiBell size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No notifications yet
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  onClick={() => !notification.isRead && handleMarkAsRead(notification._id)}
                  className={`p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                    !notification.isRead ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-sm text-primary truncate">
                          {notification.title}
                        </p>
                        <span className="text-xs text-slate-400 flex-shrink-0">
                          {formatTime(notification.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={(e) => handleDelete(notification._id, e)}
                      className="flex-shrink-0 p-1 text-slate-400 hover:text-error transition-colors"
                      title="Delete notification"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
