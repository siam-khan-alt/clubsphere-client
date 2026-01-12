import React, { useState, use } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FiMail, FiUser, FiShield, FiCalendar, FiEdit2 } from "react-icons/fi";
import UpdateProfileModal from "../../components/dashboard/UpdateProfileModal";

const Profile = () => {
  const { user, updateUser } = use(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const roleConfig = {
    admin: "bg-purple-600",
    clubManager: "bg-cyan-500",
    member: "bg-emerald-500",
  };

  const userRole = user?.role || "member";
  const roleBadgeColor = roleConfig[userRole] || roleConfig.member;

  return (
    <div className="p-4 md:p-8 flex justify-center items-center min-h-[85vh] bg-base-200/50">
      <div className="max-w-3xl w-full bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-content/5">
        <div className="h-32 w-full bg-primary/90"></div>

        <div className="px-6 md:px-10 pb-10">
          <div className="relative flex justify-between items-end -mt-16 mb-8">
            <div className="relative group">
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-36 h-36 rounded-2xl border-4 border-base-100 shadow-xl object-cover bg-base-100"
              />
              <div className="absolute -bottom-1 -right-1 bg-success w-6 h-6 rounded-full border-4 border-base-100 shadow-sm"></div>
            </div>
            
            <span className={`px-5 py-2 rounded-2xl text-xs font-bold uppercase tracking-widest text-white shadow-lg ${roleBadgeColor}`}>
              {userRole}
            </span>
          </div>

          <div className="space-y-1 mb-10">
            <h1 className="text-4xl font-black text-base-content tracking-tight">{user?.displayName}</h1>
            <p className="text-base-content/60 flex items-center gap-2 font-medium">
              User ID: <span className="text-xs font-mono bg-base-200 px-2 py-0.5 rounded-2xl">{user?.uid?.slice(0, 12)}...</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex items-center gap-4 p-5 bg-base-200/40 rounded-2xl border border-base-content/5 transition-colors">
              <div className="p-3 bg-base-100 rounded-2xl shadow-sm text-primary">
                <FiMail size={22} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-base-content/50 uppercase font-black">Email Address</p>
                <p className="text-sm font-semibold text-base-content truncate">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-base-200/40 rounded-2xl border border-base-content/5 transition-colors">
              <div className="p-3 bg-base-100 rounded-2xl shadow-sm text-secondary">
                <FiUser size={22} />
              </div>
              <div>
                <p className="text-[10px] text-base-content/50 uppercase font-black">Full Name</p>
                <p className="text-sm font-semibold text-base-content">{user?.displayName || "Not Set"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-base-200/40 rounded-2xl border border-base-content/5 transition-colors">
              <div className="p-3 bg-base-100 rounded-2xl shadow-sm text-accent">
                <FiShield size={22} />
              </div>
              <div>
                <p className="text-[10px] text-base-content/50 uppercase font-black">Platform Role</p>
                <p className="text-sm font-semibold text-base-content capitalize">{userRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-base-200/40 rounded-2xl border border-base-content/5 transition-colors">
              <div className="p-3 bg-base-100 rounded-2xl shadow-sm text-success">
                <FiCalendar size={22} />
              </div>
              <div>
                <p className="text-[10px] text-base-content/50 uppercase font-black">Account Status</p>
                <p className="text-sm font-semibold text-base-content italic text-success">Active Account</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 btn btn-primary rounded-2xl text-white font-black shadow-lg shadow-primary/20 flex items-center justify-center gap-3 transition-all"
            >
               <FiEdit2 size={18} /> Update Profile Information
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