import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiSave } from "react-icons/fi";
import uploadImageToImgBB from "../../../utils/imgbb";

const UpdateClubModal = ({ club, onClose }) => {
  const [isImageUploading, setIsImageUploading] = useState(false);

  const {
    register,
    handleSubmit,
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

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const updateClubMutation = useMutation({
    mutationFn: async (updatedData) => {
      return axiosSecure.patch(`/clubs/${club._id}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myClubsForManager"] });
      onClose();
      Swal.fire({
        icon: "success",
        title: "Club Updated!",
        text: `${club.clubName} details have been successfully modified.`,
        showConfirmButton: false,
        timer: 2000,
      });
    },
    onError: (error) => {
      console.error("Club update failed:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Failed to update club details.",
      });
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
        Swal.fire(
          "Upload Failed!",
          error.message || "Could not upload new image.",
          "error"
        );
        setIsImageUploading(false);
        return;
      }
      setIsImageUploading(false);
    }

    const finalClubData = {
      ...restClubData,
      bannerImage: imageUrl,
      membershipFee: parseFloat(membershipFee) || 0,
    };

    updateClubMutation.mutate(finalClubData);
  };

  const overallLoading = updateClubMutation.isPending || isImageUploading;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Club: {club.clubName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Club Name
            </label>
            <input
              type="text"
              {...register("clubName", { required: "Club Name is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
            {errors.clubName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.clubName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border bg-white"
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Photography">Photography</option>
                <option value="Sports">Sports</option>
                <option value="Art">Art</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Membership Fee ($)
              </label>
              <input
                type="number"
                step="any"
                {...register("membershipFee", {
                  min: { value: 0, message: "Fee cannot be negative" },
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
              {errors.membershipFee && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.membershipFee.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location (City)
            </label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">
                {errors.location.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Update Banner Image (Will be uploaded to ImgBB)
            </label>
            <input
              type="file"
              {...register("bannerImage")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              accept="image/*"
            />
            <p className="mt-1 text-xs text-gray-500">
              Leave blank to keep the existing image. **Current URL:**{" "}
              <a
                href={club.bannerImage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline truncate inline-block max-w-xs"
              >
                {club.bannerImage.substring(0, 40)}...
              </a>
            </p>
            {errors.bannerImage && (
              <p className="text-red-500 text-xs mt-1">
                {errors.bannerImage.message}
              </p>
            )}
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition ${
                overallLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={overallLoading}
            >
              {overallLoading ? (
                isImageUploading ? (
                  "Uploading Image..."
                ) : (
                  "Updating..."
                )
              ) : (
                <>
                  <FiSave className="w-4 h-4 mr-1" /> Save Changes
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
