import React  from 'react';
import { FiX, FiPlusCircle } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ReactModal from 'react-modal';

const CreateEventModal = ({ isOpen, onClose }) => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const isPaidWatch = watch('isPaid', 'false');

    const { data: clubs = [], isLoading: isClubsLoading } = useQuery({
        queryKey: ['managerApprovedClubs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/manager/clubs');
            return res.data.filter(club => club.status === 'approved');
        },
        enabled: isOpen,
    });

    const createEventMutation = useMutation({
        mutationFn: async (newEvent) => {
            const res = await axiosSecure.post('/manager/events', newEvent);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Success!', 'Event created and awaiting.', 'success');
            reset();
            onClose();
            queryClient.invalidateQueries({ queryKey: ['managerEvents'] });
        },
        onError: (error) => {
            Swal.fire('Error!', error.response?.data?.message || 'Failed to create event.', 'error');
        }
    });

    const onSubmit = (data) => {
        const dateTimeString = `${data.eventDate}T${data.eventTime}:00`;
        const payload = {
            ...data,
            clubId: data.clubId,
            eventDate: dateTimeString, 
            eventFee: data.isPaid === 'true' ? parseFloat(data.eventFee) : 0,
            isPaid: data.isPaid === 'true',
            maxAttendees: data.maxAttendees ? parseInt(data.maxAttendees) : null,
        };
        createEventMutation.mutate(payload);
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
           className="bg-white rounded-xl shadow-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 sm:max-w-2xl"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
    
            <div >
                <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-blue-700 flex items-center">
                        <FiPlusCircle className="mr-2" /> Create New Event
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <FiX className="w-6 h-6" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Club *</label>
                        {isClubsLoading ? (
                            <p className="p-2 text-gray-500">Loading clubs...</p>
                        ) : clubs.length === 0 ? (
                            <p className="p-2 text-red-500">No approved clubs found to host an event.</p>
                        ) : (
                            <select
                                {...register('clubId', { required: 'Club selection is required' })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">-- Select a Club --</option>
                                {clubs.map(club => (
                                    <option key={club._id} value={club._id}>{club.clubName}</option>
                                ))}
                            </select>
                        )}
                        {errors.clubId && <p className="text-red-500 text-xs mt-1">{errors.clubId.message}</p>}
                    </div>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                            <input
                                type="date"
                                {...register('eventDate', { 
                                    required: 'Date is required',
                                    validate: value => new Date(value) >= new Date(new Date().setHours(0,0,0,0)) || 'Date cannot be in the past'
                                })}
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
                        className="w-full justify-center    disabled:bg-gray-400
                        flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                        disabled={createEventMutation.isPending || isClubsLoading || clubs.length === 0}
                    >
                        {createEventMutation.isPending ? 'Creating Event...' : 'Create Event'}
                    </button>
                </form>
            </div>
    
        </ReactModal>
    );
};

export default CreateEventModal;