import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiSave, FiX, FiUploadCloud, FiFileText, FiCalendar, FiMapPin } from "react-icons/fi";
import uploadImageToImgBB from "../../../utils/imgbb";
import { TbFidgetSpinner } from "react-icons/tb";

const EditEventModal = ({ event, onClose }) => {
    const [isImageUploading, setIsImageUploading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            title: event?.title,
            description: event?.description,
            date: event?.date?.split('T')[0],
            location: event?.location,
        },
    });

    const selectedFile = watch("eventImage");

    const updateEventMutation = useMutation({
        mutationFn: async (updatedData) => axiosSecure.patch(`/events/${event._id}`, updatedData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            onClose();
            Swal.fire({
                icon: "success",
                title: "Event Updated!",
                showConfirmButton: false,
                timer: 1500,
                customClass: { popup: "rounded-2xl" }
            });
        },
    });

    const onSubmit = async (data) => {
        const imageFile = data.eventImage?.length > 0 ? data.eventImage[0] : null;
        let imageUrl = event.eventImage;

        if (imageFile) {
            setIsImageUploading(true);
            try {
                imageUrl = await uploadImageToImgBB(imageFile);
            } catch (error) {
                Swal.fire("Error", "Image upload failed", "error");
                return;
            } finally { setIsImageUploading(false); }
        }

        updateEventMutation.mutate({ ...data, eventImage: imageUrl });
    };

    const overallLoading = updateEventMutation.isPending || isImageUploading;

    return (
        <div className="fixed inset-0 bg-base-content/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-base-100 dark:bg-slate-900 rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden border border-base-content/5 animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-base-content/5 flex justify-between items-center">
                    <h3 className="text-xl font-black text-base-content tracking-tight uppercase italic">Edit <span className="text-primary not-italic">Event</span></h3>
                    <button onClick={onClose} className="btn btn-ghost btn-circle btn-sm hover:rotate-90 transition-transform">
                        <FiX size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
                    <div className="form-control">
                        <label className="label py-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-base-content/50">Event Title</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-3 flex items-center text-base-content/30"><FiFileText /></span>
                            <input
                                type="text"
                                className="input input-bordered w-full pl-10 rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold border-base-content/10 focus:ring-2 focus:ring-primary/20"
                                {...register("title", { required: true })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label py-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-base-content/50">Date</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3 flex items-center text-base-content/30 z-10"><FiCalendar /></span>
                                <input
                                    type="date"
                                    className="input input-bordered w-full pl-10 rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold border-base-content/10"
                                    {...register("date")}
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label py-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-base-content/50">Location</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3 flex items-center text-base-content/30"><FiMapPin /></span>
                                <input
                                    type="text"
                                    className="input input-bordered w-full pl-10 rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold border-base-content/10"
                                    {...register("location")}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label py-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-base-content/50">Update Banner</span>
                        </label>
                        <div className="relative group">
                            <input
                                type="file"
                                {...register("eventImage")}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                accept="image/*"
                            />
                            <div className="p-6 rounded-xl border-2 border-dashed border-base-content/10 bg-base-200/30 group-hover:border-primary/40 transition-all flex flex-col items-center justify-center gap-2">
                                <FiUploadCloud className="text-primary text-2xl animate-bounce" />
                                <span className="text-[10px] font-black uppercase tracking-tighter text-base-content/60 text-center">
                                    {selectedFile?.[0] ? selectedFile[0].name : "Change event banner"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex gap-3">
                        <button type="button" onClick={onClose} className="btn btn-ghost flex-1 rounded-xl font-black uppercase text-xs tracking-widest border border-base-content/10">Cancel</button>
                        <button type="submit" disabled={overallLoading} className="btn btn-primary flex-[2] rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/20">
                            {overallLoading ? <TbFidgetSpinner className="animate-spin text-lg" /> : "Update Event"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEventModal;