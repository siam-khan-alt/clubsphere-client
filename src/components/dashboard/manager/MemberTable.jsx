import React from "react";
import { FiMail } from "react-icons/fi";
import { format } from "date-fns";

const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
      return (
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      );
    case "pendingpayment":
      return (
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
          Pending Payment
        </span>
      );
    case "expired":
      return (
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          Expired
        </span>
      );
    default:
      return (
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
          Unknown
        </span>
      );
  }
};

const MemberTable = ({ members, onExpireMember }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Member Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Joined Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member) => (
            <tr key={member._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                <FiMail className="mr-2 text-indigo-500 w-4 h-4" />
                {member.userEmail}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(member.joinedAt), "MMM dd, yyyy")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(member.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onExpireMember(member._id)}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50"
                  disabled={member.status === "expired"}
                >
                  Set Expired
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
