
// const admin = require('firebase-admin');

// Note: This script is intended to be run in a Node.js environment with firebase-admin SDK.
// Since we are in a client-side environment context, we might need to run this differently 
// or use the client SDK to seed. 
// Given the constraints, I will create a Client-Side seeder component that can be triggered effectively.

import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const BUSINESSES_TO_SEED = [
  { 
    id: "biz_1", 
    legalName: "Northern Roots Coffee", 
    displayName: "Northern Roots Coffee",
    address: "Toronto, ON", 
    category: "Food & Drink", 
    description: "Ethically sourced, roasted right here in Kensington Market. We partner with fair-trade farms and roast in small batches.",
    role: "business",
    email: "contact@northernroots.ca",
    verified: true,
    badges: ["Canadian Owned", "Local"]
  },
  { 
    id: "biz_2", 
    legalName: "Maple Leaf Furniture", 
    displayName: "Maple Leaf Furniture",
    address: "Vancouver, BC", 
    category: "Retail", 
    description: "Handcrafted wood furniture using sustainable BC timber. Family owned and operated since 1985.",
    role: "business",
    email: "info@mapleleaffurniture.ca",
    verified: true,
    badges: ["Canadian Based", "Independent"]
  },
  { 
    id: "biz_3", 
    legalName: "Rideau Canal Skates", 
    displayName: "Rideau Canal Skates",
    address: "Ottawa, ON", 
    category: "Sports", 
    description: "Equipment for the true Canadian winter. We donate 5% of profits to local youth hockey leagues.",
    role: "business",
    email: "sales@rideauskates.ca",
    verified: true,
    badges: ["Gold Member", "Contributor"]
  },
  { 
    id: "biz_4", 
    legalName: "Halifax Harbour General", 
    displayName: "Halifax Harbour General",
    address: "Halifax, NS", 
    category: "Retail", 
    description: "Maritime goods and gifts. Supporting over 50 local artisans and makers from Nova Scotia.",
    role: "business",
    email: "hello@halifaxgeneral.ca",
    verified: true,
    badges: ["Locally Owned"]
  },
  { 
    id: "biz_5", 
    legalName: "Prairie Grain Bakery", 
    displayName: "Prairie Grain Bakery",
    address: "Saskatoon, SK", 
    category: "Food & Drink", 
    description: "Baking bread the old fashioned way with 100% Saskatchewan wheat.",
    role: "business",
    email: "baking@prairiegrain.ca",
    verified: true,
    badges: ["Canadian Owned"]
  },
  { 
    id: "biz_6", 
    legalName: "Rocky Mountain Gear", 
    displayName: "Rocky Mountain Gear",
    address: "Calgary, AB", 
    category: "Retail", 
    description: "Technical outerwear designed and tested in the Canadian Rockies.",
    role: "business",
    email: "support@rockymountaingear.ca",
    verified: true,
    badges: ["Gold Member"]
  }
];

export const seedBusinesses = async () => {
    console.log("Seeding businesses...");
    for (const biz of BUSINESSES_TO_SEED) {
        const userRef = doc(db, 'users', biz.id);
        const userData = {
            email: biz.email,
            role: biz.role,
            displayName: biz.displayName,
            createdAt: Date.now(),
            verificationStatus: biz.verified ? 'verified' : 'pending',
            businessData: {
                legalName: biz.legalName,
                businessNumber: "123456789", // Mock BN
                address: biz.address,
                website: "https://example.com",
                submitterRole: "Owner",
                badges: biz.badges,
                category: biz.category,
                description: biz.description
            }
        };
        
        await setDoc(userRef, userData, { merge: true });
        console.log(`Seeded ${biz.displayName}`);
    }
    console.log("Seeding complete!");
};
