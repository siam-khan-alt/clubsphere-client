import React, { useState, use } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FiMail, FiUser, FiShield, FiCalendar, FiEdit2, FiHash } from "react-icons/fi";
import UpdateProfileModal from "../../components/dashboard/UpdateProfileModal";

const Profile = () => {
  const { user, updateUser } = use(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const roleConfig = {
    admin: "from-purple-600 to-indigo-600",
    clubManager: "from-sky-500 to-blue-600",
    member: "from-emerald-500 to-teal-600",
  };

  const userRole = user?.role || "member";
  const roleGradient = roleConfig[userRole] || roleConfig.member;

  return (
    <div className="p-4 md:p-8 flex justify-center items-center min-h-[85vh] bg-background">
      <div className="max-w-4xl w-full bg-card rounded-2xl shadow-2xl shadow-primary/5 overflow-hidden border border-standard">
        
        {/* Header Banner */}
        <div className="h-40 w-full bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 plaid-bg relative">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card"></div>
        </div>

        <div className="px-6 md:px-12 pb-12">
          {/* Avatar & Role Section */}
          <div className="relative flex flex-col md:flex-row justify-between items-center md:items-end -mt-20 mb-10 gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[32px] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img
                src={user?.photoURL || "https://i.ibb.co/m0p99m8/user.png"}
                alt="Profile"
                className="relative w-40 h-40 rounded-[30px] border-4 border-card shadow-2xl object-cover bg-card"
              />
              <div className="absolute bottom-2 right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-card shadow-lg animate-pulse"></div>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-3">
               <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl bg-gradient-to-r ${roleGradient}`}>
                {userRole}
              </span>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-primary-gradient flex items-center gap-2 text-sm scale-90 md:scale-100"
              >
                <FiEdit2 size={16} /> Edit Profile
              </button>
            </div>
          </div>

          {/* User Basic Info */}
          <div className="text-center md:text-left mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-text-heading tracking-tight mb-2">
              {user?.displayName}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-primary/5 text-primary rounded-lg border border-primary/10">
                <FiHash size={14}/> {user?.uid?.slice(0, 8).toUpperCase()}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-secondary/5 text-secondary rounded-lg border border-secondary/10 font-mono">
                {userRole}@sphere
              </span>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard icon={<FiMail/>} label="Email Address" value={user?.email} color="text-primary" />
            <InfoCard icon={<FiUser/>} label="Full Name" value={user?.displayName || "Not Set"} color="text-secondary" />
            <InfoCard icon={<FiShield/>} label="Account Authority" value={`${userRole} access`} color="text-purple-500" />
            <InfoCard icon={<FiCalendar/>} label="Account Status" value="Active & Verified" color="text-emerald-500" />
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

const InfoCard = ({ icon, label, value, color }) => (
  <div className="group flex items-center gap-5 p-6 bg-background rounded-[24px] border border-standard/5 hover:border-primary/20 transition-all duration-300">
    <div className={`p-4 bg-card rounded-2xl shadow-sm ${color} group-hover:scale-110 transition-transform`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div className="overflow-hidden">
      <p className="text-[10px] text-text-body/50 uppercase font-black tracking-widest mb-1">{label}</p>
      <p className="text-sm md:text-base font-bold text-text-heading truncate">{value}</p>
    </div>
  </div>
);

export default Profile;