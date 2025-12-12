import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import EventListTable from '../../../components/dashboard/manager/EventListTable';
import CreateEventModal from '../../../components/dashboard/manager/CreateEventModal';
import EditEventModal from '../../../components/dashboard/manager/EditEventModal';
import { FiPlusCircle } from 'react-icons/fi';
import ViewRegistrationModal from '../../../components/dashboard/manager/ViewRegistrationModal';

const EventsManagement = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient(); 

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isViewRegModalOpen, setIsViewRegModalOpen] = useState(false);
    const [registrations, setRegistrations] = useState([]);
    const [eventTitle, setEventTitle] = useState('');
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
    const [eventToEdit, setEventToEdit] = useState(null); 

    const { data: events = [], isLoading } = useQuery({
        queryKey: ['managerEvents'],
        queryFn: async () => {
            const res = await axiosSecure.get('/manager/events');
            return res.data;
        }
    });

    const handleViewRegistrations = async (eventId) => {
        try {
            const res = await axiosSecure.get(`/manager/events/${eventId}/registrations`);
            setRegistrations(res.data.registrations);
            setEventTitle(res.data.eventTitle);
            setIsViewRegModalOpen(true);
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch registrations.', error);
        }
    };
    
    const handleEditEvent = (event) => {
        setEventToEdit(event);
        setIsEditModalOpen(true);
    };

    const deleteEventMutation = useMutation({
        mutationFn: async (eventId) => {
            const res = await axiosSecure.delete(`/manager/events/${eventId}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Deleted!', 'The event has been successfully deleted.', 'success');
            queryClient.invalidateQueries({ queryKey: ['managerEvents'] });
        },
        onError: (error) => {
            Swal.fire('Error!', error.response?.data?.message || 'Failed to delete event.', 'error');
        }
    });

    const handleDeleteEvent = (eventId, eventTitle) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `You are about to delete the event: "${eventTitle}". This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEventMutation.mutate(eventId);
            }
        });
    };

    if (isLoading) return <LoadingSpinner/>
    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">🗓️ Event Management</h1>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                >
                    <FiPlusCircle className="mr-2" />
                    Create New Event
                </button>
            </div>
            <div className='overflow-x-auto'>
 <EventListTable 
                events={events}
                onViewRegistrations={handleViewRegistrations}
                onEditEvent={handleEditEvent} 
                onDeleteEvent={handleDeleteEvent} 
            />

            </div>
           
            <CreateEventModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
            <ViewRegistrationModal 
                isOpen={isViewRegModalOpen} 
                onClose={() => setIsViewRegModalOpen(false)} 
                registrations={registrations}
                eventTitle={eventTitle}
            />

            <EditEventModal 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                eventToEdit={eventToEdit}
            />
        </div>
    );
};

export default EventsManagement;

