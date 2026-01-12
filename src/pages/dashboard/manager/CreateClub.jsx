import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { FiPlusCircle, FiImage, FiMapPin, FiTag, FiClock, FiDollarSign, FiFileText } from "react-icons/fi";
import uploadImageToImgBB from "../../../utils/imgbb";

const defaultValues = {
    name: "",
    description: "",
    category: "",
    location: "",
    bannerImage: null,
    membershipFee: 0,
    meetingSchedule: "",
};

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

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

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
        <div className="min-h-screen py-10 px-4 animate-in fade-in duration-500">
            <div className="max-w-3xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-3xl font-black flex items-center gap-3 text-base-content uppercase italic tracking-tighter">
                        <FiPlusCircle className="text-primary" /> Create <span className="text-primary not-italic">New Club</span>
                    </h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-base-content/30 italic mt-1 ml-1">
                        Submit your club details for community approval
                    </p>
                </div>

                <div className="bg-base-100 rounded-2xl border border-base-content/5 shadow-2xl overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest text-base-content/50">
                                    <FiFileText className="text-primary" /> Club Name
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Club Name is required", maxLength: 50 })}
                                    placeholder="e.g. Creative Minds IT Club"
                                    className="input input-bordered w-full rounded-2xl bg-base-200/50 border-base-content/10 focus:border-primary font-bold transition-all"
                                />
                                {errors.name && <p className="text-[10px] font-black text-error uppercase mt-1 ml-2">{errors.name.message}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest text-base-content/50">
                                    <FiFileText className="text-primary" /> Description
                                </label>
                                <textarea
                                    {...register("description", { required: "Description is required" })}
                                    rows="4"
                                    placeholder="Tell us what this club is about..."
                                    className="textarea textarea-bordered w-full rounded-2xl bg-base-200/50 border-base-content/10 focus:border-primary font-bold transition-all"
                                ></textarea>
                                {errors.description && <p className="text-[10px] font-black text-error uppercase mt-1 ml-2">{errors.description.message}</p>}
                            </div>

                            <div>
                                <label className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest text-base-content/50">
                                    <FiTag className="text-primary" /> Category
                                </label>
                                <select
                                    {...register("category", { required: "Category is required" })}
                                    className="select select-bordered w-full rounded-2xl bg-base-200/50 border-base-content/10 font-bold focus:border-primary"
                                >
                                    {CATEGORY_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest text-base-content/50">
                                    <FiMapPin className="text-primary" /> Location
                                </label>
                                <input
                                    type="text"
                                    {...register("location", { required: "Location is required" })}
                                    placeholder="City or Area"
                                    className="input input-bordered w-full rounded-2xl bg-base-200/50 border-base-content/10 font-bold focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest text-base-content/50">
                                    <FiDollarSign className="text-primary" /> Membership Fee (BDT)
                                </label>
                                <input
                                    type="number"
                                    {...register("membershipFee", { required: true, min: 0 })}
                                    className="input input-bordered w-full rounded-2xl bg-base-200/50 border-base-content/10 font-bold focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest text-base-content/50">
                                    <FiClock className="text-primary" /> Meeting Schedule
                                </label>
                                <input
                                    type="text"
                                    {...register("meetingSchedule")}
                                    placeholder="Optional"
                                    className="input input-bordered w-full rounded-2xl bg-base-200/50 border-base-content/10 font-bold focus:border-primary"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest text-base-content/50">
                                    <FiImage className="text-primary" /> Club Banner Image
                                </label>
                                <div className="relative border-2 border-dashed border-base-content/10 rounded-2xl p-4 bg-base-200/30 hover:bg-base-200/50 transition-all group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...register("bannerImage", { required: "Banner image is required" })}
                                        className="file-input file-input-primary w-full rounded-2xl font-bold"
                                    />
                                </div>
                                {errors.bannerImage && <p className="text-[10px] font-black text-error uppercase mt-1 ml-2">{errors.bannerImage.message}</p>}
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={overallLoading}
                                className="btn btn-primary w-full rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-xl shadow-primary/20 h-14"
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
                
                <div className="flex justify-center items-center gap-2 mt-8">
                    <div className="h-[1px] w-8 bg-base-content/10"></div>
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-base-content/20 italic">
                        Secured Registration Portal
                    </p>
                    <div className="h-[1px] w-8 bg-base-content/10"></div>
                </div>
            </div>
        </div>
    );
};

export default CreateClub;