import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiPlus, FiX, FiCalendar, FiMapPin, FiClock, FiUploadCloud } from "react-icons/fi";
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
            Swal.fire("Error!", error.response?.data?.message || "Failed to create.", "error");
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
            <div className="bg-base-100 rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden border border-base-content/5 animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-base-content/5 flex justify-between items-center">
                    <h3 className="text-xl font-black text-base-content tracking-tight uppercase italic">Host New <span className="text-primary not-italic">Event</span></h3>
                    <button onClick={onClose} className="btn btn-ghost btn-circle btn-sm hover:rotate-90 transition-transform">
                        <FiX size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 ml-1">Event Title</label>
                        <input type="text" {...register("title", { required: "Title is required" })} className="input input-bordered w-full rounded-2xl font-bold" placeholder="e.g. Annual Tech Summit" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 ml-1">Description</label>
                        <textarea {...register("description", { required: "Description is required" })} rows="3" className="textarea textarea-bordered w-full rounded-2xl font-bold" placeholder="What happens at the event?" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 ml-1">Date</label>
                            <input type="date" {...register("date", { required: true })} className="input input-bordered w-full rounded-2xl font-bold" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 ml-1">Location</label>
                            <input type="text" {...register("location", { required: true })} className="input input-bordered w-full rounded-2xl font-bold" placeholder="Hall 102" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 ml-1">Event Banner</label>
                        <div className="relative group">
                            <input type="file" {...register("eventImage", { required: true })} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" />
                            <div className="p-6 rounded-2xl border-2 border-dashed border-base-content/10 bg-base-200/30 group-hover:border-primary/40 transition-all flex flex-col items-center justify-center gap-2">
                                <FiUploadCloud className="text-primary text-2xl" />
                                <span className="text-xs font-black uppercase text-base-content/60">{selectedFile?.[0] ? selectedFile[0].name : "Upload Banner"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex gap-3 sticky bottom-0 bg-base-100">
                        <button type="button" onClick={onClose} className="btn btn-ghost flex-1 rounded-2xl font-black uppercase text-xs tracking-widest border border-base-content/10">Cancel</button>
                        <button type="submit" disabled={overallLoading} className="btn btn-primary flex-[2] rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/20">
                            {overallLoading ? <TbFidgetSpinner className="animate-spin text-lg" /> : <><FiPlus /> Create Event</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEventModal;