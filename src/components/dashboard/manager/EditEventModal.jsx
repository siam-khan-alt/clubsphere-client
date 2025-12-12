import React, { useEffect } from 'react';
import { FiX, FiEdit } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; 
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import ReactModal from 'react-modal';

const EditEventModal = ({ isOpen, onClose, eventToEdit }) => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const isPaidWatch = watch('isPaid', eventToEdit?.isPaid ? 'true' : 'false');

    useEffect(() => {
        if (eventToEdit) {
            reset({
                title: eventToEdit.title,
                description: eventToEdit.description,
                eventDate: format(new Date(eventToEdit.eventDate), 'yyyy-MM-dd'),
                eventTime: eventToEdit.eventTime,
                location: eventToEdit.location,
                bannerImage: eventToEdit.bannerImage || '',
                isPaid: eventToEdit.isPaid ? 'true' : 'false',
                eventFee: eventToEdit.eventFee,
                maxAttendees: eventToEdit.maxAttendees || '',
            });
        }
    }, [eventToEdit, reset]);

    const updateEventMutation = useMutation({
        mutationFn: async (eventData) => {
            const res = await axiosSecure.patch(`/manager/events/${eventToEdit._id}`, eventData);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Success!', 'Event updated successfully.', 'success');
            onClose();
            queryClient.invalidateQueries({ queryKey: ['managerEvents'] }); 
        },
        onError: (error) => {
            Swal.fire('Error!', error.response?.data?.message || 'Failed to update event.', 'error');
        }
    });

    const onSubmit = (data) => {
        const dateTimeString = `${data.eventDate}T${data.eventTime}:00`;
        const payload = {
            ...data,
            eventDate: dateTimeString,
            eventFee: data.isPaid === 'true' ? parseFloat(data.eventFee) : 0,
            isPaid: data.isPaid === 'true',
        };
        updateEventMutation.mutate(payload);
    };

    if (!isOpen || !eventToEdit) return null;

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="bg-white rounded-xl shadow-2xl w-[350px] md:w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 sm:max-w-2xl"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
        
            <div >
                <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-blue-700 flex items-center">
                        <FiEdit className="mr-2" /> Edit Event: {eventToEdit.title}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <FiX className="w-6 h-6" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <p className="text-sm text-gray-500">Club:{eventToEdit.clubName}</p>
                        
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                        <input
                            type="text"
                            {...register('title', { required: 'Event title is required' })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                        <textarea
                            {...register('description', { required: 'Description is required' })}
                            rows="3"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date :</label>
                            <input
                                type="date"
                                {...register('eventDate', { required: 'Date is required' })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.eventDate && <p className="text-red-500 text-xs mt-1">{errors.eventDate.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time (e.g., 7:00 PM) *</label>
                            <input
                                type="text"
                                {...register('eventTime', { required: 'Time is required' })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="HH:MM AM/PM"
                            />
                            {errors.eventTime && <p className="text-red-500 text-xs mt-1">{errors.eventTime.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                        <input
                            type="text"
                            {...register('location', { required: 'Location is required' })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image URL *</label>
                        <input
                            type="text"
                            {...register('bannerImage', { required: 'Banner image URL is required' })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Paste image URL here"
                        />
                        {errors.bannerImage && <p className="text-red-500 text-xs mt-1">{errors.bannerImage.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Is Event Paid? *</label>
                            <select
                                {...register('isPaid', { required: 'This field is required' })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="false">Free Event</option>
                                <option value="true">Paid Event</option>
                            </select>
                            {errors.isPaid && <p className="text-red-500 text-xs mt-1">{errors.isPaid.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Fee ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register('eventFee', { 
                                    min: { value: 0, message: 'Fee cannot be negative' },
                                    required: isPaidWatch === 'true' ? 'Fee is required for paid event' : false
                                })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                defaultValue={0}
                                disabled={isPaidWatch === 'false'}
                            />
                            {errors.eventFee && <p className="text-red-500 text-xs mt-1">{errors.eventFee.message}</p>}
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Attendees (Optional)</label>
                        <input
                            type="number"
                            {...register('maxAttendees', { min: { value: 1, message: 'Must be at least 1' } })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="E.g., 50"
                        />
                        {errors.maxAttendees && <p className="text-red-500 text-xs mt-1">{errors.maxAttendees.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full justify-center 
                         flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:bg-gray-400"
                        disabled={updateEventMutation.isPending}
                    >
                        {updateEventMutation.isPending ? 'Saving Changes...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        
        </ReactModal>
    );
};

export default EditEventModal;