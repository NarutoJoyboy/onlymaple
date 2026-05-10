'use client';

import React from 'react';
import { MapPin, Globe, Phone, Mail, Clock, Award, CheckCircle, ShieldCheck, Star } from 'lucide-react';
import {RevealOnScroll} from '../animations/RevealOnScroll';

export const PublicProfile = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="relative h-64 md:h-80 bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2.5rem] overflow-hidden mb-12 shadow-lg">
             <div className="absolute inset-0 bg-black/20"></div>
             <div className="absolute -bottom-16 left-8 md:left-12">
               <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full border-4 border-white shadow-xl flex items-center justify-center text-3xl font-bold text-gray-300">
                 IMG
               </div>
             </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-20">
             <div className="lg:col-span-2 space-y-8">
                <div>
                   <div className="flex items-center gap-3 mb-2">
                     <h1 className="text-4xl font-extrabold text-gray-900">Maple Tech Solutions</h1>
                     <ShieldCheck className="w-6 h-6 text-green-600 fill-green-50" />
                   </div>
                   <p className="text-xl text-gray-500">Premium IT consulting for Canadian small businesses.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                   {['Canadian Owned', 'Locally Owned', 'Gold Member'].map((badge, i) => (
                      <span key={i} className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-bold text-gray-700 shadow-sm">
                         <Award className="w-4 h-4 mr-2 text-red-600" /> {badge}
                      </span>
                   ))}
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h3 className="text-xl font-bold text-gray-900 mb-4">About Us</h3>
                   <p className="text-gray-600 leading-relaxed mb-6">Founded in 2015, helping local businesses modernize.</p>
                   <div className="flex flex-wrap gap-2">{['IT Services', 'Consulting', 'Web Design'].map(tag => <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold uppercase">{tag}</span>)}</div>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                   <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold text-gray-900">Reviews</h3><div className="flex items-center gap-1 text-amber-500 font-bold"><Star className="w-5 h-5 fill-current" /> 4.9</div></div>
                   <div className="space-y-6">{[1].map((i) => <div key={i} className="border-b border-gray-50 pb-6"><div className="flex items-center justify-between mb-2"><span className="font-bold text-gray-900">Customer</span><span className="text-xs text-gray-400">2 days ago</span></div><p className="text-gray-600 text-sm">"Excellent service!"</p></div>)}</div>
                </div>
             </div>
             <div className="space-y-6">
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg sticky top-32">
                   <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Info</h3>
                   <ul className="space-y-4">
                      <li className="flex items-start gap-3 text-sm text-gray-600"><MapPin className="w-5 h-5 text-red-600 shrink-0" /><span>123 Yonge Street<br/>Toronto, ON</span></li>
                      <li className="flex items-center gap-3 text-sm text-gray-600"><Globe className="w-5 h-5 text-red-600 shrink-0" /><span>mapletech.ca</span></li>
                      <li className="flex items-center gap-3 text-sm text-gray-600"><Phone className="w-5 h-5 text-red-600 shrink-0" /><span>(416) 555-0123</span></li>
                      <li className="flex items-center gap-3 text-sm text-gray-600"><Mail className="w-5 h-5 text-red-600 shrink-0" /><span>hello@mapletech.ca</span></li>
                   </ul>
                   <div className="my-6 h-px bg-gray-100"></div>
                   <h3 className="text-lg font-bold text-gray-900 mb-4">Hours</h3>
                   <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex justify-between"><span>Mon - Fri</span> <span className="font-bold">9:00 AM - 5:00 PM</span></li>
                   </ul>
                </div>
             </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};