import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { use, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ClubDetails = () => {
  const { id } = useParams();
  const { user, loading } = use(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [isJoining, setIsJoining] = useState(false);
  const {
    data: club,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["club", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/clubs/${id}`
      );
      return response.data;
    },
    enabled: !!id,
    retry: 1,
  });
  const handleJoinClub = async () => {
    if (loading || isJoining) return;

    if (!user) {
      toast("You must be logged in to join a club.");
      navigate("/login");
      return;
    }
    setIsJoining(true);
    if (club.membershipFee > 0) {
      try {
        const response = await axiosSecure.post(
          "/payment/create-checkout-session",
          {
            membershipFee: club.membershipFee,
            clubId: club._id,
            userEmail: user.email,
          }
        );
        if (response.data.url) {
          window.location.replace(response.data.url);
        } else {
          toast("Could not get payment URL. Please try again.");
        }
      } catch (error) {
        console.error("Checkout Session creation failed:", error);
        const errorMessage =
          error.response?.data?.message ||
          "Failed to initiate payment. Server error.";
        toast.error(errorMessage);
      } finally {
        setIsJoining(false);
      }
      return;
    }

    try {
      await axiosSecure.post(`/clubs/join/${club._id}`, {
        membershipFee: 0,
        paymentStatus: "free",
      });

      toast.success(`Successfully joined ${club.clubName}!`);

      queryClient.invalidateQueries(["club", id]);

      navigate("/dashboard/member/clubs");
    } catch (error) {
      console.error("Joining failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while trying to join the club.";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    let errorMessage = "Failed to load club details. Server error.";

    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        errorMessage = "Club not found or not yet approved.";
      }
    }

    return (
      <div className="flex justify-center items-center min-h-[50vh] text-red-600 text-2xl p-8">
        🚨 {errorMessage}
      </div>
    );
  }

  if (!club) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-500 text-xl">
        No club data available.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="relative h-96">
          <img
            className="w-full h-full object-cover"
            src={club.bannerImage}
            alt={`${club.clubName} banner`}
          />
          <div className="absolute inset-0  flex items-end p-8">
            <h2 className=" drop-shadow-lg">
              {club.clubName}
            </h2>
          </div>
        </div>

        <div className="p-8 lg:p-12 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center border-b pb-8">
            <ClubInfoCard title="Category" value={club.category} icon="📚" />
            <ClubInfoCard title="Location" value={club.location} icon="📍" />
            <ClubInfoCard
              title="Membership Fee"
              value={
                club.membershipFee === 0
                  ? "Free"
                  : `$${club.membershipFee.toFixed(2)}`
              }
              icon="💰"
            />
          </div>
          <section>
            <h2 className=" mb-4 border-l-4 border-indigo-600 pl-3">
              About Our Club
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {club.description}
            </p>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t">
            <div>
              <h4 className=" mb-3">
                Membership Snapshot
              </h4>
              <ul className="space-y-3 text-gray-700">
                <ListItem
                  label="Total Members"
                  value={club.members?.length || 1}
                />
                <ListItem label="Club Manager" value={club.managerEmail} />
              </ul>
            </div>
            <div>
              <h4 className=" mb-3">
                Meeting Details
              </h4>
              <p className="text-gray-700">
                <span className="font-medium text-indigo-600">Schedule:</span>{" "}
                {club.meetingSchedule || "To be announced (TBA)"}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                (This schedule is subject to change. Contact the manager for
                current updates.)
              </p>
            </div>
          </section>

          <div className="pt-8 text-center">
            <button
              onClick={handleJoinClub}
              disabled={isJoining || loading}
              className="px-8 py-3 bg-indigo-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
            >
              {isJoining
                ? club.membershipFee > 0
                  ? "Redirecting to Payment..."
                  : "Joining..."
                : "Join This Club Now"}
            </button>
            <p className="mt-3 text-sm text-gray-500">
              *You must be logged in to join a club.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClubInfoCard = ({ title, value, icon }) => (
  <div className="p-4 bg-white rounded-lg shadow-md border-t-4 border-indigo-500 transition duration-300 hover:shadow-xl">
    <p className="text-3xl mb-1">{icon}</p>
    <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
    <p className="text-xl font-bold text-indigo-700 mt-1">{value}</p>
  </div>
);

const ListItem = ({ label, value }) => (
  <li className="flex justify-between py-2 border-b border-gray-100">
    <span className="font-medium text-gray-600">{label}:</span>
    <span className="font-semibold text-gray-800 truncate">{value}</span>
  </li>
);

export default ClubDetails;
