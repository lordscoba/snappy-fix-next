import { ContactPayload, ContactCreateResponse } from "@/types/contact-types";

import { clients } from "../client";
import { WEB_ENDPOINTS } from "../endpoints";

/* ---------------- CREATE (PUBLIC) ---------------- */
export const createContactMessage = async (payload: ContactPayload) => {
  return clients.golang.post<ContactCreateResponse>(
    WEB_ENDPOINTS.create_contact_message,
    payload,
  );
};
