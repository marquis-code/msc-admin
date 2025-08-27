import { GATEWAY_ENDPOINT } from "../axios.config";

export const stats_api = {  
  $_fetch_dashboard_stats() {
    return GATEWAY_ENDPOINT.get("/stats");
  }
};