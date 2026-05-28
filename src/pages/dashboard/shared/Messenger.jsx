import React, { useState, useEffect, useRef } from "react";
import { FiMessageSquare, FiUsers, FiSend, FiMoreVertical } from "react-icons/fi";
import { getUserChatRooms, getRoomMessages } from "../../../utils/chatService";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../context/AuthContext";
import { io } from "socket.io-client";

const Messenger = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch chat rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getUserChatRooms();
        setRooms(data);
        if (data.length > 0 && !activeRoom) {
          setActiveRoom(data[0]);
        }
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Initialize Socket.io connection
  useEffect(() => {
    if (user) {
      const newSocket = io(SOCKET_URL, {
        auth: {
          token: user.accessToken,
        },
      });

      setSocket(newSocket);

      newSocket.on("receive_message", (message) => {
        if (activeRoom && message.roomId === activeRoom._id) {
          setMessages((prev) => [...prev, message]);
        }
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  // Join room when active room changes
  useEffect(() => {
    if (socket && activeRoom) {
      socket.emit("join_room", activeRoom._id);
      fetchMessages(activeRoom._id);
    }
  }, [socket, activeRoom]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async (roomId) => {
    try {
      const data = await getRoomMessages(roomId);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && socket && activeRoom) {
      socket.emit("send_message", {
        roomId: activeRoom._id,
        senderEmail: user.email,
        messageText: newMessage,
      });
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getRoomName = (room) => {
    if (room.type === "group") {
      return room.clubName || room.name;
    }
    return room.participants.find((p) => p !== user.email) || "Unknown";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="text-white text-xl">Loading messenger...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex">
      {/* Left Panel - Chat Rooms */}
      <div className="w-80 bg-black/30 backdrop-blur-lg border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <FiMessageSquare className="text-purple-400" />
            Messenger
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {rooms.length === 0 ? (
            <div className="text-white/60 text-center py-8">
              No conversations yet
            </div>
          ) : (
            rooms.map((room) => (
              <div
                key={room._id}
                onClick={() => setActiveRoom(room)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  activeRoom?._id === room._id
                    ? "bg-purple-600/30 border border-purple-500/50"
                    : "bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    {room.type === "group" ? (
                      <FiUsers className="text-white text-xl" />
                    ) : (
                      <div className="text-white text-lg font-bold">
                        {getRoomName(room).charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate">
                      {getRoomName(room)}
                    </h3>
                    <p className="text-white/60 text-sm truncate">
                      {room.type === "group" ? "Group Chat" : "Direct Message"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Panel - Chat Window */}
      <div className="flex-1 flex flex-col">
        {activeRoom ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-black/30 backdrop-blur-lg border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  {activeRoom.type === "group" ? (
                    <FiUsers className="text-white" />
                  ) : (
                    <div className="text-white font-bold">
                      {getRoomName(activeRoom).charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    {getRoomName(activeRoom)}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {activeRoom.type === "group" ? "Group Chat" : "Direct Message"}
                  </p>
                </div>
              </div>
              <button className="text-white/60 hover:text-white transition-colors">
                <FiMoreVertical className="text-xl" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {messages.length === 0 ? (
                <div className="text-white/60 text-center py-12">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                messages.map((message) => {
                  const isOwnMessage = message.senderEmail === user.email;
                  return (
                    <div
                      key={message._id}
                      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                          isOwnMessage
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "bg-white/10 text-white border border-white/20"
                        }`}
                      >
                        {!isOwnMessage && (
                          <p className="text-xs text-white/60 mb-1">
                            {message.senderEmail}
                          </p>
                        )}
                        <p className="text-sm">{message.messageText}</p>
                        <p
                          className={`text-xs mt-1 ${
                            isOwnMessage ? "text-white/80" : "text-white/60"
                          }`}
                        >
                          {formatTime(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-4 bg-black/30 backdrop-blur-lg border-t border-white/10">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <span>Send</span>
                  <FiSend />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white/60 text-center">
              <FiMessageSquare className="text-6xl mx-auto mb-4 opacity-50" />
              <p className="text-xl">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messenger;
