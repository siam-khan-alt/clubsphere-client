import React, { useEffect, useState } from "react";
import { FiX, FiEdit, FiSave } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { format, isValid, parse } from "date-fns";
import ReactModal from "react-modal";
import uploadImageToImgBB from "../../../utils/imgbb";
import { TbFidgetSpinner } from "react-icons/tb";

const EditEventModal = ({ isOpen, onClose, eventToEdit }) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const isPaidWatch = watch("isPaid", eventToEdit?.isPaid ? "true" : "false");

  useEffect(() => {
    if (eventToEdit) {
      reset({
        title: eventToEdit.title,
        description: eventToEdit.description,
        eventDate: format(new Date(eventToEdit.eventDate), "yyyy-MM-dd"),
        eventTime: eventToEdit.eventTime,
        location: eventToEdit.location,
        bannerImage: eventToEdit.bannerImage || "",
        isPaid: eventToEdit.isPaid ? "true" : "false",
        eventFee: eventToEdit.eventFee,
        maxAttendees: eventToEdit.maxAttendees || "",
      });
    }
  }, [eventToEdit, reset]);

  const updateEventMutation = useMutation({
    mutationFn: async (eventData) => {
      const res = await axiosSecure.patch(
        `/manager/events/${eventToEdit._id}`,
        eventData
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Event updated successfully.", "success");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["managerEvents"] });
    },
    onError: (error) => {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to update event.",
        "error"
      );
    },
  });

  const onSubmit = async (data) => {
    const { bannerImage, ...restData } = data;
    const imageFile = bannerImage?.length > 0 ? bannerImage[0] : null;
    let imageUrl = eventToEdit.bannerImage;
    if (imageFile instanceof File) {
      setIsImageUploading(true);
      try {
        imageUrl = await uploadImageToImgBB(imageFile);
      } catch {
        Swal.fire(
          "Upload Failed!",
          "Could not upload new banner image.",
          "error"
        );
        setIsImageUploading(false);
        return;
      }
      setIsImageUploading(false);
    }
    const dateTimeString = `${data.eventDate} ${data.eventTime}`;
    let parsedDate = parse(dateTimeString, "yyyy-MM-dd HH:mm", new Date());

    if (!isValid(parsedDate)) {
      parsedDate = parse(dateTimeString, "yyyy-MM-dd hh:mm a", new Date());
    }

    if (!isValid(parsedDate)) {
      Swal.fire("Error!", "Invalid Date or Time format.", "error");
      return;
    }
    const payload = {
      ...restData,
      bannerImage: imageUrl,
      eventDate: parsedDate.toISOString(),
      eventFee: data.isPaid === "true" ? parseFloat(data.eventFee) : 0,
      isPaid: data.isPaid === "true",
    };
    updateEventMutation.mutate(payload);
  };
  const overallLoading = updateEventMutation.isPending || isImageUploading;

  if (!isOpen || !eventToEdit) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-[#F8F9FA] rounded-3xl shadow-2xl w-[350px] md:w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 sm:max-w-2xl"
      overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex justify-center items-center p-4"
    >
      <div>
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className=" flex items-center">
            <FiEdit className="mr-2" /> Edit Event: {eventToEdit.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <p className="text-sm text-gray-500">Club:{eventToEdit.clubName}</p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title :
            </label>
            <input
              type="text"
              {...register("title", { required: "Event title is required" })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description :
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date :
              </label>
              <input
                type="date"
                {...register("eventDate", { required: "Date is required" })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.eventDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.eventDate.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time :
              </label>
              <input
                type="time"
                {...register("eventTime", { required: "Time is required" })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="HH:MM AM/PM"
              />
              {errors.eventTime && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.eventTime.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">
                {errors.location.message}
              </p>
            )}
          </div>
          <div className="bg-[#F8F9FA] p-4 rounded-2xl border  border-gray-300">
            <label className="block text-xs font-bold text-[#6B7280] uppercase mb-2 tracking-wider">
              Update Event Banner
            </label>
            <input
              type="file"
              {...register("bannerImage")}
              className="w-full text-sm text-gray-500 
                                       file:mr-4 file:py-2 file:px-4 
                                       file:rounded-xl file:border-0 
                                       file:text-xs file:font-bold 
                                       file:bg-[#7C3AED]/10 file:text-[#7C3AED] 
                                       hover:file:bg-[#7C3AED]/20 cursor-pointer"
              accept="image/*"
            />
            <p className="mt-2 text-[10px] text-gray-400">
              Existing: {eventToEdit.bannerImage?.substring(0, 30)}...
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Is Event Paid? 
              </label>
              <select
                {...register("isPaid", { required: "This field is required" })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="false">Free Event</option>
                <option value="true">Paid Event</option>
              </select>
              {errors.isPaid && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.isPaid.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Fee ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("eventFee", {
                  min: { value: 0, message: "Fee cannot be negative" },
                  required:
                    isPaidWatch === "true"
                      ? "Fee is required for paid event"
                      : false,
                })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                defaultValue={0}
                disabled={isPaidWatch === "false"}
              />
              {errors.eventFee && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.eventFee.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Attendees (Optional)
            </label>
            <input
              type="number"
              {...register("maxAttendees", {
                min: { value: 1, message: "Must be at least 1" },
              })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="E.g., 50"
            />
            {errors.maxAttendees && (
              <p className="text-red-500 text-xs mt-1">
                {errors.maxAttendees.message}
              </p>
            )}
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-semibold text-[#6B7280] bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-[2] py-3 rounded-xl font-bold text-white bg-[#7C3AED] hover:bg-indigo-700 transition flex items-center justify-center shadow-lg shadow-purple-100 disabled:opacity-50"
            disabled={overallLoading}
          >
            {overallLoading ? (
              <TbFidgetSpinner className="animate-spin text-xl" />
            ) : (
              <>
                <FiSave className="mr-2" /> Save Changes
              </>
            )}
          </button></div>
        </form>
      </div>
    </ReactModal>
  );
};

export default EditEventModal;
