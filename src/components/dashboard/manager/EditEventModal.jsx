import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiX, FiUploadCloud } from "react-icons/fi";
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
        mutationFn: async (updatedData) => axiosSecure.patch(`/manager/events/${event._id}`, updatedData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["managerEvents"] }); // Matching your create query key
            onClose();
            Swal.fire({
                icon: "success",
                title: "Event Updated!",
                showConfirmButton: false,
                timer: 1500
            });
        },
    });

    const onSubmit = async (data) => {
        const imageFile = data.eventImage?.length > 0 ? data.eventImage[0] : null;
        let imageUrl = event.eventImage;

        setIsImageUploading(true);
        try {
            if (imageFile) {
                imageUrl = await uploadImageToImgBB(imageFile);
            }
            updateEventMutation.mutate({ ...data, eventImage: imageUrl });
        } catch (error) {
            Swal.fire("Error", "Action failed", "error");
        } finally {
            setIsImageUploading(false);
        }
    };

    const overallLoading = updateEventMutation.isPending || isImageUploading;

    return (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-card border-standard rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="p-6 border-b border-standard/50 flex justify-between items-center">
                    <h3 className="text-lg font-black text-text-body uppercase tracking-tight">
                        Update <span className="text-primary">Event</span>
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                        <FiX />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-4 max-h-[75vh] overflow-y-auto">
                    {/* Title */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-body/40 ml-1">Event Title</label>
                        <input 
                            type="text" 
                            className="input-field-custom w-full" 
                            {...register("title", { required: true })} 
                            placeholder="Event name..." 
                        />
                    </div>

                    {/* Date & Location */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-body/40 ml-1">Date</label>
                            <input 
                                type="date" 
                                className="input-field-custom w-full" 
                                {...register("date", { required: true })} 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-body/40 ml-1">Location</label>
                            <input 
                                type="text" 
                                className="input-field-custom w-full" 
                                {...register("location", { required: true })} 
                                placeholder="Venue..." 
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-body/40 ml-1">Description</label>
                        <textarea 
                            className="input-field-custom w-full min-h-[100px]" 
                            {...register("description", { required: true })} 
                        />
                    </div>

                    {/* Image Upload Area */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-body/40 ml-1">Change Banner (Optional)</label>
                        <div className="relative group rounded-2xl border-2 border-dashed border-standard/50 p-6 flex flex-col items-center gap-2 hover:bg-primary/5 transition-all cursor-pointer">
                            <input 
                                type="file" 
                                {...register("eventImage")} 
                                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                                accept="image/*"
                            />
                            <FiUploadCloud className="text-primary text-xl" />
                            <span className="text-[10px] font-bold text-text-body/40 uppercase tracking-widest text-center px-2">
                                {selectedFile?.[0] ? selectedFile[0].name : "Replace current banner"}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-standard hover:bg-base-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={overallLoading} 
                            className="btn-primary-gradient flex-[2] py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all active:scale-95 disabled:opacity-70"
                        >
                            {overallLoading ? <TbFidgetSpinner className="animate-spin mx-auto text-xl" /> : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEventModal;