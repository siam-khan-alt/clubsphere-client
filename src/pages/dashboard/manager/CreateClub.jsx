import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { FiPlusCircle, FiImage, FiMapPin, FiTag, FiClock, FiDollarSign, FiFileText, FiUploadCloud } from "react-icons/fi";
import uploadImageToImgBB from "../../../utils/imgbb";

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
                title: "Club Submitted!",
                text: "Your club request is awaiting Admin approval.",
                timer: 2000,
                customClass: { popup: 'rounded-2xl' }
            });
            navigate("/dashboard/clubManager/myClubs");
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: error.response?.data?.message || "Failed to submit club request.",
                customClass: { popup: 'rounded-2xl' }
            });
        },
    });

    const overallLoading = isImageUploading || isPending;

    const onSubmit = async (data) => {
        const { bannerImage, membershipFee, ...restClubData } = data;
        let imageUrl = "";
        const imageFile = bannerImage[0];

        if (imageFile) {
            setIsImageUploading(true);
            try {
                imageUrl = await uploadImageToImgBB(imageFile);
            } catch (error) {
                Swal.fire({ icon: "error", title: "Upload Failed!", text: error.message, customClass: { popup: 'rounded-2xl' } });
                setIsImageUploading(false);
                return;
            }
            setIsImageUploading(false);
        }

        const finalClubData = {
            ...restClubData,
            bannerImage: imageUrl,
            membershipFee: Number(membershipFee) || 0,
        };
        createClub(finalClubData);
    };

    return (
        <div className="min-h-screen container mx-auto py-10 px-4 animate-in fade-in duration-500">
            <div className="max-w-3xl mx-auto">
                <div className="mb-10 text-center md:text-left">
                    <h2 className="md:text-3xl sm:text-2xl text-xl font-black flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 text-base-content uppercase italic tracking-tighter">
                        <FiPlusCircle className="text-primary" /> Create <span className="text-primary not-italic">New Club</span>
                    </h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-base-content/30 italic mt-1 ml-1">
                        Register your community club on ClubSphere
                    </p>
                </div>

                <div className="bg-base-100 dark:bg-slate-900 rounded-2xl border border-base-content/5 shadow-2xl overflow-hidden transition-colors duration-300">
                    <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            <div className="md:col-span-2">
                                <label className="label py-1">
                                    <span className="text-xs font-black uppercase tracking-widest text-base-content/50">Club Name</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-3 flex items-center text-base-content/30"><FiFileText /></span>
                                    <input
                                        type="text"
                                        placeholder="Creative Minds IT Club"
                                        className={`input input-bordered w-full pl-10 rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold focus:ring-2 focus:ring-primary/20 ${errors.name ? 'border-error' : 'border-base-content/10'}`}
                                        {...register("name", { required: "Name is required", maxLength: 50 })}
                                    />
                                </div>
                                {errors.name && <p className="text-error text-[10px] font-bold mt-1 uppercase">{errors.name.message}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="label py-1">
                                    <span className="text-xs font-black uppercase tracking-widest text-base-content/50">Description</span>
                                </label>
                                <textarea
                                    {...register("description", { required: "Description is required" })}
                                    rows="4"
                                    placeholder="Tell us what this club is about..."
                                    className={`textarea textarea-bordered w-full rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold focus:ring-2 focus:ring-primary/20 transition-all ${errors.description ? 'border-error' : 'border-base-content/10'}`}
                                ></textarea>
                                {errors.description && <p className="text-error text-[10px] font-bold mt-1 uppercase">{errors.description.message}</p>}
                            </div>

                            <div>
                                <label className="label py-1">
                                    <span className="text-xs font-black uppercase tracking-widest text-base-content/50">Category</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-3 flex items-center text-base-content/30 z-10"><FiTag /></span>
                                    <select
                                        {...register("category", { required: "Category is required" })}
                                        className={`select select-bordered w-full pl-10 rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold focus:ring-2 focus:ring-primary/20 ${errors.category ? 'border-error' : 'border-base-content/10'}`}
                                    >
                                        {CATEGORY_OPTIONS.map((option) => (
                                            <option key={option.value} value={option.value} disabled={option.value === ""}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="label py-1">
                                    <span className="text-xs font-black uppercase tracking-widest text-base-content/50">Location</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-3 flex items-center text-base-content/30"><FiMapPin /></span>
                                    <input
                                        type="text"
                                        placeholder="City or Area"
                                        className={`input input-bordered w-full pl-10 rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold focus:ring-2 focus:ring-primary/20 ${errors.location ? 'border-error' : 'border-base-content/10'}`}
                                        {...register("location", { required: "Location is required" })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="label py-1">
                                    <span className="text-xs font-black uppercase tracking-widest text-base-content/50">Membership Fee (BDT)</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-3 flex items-center text-base-content/30"><FiDollarSign /></span>
                                    <input
                                        type="number"
                                        className={`input input-bordered w-full pl-10 rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold focus:ring-2 focus:ring-primary/20 ${errors.membershipFee ? 'border-error' : 'border-base-content/10'}`}
                                        {...register("membershipFee", { required: true, min: 0 })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="label py-1">
                                    <span className="text-xs font-black uppercase tracking-widest text-base-content/50">Meeting Schedule</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-3 flex items-center text-base-content/30"><FiClock /></span>
                                    <input
                                        type="text"
                                        placeholder="e.g. Every Friday 4PM"
                                        className="input input-bordered w-full pl-10 rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold border-base-content/10 focus:ring-2 focus:ring-primary/20"
                                        {...register("meetingSchedule")}
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="label py-1">
                                    <span className="text-xs font-black uppercase tracking-widest text-base-content/50">Club Banner Image</span>
                                </label>
                                <div className="relative group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...register("bannerImage", { required: "Banner image is required" })}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className={`p-6 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 ${errors.bannerImage ? 'border-error bg-error/5' : 'border-base-content/10 bg-base-200/30 group-hover:border-primary/40 group-hover:bg-primary/5'}`}>
                                        <FiUploadCloud className={`text-2xl ${errors.bannerImage ? 'text-error' : 'text-primary animate-bounce'}`} />
                                        <span className="text-[11px] font-black uppercase tracking-tighter text-base-content/60 text-center">
                                            {selectedFile?.[0] ? selectedFile[0].name : "Click or Drag to upload club banner"}
                                        </span>
                                    </div>
                                </div>
                                {errors.bannerImage && <p className="text-error text-[10px] font-bold mt-1 uppercase text-center">{errors.bannerImage.message}</p>}
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={overallLoading}
                                className="btn btn-primary w-full rounded-xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 h-14"
                            >
                                {overallLoading ? (
                                    <TbFidgetSpinner className="animate-spin text-2xl" />
                                ) : (
                                    "Submit Club for Approval"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                
                <p className="text-center mt-8 text-[10px] font-black uppercase tracking-[0.4em] text-base-content/20 italic">
                    Secured Club Registration System
                </p>
            </div>
        </div>
    );
};

export default CreateClub;