import React from "react";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
 
  const { mutateAsync: updateRoleMutate } = useMutation({
        mutationFn: async ({ email, role }) => {
            const res = await axiosSecure.patch(`/users/role/${email}`, { role });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["adminUsers"]);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'User role updated successfully.',
                timer: 1500
            });
        },
        onError: (error) => {
             Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to update user role!',
            });
            console.error("Role update error:", error);
        }
    });
 
    const { mutateAsync: deleteUserMutate } = useMutation({
        mutationFn: async (email) => {
            const res = await axiosSecure.delete(`/users/${email}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["adminUsers"]); 
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'User has been successfully deleted.',
                timer: 1500
            });
        },
        onError: (error) => {
             Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to delete user.',
            });
            console.error("Delete user error:", error);
        }
    });
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (users.length === 0) {
    return <div className="text-center py-10">No users found.</div>;
  }

  const handleChangeRole = async (user, newRole) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `You are about to change ${user.name}'s role to ${newRole}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, make ${newRole}!`
        }).then(async (result) => {
            if (result.isConfirmed) {
                await updateRoleMutate({ email: user.email, role: newRole });
            }
        });
    };
  const handleDeleteUser = async (user) => {
        Swal.fire({
            title: `Delete ${user.name}?`,
            text: "You won't be able to revert this! This will remove the user from the database and Firebase.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteUserMutate(user.email);
            }
        });
    };

  return (
    <div className="container mx-auto p-4">
      <h3 className=" mb-6">
        Manage All Users: {users.length}
      </h3>

      <div className="overflow-x-auto  max-w-64 md:max-w-2xl lg:max-w-3xl bg-white shadow-md rounded-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name || "N/A"}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleChangeRole(user, "admin")}
                      className="btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Make Admin
                    </button>
                  )}

                  {user.role !== "clubManager" && user.role !== "admin" && (
                    <button
                      onClick={() => handleChangeRole(user, "clubManager")}
                      className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Make Manager
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
