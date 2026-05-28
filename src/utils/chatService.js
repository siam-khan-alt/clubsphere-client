import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Get all chat rooms for the current user
export const getUserChatRooms = async () => {
  const response = await axios.get(`${API_URL}/chat/rooms`);
  return response.data;
};

// Get messages for a specific room
export const getRoomMessages = async (roomId) => {
  const response = await axios.get(`${API_URL}/chat/rooms/${roomId}/messages`);
  return response.data;
};

// Create or get direct message room
export const createDirectRoom = async (targetEmail) => {
  const response = await axios.post(`${API_URL}/chat/rooms/direct`, {
    targetEmail,
  });
  return response.data;
};
