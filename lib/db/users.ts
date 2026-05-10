import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserProfile, ShopperProfile, BusinessProfile, UserRole } from '@/lib/types';

// Helper to remove undefined values because Firestore does not support them
const sanitizeData = (data: any) => {
  const sanitized: any = {};
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      sanitized[key] = data[key];
    }
  });
  return sanitized;
};

export const createUserDocument = async (uid: string, data: {
  email: string;
  role: UserRole;
  displayName: string;
  additionalData?: Partial<ShopperProfile | BusinessProfile>;
}) => {
  if (!uid) return;

  const userRef = doc(db, 'users', uid);

  const rawData: UserProfile = {
    uid,
    email: data.email,
    role: data.role,
    createdAt: Date.now(),
    displayName: data.displayName,
    ...data.additionalData,
  };

  const userData = sanitizeData(rawData);

  try {
    // Add a race with a timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Firestore write timed out')), 10000)
    );

    await Promise.race([
      setDoc(userRef, userData, { merge: true }),
      timeoutPromise
    ]);

    return userData;
  } catch (error) {
    console.error('Error creating user document', error);
    throw error;
  }
};

export const getUserProfile = async (uid: string) => {
  if (!uid) return null;

  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};
