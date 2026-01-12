import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiPlus, FiX, FiCalendar, FiMapPin, FiFileText, FiUploadCloud } from "react-icons/fi";
import uploadImageToImgBB from "../../../utils/imgbb";
import { TbFidgetSpinner } from "react-icons/tb";

const CreateEventModal = ({ clubId, onClose }) => {
    const [isImageUploading, setIsImageUploading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const selectedFile = watch("eventImage");

    const createEventMutation = useMutation({
        mutationFn: async (eventData) => axiosSecure.post('/events', eventData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events", clubId] });
            onClose();
            Swal.fire({
                icon: "success",
                title: "Event Created!",
                showConfirmButton: false,
                timer: 2000,
                customClass: { popup: "rounded-3xl" },
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: error.response?.data?.message || "Failed to create.",
                customClass: { popup: "rounded-3xl" },
            });
        },
    });

    const onSubmit = async (data) => {
        const imageFile = data.eventImage[0];
        setIsImageUploading(true);
        try {
            const imageUrl = await uploadImageToImgBB(imageFile);
            setIsImageUploading(false);
            createEventMutation.mutate({
                ...data,
                clubId,
                eventImage: imageUrl,
                date: new Date(data.date).toISOString(),
            });
        } catch (error) {
            Swal.fire("Upload Failed!", "Image upload failed.", "error");
            setIsImageUploading(false);
        }
    };

    const overallLoading = createEventMutation.isPending || isImageUploading;

    return (
        <div className="fixed inset-0 bg-base-content/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-base-100 dark:bg-slate-900 rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden border border-base-content/5 animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-base-content/5 flex justify-between items-center">
                    <h3 className="text-xl font-black text-base-content tracking-tight uppercase italic">Host New <span className="text-primary not-italic">Event</span></h3>
                    <button onClick={onClose} className="btn btn-ghost btn-circle btn-sm hover:rotate-90 transition-transform">
                        <FiX size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
                    <div className="form-control">
                        <label className="label py-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-base-content/50">Event Title</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-3 flex items-center text-base-content/30"><FiFileText /></span>
                            <input
                                type="text"
                                placeholder="e.g. Annual Tech Summit"
                                className={`input input-bordered w-full pl-10 rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold focus:ring-2 focus:ring-primary/20 ${errors.title ? 'border-error' : 'border-base-content/10'}`}
                                {...register("title", { required: "Title is required" })}
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label py-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-base-content/50">Description</span>
                        </label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            rows="3"
                            placeholder="What happens at the event?"
                            className={`textarea textarea-bordered w-full rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold focus:ring-2 focus:ring-primary/20 ${errors.description ? 'border-error' : 'border-base-content/10'}`}
                        ></textarea>
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
                                    {...register("date", { required: true })}
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
                                    placeholder="Hall 102"
                                    className="input input-bordered w-full pl-10 rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold border-base-content/10"
                                    {...register("location", { required: true })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label py-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-base-content/50">Event Banner</span>
                        </label>
                        <div className="relative group">
                            <input
                                type="file"
                                {...register("eventImage", { required: "Banner is required" })}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                accept="image/*"
                            />
                            <div className={`p-6 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 ${errors.eventImage ? 'border-error bg-error/5' : 'border-base-content/10 bg-base-200/30 group-hover:border-primary/40 group-hover:bg-primary/5'}`}>
                                <FiUploadCloud className={`text-2xl ${errors.eventImage ? 'text-error' : 'text-primary animate-bounce'}`} />
                                <span className="text-[10px] font-black uppercase tracking-tighter text-base-content/60 text-center">
                                    {selectedFile?.[0] ? selectedFile[0].name : "Click to upload banner"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex gap-3 sticky bottom-0 bg-base-100 dark:bg-slate-900 transition-colors">
                        <button type="button" onClick={onClose} className="btn btn-ghost flex-1 rounded-xl font-black uppercase text-xs tracking-widest border border-base-content/10">Cancel</button>
                        <button type="submit" disabled={overallLoading} className="btn btn-primary flex-[2] rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/20">
                            {overallLoading ? <TbFidgetSpinner className="animate-spin text-lg" /> : "Create Event"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEventModal;