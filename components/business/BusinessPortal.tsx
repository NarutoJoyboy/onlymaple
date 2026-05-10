'u e client';

import React, { useState } from 'react';
import { 
  CheckCircle, Upload, FileText, ArrowRight, 
  ShieldCheck, User, Building2, CreditCard, ChevronRight, 
  TrendingUp, Clock, Star, Quote, BarChart3, Leaf, Users, Zap, ShoppingBag, Camera,
  Heart
} from 'lucide-react';
import {RevealOnScroll} from '../animations/RevealOnScroll';

export const BusinessPortal = () => {
  const [step, setStep] = useState(0); 
  const [isComplete, setIsComplete] = useState(false);
  const [authType, setAuthType] = useState<'new' | 'existing' | null>(null);

  // --- Step 0: Rich Landing Page (Matching your Reference Images) ---
  if (step === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-20">
        
        {/* 1. Hero Section */}
        <div className="max-w-7xl mx-auto px-6 mb-24">
          <RevealOnScroll>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-800 text-sm font-bold uppercase tracking-widest mb-6">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Canada Verified™ Platform
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
                Empowering Canadian Businesses with <br/>
                <span className="text-red-700">Trusted Verification.</span>
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
                From coast to coast, Canadian-owned businesses are driving innovation. 
                Join the registry that provides transparency to consumers and businesses alike.
              </p>
            </div>

            {/* 2. Dual Entry Points (Matches "Verify Existing" vs "Add New" image) */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-32">
              {/* Verify Existing */}
              <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-50 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col h-full items-center text-center">
                  <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-red-200">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Verify Existing Business</h3>
                  <p className="text-gray-500 mb-8 flex-grow text-lg">
                    Your business is already listed in our directory but needs verification to show the Canadian Owned badge.
                  </p>
                  <div className="inline-flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-bold mb-8 w-fit">
                    <Clock className="w-4 h-4 mr-2" /> Takes only 1-2 minutes
                  </div>
                  <button 
                    onClick={() => { setAuthType('existing'); setStep(1); }}
                    className="w-full py-4 bg-red-700 text-white rounded-xl font-bold hover:bg-red-800 transition-colors flex items-center justify-center text-lg shadow-lg shadow-red-900/20"
                  >
                    VERIFY NOW <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add New Business */}
              <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-slate-100 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                    <div className="text-3xl font-light">+</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Add New Business</h3>
                  <p className="text-gray-500 mb-8 flex-grow text-lg">
                    Add your Canadian business to our directory for the first time and get verified with premium features.
                  </p>
                  <div className="inline-flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-bold mb-8 w-fit">
                    <Clock className="w-4 h-4 mr-2" /> Takes only 2-3 minutes
                  </div>
                  <button 
                    onClick={() => { setAuthType('new'); setStep(1); }}
                    className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center text-lg shadow-lg"
                  >
                    GET STARTED <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* 3. Economic Impact & Benefits (Matches "Comparison" & "Benefits" images) */}
        <div className="bg-white py-24 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <RevealOnScroll>
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Why the "Canadian Verified" Badge Matters
                  </h2>
                  <p className="text-xl text-gray-500 mb-10 leading-relaxed">
                    It's not just a sticker. It's a signal of trust, quality, and economic contribution.
                  </p>
                  
                  <div className="space-y-8">
                    {[
                      { title: "Strengthens Communities", desc: "Deeply rooted investment in local infrastructure and sponsorships.", icon: <Building2 className="w-5 h-5 text-red-600" /> },
                      { title: "Creates Quality Jobs", desc: "Prioritizing workforce wellbeing with higher wages and benefits.", icon: <Users className="w-5 h-5 text-red-600" /> },
                      { title: "Environmental Responsibility", desc: "Shorter supply chains reduce carbon footprint significantly.", icon: <Leaf className="w-5 h-5 text-red-600" /> },
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mr-5 mt-1 flex-shrink-0 border border-red-100">
                          {benefit.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg mb-1">{benefit.title}</h4>
                          <p className="text-gray-500 leading-relaxed">{benefit.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  {/* Economic Impact Chart (Matches your bar chart image) */}
                  <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-gray-100 relative overflow-hidden shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-12 text-center">Economic Impact Comparison</h3>
                    <div className="flex justify-center items-end gap-16 h-80 pb-8 border-b border-gray-200">
                      {/* Canadian Bar */}
                      <div className="flex flex-col items-center w-32 group cursor-pointer">
                        <div className="text-3xl font-extrabold text-green-600 mb-3 animate-bounce">85%</div>
                        <div className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-2xl h-64 relative overflow-hidden shadow-lg shadow-green-900/20 transition-all duration-500 group-hover:h-[17rem]">
                           <div className="absolute inset-0 bg-white/20"></div>
                        </div>
                        <p className="text-sm font-bold text-gray-900 mt-6 text-center">Canadian<br/>Businesses</p>
                      </div>
                      {/* International Bar */}
                      <div className="flex flex-col items-center w-32 group cursor-pointer">
                        <div className="text-3xl font-extrabold text-red-600 mb-3">23%</div>
                        <div className="w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t-2xl h-20 relative overflow-hidden shadow-lg shadow-red-900/20 transition-all duration-500 group-hover:h-[6rem]">
                           <div className="absolute inset-0 bg-white/20"></div>
                        </div>
                        <p className="text-sm font-bold text-gray-500 mt-6 text-center">International<br/>Chains</p>
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-400 mt-8 font-medium">
                      Percentage of revenue that stays in the Canadian economy
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* 4. Verification Process (Matches "How does it work" image) */}
        <div className="py-24 max-w-7xl mx-auto px-6 bg-slate-50">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900">The Verification Process</h2>
              <p className="text-gray-500 mt-4 text-lg">Transparent, rigorous, and designed for trust.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "1. Apply", desc: "Submit your business details and proof of ownership through our secure portal.", icon: <FileText className="w-8 h-8" /> },
                { title: "2. Review", desc: "Our team manually verifies your ownership, operations, and eligibility criteria.", icon: <ShieldCheck className="w-8 h-8" /> },
                { title: "3. Get Verified", desc: "Receive your Canada Verified™ badge to display on your website and marketing.", icon: <Star className="w-8 h-8" /> },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2">
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-8 shadow-inner">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        {/* 5. Sectors Grid (Matches "Leading Every Sector" image) */}
        <div className="py-24 max-w-7xl mx-auto px-6 bg-white">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900">Canadian Businesses <span className="text-red-600">Leading</span> Every Sector</h2>
              <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">From coast to coast, Canadian-owned businesses are driving excellence across all industries.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
               {[
                 { title: "Retail & Shopping", desc: "Local boutiques and specialty stores offering unique products.", icon: <ShoppingBag className="w-6 h-6 text-white" /> },
                 { title: "Restaurants & Food", desc: "Farm-to-table restaurants celebrating Canadian ingredients.", icon: <Leaf className="w-6 h-6 text-white" /> },
                 { title: "Technology", desc: "Software companies driving Canada's digital transformation.", icon: <Zap className="w-6 h-6 text-white" /> },
                 { title: "Professional Services", desc: "Consulting firms and legal practices offering expertise.", icon: <Camera className="w-6 h-6 text-white" /> },
                 { title: "Manufacturing", desc: "Innovative manufacturers creating quality products.", icon: <Building2 className="w-6 h-6 text-white" /> },
                 { title: "Health & Wellness", desc: "Healthcare providers prioritizing community wellbeing.", icon: <Heart className="w-6 h-6 text-white" /> },
               ].map((sector, i) => (
                 <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 text-center group">
                   <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-100 group-hover:scale-110 transition-transform">
                     {sector.icon}
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-3">{sector.title}</h3>
                   <p className="text-gray-500 text-sm leading-relaxed">{sector.desc}</p>
                 </div>
               ))}
            </div>
          </RevealOnScroll>
        </div>

        {/* 6. Testimonials (Matches "What Business Owners Say" image) */}
        <div className="bg-gray-900 text-white py-24 rounded-[3rem] mx-4 md:mx-6 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-10 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <RevealOnScroll>
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6">What Canadian <span className="text-red-500">Business Owners</span> Say</h2>
                <p className="text-gray-400 text-lg">Real impact from real local businesses.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    text: "Being certified has become a key part of our brand identity. Customers actively seek us out because they know their purchase supports Canadian jobs.",
                    author: "Sarah Mitchell",
                    role: "Northern Lights Outfitters",
                    initials: "SM"
                  },
                  { 
                    text: "The certification process was straightforward, and the impact has been immediate. We've seen a 23% increase in repeat customers who mention choosing us for being locally operated.",
                    author: "Michael Kwong",
                    role: "True North Gear Co.",
                    initials: "MK"
                  },
                  { 
                    text: "Our badge helped us compete against larger international chains. Customers appreciate knowing their dollars stay in Canada and support local employment.",
                    author: "Jennifer Thompson",
                    role: "Maple Leaf Adventure Shop",
                    initials: "JT"
                  }
                ].map((quote, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                    <Quote className="w-10 h-10 text-red-500 mb-8 opacity-80" />
                    <p className="text-gray-300 mb-10 leading-relaxed italic text-lg">"{quote.text}"</p>
                    <div className="flex items-center border-t border-white/10 pt-6">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-bold text-white mr-4 shadow-lg">
                        {quote.initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg">{quote.author}</h4>
                        <p className="text-sm text-gray-400 uppercase tracking-wider">{quote.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>

      </div>
    );
  }

  // --- Success View ---
  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-16 text-center max-w-xl w-full border border-gray-100 animate-fade-in-up">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-green-600 animate-bounce" />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Application Received!</h2>
          <p className="text-gray-500 mb-10 text-lg leading-relaxed">
            Your documents have been securely uploaded. Our verification team will review your application within 48-72 hours.
          </p>
          <div className="bg-slate-50 rounded-xl p-4 mb-8 text-sm text-gray-600">
            Reference ID: <span className="font-mono font-bold text-gray-900">OM-{Math.floor(Math.random()*100000)}</span>
          </div>
          <button 
            onClick={() => {setStep(0); setIsComplete(false);}}
            className="w-full bg-white border-2 border-gray-200 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // --- The Application Wizard (Steps 1-4) ---
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 animate-fade-in-up">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-widest mb-4">
              {authType === 'new' ? 'New Registration' : 'Verification Request'}
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Business Verification</h2>
            <p className="text-gray-500 mt-2">Complete the steps below to earn your badge.</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className={`h-2 w-12 rounded-full transition-all duration-500 ${step >= num ? 'bg-red-600' : 'bg-gray-200'}`} />
            ))}
            <span className="ml-4 text-sm font-bold text-gray-400">Step {step} of 4</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Form Area */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden min-h-[500px] flex flex-col animate-fade-in-up animation-delay-200">
              
              <div className="p-10 flex-grow">
                {step === 1 && (
                  <div className="space-y-8 animate-fade-in-up">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                      <Building2 className="w-6 h-6 mr-3 text-red-600" /> 
                      Business Profile
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Legal Business Name</label>
                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-gray-50 transition-all outline-none" placeholder="e.g. Maple Tech Solutions Inc." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Business Number (BN)</label>
                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-gray-50 transition-all outline-none" placeholder="9 digits" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-gray-700">Headquarters Address</label>
                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-gray-50 transition-all outline-none" placeholder="Street, City, Province, Postal Code" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Role of Submitter</label>
                        <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-gray-50 transition-all outline-none">
                          <option>Owner / Founder</option>
                          <option>CEO / Director</option>
                          <option>Manager (Authorized)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8 animate-fade-in-up">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                      <FileText className="w-6 h-6 mr-3 text-red-600" /> 
                      Document Upload
                    </h3>
                    <p className="text-gray-500 text-sm">We strictly protect your data (PIPEDA compliant). Files are encrypted at rest.</p>
                    
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer group">
                        <div className="flex items-center">
                          <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-white text-gray-400 group-hover:text-red-600 transition-colors">
                            <Upload className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">Proof of Ownership / Incorporation</h4>
                            <p className="text-sm text-gray-500">Articles of Incorporation, Shareholder registry</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer group">
                        <div className="flex items-center">
                          <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-white text-gray-400 group-hover:text-red-600 transition-colors">
                            <Upload className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">Government ID (Owner)</h4>
                            <p className="text-sm text-gray-500">Passport or Driver's License (To verify Canadian Citizenship)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8 animate-fade-in-up">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                      <ShieldCheck className="w-6 h-6 mr-3 text-red-600" /> 
                      Select Badges
                    </h3>
                    <p className="text-gray-500 text-sm">Select the certifications you are applying for. Proof will be required.</p>
                    
                    <div className="space-y-3">
                      {[
                        { title: "Base Certificate", desc: "Headquarters located in Canada", included: true },
                        { title: "Canadian Owned", desc: "≥51% Ownership by Citizens", included: false },
                        { title: "Locally Owned", desc: "Owner lives within 25km", included: false },
                      ].map((badge, idx) => (
                        <label key={idx} className={`flex items-start p-5 rounded-2xl border cursor-pointer transition-all ${badge.included ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200 hover:border-red-300'}`}>
                          <input type="checkbox" defaultChecked={badge.included} disabled={badge.included} className="h-5 w-5 text-red-600 rounded mt-1 border-gray-300 focus:ring-red-500" />
                          <div className="ml-4">
                            <h4 className="font-bold text-gray-900">{badge.title}</h4>
                            <p className="text-sm text-gray-500">{badge.desc}</p>
                          </div>
                          {badge.included && <span className="ml-auto text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">INCLUDED</span>}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-8 animate-fade-in-up">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                      <CreditCard className="w-6 h-6 mr-3 text-red-600" /> 
                      Review & Pay
                    </h3>
                    
                    <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                      <div className="flex justify-between text-gray-600 text-sm">
                        <span>Annual Certification Fee</span>
                        <span className="font-medium">$49.00</span>
                      </div>
                      <div className="flex justify-between text-gray-600 text-sm">
                        <span>HST (13%)</span>
                        <span className="font-medium">$6.37</span>
                      </div>
                      <div className="h-px bg-gray-200 my-2"></div>
                      <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total (CAD)</span>
                        <span>$55.37</span>
                      </div>
                    </div>

                    <div className="flex items-start p-4 bg-blue-50 text-blue-800 rounded-xl text-sm">
                      <ShieldCheck className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                      <p>Your payment is secure via Stripe. The fee covers manual due diligence. If your application is rejected due to lack of proof, 50% is refundable.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Footer */}
              <div className="bg-gray-50 p-8 border-t border-gray-100 flex justify-between items-center">
                {step > 1 ? (
                  <button onClick={() => setStep(step - 1)} className="text-gray-500 font-bold hover:text-gray-900">Back</button>
                ) : (
                  <button onClick={() => setStep(0)} className="text-gray-500 font-bold hover:text-gray-900">Cancel</button>
                )}
                <button 
                  onClick={() => step < 4 ? setStep(step + 1) : setIsComplete(true)}
                  className="bg-red-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-red-900/20 hover:bg-red-800 hover:scale-105 transition-all flex items-center"
                >
                  {step === 4 ? "Pay & Submit" : "Continue"}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Help */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg relative overflow-hidden">
               <h4 className="font-bold text-gray-900 mb-4 text-lg">Need Help?</h4>
               <p className="text-gray-500 text-sm mb-4">Our support team is available to assist you with the verification process.</p>
               <p className="font-bold text-red-600">support@onlymaple.ca</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};