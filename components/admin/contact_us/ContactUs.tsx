"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import {
  Search,
  Eye,
  Trash2,
  Mail,
  MailOpen,
  Filter,
  X,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { ContactMessage, ContactCategory } from "@/types/contact-types";
import {
  ContactMessageFilters,
  countContactMessages,
  deleteContactMessage,
  getAdminContactMessageById,
  getAdminContactMessages,
  markContactMessageAsRead,
} from "@/lib/api/services/admin.contact-us.services";
// Adjust path as needed

export default function ContactMessagesComponent() {
  // Data State
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [totalMessages, setTotalMessages] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // Filter State
  const [filters, setFilters] = useState<ContactMessageFilters>({});
  const [searchInput, setSearchInput] = useState("");

  // Modals State
  const [viewMessageId, setViewMessageId] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null,
  );
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch count on mount
  useEffect(() => {
    countContactMessages()
      .then((res) => setTotalMessages(res.data.data.total))
      .catch((err) => console.error("Failed to load total count", err));
  }, []);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAdminContactMessages(page, limit, filters);
      setMessages(res.data.data.messages || []);

      const meta = res.data.pagination?.[0];
      if (meta) {
        setTotalPages(meta.total_pages_count);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load contact messages");
    } finally {
      setLoading(false);
    }
  }, [page, limit, filters]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Handlers
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setFilters((prev) => ({ ...prev, search: searchInput }));
  };

  const handleFilterChange = (key: keyof ContactMessageFilters, value: any) => {
    setPage(1);
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      if (value === "") delete newFilters[key]; // clear filter
      return newFilters;
    });
  };

  const handleViewMessage = async (id: string) => {
    setViewMessageId(id);
    setLoadingDetails(true);
    try {
      const res = await getAdminContactMessageById(id);
      setSelectedMessage(res.data.data.message);
    } catch (err) {
      toast.error("Failed to load message details");
      setViewMessageId(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markContactMessageAsRead(id);
      toast.success("Message marked as read");

      // Update local state without full refetch
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)),
      );
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, is_read: true });
      }
    } catch (err) {
      toast.error("Failed to mark message as read");
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      setIsDeleting(true);
      await deleteContactMessage(deleteConfirmId);
      toast.success("Message deleted successfully");
      setDeleteConfirmId(null);
      fetchMessages(); // refresh list
      // Update total count
      setTotalMessages((prev) => Math.max(0, prev - 1));
    } catch (err) {
      toast.error("Failed to delete message");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER & FILTERS */}
      <section className="rounded-[2rem] border border-[#e7ddf2] bg-white shadow-sm overflow-hidden p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-[#2b1d3a]">
              Inbox ({totalMessages})
            </h3>
            <p className="text-sm text-[#6f5a88]">
              Manage user enquiries and feedback.
            </p>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full md:w-80"
          >
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b08fd9]"
            />
            <input
              type="text"
              placeholder="Search by name, email or subject..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#faf7ff] border border-[#eee4fb] rounded-xl text-sm text-[#2b1d3a] placeholder-[#b08fd9] focus:outline-none focus:ring-2 focus:ring-[#e7ddf2] transition-all"
            />
          </form>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#eee4fb]">
          <div className="flex items-center gap-2 text-sm text-[#6f5a88] mr-2">
            <Filter size={16} /> Filters:
          </div>

          <select
            className="bg-[#faf7ff] border border-[#eee4fb] rounded-lg px-3 py-1.5 text-sm text-[#2b1d3a] focus:outline-none focus:ring-2 focus:ring-[#e7ddf2]"
            value={filters.category || ""}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">All Categories</option>
            <option value={ContactCategory.GENERAL_ENQUIRY}>
              General Enquiry
            </option>
            <option value={ContactCategory.WEBSITE_DEVELOPMENT}>
              Website Development
            </option>
            <option value={ContactCategory.ONLINE_TOOLS_FEEDBACK}>
              Tools Feedback
            </option>
            <option value={ContactCategory.PARTNERSHIP}>Partnership</option>
          </select>

          <select
            className="bg-[#faf7ff] border border-[#eee4fb] rounded-lg px-3 py-1.5 text-sm text-[#2b1d3a] focus:outline-none focus:ring-2 focus:ring-[#e7ddf2]"
            value={filters.is_read !== undefined ? String(filters.is_read) : ""}
            onChange={(e) => {
              const val = e.target.value;
              handleFilterChange(
                "is_read",
                val === "" ? undefined : val === "true",
              );
            }}
          >
            <option value="">All Statuses</option>
            <option value="false">Unread</option>
            <option value="true">Read</option>
          </select>
        </div>
      </section>

      {/* TABLE */}
      <section className="rounded-[2rem] border border-[#e7ddf2] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[900px]">
            <thead className="bg-[#faf7ff] border-b border-[#eee4fb] text-[#b08fd9] uppercase text-[10px] tracking-[0.2em] font-black">
              <tr>
                <th className="px-6 py-5">Sender</th>
                <th className="px-6 py-5">Subject</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eee4fb] text-[#2b1d3a]">
              {loading ? (
                <TableSkeleton rows={5} />
              ) : messages.length > 0 ? (
                messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="group hover:bg-[#fcfaff] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold text-sm text-[#2b1d3a]">
                        {msg.name}
                      </p>
                      <p className="text-xs text-[#6f5a88]">{msg.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p
                        className="text-sm font-medium text-[#2b1d3a] truncate max-w-[200px]"
                        title={msg.subject}
                      >
                        {msg.subject}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-xs text-[#6f5a88]">
                      {formatCategory(msg.Category)}
                    </td>
                    <td className="px-6 py-4 text-xs text-[#6f5a88]">
                      {new Date(msg.created_at).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                          msg.is_read
                            ? "bg-[#faf7ff] text-[#b08fd9] border border-[#eee4fb]"
                            : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        }`}
                      >
                        {msg.is_read ? (
                          <MailOpen size={10} />
                        ) : (
                          <Mail size={10} />
                        )}
                        {msg.is_read ? "Read" : "New"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleViewMessage(msg.id)}
                          className="p-2 rounded-xl text-[#b08fd9] hover:bg-[#faf7ff] hover:text-[#5b32b4] transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(msg.id)}
                          className="p-2 rounded-xl text-red-300 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete Message"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <p className="text-sm text-[#b08fd9]">No messages found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="border-t border-[#eee4fb] bg-[#faf7ff]/50 px-6 py-4 flex items-center justify-between text-sm text-[#6f5a88]">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-[#e7ddf2] bg-white hover:bg-[#faf7ff] disabled:opacity-50 transition-colors"
              >
                Previous
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-[#e7ddf2] bg-white hover:bg-[#faf7ff] disabled:opacity-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>

      {/* --- MODALS --- */}

      {/* Message Details Modal */}
      {viewMessageId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2b1d3a]/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] border border-[#e7ddf2] shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#eee4fb] bg-[#faf7ff] flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#2b1d3a]">
                Message Details
              </h3>
              <button
                onClick={() => {
                  setViewMessageId(null);
                  setSelectedMessage(null);
                }}
                className="text-[#b08fd9] hover:text-[#2b1d3a] transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              {loadingDetails ? (
                <div className="flex justify-center py-10">
                  <div className="w-6 h-6 border-2 border-[#eee4fb] border-t-[#5b32b4] rounded-full animate-spin" />
                </div>
              ) : selectedMessage ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6 bg-[#faf7ff] p-5 rounded-2xl border border-[#eee4fb]">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-black text-[#b08fd9] mb-1">
                        Sender
                      </p>
                      <p className="font-bold text-[#2b1d3a]">
                        {selectedMessage.name}
                      </p>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-sm text-[#5b32b4] hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-black text-[#b08fd9] mb-1">
                        Meta
                      </p>
                      <p className="text-sm text-[#6f5a88]">
                        {formatCategory(selectedMessage.Category)}
                      </p>
                      <p className="text-sm text-[#6f5a88]">
                        {new Date(selectedMessage.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#2b1d3a] mb-2">
                      {selectedMessage.subject}
                    </h4>
                    <div className="bg-white border border-[#eee4fb] rounded-2xl p-5 text-sm text-[#463853] whitespace-pre-wrap leading-relaxed shadow-sm">
                      {selectedMessage.message}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-red-500 py-10">
                  Could not load message.
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#eee4fb] bg-[#faf7ff]/50 flex justify-end gap-3">
              {!loadingDetails &&
                selectedMessage &&
                !selectedMessage.is_read && (
                  <button
                    onClick={() => handleMarkAsRead(selectedMessage.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 font-medium text-sm rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  >
                    <CheckCircle2 size={16} /> Mark as Read
                  </button>
                )}
              <button
                onClick={() => {
                  setViewMessageId(null);
                  setSelectedMessage(null);
                }}
                className="px-4 py-2 bg-white border border-[#e7ddf2] text-[#2b1d3a] font-medium text-sm rounded-xl hover:bg-[#faf7ff] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2b1d3a]/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] border border-red-100 shadow-xl w-full max-w-md p-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto text-red-500">
              <AlertTriangle size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#2b1d3a]">
                Delete Message?
              </h3>
              <p className="text-sm text-[#6f5a88] mt-2">
                Are you sure you want to delete this contact message? This
                action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                disabled={isDeleting}
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2.5 bg-[#faf7ff] border border-[#eee4fb] text-[#2b1d3a] font-medium text-sm rounded-xl hover:bg-[#f3edff] transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white font-medium text-sm rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── UTILS & SUBCOMPONENTS ──────────────────────────────────────────────────

function formatCategory(cat: string) {
  if (!cat) return "Unknown";
  return cat
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function TableSkeleton({ rows }: { rows: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          <td className="px-6 py-4">
            <div className="h-4 w-24 bg-[#faf7ff] rounded mb-2" />
            <div className="h-3 w-32 bg-[#faf7ff] rounded" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-40 bg-[#faf7ff] rounded" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-20 bg-[#faf7ff] rounded" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-24 bg-[#faf7ff] rounded" />
          </td>
          <td className="px-6 py-4">
            <div className="h-6 w-16 bg-[#faf7ff] rounded-lg" />
          </td>
          <td className="px-6 py-4 flex justify-end gap-2">
            <div className="h-8 w-8 bg-[#faf7ff] rounded-xl" />
          </td>
        </tr>
      ))}
    </>
  );
}
