"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  User,
  AlertCircle,
  Loader2,
  Chrome,
} from "lucide-react";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else {
        setError("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      {/* 1. Atmospheric Depth (Mesh Gradient style) */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[480px] w-full relative z-10"
      >
        {/* Logo Area - Refined Monogram */}
        <div className="text-center mb-12">
          <motion.div
            whileHover={{ rotate: 5 }}
            className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-200"
          >
            <span className="text-white font-black text-2xl italic">M</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-3 leading-none">
            Welcome Back.
          </h1>
          <p className="text-gray-400 font-medium">
            Secure access to the OnlyMaple Registry.
          </p>
        </div>

        {/* 2. Main Auth Console */}
        <div className="bg-white rounded-[3rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] border border-gray-100 relative">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 mb-6 border border-red-100"
              >
                <AlertCircle className="w-4 h-4" /> {error}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-[radial-gradient(circle_at_center,_white_0%,_transparent_50%)] opacity-50 pointer-events-none" />
          <form className="space-y-10 relative z-10" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="group space-y-4">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1 group-focus-within:text-red-600 transition-colors">
                Registry Identity
              </label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-red-500 transition-all" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-slate-50/50 border border-transparent rounded-[1.5rem] focus:bg-white focus:border-red-100 focus:ring-[12px] focus:ring-red-500/5 transition-all outline-none font-bold text-gray-900 placeholder-gray-200 text-sm"
                  placeholder="name@company.ca"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 group-focus-within:text-red-600 transition-colors">
                  Access Key
                </label>
                <button
                  type="button"
                  className="text-[9px] font-black uppercase tracking-widest text-red-600 hover:text-red-700 transition-colors"
                >
                  Recovery?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-red-500 transition-all" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-slate-50/50 border border-transparent rounded-[1.5rem] focus:bg-white focus:border-red-100 focus:ring-[12px] focus:ring-red-500/5 transition-all outline-none font-bold text-gray-900 placeholder-gray-200 text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* The Button - High-End Polish */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-[#121826] text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-slate-900/20 hover:bg-black hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-4 group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Authorize Entry{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Styled Divider */}
          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 bg-white px-6">
              External Auth
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-xs text-gray-600 uppercase tracking-widest"
            >
              <Chrome className="w-4 h-4 text-red-500" /> Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-xs text-gray-600 uppercase tracking-widest"
            >
              <svg className="w-4 h-4 fill-gray-900" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-.93 3.23-.71 1.57.33 2.68 1.28 3.29 2.33-.06.09-.22.27-.36.35-1.8 1.06-2.37 3.58-1.16 5.37.26.39.67.85 1.15 1.18l.08.04c-.41 1.3-1.24 2.57-1.31 3.67zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Apple
            </button>
          </div>
        </div>

        {/* 3. High-Contrast Footer Actions */}
        <div className="mt-16 flex justify-center items-center gap-10">
          <a href="/signup/shopper" className="group text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-2">
              New User?
            </p>
            <div className="flex `ˀitems-center gap-2 text-xs font-bold text-gray-600 group-hover:text-red-600 transition-colors">
              <User className="w-4 h-4" /> Join Shopper
            </div>
          </a>
          <div className="w-px h-10 bg-gray-200" />
          <a href="/signup/business" className="group text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-2">
              Own a Store?
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600 group-hover:text-red-600 transition-colors">
              <ShieldCheck className="w-4 h-4" /> Verify Entity
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
};
