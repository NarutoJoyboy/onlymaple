'use client';

import React, { useState } from 'react';
import { Heart, MapPin, Search, TrendingUp, ArrowRight } from 'lucide-react';
import { RevealOnScroll } from '../animations/RevealOnScroll';

import { useAuth } from '../auth/AuthProvider';
import { getBusinessesByIds, DirectoryBusiness } from '@/lib/db/businesses';
import { getUserProfile } from '@/lib/db/users'; // We need this to get savedBusinesses array
import { ShopperProfile } from '@/lib/types';

export const ShopperDashboard = () => {
  const { user } = useAuth();
  const [savedBusinesses, setSavedBusinesses] = useState<DirectoryBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("User");

  React.useEffect(() => {
    const fetchData = async () => {
      if (user) {
        // 1. Get User Profile for saved IDs (and name)
        const profile = await getUserProfile(user.uid);
        if (profile && profile.role === 'shopper') {
          const shopperProfile = profile as ShopperProfile;
          setUserName(shopperProfile.displayName || "User");
          const savedIds = shopperProfile.additionalData?.savedBusinesses || [];

          // 2. Mock some saved IDs if empty for demo? 
          // setSavedBusinesses([]); 

          if (savedIds.length > 0) {
            const businesses = await getBusinessesByIds(savedIds);
            setSavedBusinesses(businesses);
          }
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 pb-12 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-gray-200 border-t-gray-600 rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-6">

        <RevealOnScroll>
          {/* Welcome Header */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Welcome back, {userName.split(' ')[0]}!</h1>
              <p className="text-gray-500 mt-2">You've supported {savedBusinesses.length} Canadian businesses this month.</p>
            </div>
            <button className="bg-red-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-red-800 transition-colors flex items-center">
              <Search className="w-4 h-4 mr-2" /> Find More
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Stats (Mocked or calculated) */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mr-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Local Impact</p>
                <p className="text-2xl font-extrabold text-gray-900">~${savedBusinesses.length * 50} CAD</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mr-4">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Favorites</p>
                <p className="text-2xl font-extrabold text-gray-900">{savedBusinesses.length} Saved</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mr-4">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Your Hub</p>
                <p className="text-2xl font-extrabold text-gray-900">Toronto, ON</p>
              </div>
            </div>
          </div>

          {/* Saved Businesses Grid */}
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Favorite Spots</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {savedBusinesses.length > 0 ? (
              savedBusinesses.map((biz, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="h-32 bg-gray-100 rounded-2xl mb-4 flex items-center justify-center text-gray-300 font-bold">IMG</div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-red-700 transition-colors">{biz.name}</h3>
                      <p className="text-sm text-gray-500">{biz.location}</p>
                    </div>
                    <span className="bg-gray-50 text-gray-500 px-2 py-1 rounded-lg text-xs font-medium">{biz.category}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-400">
                <p>No favorites yet. Start exploring!</p>
              </div>
            )}

            {/* "Add More" Card */}
            <div className="bg-slate-50 rounded-3xl p-6 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center hover:border-red-200 hover:bg-red-50/50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-gray-400 group-hover:text-red-500 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
              <p className="font-bold text-gray-600 group-hover:text-red-700">Discover New Businesses</p>
            </div>
          </div>

        </RevealOnScroll>
      </div>
    </div>
  );
};