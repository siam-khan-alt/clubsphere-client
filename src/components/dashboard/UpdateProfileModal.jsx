import React, { useState } from "react";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import useImageUploadMutations from "../../hooks/useImageUploadMutations";

ReactModal.setAppElement("#root");

const UpdateProfileModal = ({ isOpen, onClose, user, onUpdate }) => {
  const { register, handleSubmit, reset } = useForm();
  const { mutateAsync: uploadImage, isPending: isUploading } = useImageUploadMutations();
  const [isUpdating, setIsUpdating] = useState(false);

  const onSubmit = async (data) => {
    setIsUpdating(true);
    try {
      let imageURL = user?.photoURL;
      if (data.image && data.image[0]) {
        imageURL = await uploadImage(data.image[0]);
      }
      await onUpdate(data.name, imageURL);
      toast.success("Profile updated successfully!");
      onClose();
      reset();
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Update Profile Modal"
      className="max-w-md w-full mx-auto mt-20 bg-white rounded-3xl outline-none p-0 shadow-2xl overflow-hidden"
      overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex justify-center items-start p-4"
    >
      <div className="relative p-8">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition text-[#6B7280]"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-2xl font-bold text-[#34495E] mb-2">Edit Profile</h2>
        <p className="text-sm text-[#6B7280] mb-6">Change your display name or profile picture.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#34495E] mb-2">Full Name</label>
            <input
              type="text"
              defaultValue={user?.displayName}
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 bg-white text-[#34495E]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#34495E] mb-2">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#7C3AED]/10 file:text-[#7C3AED] hover:file:bg-[#7C3AED]/20 cursor-pointer"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-semibold text-[#34495E] bg-gray-100 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || isUpdating}
              className="flex-1 py-3 rounded-xl font-semibold text-white bg-[#7C3AED] hover:bg-indigo-700 transition flex items-center justify-center shadow-lg shadow-purple-200"
            >
              {isUploading || isUpdating ? (
                <TbFidgetSpinner className="animate-spin text-xl" />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default UpdateProfileModal;