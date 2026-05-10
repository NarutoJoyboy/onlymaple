'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck, User, AlertCircle } from 'lucide-react';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { useAuth } from './AuthProvider';
import { useRouter } from "next/navigation";
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const Login = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/dashboard');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password');
      } else {
        setError('Failed to log in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-20 flex items-center justify-center relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>

      <div className="max-w-md w-full mx-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-600 text-white mb-6 shadow-lg shadow-red-200">
              <span className="text-2xl">🍁</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">Welcome to OnlyMaple</h2>
            <p className="text-gray-500 text-lg">Sign in to access your account</p>
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden p-8">
            
            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium flex items-center">
                   <span className="mr-2">⚠️</span> {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-medium"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-bold text-gray-700">Password</label>
                  <a href="#" className="text-xs font-bold text-red-600 hover:text-red-700">Forgot Password?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-medium"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-gray-900/20 hover:bg-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : (
                  <>Sign In <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-400 font-medium">Or continue with</span></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-bold text-gray-700 text-sm transition-colors">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Google
              </button>
              <button type="button" className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-bold text-gray-700 text-sm transition-colors">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-.93 3.23-.71 1.57.33 2.68 1.28 3.29 2.33-.06.09-.22.27-.36.35-1.8 1.06-2.37 3.58-1.16 5.37.26.39.67.85 1.15 1.18l.08.04c-.41 1.3-1.24 2.57-1.31 3.67zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Apple
              </button>
            </div>

          </div>

          {/* Registration Fork */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 font-medium mb-6">Don't have an account?</p>
            
            <div className="grid grid-cols-2 gap-4">
              <a href="/signup/shopper" className="group flex flex-col items-center p-4 bg-white rounded-2xl border border-gray-200 hover:border-red-200 hover:shadow-md transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-2 group-hover:bg-green-100 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-gray-900">Join as Shopper</span>
                <span className="text-xs text-gray-400 mt-1">Find & save businesses</span>
              </a>

              <a href="/signup/business" className="group flex flex-col items-center p-4 bg-white rounded-2xl border border-gray-200 hover:border-red-200 hover:shadow-md transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-2 group-hover:bg-red-100 transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-gray-900">Verify Business</span>
                <span className="text-xs text-gray-400 mt-1">Get your badge</span>
              </a>
            </div>
          </div>
          
        </RevealOnScroll>
      </div>
    </div>
  );
};