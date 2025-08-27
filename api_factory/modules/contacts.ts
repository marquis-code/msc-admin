import { GATEWAY_ENDPOINT } from "../axios.config";

export const contacts_api = {  
  $_fetch_contacts() {
    return GATEWAY_ENDPOINT.get("/contacts");
  },
  $_contact_by_id(id: string) {
    return GATEWAY_ENDPOINT.get(`/contacts/${id}`);
  },
  $_mark_contact_as_read(id: string, status: any) {
    return GATEWAY_ENDPOINT.patch(`/contacts/${id}/mark-read`);
  },

  $_delete_contact(id: string) {
    return GATEWAY_ENDPOINT.delete(`/contacts/${id}`);
  }
};