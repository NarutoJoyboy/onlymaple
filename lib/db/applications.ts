import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export interface BusinessApplicationData {
  userId: string;
  businessDetails: {
    legalName: string;
    businessNumber: string;
    address: string;
    website?: string;
    submitterRole: string;
  };
  documents: {
    incorporation?: string; // Base64 string
    governmentId?: string; // Base64 string
  };
  badges: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: number;
}

// Helper to remove undefined values
const sanitizeData = (data: any) => {
  const sanitized: any = {};
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      if (typeof data[key] === 'object' && data[key] !== null) {
        sanitized[key] = sanitizeData(data[key]);
      } else {
        sanitized[key] = data[key];
      }
    }
  });
  return sanitized;
};

export const createBusinessApplication = async (userId: string, data: Omit<BusinessApplicationData, 'userId' | 'status' | 'submittedAt'>) => {
  if (!userId) throw new Error('User ID is required');
  
  const applicationRef = doc(collection(db, 'business_applications')); 
  const userRef = doc(db, 'users', userId);
  
  const applicationData: BusinessApplicationData = {
    userId,
    ...data,
    status: 'pending',
    submittedAt: Date.now(),
  };

  const sanitizedApp = sanitizeData(applicationData);
  
  // Data to update in User Profile
  const userUpdate = {
    businessData: {
      legalName: data.businessDetails.legalName,
      businessNumber: data.businessDetails.businessNumber,
      address: data.businessDetails.address,
      website: data.businessDetails.website,
      submitterRole: data.businessDetails.submitterRole,
      documents: data.documents,
      badges: data.badges
    },
    verificationStatus: 'pending'
  };

  const sanitizedUserUpdate = sanitizeData(userUpdate);

  try {
    // 1. Create the admin application document
    await setDoc(applicationRef, sanitizedApp);
    
    // 2. Update the user document with the business data
    await setDoc(userRef, sanitizedUserUpdate, { merge: true });

    return { id: applicationRef.id, ...sanitizedApp };
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

export const getUserApplication = async (userId: string) => {
  if (!userId) return null;

  try {
    // Read directly from the User Profile now
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      // Map the user profile data back to the expected application format for the dashboard
      if (userData.verificationStatus && userData.businessData) {
          return {
              userId,
              status: userData.verificationStatus,
              submittedAt: 0, // Not stored in user profile currently, could add if needed
              businessDetails: {
                  legalName: userData.businessData.legalName,
                  businessNumber: userData.businessData.businessNumber,
                  address: userData.businessData.address,
                  website: userData.businessData.website,
                  submitterRole: userData.businessData.submitterRole,
              },
              documents: userData.businessData.documents,
              badges: userData.businessData.badges
          } as BusinessApplicationData;
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching application/profile:', error);
    return null;
  }
};
