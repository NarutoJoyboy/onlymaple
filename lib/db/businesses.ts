import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { BusinessProfile } from '@/lib/types';

export interface DirectoryBusiness {
  id: string;
  name: string;
  location: string;
  category: string;
  type: string[]; // badges
  desc: string;
  verified: boolean;
}

export const getVerifiedBusinesses = async (): Promise<DirectoryBusiness[]> => {
  try {
    const usersRef = collection(db, 'users');
    // Query users where role is 'business' (and ideally verificationStatus is 'verified')
    // For now, we might just get all businesses and filter in client or add the compound index later
    const q = query(usersRef, where('role', '==', 'business'));
    
    const querySnapshot = await getDocs(q);
    const businesses: DirectoryBusiness[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as BusinessProfile;
      
      // Basic mapping - falling back to defaults if fields are missing
      if (data.businessData) {
        businesses.push({
          id: doc.id,
          name: data.businessData.legalName || data.displayName || 'Unknown Business',
          location: data.businessData.address || 'Canada', // Simplify address to city?
          category: data.businessData.category || 'Uncategorized',
          type: data.businessData.badges || [],
          desc: data.businessData.description || 'No description available.',
          verified: data.verificationStatus === 'verified'
        });
      }
    });

    return businesses;
  } catch (error) {
    console.error('Error getting verified businesses:', error);
    return [];
  }
};

export const getBusinessesByIds = async (ids: string[]): Promise<DirectoryBusiness[]> => {
  if (!ids || ids.length === 0) return [];
  
  // Note: 'in' query supports up to 10 items. For more, we need to batch or fetch all and filter.
  // For this MVP phase, we'll assume < 10 saved items or just fetch all and filter client side if needed, 
  // but let's try to be efficient where possible.
  // Actually, since we don't have document IDs for the business list easily from the Directory view (we used random IDs in mock),
  // we need to make sure we are using the same IDs. The 'DirectoryBusiness' interface uses 'id' from doc.id.
  
  try {
    const businesses: DirectoryBusiness[] = [];
    const allBusinesses = await getVerifiedBusinesses(); // Reusing this for simplicity in MVP
    return allBusinesses.filter(b => ids.includes(b.id));
  } catch (error) {
    console.error('Error fetching saved businesses:', error);
    return [];
  }
};
