'use client';

import React, { useState } from 'react';
import {
  ShieldCheck, Eye, MousePointer2, AlertCircle, Download, Edit,
  Clock, QrCode, Printer, Code, CheckCircle2, TrendingUp, Calendar, RefreshCw
} from 'lucide-react';
import { RevealOnScroll } from '../animations/RevealOnScroll';
// Correct import to the BusinessPortal component (wizard/landing page)
import Link from "next/link"
import { BusinessPortal } from '../business/BusinessPortal';

import { useAuth } from '../auth/AuthProvider';
import { getUserApplication, BusinessApplicationData } from '@/lib/db/applications';

export const BusinessDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [appData, setAppData] = useState<BusinessApplicationData | null>(null);
  const [status, setStatus] = useState<'new' | 'pending' | 'verified'>('new');

  React.useEffect(() => {
    const checkStatus = async () => {
      if (user) {
        setLoading(true);
        const app = await getUserApplication(user.uid);
        if (app) {
          setAppData(app);
          // Map Firestore status to local status state
          if (app.status === 'approved') setStatus('verified');
          else if (app.status === 'pending') setStatus('pending');
          else if (app.status === 'rejected') setStatus('new'); // Handle rejection as new for now
        } else {
          setStatus('new');
        }
        setLoading(false);
      }
    };
    checkStatus();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 pb-12 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-gray-200 border-t-gray-600 rounded-full"></div>
      </div>
    )
  }

  // 1. UNVERIFIED STATE -> Show Wizard (Using BusinessPortal)
  if (status === 'new') {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 pb-12">
        <div className="max-w-5xl mx-auto px-6 mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Get Certified</h1>
          {/* <button onClick={() => setStatus('verified')} className="text-xs text-gray-400 hover:text-gray-600">(Demo: Switch to Verified View)</button> */}
        </div>
        {/* Embed the BusinessPortal component here */}
        <BusinessPortal />
      </div>
    );
  }

  // 2. PENDING STATE -> Show Waiting Screen
  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 pb-12 flex items-center justify-center">
        <div className="bg-white rounded-[2rem] p-12 border border-gray-100 shadow-xl max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Clock className="w-10 h-10 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Under Review</h2>
          <p className="text-gray-500 mb-8">
            Our team is verifying your documents. This usually takes 48-72 hours.
          </p>
          {/* <button onClick={() => setStatus('verified')} className="mt-8 text-xs text-gray-400 underline">(Demo: Switch to Verified)</button> */}
        </div>
      </div>
    );
  }

  // 3. VERIFIED STATE -> Full Dashboard with New Features
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-extrabold text-gray-900">{appData?.businessDetails.legalName || 'My Business'}</h1>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Active
                </span>
              </div>
              <p className="text-gray-500 text-sm">Member ID: {user?.uid.slice(0, 8).toUpperCase()} • Valid until Nov 12, 2025</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Link href="/business/profile">
                <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold hover:bg-gray-50 transition-colors text-sm flex items-center">
                  <Eye className="w-4 h-4 mr-2" /> View Public Profile
                </button>
              </Link>
              <Link href="/business/edit">
                <button className="bg-gray-900 text-white px-5 py-2 rounded-xl font-bold hover:bg-black transition-colors shadow-lg flex items-center text-sm">
                  <Edit className="w-4 h-4 mr-2" /> Edit Details
                </button>
              </Link>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left Column: Analytics & Stats */}
            <div className="lg:col-span-2 space-y-8">

              {/* Key Metrics */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><Eye className="w-5 h-5" /></div>
                    <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-lg flex items-center"><TrendingUp className="w-3 h-3 mr-1" />+12%</span>
                  </div>
                  <p className="text-3xl font-extrabold text-gray-900">1,240</p>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">Profile Views</p>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-red-50 text-red-600 rounded-xl"><MousePointer2 className="w-5 h-5" /></div>
                    <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-lg flex items-center"><TrendingUp className="w-3 h-3 mr-1" />+5%</span>
                  </div>
                  <p className="text-3xl font-extrabold text-gray-900">385</p>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">Website Clicks</p>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><QrCode className="w-5 h-5" /></div>
                    <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-lg flex items-center"><TrendingUp className="w-3 h-3 mr-1" />+8%</span>
                  </div>
                  <p className="text-3xl font-extrabold text-gray-900">124</p>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">QR Scans</p>
                </div>
              </div>

              {/* Renewal & Compliance Status */}
              <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900 text-lg">Compliance & Renewal</h3>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Good Standing</span>
                </div>

                <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-200" />
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="175.9" strokeDashoffset="40" className="text-green-500" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">330d</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Annual Renewal</h4>
                    <p className="text-xs text-gray-500 mt-1">Your certificate is valid until Nov 12, 2025. Auto-renewal is enabled.</p>
                    <button className="mt-3 text-xs font-bold text-red-700 hover:underline flex items-center">
                      Manage Subscription
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Center */}
              <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg mb-6">Pending Actions</h3>
                <div className="space-y-4">
                  {/* Action 1 */}
                  <div className="flex items-start p-4 bg-amber-50 rounded-2xl border border-amber-100">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-amber-900 text-sm">Verify "Locally Owned" Status</h4>
                      <p className="text-amber-700/80 text-xs mt-1 leading-relaxed">Upload a proof of address to earn the "Locally Owned" badge on your profile.</p>
                    </div>
                    <button className="ml-auto text-xs font-bold bg-white text-amber-700 px-4 py-2 rounded-xl border border-amber-200 hover:bg-amber-100 transition-colors">Upload</button>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Assets & Upgrade */}
            <div className="space-y-8">

              {/* QR Code & Assets */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg mb-6">Digital Assets</h3>
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 bg-gray-900 rounded-2xl flex items-center justify-center relative group cursor-pointer overflow-hidden">
                    <QrCode className="w-20 h-20 text-white opacity-20 group-hover:opacity-10 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-lg flex items-center">
                        <Download className="w-3 h-3 mr-1" /> QR
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-xs font-medium text-gray-600">
                    <Printer className="w-5 h-5 mb-2 text-gray-400" />
                    Print PDF
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-xs font-medium text-gray-600">
                    <Code className="w-5 h-5 mb-2 text-gray-400" />
                    Embed Widget
                  </button>
                  <button className="col-span-2 flex items-center justify-center p-3 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 text-xs font-bold text-red-700 transition-colors">
                    Order Window Sticker ($5)
                  </button>
                </div>
              </div>

              {/* Gold Upgrade Promo */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="relative z-10">
                  <div className="inline-block bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                    Elite Status
                  </div>
                  <h3 className="font-bold text-xl mb-2">Upgrade to Gold</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Complete all verification steps to unlock Gold status, priority listing, and the elite badge.
                  </p>
                  <button className="w-full py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg">
                    View Requirements
                  </button>
                </div>
              </div>

            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};