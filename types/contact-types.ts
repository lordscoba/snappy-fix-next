import { ApiResponse, Pagination } from "./base-response";

export enum ContactCategory {
  WEBSITE_DEVELOPMENT = "website_development",
  ONLINE_TOOLS_FEEDBACK = "online_tools_feedback",
  GENERAL_ENQUIRY = "general_enquiry",
  PARTNERSHIP = "partnership",
}

/* ---------------- PAYLOAD ---------------- */
export type ContactPayload = {
  category: ContactCategory;
  name: string;
  email: string;
  subject: string;
  message: string;
};

/* ---------------- ENTITY ---------------- */
export type ContactMessage = {
  id: string;

  // ⚠️ backend uses capital "Category"
  Category: string;

  name: string;
  email: string;
  subject: string;
  message: string;

  ip: string;
  user_agent: string;

  is_read: boolean;
  created_at: string;
};

/* ---------------- CREATE ---------------- */
export type ContactCreateResponse = ApiResponse<{
  message: ContactMessage;
}> & {
  pagination: Pagination;
};

/* ---------------- ADMIN LIST ---------------- */
export type AdminContactListResponse = ApiResponse<{
  messages: ContactMessage[];
}> & {
  pagination: Pagination;
};

/* ---------------- ADMIN DETAILS ---------------- */
export type AdminContactDetailsResponse = ApiResponse<{
  message: ContactMessage;
}> & {
  pagination: Pagination;
};

/* ---------------- MARK AS READ ---------------- */
export type AdminMarkAsReadResponse = ApiResponse<{
  message: string;
}> & {
  pagination: Pagination;
};

/* ---------------- DELETE ---------------- */
export type AdminDeleteContactResponse = ApiResponse<{
  message: string;
}> & {
  pagination: Pagination;
};

/* ---------------- COUNT ---------------- */
export type AdminContactCountResponse = ApiResponse<{
  total: number;
}> & {
  pagination: Pagination;
};
