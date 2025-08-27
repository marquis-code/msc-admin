import { GATEWAY_ENDPOINT } from "../axios.config";

export const auth_api = {
  $_login(data: any) {
    return GATEWAY_ENDPOINT.post("/login", data);
  }
};
