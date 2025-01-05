import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "@/Context/UserContext";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "@/api/axios";


const Notifications = () => {
  const { userToken } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(
          "/api/v1/auth/notification/",
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        setNotifications(response.data.notifications);
      } catch {
        setError("Failed to fetch notifications.");
        toast.error("Error fetching notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval);
  }, [userToken]);

  const markAsRead = async (notificationId) => {
    try {
      await api.patch(
        `/api/v1/auth/notification/${notificationId}/read`,
        null,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, isRead: true } : n
        )
      );
      toast.success("Notification marked as read.");
    } catch {
      toast.error("Failed to mark notification as read.");
    }
  };

  return (
    <div className="notifications-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/images/notification-alert.svg"
          width={36}
          height={36}
          alt="Notification"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Notifications</h2>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && notifications.length === 0 && (
        <p>No notifications yet.</p>
      )}

      <div className="notifications-list">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className={`notification-items ${!notification.isRead ? "unread" : ""
              }`}
            onClick={() => markAsRead(notification._id)}
          >
            <div className="notification-icon">
              <div className="notification-icon-wrapper">
                {notification.type === "like" && (
                  <img src="/assets/images/like.svg" alt="Like" />
                )}
                {notification.type === "comment" && (
                  <img src="/assets/images/chat.svg" alt="Comment" />
                )}
                {notification.type === "follow" && (
                  <img src="/assets/images/follow.svg" alt="Follow" />
                )}
                {notification.type === "newPost" && (
                  <img src="/assets/images/follow.svg" alt="New Post" />
                )}
              </div>
            </div>

            <Link
              to={`/profile/${notification.sender._id}`}
              className="notification-avatar"
            >
              <img
                src={notification.sender.profileImage.secure_url}
                alt={notification.sender.firstName}
                className="w-10 h-10 lg:w-20 lg:h-20 rounded-full"
              />
            </Link>

            <div className="flex gap-1 flex-col">
              <div className="flex gap-1">
                <p className="base-medium lg:body-bold text-light-1">
                  {notification.sender.firstName}{" "}
                  {notification.sender.lastName}
                </p>
                <p className="Notification-content">{notification.content}</p>
              </div>
              <span className="subtle-semibold lg:small-regular text-light-3">
                {new Date(notification.createdAt).toLocaleTimeString()}
              </span>
            </div>

            {!notification.isRead && (
              <div className="notification-unread-dot"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
