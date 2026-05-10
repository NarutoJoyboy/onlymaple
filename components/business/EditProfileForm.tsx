'use client';

import React from 'react';
import { Save, Image as ImageIcon, MapPin, Globe, Clock, Upload } from 'lucide-react';
import {RevealOnScroll} from '../animations/RevealOnScroll';

export const EditProfileForm = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
       <div className="max-w-4xl mx-auto px-6">
          <RevealOnScroll>
             <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900">Edit Profile</h1>
                <button className="bg-red-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-red-800 transition-colors flex items-center">
                   <Save className="w-4 h-4 mr-2" /> Save Changes
                </button>
             </div>
             <div className="bg-white rounded-[2rem] border border-gray-100 shadow-lg overflow-hidden p-8 space-y-8">
                <div>
                   <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Basic Information</h3>
                   <div className="grid gap-6">
                      <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Display Name</label><input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-red-500" defaultValue="Maple Tech Solutions" /></div>
                      <div className="space-y-2"><label className="text-sm font-bold text-gray-700">About Us</label><textarea className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-red-500 min-h-[150px]" defaultValue="Founded in 2015..." /></div>
                   </div>
                </div>
                <div>
                   <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2 flex items-center"><MapPin className="w-5 h-5 mr-2 text-red-600"/> Contact & Location</h3>
                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Address</label><input type="text" defaultValue="123 Yonge Street" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-red-500" /></div>
                      <div className="space-y-2"><label className="text-sm font-bold text-gray-700">City</label><input type="text" defaultValue="Toronto" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-red-500" /></div>
                      <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Website</label><input type="text" defaultValue="https://mapletech.ca" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-red-500" /></div>
                   </div>
                </div>
             </div>
          </RevealOnScroll>
       </div>
    </div>
  );
};