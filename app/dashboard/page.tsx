'use client';

import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { BusinessDashboard } from '../../components/dashboard/BusinessDashboard';
import { ShopperDashboard } from '../../components/dashboard/ShopperDashboard';
import { FloatingBackground } from '../../components/layout/FloatingBackground';

import { useAuth } from '../../components/auth/AuthProvider';

export default function DashboardPage() {
  const { role } = useAuth();


  return (
    <main className="min-h-screen bg-slate-50 font-sans text-gray-900 antialiased selection:bg-red-100 selection:text-red-900">
      <FloatingBackground />
      {/* <Navbar /> */}

      {/* Demo Toggle: Only show if role is not strictly 'shopper' or 'business' (e.g. admin or dev testing) */}
      {(!role || (role !== 'shopper' && role !== 'business')) && (
        <div className="fixed bottom-4 right-4 z-50 bg-white p-2 rounded-xl shadow-xl border border-gray-200 flex gap-2">
          <div className="px-3 py-1 rounded-lg text-xs font-bold bg-gray-100 text-gray-500">
            Debug: {role || 'No Role'}
          </div>
        </div>
      )}

      {role === 'shopper' ? (
        <ShopperDashboard />
      ) : role === 'business' ? (
        <BusinessDashboard />
      ) : (
        // Default View or Admin View - For now showing Business as default or keeping toggle if we wanted
        // The user asked: "if it's an admin show both like let it satay as it is now"
        // So I will replicate the original toggle behavior only if role is NOT shopper OR business.
        <DashboardToggleView />
      )}

      {/* <Footer /> */}
    </main>
  );
}

// Sub-component for the toggle view (legacy behavior for admins/others)
function DashboardToggleView() {
  const [view, setView] = useState<'shopper' | 'business'>('business');
  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 bg-white p-2 rounded-xl shadow-xl border border-gray-200 flex gap-2">
        <button
          onClick={() => setView('shopper')}
          className={`px-3 py-1 rounded-lg text-xs font-bold ${view === 'shopper' ? 'bg-green-100 text-green-700' : 'text-gray-500'}`}
        >
          View as Shopper
        </button>
        <button
          onClick={() => setView('business')}
          className={`px-3 py-1 rounded-lg text-xs font-bold ${view === 'business' ? 'bg-red-100 text-red-700' : 'text-gray-500'}`}
        >
          View as Business
        </button>
      </div>
      {view === 'business' ? <BusinessDashboard /> : <ShopperDashboard />}
    </>
  )
}