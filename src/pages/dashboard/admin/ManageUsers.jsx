import React from "react";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FiUsers,
  FiUserCheck,
  FiShield,
  FiTrash2,
  FiMail,
} from "react-icons/fi";

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
        icon: "success",
        title: "Success!",
        text: "User role updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const { mutateAsync: deleteUserMutate } = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.delete(`/users/${email}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminUsers"]);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "User has been successfully removed.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const handleChangeRole = async (user, newRole) => {
    Swal.fire({
      title: `Update Role?`,
      text: `Make ${user.name} a ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7C3AED",
      cancelButtonColor: "#ef4444",
      confirmButtonText: `Yes, update!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateRoleMutate({ email: user.email, role: newRole });
      }
    });
  };

  const handleDeleteUser = async (user) => {
    Swal.fire({
      title: `Delete User?`,
      text: "This action cannot be undone!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUserMutate(user.email);
      }
    });
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-black flex items-center gap-3 text-base-content">
        <FiUsers className="text-primary" /> Manage All Users
      </h2>

      <div className="w-full max-w-[80vw] md:max-w-full overflow-hidden bg-base-100 rounded-2xl border border-base-content/5 shadow-sm">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead className="bg-base-200/50">
              <tr className="border-none text-base-content/70">
                <th className="font-black uppercase text-[11px] tracking-wider">
                  User Info
                </th>
                <th className="hidden lg:table-cell font-black uppercase text-[11px] tracking-wider">
                  Email
                </th>
                <th className="font-black uppercase text-[11px] tracking-wider">
                  Role
                </th>
                <th className="text-right font-black uppercase text-[11px] tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-content/5">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-base-200/30 transition-colors border-base-content/5"
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-primary/10 text-center text-primary rounded-xl w-10">
                          <span className="text-3xl  font-black uppercase">
                            {user.name?.slice(0, 1)}
                          </span>
                        </div>
                      </div>
                      <div className="font-bold text-base-content">
                        {user.name || "N/A"}
                      </div>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell text-sm text-base-content/60">
                    <div className="flex items-center gap-2">
                      <FiMail className="opacity-40" /> {user.email}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-600 border-purple-200"
                          : user.role === "clubManager"
                          ? "bg-blue-100 text-blue-600 border-blue-200"
                          : "bg-base-200 text-base-content/50 border-base-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="text-right space-x-1">
                    <div className="dropdown dropdown-left dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-xs text-primary hover:bg-primary/5 rounded-lg"
                      >
                        <FiShield size={18} />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-xl border border-base-content/5 w-48 font-bold text-sm"
                      >
                        {user.role !== "admin" && (
                          <li>
                            <button
                              onClick={() => handleChangeRole(user, "admin")}
                              className="flex items-center gap-2 py-3"
                            >
                              <FiShield className="text-purple-600" /> Make
                              Admin
                            </button>
                          </li>
                        )}
                        {user.role !== "clubManager" &&
                          user.role !== "admin" && (
                            <li>
                              <button
                                onClick={() =>
                                  handleChangeRole(user, "clubManager")
                                }
                                className="flex items-center gap-2 py-3"
                              >
                                <FiUserCheck className="text-blue-600" /> Make
                                Manager
                              </button>
                            </li>
                          )}
                        <div className="divider my-0 opacity-10"></div>
                        <li>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="text-error flex items-center gap-2 py-3"
                          >
                            <FiTrash2 /> Delete User
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 bg-base-200/50 rounded-xl inline-block text-xs font-black uppercase tracking-widest text-base-content/50">
        Total users found: {users.length}
      </div>
    </div>
  );
};

export default ManageUsers;
