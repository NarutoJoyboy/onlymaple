import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShopperSignup } from '@/components/auth/ShopperSignup';
import { FloatingBackground } from '@/components/layout/FloatingBackground';

export default function ShopperSignupPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-gray-900 antialiased selection:bg-green-100 selection:text-green-900">
      <FloatingBackground />
      <Navbar />
      <ShopperSignup />
      <Footer />
    </main>
  );
}