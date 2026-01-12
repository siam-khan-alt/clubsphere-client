import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import EventListTable from "../../../components/dashboard/manager/EventListTable";
import CreateEventModal from "../../../components/dashboard/manager/CreateEventModal";
import EditEventModal from "../../../components/dashboard/manager/EditEventModal";
import { FiPlus, FiCalendar, FiActivity } from "react-icons/fi";
import ViewRegistrationModal from "../../../components/dashboard/manager/ViewRegistrationModal";

const EventsManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [isViewRegModalOpen, setIsViewRegModalOpen] = useState(false);
  const [viewingEventId, setViewingEventId] = useState(null);
  const [viewingEventTitle, setViewingEventTitle] = useState("");

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["managerEvents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/events");
      return res.data;
    },
  });

  const {
    data: registrationData,
    isLoading: isRegLoading,
    isFetching: isRegFetching,
  } = useQuery({
    queryKey: ["eventRegistrations", viewingEventId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/manager/events/${viewingEventId}/registrations`
      );
      return res.data;
    },
    enabled: !!viewingEventId && isViewRegModalOpen,
  });

  const handleViewRegistrations = (eventId, eventTitle) => {
    setViewingEventId(eventId);
    setViewingEventTitle(eventTitle);
    setIsViewRegModalOpen(true);
  };

  const handleCloseViewRegModal = () => {
    setIsViewRegModalOpen(false);
    setViewingEventId(null);
  };

  const handleEditEvent = (event) => {
    setEventToEdit(event);
    setIsEditModalOpen(true);
  };

  const deleteEventMutation = useMutation({
    mutationFn: async (eventId) =>
      axiosSecure.delete(`/manager/events/${eventId}`),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Event Axed!",
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: "rounded-2xl" },
      });
      queryClient.invalidateQueries({ queryKey: ["managerEvents"] });
    },
  });

  const handleDeleteEvent = (eventId, eventTitle) => {
    Swal.fire({
      title: `Delete Event?`,
      text: `Remove "${eventTitle}" permanently?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, Delete!",
      customClass: { popup: "rounded-2xl" },
    }).then((result) => {
      if (result.isConfirmed) deleteEventMutation.mutate(eventId);
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 container mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="md:text-3xl sm:text-2xl text-xl font-black flex flex-col md:flex-row  items-center gap-3 text-base-content uppercase italic tracking-tighter">
            <FiCalendar className="text-primary" /> Event{" "}
            <span className="text-primary not-italic">Management</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-base-content/30 italic mt-1 ml-1">
            Control center for all club activities
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn btn-primary rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20 gap-2"
        >
          <FiPlus size={18} /> Host New Event
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-base-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-base-content/60 border border-base-content/5">
              Active Events: {events.length}
            </div>
          </div>
        </div>

        <div className="w-full max-w-[80vw] md:max-w-full overflow-hidden bg-base-100 mx-auto rounded-2xl border border-base-content/5 shadow-sm">
          <div className="overflow-x-auto w-full custom-scrollbar">
            <div className="inline-block min-w-full align-middle">
              <EventListTable
                events={events}
                onViewRegistrations={handleViewRegistrations}
                onEditEvent={handleEditEvent}
                onDeleteEvent={handleDeleteEvent}
              />
            </div>
          </div>
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateEventModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
      {isEditModalOpen && eventToEdit && (
        <EditEventModal
          event={eventToEdit}
          onClose={() => {
            setIsEditModalOpen(false);
            setEventToEdit(null);
          }}
        />
      )}
      {isViewRegModalOpen && (
        <ViewRegistrationModal
          isOpen={isViewRegModalOpen}
          onClose={handleCloseViewRegModal}
          registrations={registrationData?.registrations || []}
          eventTitle={viewingEventTitle}
          isLoading={isRegLoading || isRegFetching}
        />
      )}

      <div className="flex items-center gap-2 pt-10">
        <div className="h-1 w-12 bg-primary rounded-2xl"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-base-content/30 italic">
          ClubSphere Event Logic v2.4
        </p>
      </div>
    </div>
  );
};

export default EventsManagement;
