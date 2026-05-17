'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, ShieldCheck, ArrowRight, TrendingUp, Heart, 
  ShoppingBag, Leaf, Zap, Camera, Building2
} from 'lucide-react';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { BusinessVerificationWizard } from './BusinessVerificationWizard';

export const BusinessPortal = () => {
  const [step, setStep] = useState(0); 
  const [isComplete, setIsComplete] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<'new' | 'existing' | null>(null);

  if (step === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-48 pb-40 overflow-hidden relative">
        {/* Atmospheric Glows */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <RevealOnScroll>
            {/* 1. HERO SECTION - De-congested and Bold */}
            <div className="text-center max-w-5xl mx-auto mb-32">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center px-5 py-2 rounded-full bg-white border border-red-100 shadow-sm text-red-600 text-[10px] font-black uppercase tracking-[0.4em] mb-12"
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                Canada Verified™ Business Registry
              </motion.div>
              
              <h1 className="text-6xl md:text-9xl font-black text-gray-900 mb-12 tracking-tighter leading-[0.9] md:leading-[0.85]">
                Empower Your <br/>
                <span className="text-red-600 relative inline-block">
                  Business.
                  <motion.span 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="absolute bottom-4 left-0 h-4 bg-red-100/60 -z-10"
                  />
                </span>
              </h1>
              
              <p className="text-xl md:text-3xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed md:leading-snug">
                Join the national standard for transparency. Gain the badge that <br className="hidden md:block" /> 
                <span className="text-gray-900 font-bold underline decoration-red-200 decoration-4 underline-offset-8">76% of Canadian consumers</span> look for.
              </p>
            </div>

            {/* 2. DUAL ENTRY - Depth-of-Field Logic */}
            <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto mb-64">
              {/* Path A: Verify Existing */}
              <motion.div 
                onMouseEnter={() => setHoveredCard('existing')}
                onMouseLeave={() => setHoveredCard(null)}
                animate={{ 
                  opacity: hoveredCard === 'new' ? 0.3 : 1,
                  scale: hoveredCard === 'existing' ? 1.05 : 1,
                  filter: hoveredCard === 'new' ? 'blur(12px)' : 'blur(0px)'
                }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="bg-white rounded-[4rem] p-16 border border-gray-100 shadow-2xl relative group cursor-pointer overflow-hidden"
              >
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-28 h-28 bg-red-600 rounded-[2.5rem] flex items-center justify-center text-white mb-12 shadow-2xl shadow-red-200 group-hover:rotate-12 transition-transform duration-500">
                    <CheckCircle className="w-14 h-14" />
                  </div>
                  <h3 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Verify Existing</h3>
                  <p className="text-lg text-gray-500 font-medium mb-12 leading-relaxed">Claim your pre-listed profile and activate your Verified Badge instantly.</p>
                  <button 
                    onClick={() => setStep(1)}
                    className="w-full py-6 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-red-700 transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    Verify Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Path B: New Registry */}
              <motion.div 
                onMouseEnter={() => setHoveredCard('new')}
                onMouseLeave={() => setHoveredCard(null)}
                animate={{ 
                  opacity: hoveredCard === 'existing' ? 0.3 : 1,
                  scale: hoveredCard === 'new' ? 1.05 : 1,
                  filter: hoveredCard === 'existing' ? 'blur(12px)' : 'blur(0px)'
                }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="bg-gray-900 rounded-[4rem] p-16 relative group cursor-pointer overflow-hidden"
              >
                <div className="relative z-10 flex flex-col items-center text-center text-white">
                  <div className="w-28 h-28 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] flex items-center justify-center mb-12 shadow-2xl group-hover:-rotate-12 transition-transform duration-500">
                    <Zap className="w-14 h-14 text-red-500" />
                  </div>
                  <h3 className="text-4xl font-black mb-6 tracking-tight">New Registry</h3>
                  <p className="text-lg text-gray-400 font-medium mb-12 leading-relaxed">First-time registration for founders looking to dominate the local market.</p>
                  <button 
                    onClick={() => setStep(1)}
                    className="w-full py-6 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-gray-100 transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </RevealOnScroll>
        </div>

        {/* 3. IMPACT SECTION - Modern Data Dashboard */}
        <div className="bg-white py-56 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-40 items-center">
              <div>
                <h2 className="text-5xl md:text-8xl font-black text-gray-900 mb-12 tracking-tighter leading-[0.85]">
                  The ROI of <br/><span className="text-red-600 italic">Local Trust.</span>
                </h2>
                <p className="text-2xl text-gray-400 font-medium mb-20 leading-relaxed max-w-xl">
                  When you show your roots, you grow your roots. Verified businesses see a massive shift in local capital retention.
                </p>
                
                <div className="space-y-16">
                  {[
                    { title: "Revenue Retention", desc: "85% of revenue from verified local shops stays within Canada.", icon: <TrendingUp className="w-8 h-8" /> },
                    { title: "Network Loyalty", desc: "Gain access to a community of 50k+ verified Canadian-first buyers.", icon: <Heart className="w-8 h-8" /> },
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-10 group">
                      <div className="w-20 h-20 rounded-[2rem] bg-red-50 flex items-center justify-center flex-shrink-0 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-700">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 text-3xl mb-3 tracking-tight">{benefit.title}</h4>
                        <p className="text-gray-500 text-lg font-medium leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* THE ANIMATED GRAPH CONSOLE */}
              <div className="bg-[#0F172A] rounded-[5rem] p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                {/* Glow Background */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10 flex justify-between items-end h-[400px] gap-20 border-b border-white/5 pb-8">
                  {/* Canadian Bar */}
                  <div className="flex-1 flex flex-col items-center gap-8 group/bar">
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: '100%' }}
                      transition={{ duration: 1.8, type: "spring", bounce: 0.3 }}
                      className="w-full bg-gradient-to-t from-red-700 to-red-400 rounded-t-[3rem] relative shadow-[0_0_50px_rgba(220,38,38,0.3)]"
                    >
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute -top-24 left-1/2 -translate-x-1/2 flex flex-col items-center"
                      >
                         <span className="font-black text-white text-7xl tracking-tighter italic">85%</span>
                         <span className="text-[10px] text-red-400 font-black uppercase tracking-widest mt-2">Retention</span>
                      </motion.div>
                    </motion.div>
                    <p className="text-[12px] font-black uppercase tracking-[0.4em] text-white/80">Local</p>
                  </div>

                  {/* Foreign Bar */}
                  <div className="flex-1 flex flex-col items-center gap-8">
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: '28%' }}
                      transition={{ duration: 1.8, type: "spring", bounce: 0.3, delay: 0.3 }}
                      className="w-full bg-white/5 rounded-t-[3rem] relative border border-white/10"
                    >
                      <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="absolute -top-16 left-1/2 -translate-x-1/2 font-black text-white/30 text-4xl italic"
                      >
                        23%
                      </motion.span>
                    </motion.div>
                    <p className="text-[12px] font-black uppercase tracking-[0.4em] text-white/20">Global</p>
                  </div>
                </div>

                <div className="mt-16 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.4em]">
                  <div className="flex items-center gap-3 text-red-500">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    Live Metrics
                  </div>
                  <div className="text-white/20">Fiscal Year 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. SECTORS GRID - Minimalist Icons */}
        <div className="py-56 max-w-7xl mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-5xl font-black text-gray-900 tracking-tighter">Dominating Every <span className="text-red-600">Industry.</span></h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
             {[
               { title: "Retail", Icon: ShoppingBag },
               { title: "Food", Icon: Leaf },
               { title: "Tech", Icon: Zap },
               { title: "Media", Icon: Camera },
               { title: "Production", Icon: Building2 },
               { title: "Wellness", Icon: Heart },
             ].map(({ title, Icon }, i) => (
               <motion.div 
                whileHover={{ y: -15, scale: 1.05 }}
                key={i} 
                className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group text-center"
               >
                 <div className="w-20 h-20 bg-red-50 text-red-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-10 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                   <Icon className="w-8 h-8" />
                 </div>
                 <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.3em]">{title}</h3>
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-50 pt-36 pb-24 flex items-center justify-center px-6">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-16 text-center max-w-xl w-full border border-gray-100 animate-fade-in-up">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">
            Application Submitted
          </h2>
          <p className="text-gray-500 leading-relaxed mb-10">
            Your business verification request is in review. We&apos;ll follow up once your documents have been checked.
          </p>
          <button
            onClick={() => {
              setIsComplete(false);
              setStep(0);
            }}
            className="bg-gray-900 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-red-600 transition-all active:scale-95"
          >
            Back to Business Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <BusinessVerificationWizard
          onComplete={() => setIsComplete(true)}
          onCancel={() => setStep(0)}
        />
      </div>
    </div>
  );
};
