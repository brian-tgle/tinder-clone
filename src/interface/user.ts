export interface UserListResponse {
  currentPage: number;
  data: UserItem[];
  totalPages: number;
  totalItems: number;
}

export interface UserItem {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}

export interface UserProfile extends UserItem {
  gender: string;
  dateOfBirth: string;
  registerDate: string,
  phone: string;
}

export interface UserReaction {
  userId: string;
  interactedUserId: string;
  reaction: string;
}

export interface UserHistory {
  id: string;
  interactedUser: UserProfile;
  reaction: string;
  createdAt: string;
}

export interface HistoryListResponse {
  currentPage: number;
  data: UserHistory[];
  totalPages: number;
  totalItems: number;
}
