// src/lib/db/businesses.ts
import { STORE_DATA } from '../constants'; // The 20 stores I gave you

export interface DirectoryBusiness {
  id: number;
  name: string;
  location: string;
  province: string;
  type: string[];
  category: string;
  desc: string;
  verified: boolean;
}

export const getVerifiedBusinesses = async (): Promise<DirectoryBusiness[]> => {
  // Simulate a network delay for a "Senior" loading experience
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(STORE_DATA);
    }, 800); 
  });
};

export const getBusinessById = (id: string): DirectoryBusiness | undefined => {
  return STORE_DATA.find((business) => String(business.id) === id);
};
