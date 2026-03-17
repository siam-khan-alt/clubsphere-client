import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiX, FiUploadCloud } from "react-icons/fi";
import uploadImageToImgBB from "../../../utils/imgbb";
import { TbFidgetSpinner } from "react-icons/tb";

const CreateEventModal = ({ isOpen, onClose }) => {
    const [isImageUploading, setIsImageUploading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const selectedFile = watch("eventImage");

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        setIsImageUploading(true);
        try {
            const imageUrl = await uploadImageToImgBB(data.eventImage[0]);
            await axiosSecure.post('/events', { ...data, eventImage: imageUrl });
            queryClient.invalidateQueries({ queryKey: ["managerEvents"] });
            onClose();
            Swal.fire({ icon: "success", title: "Event Created", timer: 1500, showConfirmButton: false });
        } catch (error) {
            Swal.fire("Error", "Check your inputs", "error");
        } finally { setIsImageUploading(false); }
    };

    return (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-card border-standard rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-6 border-b border-standard/50 flex justify-between items-center">
                    <h3 className="text-lg font-black text-text-body uppercase tracking-tight">Host <span className="text-primary">New Event</span></h3>
                    <button onClick={onClose} className="p-2 hover:bg-primary/10 rounded-full"><FiX /></button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-body/40 ml-1">Event Title</label>
                        <input type="text" className="input-field-custom w-full" {...register("title", { required: true })} placeholder="Event name..." />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-body/40 ml-1">Date</label>
                            <input type="date" className="input-field-custom w-full" {...register("date", { required: true })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-body/40 ml-1">Location</label>
                            <input type="text" className="input-field-custom w-full" {...register("location", { required: true })} />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-body/40 ml-1">Description</label>
                        <textarea className="input-field-custom w-full min-h-[80px]" {...register("description", { required: true })} />
                    </div>

                    <div className="relative group rounded-2xl border-2 border-dashed border-standard/50 p-6 flex flex-col items-center gap-2 hover:bg-primary/5 transition-all">
                        <input type="file" {...register("eventImage", { required: true })} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <FiUploadCloud className="text-primary text-xl" />
                        <span className="text-[10px] font-bold text-text-body/40 uppercase tracking-widest">
                            {selectedFile?.[0] ? selectedFile[0].name : "Upload Banner"}
                        </span>
                    </div>

                    <button type="submit" disabled={isImageUploading} className="btn-primary-gradient w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs mt-4">
                        {isImageUploading ? <TbFidgetSpinner className="animate-spin mx-auto text-xl" /> : "Publish Event"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEventModal;