import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; 
import Swal from 'sweetalert2'; 
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TbFidgetSpinner } from 'react-icons/tb';
import uploadImageToImgBB from '../../../utils/imgbb';

const defaultValues = {
    name: '',
    description: '',
    category: '',
    location: '', 
    bannerImage: null,
    membershipFee: 0, 
    meetingSchedule: '',
};

const CreateClub = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues });

    const [isImageUploading, setIsImageUploading] = useState(false);

    const { mutate: createClub, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.post('/clubs', data);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Club Submitted!',
                text: 'Your club request is awaiting Admin approval.',
                timer: 2000,
            });
            navigate('/dashboard/clubManager/myClubs');
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to submit club request.',
            });
        }
    });
    const overallLoading = isImageUploading || isPending;

    const onSubmit = async (data) => {
        const { bannerImage, membershipFee, ...restClubData } = data;
        
        let imageUrl = '';
        const imageFile = bannerImage[0];

        if (imageFile) {
            setIsImageUploading(true);
            try {
                imageUrl = await uploadImageToImgBB(imageFile);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Upload Failed!',
                    text: error.message || 'Could not upload image.',
                });
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
        <div className="flex justify-center items-center min-h-screen py-12 px-4 bg-[var(--color-bg-light)] text-[var(--color-text-light)]">
            <div className="card w-full max-w-2xl shadow-2xl bg-[var(--color-card-bg)]">
                <div className="card-body">
                    <div className="mb-8 text-center">
                        <h1 className="my-3 text-4xl font-bold text-[var(--color-primary-accent)]">
                            Create a New Club
                        </h1>
                        <p className="text-sm text-[var(--color-text-muted)]">
                            Submit the details for your local club
                        </p>
                    </div>
                    
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate=""
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm text-[var(--color-text-light)] font-semibold">
                                    Club Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register("name", {
                                        required: "Club Name is required",
                                        maxLength: { value: 50, message: "Name maximum 50 characters" },
                                    })}
                                    placeholder="Enter Club Name Here"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[var(--color-primary-accent)] bg-[var(--color-card-bg)] text-[var(--color-text-light)]"
                                />
                                {errors.name && (<p className="text-[var(--color-error)] text-sm">{errors.name?.message}</p>)}
                            </div>

                            
                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm text-[var(--color-text-light)] font-semibold">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    {...register("description", {
                                        required: "Description is required",
                                    })}
                                    rows="3"
                                    placeholder="Describe your club in detail..."
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[var(--color-primary-accent)] bg-[var(--color-card-bg)] text-[var(--color-text-light)]"
                                ></textarea>
                                {errors.description && (<p className="text-[var(--color-error)] text-sm">{errors.description?.message}</p>)}
                            </div>
                            
                            
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm text-[var(--color-text-light)] font-semibold">
                                    Category (e.g., Tech, Photography, Sports)
                                </label>
                                <input
                                    type="text"
                                    id="category"
                                    {...register("category", {
                                        required: "Category is required",
                                    })}
                                    placeholder="Enter club category"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[var(--color-primary-accent)] bg-[var(--color-card-bg)] text-[var(--color-text-light)]"
                                />
                                {errors.category && (<p className="text-[var(--color-error)] text-sm">{errors.category?.message}</p>)}
                            </div>

                            
                            <div>
                                <label htmlFor="location" className="block mb-2 text-sm text-[var(--color-text-light)] font-semibold">
                                    Location (City/Area)
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    {...register("location", {
                                        required: "Location is required",
                                    })}
                                    placeholder="e.g., Dhaka, Gulshan"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[var(--color-primary-accent)] bg-[var(--color-card-bg)] text-[var(--color-text-light)]"
                                />
                                {errors.location && (<p className="text-[var(--color-error)] text-sm">{errors.location?.message}</p>)}
                            </div>
                            
                            
                            <div>
                                <label htmlFor="bannerImage" className="block mb-2 text-sm font-semibold text-[var(--color-text-light)]">
                                    Club Banner Image
                                </label>
                                <input
                                    name="bannerImage"
                                    type="file"
                                    id="bannerImage"
                                    accept="image/*"
                                    {...register("bannerImage", {
                                        required: "Club banner image is required",
                                    })}
                                    className="block w-full text-sm text-[var(--color-text-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-primary-accent)]/10 file:text-[var(--color-primary-accent)] hover:file:bg-[var(--color-primary-accent)]/20 bg-[var(--color-card-bg)] border border-dashed border-[var(--color-primary-accent)]/50 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-accent)] py-2"
                                />
                                <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                    PNG, JPG or JPEG (Will be uploaded to ImgBB)
                                </p>
                                {errors.bannerImage && (<p className="text-[var(--color-error)] text-sm">{errors.bannerImage?.message}</p>)}
                            </div>

                            
                            <div>
                                <label htmlFor="membershipFee" className="block mb-2 text-sm text-[var(--color-text-light)] font-semibold">
                                    Membership Fee (BDT, Enter 0 for Free)
                                </label>
                                <input
                                    type="number"
                                    id="membershipFee"
                                    {...register("membershipFee", {
                                        required: "Membership Fee is required",
                                        min: { value: 0, message: "Fee cannot be negative" }
                                    })}
                                    min="0"
                                    placeholder="0"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[var(--color-primary-accent)] bg-[var(--color-card-bg)] text-[var(--color-text-light)]"
                                />
                                {errors.membershipFee && (<p className="text-[var(--color-error)] text-sm">{errors.membershipFee?.message}</p>)}
                            </div>
                            
                            
                            <div>
                                <label htmlFor="meetingSchedule" className="block mb-2 text-sm text-[var(--color-text-light)] font-semibold">
                                    Meeting Schedule (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="meetingSchedule"
                                    {...register("meetingSchedule")}
                                    placeholder="e.g., Every Tuesday at 7 PM"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[var(--color-primary-accent)] bg-[var(--color-card-bg)] text-[var(--color-text-light)]"
                                />
                            </div>
                        </div>

                        
                        <div>
                            <button
                                type="submit"
                                disabled={overallLoading}
                                className="w-full rounded-md py-3 text-white bg-[var(--color-primary-accent)] hover:bg-[#1E40AF] disabled:opacity-50 flex items-center justify-center transition"
                            >
                                {overallLoading ? (
                                    <TbFidgetSpinner className="animate-spin text-xl" />
                                ) : (
                                    "Submit Club for Approval"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateClub;