import React, { useState, use } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FiMail, FiUser, FiShield, FiCalendar, FiEdit2 } from "react-icons/fi";
import UpdateProfileModal from "../../components/dashboard/UpdateProfileModal";

const Profile = () => {
  const { user, updateUser } = use(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const roleStyles = {
    admin: { bg: "#7C3AED", text: "#FFFFFF" },
    clubManager: { bg: "#06B6D4", text: "#FFFFFF" },
    member: { bg: "#00CC99", text: "#FFFFFF" },
  };

  const userRole = user?.role || "member";
  const currentStyle = roleStyles[userRole] || roleStyles.member;

  return (
    <div className="p-6 flex justify-center items-center min-h-[80vh] bg-[#F8F9FA]">
      <div className="max-w-2xl w-full bg-[#FFFFFF] rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="h-32 w-full" style={{ backgroundColor: "#7C3AED" }}></div>

        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-16 mb-6">
            <div className="relative">
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-2xl border-4 border-[#FFFFFF] shadow-md object-cover bg-[#FFFFFF]"
              />
              <div className="absolute -bottom-2 -right-2 bg-[#00CC99] w-5 h-5 rounded-full border-2 border-[#FFFFFF]"></div>
            </div>
            <span 
              className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: currentStyle.bg, color: currentStyle.text }}
            >
              {userRole}
            </span>
          </div>

          <div className="space-y-1 mb-8">
            <h1 className="text-3xl font-bold text-[#34495E]">{user?.displayName}</h1>
            <p className="text-[#6B7280] flex items-center gap-1 italic">
              User ID: <span className="text-xs font-mono">{user?.uid?.slice(0, 10)}...</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 bg-[#F8F9FA] rounded-2xl border border-gray-100">
              <div className="p-3 bg-[#FFFFFF] rounded-xl shadow-sm text-[#06B6D4]">
                <FiMail size={20} />
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase font-semibold">Email Address</p>
                <p className="text-sm font-medium text-[#34495E] truncate">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#F8F9FA] rounded-2xl border border-gray-100">
              <div className="p-3 bg-[#FFFFFF] rounded-xl shadow-sm text-[#7C3AED]">
                <FiUser size={20} />
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase font-semibold">Full Name</p>
                <p className="text-sm font-medium text-[#34495E]">{user?.displayName || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#F8F9FA] rounded-2xl border border-gray-100">
              <div className="p-3 bg-[#FFFFFF] rounded-xl shadow-sm text-[#06B6D4]">
                <FiShield size={20} />
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase font-semibold">Platform Role</p>
                <p className="text-sm font-medium text-[#34495E] capitalize">{userRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#F8F9FA] rounded-2xl border border-gray-100">
              <div className="p-3 bg-[#FFFFFF] rounded-xl shadow-sm text-[#00CC99]">
                <FiCalendar size={20} />
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase font-semibold">Status</p>
                <p className="text-sm font-medium text-[#34495E]">Active Account</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3 text-white font-bold rounded-2xl transition shadow-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "#7C3AED" }}
            >
               <FiEdit2 /> Update Profile Info
            </button>
          </div>
        </div>
      </div>

      <UpdateProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        onUpdate={updateUser}
      />
    </div>
  );
};

export default Profile;