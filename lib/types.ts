export type UserRole = 'shopper' | 'business' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  createdAt: number; // Timestamp as milliseconds or Firebase Timestamp? Using number for simplicity first, but likely Timestamp object from Firestore
  displayName: string;
}

export interface ShopperProfile extends UserProfile {
  role: 'shopper';
  savedBusinesses: string[]; // Array of businessIds
  homeLocation?: string;
}

export interface BusinessData {
  legalName: string;
  businessNumber: string;
  address: string;
  website?: string;
  submitterRole: string;
  category?: string; // e.g. "Food & Drink"
  description?: string;
  documents?: {
    incorporation?: string;
    governmentId?: string;
  };
  badges: string[];
}

export interface BusinessProfile extends UserProfile {
  role: 'business';
  businessData?: BusinessData;
  verificationStatus?: 'new' | 'pending' | 'verified' | 'rejected';
}

export interface BusinessApplication {
  id?: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: number;
  data: BusinessData;
}
