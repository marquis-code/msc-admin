export interface Contact {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  organisation: string;
  subject: string;
  message: string;
  created_at: string;
  is_read?: boolean;
}

export interface WaitlistEntry {
  id: number;
  email: string;
  created_at: string;
}

export interface AdminStats {
  totalContacts: number;
  unreadContacts: number;
  readContacts: number;
  recentContacts: number;
  totalWaitlist: number;
  recentWaitlist: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  message: string;
  data?: T;
  id?: number;
}

export type ViewMode = 'list' | 'grid';