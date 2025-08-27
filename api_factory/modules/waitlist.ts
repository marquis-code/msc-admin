import { GATEWAY_ENDPOINT } from "../axios.config";

export const waitlist_api = {  
  $_fetch_waitlist() {
    return GATEWAY_ENDPOINT.get("/waitlist");
  },
  $_delete_waitlist(id: string) {
    return GATEWAY_ENDPOINT.delete(`/waitlist/${id}`);
  }
};