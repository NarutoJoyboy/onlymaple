import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EditProfileForm } from '@/components/business/EditProfileForm';
import { FloatingBackground } from '@/components/layout/FloatingBackground';

export default function EditProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-gray-900 antialiased selection:bg-red-100 selection:text-red-900">
      <FloatingBackground />
      <EditProfileForm />
    </main>
  );
}