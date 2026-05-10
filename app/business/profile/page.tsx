import React from 'react';
import { PublicProfile } from '@/components/business/PublicProfile';
import { FloatingBackground } from '@/components/layout/FloatingBackground';

export default function BusinessProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-gray-900 antialiased selection:bg-red-100 selection:text-red-900">
      <FloatingBackground />
      <PublicProfile />
    </main>
  );
}