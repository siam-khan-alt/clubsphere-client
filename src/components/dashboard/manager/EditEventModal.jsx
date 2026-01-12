import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiSave, FiX, FiUploadCloud } from "react-icons/fi";
import uploadImageToImgBB from "../../../utils/imgbb";
import { TbFidgetSpinner } from "react-icons/tb";

const EditEventModal = ({ event, onClose }) => {
    const [isImageUploading, setIsImageUploading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            title: event.title,
            description: event.description,
            date: event.date?.split('T')[0],
            location: event.location,
        },
    });

    const selectedFile = watch("eventImage");

    const updateEventMutation = useMutation({
        mutationFn: async (updatedData) => axiosSecure.patch(`/events/${event._id}`, updatedData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            onClose();
            Swal.fire({ icon: "success", title: "Event Updated!", showConfirmButton: false, timer: 1500 });
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
            <div className="bg-base-100 rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden border border-base-content/5">
                <div className="p-6 border-b border-base-content/5 flex justify-between items-center">
                    <h3 className="text-xl font-black text-base-content tracking-tight uppercase">Edit <span className="text-primary">Event</span></h3>
                    <button onClick={onClose} className="btn btn-ghost btn-circle btn-sm"><FiX size={20} /></button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Event Title</label>
                        <input type="text" {...register("title")} className="input input-bordered w-full rounded-2xl font-bold" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Date</label>
                            <input type="date" {...register("date")} className="input input-bordered w-full rounded-2xl font-bold" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Location</label>
                            <input type="text" {...register("location")} className="input input-bordered w-full rounded-2xl font-bold" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Update Banner</label>
                        <div className="relative group">
                            <input type="file" {...register("eventImage")} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            <div className="p-6 rounded-2xl border-2 border-dashed border-base-content/10 bg-base-200/30 flex flex-col items-center justify-center gap-2">
                                <FiUploadCloud className="text-primary text-2xl" />
                                <span className="text-xs font-black uppercase text-base-content/60">{selectedFile?.[0] ? selectedFile[0].name : "Change Image"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex gap-3">
                        <button type="button" onClick={onClose} className="btn btn-ghost flex-1 rounded-2xl font-black uppercase text-xs">Cancel</button>
                        <button type="submit" disabled={overallLoading} className="btn btn-primary flex-[2] rounded-2xl font-black uppercase text-xs">
                            {overallLoading ? <TbFidgetSpinner className="animate-spin" /> : <><FiSave /> Update</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEventModal;