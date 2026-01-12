import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiSave, FiX, FiImage, FiUploadCloud } from "react-icons/fi";
import uploadImageToImgBB from "../../../utils/imgbb";
import { TbFidgetSpinner } from "react-icons/tb";

const UpdateClubModal = ({ club, onClose }) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      clubName: club.clubName,
      description: club.description,
      category: club.category,
      location: club.location,
      membershipFee: club.membershipFee,
    },
  });

  const selectedFile = watch("bannerImage");

  const updateClubMutation = useMutation({
    mutationFn: async (updatedData) =>
      axiosSecure.patch(`/clubs/${club._id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myClubsForManager"] });
      onClose();
      Swal.fire({
        icon: "success",
        title: "Updated!",
        showConfirmButton: false,
        timer: 2000,
        customClass: { popup: "rounded-2xl" },
      });
    },
    onError: (error) => {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to update.",
        "error"
      );
    },
  });

  const onSubmit = async (data) => {
    const { bannerImage, membershipFee, ...restClubData } = data;
    const imageFile = bannerImage?.length > 0 ? bannerImage[0] : null;
    let imageUrl = club.bannerImage;

    if (imageFile) {
      setIsImageUploading(true);
      try {
        imageUrl = await uploadImageToImgBB(imageFile);
      } catch (error) {
        Swal.fire("Upload Failed!", "Could not upload new image.", "error");
        setIsImageUploading(false);
        return;
      }
      setIsImageUploading(false);
    }

    updateClubMutation.mutate({
      ...restClubData,
      bannerImage: imageUrl,
      membershipFee: parseFloat(membershipFee) || 0,
    });
  };

  const overallLoading = updateClubMutation.isPending || isImageUploading;

  return (
    <div className="fixed inset-0 bg-base-content/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-base-100 rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden border border-base-content/5 animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-base-content/5 flex justify-between items-center bg-base-100/50 backdrop-blur-sm sticky top-0 z-10">
          <h3 className="text-xl font-black text-base-content tracking-tight">
            Edit Club Details
          </h3>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-circle btn-sm hover:rotate-90 transition-transform"
          >
            <FiX size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar"
        >
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 ml-1">
              Club Name
            </label>
            <input
              type="text"
              {...register("clubName", { required: "Name is required" })}
              className="input input-bordered w-full rounded-2xl font-bold focus:ring-primary/20"
            />
            {errors.clubName && (
              <p className="text-error text-[10px] font-bold px-1">
                {errors.clubName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 ml-1">
              Description
            </label>
            <textarea
              {...register("description", { required: "Required" })}
              rows="3"
              className="textarea textarea-bordered w-full rounded-2xl font-bold focus:ring-primary/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 ml-1">
                Category
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered w-full rounded-2xl font-bold"
              >
                <option value="Technology">Technology</option>
                <option value="Photography">Photography</option>
                <option value="Sports">Sports</option>
                <option value="Art">Art</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 ml-1">
                Fee ($)
              </label>
              <input
                type="number"
                step="any"
                {...register("membershipFee")}
                className="input input-bordered w-full rounded-2xl font-bold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 ml-1">
              Location
            </label>
            <input
              type="text"
              {...register("location", { required: true })}
              className="input input-bordered w-full rounded-2xl font-bold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 ml-1">
              Club Banner
            </label>
            <div className="relative group">
              <input
                type="file"
                {...register("bannerImage")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                accept="image/*"
              />
              <div className="p-6 rounded-2xl border-2 border-dashed border-base-content/10 bg-base-200/30 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2">
                <FiUploadCloud className="text-primary text-2xl animate-bounce" />
                <span className="text-xs font-black uppercase tracking-tighter text-base-content/60">
                  {selectedFile?.[0] ? selectedFile[0].name : "Choose New Banner"}
                </span>
                <span className="text-[10px] font-bold text-base-content/30 tracking-tight italic">
                  Current: {club.bannerImage.split("/").pop().substring(0, 20)}...
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex gap-3 sticky bottom-0 bg-base-100 pb-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost flex-1 rounded-2xl font-black uppercase text-xs tracking-widest border border-base-content/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={overallLoading}
              className="btn btn-primary flex-[2] rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/20"
            >
              {overallLoading ? (
                <TbFidgetSpinner className="animate-spin text-lg" />
              ) : (
                <>
                  <FiSave /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateClubModal;