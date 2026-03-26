import {
  ContactPayload,
  ContactCreateResponse,
  AdminContactListResponse,
  AdminContactDetailsResponse,
  AdminMarkAsReadResponse,
  AdminDeleteContactResponse,
  AdminContactCountResponse,
  ContactCategory,
} from "@/types/contact-types";

import { clients } from "../client";
import { WEB_ENDPOINTS } from "../endpoints";

/* ---------------- GET ALL (ADMIN) ---------------- */
// ?search="hello"&category="website_development"&is_read="true"

export type ContactMessageFilters = {
  search?: string;
  category?: ContactCategory;
  is_read?: boolean;
};
/* ---------------- GET ALL (ADMIN) ---------------- */
export const getAdminContactMessages = async (
  page: number = 1,
  limit: number = 10,
  filters?: ContactMessageFilters,
) => {
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  // dynamic filters
  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, String(value));
    }
  });

  return clients.golang.get<AdminContactListResponse>(
    `${WEB_ENDPOINTS.admin_get_all_contact_messages}?${queryParams.toString()}`,
  );
};

/* ---------------- GET DETAILS ---------------- */
export const getAdminContactMessageById = async (id: string) => {
  return clients.golang.get<AdminContactDetailsResponse>(
    `${WEB_ENDPOINTS.admin_get_contact_message_by_id}${id}`,
  );
};

/* ---------------- MARK AS READ ---------------- */
export const markContactMessageAsRead = async (id: string) => {
  console.log("Marking contact message as read:", id);
  return clients.golang.patch<AdminMarkAsReadResponse>(
    `${WEB_ENDPOINTS.admin_mark_contact_message_as_read}${id}/read`,
  );
};

/* ---------------- DELETE ---------------- */
export const deleteContactMessage = async (id: string) => {
  return clients.golang.delete<AdminDeleteContactResponse>(
    `${WEB_ENDPOINTS.admin_delete_contact_message_by_id}${id}`,
  );
};

/* ---------------- COUNT ---------------- */
export const countContactMessages = async () => {
  return clients.golang.get<AdminContactCountResponse>(
    WEB_ENDPOINTS.admin_count_contact_messages,
  );
};
