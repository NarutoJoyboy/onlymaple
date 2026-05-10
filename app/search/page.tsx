import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Directory } from '../../components/directory/Directory';
import { FloatingBackground } from '@/components/layout/FloatingBackground';

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-gray-900 antialiased selection:bg-red-100 selection:text-red-900">
      <FloatingBackground />
      <Navbar />
      <Directory />
      <Footer />
    </main>
  );
}