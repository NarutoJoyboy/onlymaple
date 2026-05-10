'use client';

import React, { useState } from 'react';
import { Building2, Mail, Lock, ArrowRight, CheckCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createUserDocument } from '@/lib/db/users';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider'; // Add import

export const BusinessSignup = () => {
  const router = useRouter();
  const { user } = useAuth(); // Get user
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  if (user) {
    router.replace('/dashboard');
    return null;
  }

  const [formData, setFormData] = useState({
    businessName: '',
    role: 'Owner / Founder',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setLoading(true);
    setError('');

    try {
      // 1. Create Auth User
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const newUser = userCredential.user;

      // 2. Create Firestore Document
      await createUserDocument(newUser.uid, {
        email: newUser.email!,
        role: 'business',
        displayName: formData.businessName, // Use business name as display name for now
        additionalData: {
          // We can add specific business fields here later or in a separate businesses collection
        }
      });

      // 3. Navigate
      router.push('/dashboard'); 
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email is already in use.');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 flex justify-center">
      <div className="max-w-6xl w-full px-6 grid lg:grid-cols-12 gap-12">
        
        {/* Left Column: Signup Form */}
        <div className="lg:col-span-7">
          <RevealOnScroll>
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden p-10 md:p-14 relative">
              
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
                <div 
                  className="h-full bg-red-600 transition-all duration-500 ease-out" 
                  style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                ></div>
              </div>

              <div className="mb-10">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-widest mb-4">
                  Business Registration
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Create Business Account</h2>
                <p className="text-gray-500 text-lg">Join Canada's fastest-growing network of verified businesses.</p>
              </div>

               {error && (
                <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center">
                   <span className="mr-2">⚠️</span> {error}
                </div>
              )}

              {step === 1 && (
                <form className="space-y-6 animate-fade-in-up">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Business Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-600 transition-colors">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <input 
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        type="text" 
                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-medium" 
                        placeholder="Maple Tech Solutions Inc." 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Your Role</label>
                     <select 
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-medium text-gray-700 cursor-pointer"
                      >
                       <option>Owner / Founder</option>
                       <option>Manager / Director</option>
                       <option>CEO / Executive</option>
                     </select>
                  </div>

                  <button 
                    type="button" 
                    onClick={() => setStep(2)} 
                    className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-600/20 hover:bg-red-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center"
                  >
                    Continue <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </form>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fade-in-up">
                   <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-600 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email" 
                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-medium" 
                        placeholder="name@business.com" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Create Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-600 transition-colors">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password" 
                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-medium" 
                        placeholder="••••••••" 
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex gap-4">
                    <button 
                      onClick={() => setStep(1)} 
                      className="px-6 py-4 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-black transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                      onClick={handleSignup}
                      disabled={loading}
                    >
                      {loading ? (
                        <>Creating Account... <Loader2 className="w-5 h-5 ml-2 animate-spin" /></>
                      ) : (
                         'Create Account'
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-10 text-center pt-6 border-t border-gray-50">
                <p className="text-sm text-gray-400">
                  Already have an account? <a href="/login" className="text-red-600 font-bold hover:underline">Sign In</a>
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Right Column: Benefits Sidebar */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
           <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-lg relative overflow-hidden sticky top-32">
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-50 rounded-full -mr-20 -mt-20 mix-blend-multiply opacity-60"></div>
              
              <h3 className="text-2xl font-extrabold text-gray-900 mb-8">Why verify your business?</h3>
              
              <ul className="space-y-8">
                <li className="flex items-start">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0 text-green-600 shadow-sm">
                    <ShieldCheck className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Build Consumer Trust</h4>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      76% of Canadians prefer to support Canadian-owned businesses over international chains.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0 text-blue-600 shadow-sm">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Boost Revenue</h4>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Verified businesses report up to an 18% increase in new customers after displaying our badge.
                    </p>
                  </div>
                </li>
              </ul>
           </div>
        </div>

      </div>
    </div>
  );
};