// User type
export interface User {
  id: string;
  name: string;
  job: string;
  [key: string]: any;
}

// API response for paginated users
export interface UserListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

// State shape for users feature
export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  selectedUser: User | null;
  dialogMode: 'view' | 'edit' | 'create' | 'delete' | null;
} 