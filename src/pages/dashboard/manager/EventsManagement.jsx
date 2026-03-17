import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import EventListTable from "../../../components/dashboard/manager/EventListTable";
import CreateEventModal from "../../../components/dashboard/manager/CreateEventModal";
import EditEventModal from "../../../components/dashboard/manager/EditEventModal";
import { FiPlus, FiCalendar } from "react-icons/fi";
import ViewRegistrationModal from "../../../components/dashboard/manager/ViewRegistrationModal";
import DashboardHeader from "../../../components/shared/ui/DashboardHeader";
import EventsManagementSkeleton from "../../../components/shared/skeletons/manager/EventsManagementSkeleton";

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

  const { data: registrationData, isLoading: isRegLoading } = useQuery({
    queryKey: ["eventRegistrations", viewingEventId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/manager/events/${viewingEventId}/registrations`
      );
      return res.data;
    },
    enabled: !!viewingEventId && isViewRegModalOpen,
  });

  const handleDeleteEvent = (eventId, eventTitle) => {
    Swal.fire({
      title: `Delete Event?`,
      text: `Remove "${eventTitle}" permanently?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      customClass: {
        popup: "rounded-2xl border-standard bg-card",
        confirmButton: "btn-primary-gradient",
      },
    }).then((result) => {
      if (result.isConfirmed) deleteEventMutation.mutate(eventId);
    });
  };

  const deleteEventMutation = useMutation({
    mutationFn: async (eventId) =>
      axiosSecure.delete(`/manager/events/${eventId}`),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries({ queryKey: ["managerEvents"] });
    },
  });

  if (isLoading) {
  const dynamicRows = events.length > 0 ? events.length : 6;
  return <EventsManagementSkeleton rowCount={dynamicRows} />;
}

  return (
    <div className="pb-10 animate-in fade-in duration-700">
      <DashboardHeader
        title="Event Management"
        description="Control center for all your club activities and attendees."
        badgeText="Manager"
      />

      <div className="container mx-auto  mt-8 space-y-6">
        <div className="flex justify-between items-center bg-card border-standard p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FiCalendar className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-body/40 leading-none">
                Status
              </p>
              <h4 className="text-sm font-bold text-text-body">
                {events.length} Active Events
              </h4>
            </div>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary-gradient px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center gap-2"
          >
            <FiPlus /> Host Event
          </button>
        </div>{" "}
        <div className="w-full max-w-[80vw] md:max-w-full overflow-hidden bg-card border-standard rounded-2xl mx-auto shadow-sm">
          <div className="overflow-x-auto w-full custom-scrollbar">
            <div className="inline-block min-w-full align-middle">
              <EventListTable
                events={events}
                onViewRegistrations={(id, title) => {
                  setViewingEventId(id);
                  setViewingEventTitle(title);
                  setIsViewRegModalOpen(true);
                }}
                onEditEvent={(ev) => {
                  setEventToEdit(ev);
                  setIsEditModalOpen(true);
                }}
                onDeleteEvent={handleDeleteEvent}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      {eventToEdit && (
        <EditEventModal
          event={eventToEdit}
          onClose={() => {
            setIsEditModalOpen(false);
            setEventToEdit(null);
          }}
        />
      )}
      <ViewRegistrationModal
        isOpen={isViewRegModalOpen}
        onClose={() => setIsViewRegModalOpen(false)}
        registrations={registrationData?.registrations || []}
        eventTitle={viewingEventTitle}
        isLoading={isRegLoading}
      />
    </div>
  );
};

export default EventsManagement;
