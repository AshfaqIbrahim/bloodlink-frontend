// src/pages/admin/Users.jsx
import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Droplet,
  Ban,
  CheckCircle2,
  Loader,
  AlertCircle,
  Users as UsersIcon,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getAllUsers, blockUser, unblockUser } from "../../api/adminApi";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actioningId, setActioningId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllUsers();
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  const runAction = async (id, actionFn) => {
    setActioningId(id);
    try {
      await actionFn(id);
      await fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Action failed. Please try again.");
    } finally {
      setActioningId(null);
    }
  };

  return (
    <AdminLayout
      title="User Management"
      subtitle="View and manage donor/recipient accounts."
    >
      {loading && (
        <div className="flex justify-center items-center py-16">
          <Loader size={32} className="text-[#7A2F2F] animate-spin" />
        </div>
      )}

      {!loading && error && (
        <div className="bg-[#FCFBF8] rounded-2xl p-8 text-center border border-gray-200/60">
          <AlertCircle size={36} className="text-[#C23B22] mx-auto mb-3" />
          <p className="text-[#1C2321] font-medium">{error}</p>
          <button
            onClick={fetchUsers}
            className="mt-3 px-6 py-2 bg-[#7A2F2F] text-white rounded-xl hover:bg-[#631F1F] transition-colors duration-200 text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="bg-[#FCFBF8] rounded-2xl p-12 text-center border border-gray-200/60">
          <UsersIcon size={36} className="text-[#8C8579] mx-auto mb-3" />
          <p className="text-[#1C2321] font-medium">No users found.</p>
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="bg-[#FCFBF8] rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200/60 text-left text-[#8C8579]">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Contact</th>
                  <th className="px-5 py-3 font-medium">Blood Group</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const isBusy = actioningId === user._id;
                  return (
                    <tr
                      key={user._id}
                      className="border-b border-gray-200/40 last:border-0"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#7A2F2F]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#7A2F2F] font-medium text-xs">
                              {user.firstName?.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium text-[#1C2321]">
                            {user.firstName} {user.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-[#8C8579]">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <Mail size={12} />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone size={12} />
                          {user.phone}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#7A2F2F]/10 text-[#7A2F2F]">
                          <Droplet size={11} />
                          {user.bloodGroup}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        {user.isBlocked ? (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#C23B22]/10 text-[#C23B22]">
                            Blocked
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#3F6B5C]/10 text-[#3F6B5C]">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        {user.isBlocked ? (
                          <button
                            onClick={() => runAction(user._id, unblockUser)}
                            disabled={isBusy}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3F6B5C] text-white rounded-lg text-xs font-medium hover:bg-[#345a4d] transition-colors duration-200 disabled:opacity-60"
                          >
                            <CheckCircle2 size={13} />
                            Unblock
                          </button>
                        ) : (
                          <button
                            onClick={() => runAction(user._id, blockUser)}
                            disabled={isBusy}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#C23B22]/30 text-[#C23B22] rounded-lg text-xs font-medium hover:bg-[#C23B22]/5 transition-colors duration-200 disabled:opacity-60"
                          >
                            <Ban size={13} />
                            Block
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
