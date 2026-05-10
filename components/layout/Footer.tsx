'use client';

import React from 'react';
import { ShieldCheck, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-24 border-t border-gray-800 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <span className="text-3xl mb-6 block font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-600">🍁</span> OnlyMaple
            </span>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm mb-6">
              Independent verification service. Not a government agency. 
              We use manual due diligence to confirm Canadian authenticity.
              Trust is built on best efforts.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <ShieldCheck className="w-4 h-4 mr-2" /> PIPEDA Compliant Storage
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">Support</h4>
            <ul className="space-y-4 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Report a Fake</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Business Login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">Legal</h4>
            <ul className="space-y-4 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-800 pt-12 text-center text-sm text-gray-500 font-medium">
          &copy; 2025 OnlyMaple. Proudly Canadian. 🇨🇦
        </div>
      </div>
    </footer>
  );
};