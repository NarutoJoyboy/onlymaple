'use client';

import React, { useState } from 'react';
import { User, Mail, Lock, MapPin, ArrowRight, Heart, ShoppingBag, Star, Loader2 } from 'lucide-react';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createUserDocument } from '@/lib/db/users';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider'; // Add this import

export const ShopperSignup = () => {
  const router = useRouter();
  const { user } = useAuth(); // Get user from context
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  if (user) {
    router.replace('/dashboard');
    return null; // Don't render the form
  }

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        role: 'shopper',
        displayName: `${formData.firstName} ${formData.lastName}`,
        additionalData: {
          savedBusinesses: [],
          homeLocation: formData.location
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
        <div className="lg:col-span-7">
          <RevealOnScroll>
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden p-10 md:p-14 relative">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
                <div className="h-full bg-green-500 transition-all duration-500 ease-out" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
              </div>
              <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Create Shopper Account</h2>
                <p className="text-gray-500 text-lg">Join thousands of Canadians supporting local businesses.</p>
              </div>

              {error && (
                <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center">
                   <span className="mr-2">⚠️</span> {error}
                </div>
              )}

              {step === 1 && (
                <form className="space-y-6 animate-fade-in-up">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">First Name</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors"><User className="w-5 h-5" /></div>
                        <input 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          type="text" 
                          className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium" 
                          placeholder="Jane" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Last Name</label>
                      <input 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        type="text" 
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium" 
                        placeholder="Doe" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors"><Mail className="w-5 h-5" /></div>
                      <input 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email" 
                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium" 
                        placeholder="jane@example.com" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors"><Lock className="w-5 h-5" /></div>
                      <input 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password" 
                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium" 
                        placeholder="••••••••" 
                      />
                    </div>
                  </div>
                  <button type="button" onClick={() => setStep(2)} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-600/20 hover:bg-green-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center">Continue <ArrowRight className="w-5 h-5 ml-2" /></button>
                </form>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-fade-in-up">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><MapPin className="w-10 h-10 text-green-600" /></div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Where do you shop?</h3>
                    <p className="text-gray-500">We'll personalize your directory to show local businesses first.</p>
                  </div>
                  <div className="space-y-4">
                     <div className="relative group">
                        <input 
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          type="text" 
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium text-center" 
                          placeholder="Enter your City or Postal Code" 
                        />
                        <button className="absolute right-3 top-3 px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50">Detect</button>
                     </div>
                  </div>
                  <div className="pt-6 border-t border-gray-100 flex gap-4">
                    <button onClick={() => setStep(1)} className="px-6 py-4 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50">Back</button>
                    <button 
                      onClick={handleSignup}
                      disabled={loading}
                      className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-black transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
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
              <div className="mt-10 text-center">
                <p className="text-sm text-gray-400">Already have an account? <a href="/login" className="text-green-600 font-bold hover:underline">Sign In</a></p>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
           <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-50 rounded-full -mr-20 -mt-20 mix-blend-multiply opacity-60"></div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-8">Why create a Shopper Profile?</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-red-600"><Heart className="w-5 h-5 fill-current" /></div>
                  <div><h4 className="font-bold text-gray-900">Save Your Favorites</h4><p className="text-sm text-gray-500 mt-1">Curate lists of your favorite local spots.</p></div>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-amber-600"><Star className="w-5 h-5 fill-current" /></div>
                  <div><h4 className="font-bold text-gray-900">Exclusive Local Deals</h4><p className="text-sm text-gray-500 mt-1">Get notified when saved businesses have promos.</p></div>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-blue-600"><ShoppingBag className="w-5 h-5" /></div>
                  <div><h4 className="font-bold text-gray-900">Track Your Impact</h4><p className="text-sm text-gray-500 mt-1">See how your spending helps the economy.</p></div>
                </li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};