import React, { useState } from "react";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { FiX, FiCamera } from "react-icons/fi";
import toast from "react-hot-toast";
import useImageUploadMutations from "../../hooks/useImageUploadMutations";

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
      toast.success("Profile updated!");
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
      className="max-w-md w-full mx-auto mt-20 bg-card rounded-2xl outline-none p-0 shadow-2xl overflow-hidden border border-standard/10"
      overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-md z-[1000] flex justify-center items-start p-4"
    >
      <div className="relative p-8">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-primary/10 rounded-full transition text-text-body"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-2xl font-black text-text-heading mb-1 text-left">Edit Profile</h2>
        <p className="text-sm text-text-body mb-8">Update your personal identification.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-body/60 ml-1">Display Name</label>
            <input
              type="text"
              defaultValue={user?.displayName}
              {...register("name", { required: "Name is required" })}
              className="input-field-custom w-full"
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-body/60 ml-1">Profile Picture</label>
            <div className="relative">
               <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="w-full text-xs text-text-body file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer bg-background rounded-2xl border border-standard/5"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl font-bold text-text-body bg-background hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || isUpdating}
              className="btn-primary-gradient flex-1 flex items-center justify-center gap-2"
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