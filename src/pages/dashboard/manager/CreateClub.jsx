import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { FiPlusCircle, FiMapPin, FiTag, FiClock, FiDollarSign, FiFileText, FiUploadCloud } from "react-icons/fi";
import uploadImageToImgBB from "../../../utils/imgbb";
import DashboardHeader from "../../../components/shared/ui/DashboardHeader";

const CATEGORY_OPTIONS = [
    { value: "", label: "Select a Category" },
    { value: "Technology", label: "Technology / IT" },
    { value: "Photography", label: "Photography" },
    { value: "Sports", label: "Sports & Fitness" },
    { value: "Book Club", label: "Book Club / Reading" },
    { value: "Art & Design", label: "Art & Design" },
    { value: "Hiking & Travel", label: "Hiking & Travel" },
    { value: "Music & Film", label: "Music & Film" },
    { value: "Food & Cooking", label: "Food & Cooking" },
];

const CreateClub = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [isImageUploading, setIsImageUploading] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: { membershipFee: 0 }
    });

    const selectedFile = watch("bannerImage");

    const { mutate: createClub, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.post("/clubs", data);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Submitted!",
                text: "Awaiting admin approval.",
                timer: 2000,
                showConfirmButton: false,
                customClass: { popup: 'rounded-2xl border-standard bg-card' }
            });
            navigate("/dashboard/clubManager/myClubs");
        }
    });

    const overallLoading = isImageUploading || isPending;

    const onSubmit = async (data) => {
        const { bannerImage, membershipFee, ...restClubData } = data;
        let imageUrl = "";
        if (bannerImage[0]) {
            setIsImageUploading(true);
            try { imageUrl = await uploadImageToImgBB(bannerImage[0]); } 
            catch (error) { setIsImageUploading(false); return; }
            setIsImageUploading(false);
        }

        createClub({
            ...restClubData,
            bannerImage: imageUrl,
            membershipFee: Number(membershipFee) || 0,
        });
    };

    return (
        <div className="pb-10 animate-in fade-in duration-700">
            <DashboardHeader 
                title="Create New Club"
                description="Register your community and start managing events."
                badgeText="Manager"
            />

            <div className="container mx-auto mt-6">
                <div className="bg-card border-standard rounded-2xl shadow-sm overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-10 space-y-6">
                        
                        {/* Club Name & Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-body/50 ml-1">Club Name</label>
                                <div className="relative">
                                    <FiFileText className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" />
                                    <input
                                        type="text"
                                        placeholder="Enter club name"
                                        className={`input-field-custom w-full pl-11 !py-3 ${errors.name ? 'border-red-500' : ''}`}
                                        {...register("name", { required: "Name is required" })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-body/50 ml-1">Category</label>
                                <div className="relative">
                                    <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" />
                                    <select
                                        className="input-field-custom w-full pl-11 appearance-none !py-3"
                                        {...register("category", { required: true })}
                                    >
                                        {CATEGORY_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-body/50 ml-1">Club Description</label>
                            <textarea
                                placeholder="Describe your club..."
                                className="input-field-custom w-full min-h-[100px]"
                                {...register("description", { required: true })}
                            ></textarea>
                        </div>

                        {/* Logistics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-body/50 ml-1">Location</label>
                                <div className="relative">
                                    <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" />
                                    <input type="text" placeholder="Location" className="input-field-custom w-full pl-10 !py-3" {...register("location", { required: true })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-body/50 ml-1">Schedule</label>
                                <div className="relative">
                                    <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" />
                                    <input type="text" placeholder="e.g. Fri 4PM" className="input-field-custom w-full pl-10 !py-3" {...register("meetingSchedule")} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-body/50 ml-1">Fee (BDT)</label>
                                <div className="relative">
                                    <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" />
                                    <input type="number" className="input-field-custom w-full pl-10 !py-3" {...register("membershipFee")} />
                                </div>
                            </div>
                        </div>

                        {/* Banner Upload */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-body/50 ml-1">Banner Image</label>
                            <div className="relative group overflow-hidden rounded-2xl border-2 border-dashed border-standard/30 hover:border-primary/50 transition-all">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    {...register("bannerImage", { required: "Required" })}
                                />
                                <div className="p-8 flex flex-col items-center justify-center gap-2 bg-background/30 group-hover:bg-primary/5 transition-colors">
                                    <FiUploadCloud className="text-primary/40 group-hover:text-primary transition-colors" size={24} />
                                    <span className="text-xs font-bold text-text-body/60 italic">
                                        {selectedFile?.[0] ? selectedFile[0].name : "Click to upload banner"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={overallLoading}
                                className="btn-primary-gradient w-full h-14 rounded-xl flex items-center justify-center gap-2 tracking-widest uppercase text-sm"
                            >
                                {overallLoading ? <TbFidgetSpinner className="animate-spin text-2xl" /> : "Request Approval"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateClub;