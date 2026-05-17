'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, FileText, Upload, ShieldCheck, CreditCard, ChevronRight, CheckCircle, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { BusinessApplicationData, createBusinessApplication } from '@/lib/db/applications';

interface WizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const BusinessVerificationWizard = ({ onComplete, onCancel }: WizardProps) => {
  const { user } = useAuth(); // authentication
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Omit<BusinessApplicationData, 'userId' | 'status' | 'submittedAt'>>({
    businessDetails: {
      legalName: '',
      businessNumber: '',
      address: '',
      website: '',
      submitterRole: 'Owner / Founder'
    },
    documents: {
      incorporation: undefined,
      governmentId: undefined
    },
    badges: ['Canadian Owned'] // Default selection
  });

  const updateDetails = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      businessDetails: { ...prev.businessDetails, [field]: value }
    }));
  };

  const handleFileSelect = (type: 'incorporation' | 'governmentId', file: File) => {
    // Validate size (e.g., 500KB limit for Firestore document safety)
    if (file.size > 500 * 1024) {
      alert("File is too large. Please select a file under 500KB for this demo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setFormData(prev => ({
        ...prev,
        documents: { ...prev.documents, [type]: base64 }
      }));
    };
    reader.readAsDataURL(file);
  };

  const toggleBadge = (badgeTitle: string) => {
     setFormData(prev => {
       const exists = prev.badges.includes(badgeTitle);
       return {
         ...prev,
         badges: exists 
           ? prev.badges.filter(b => b !== badgeTitle)
           : [...prev.badges, badgeTitle]
       };
     });
  };

  // Smooth scroll to top on step change
  useEffect(() => {
    const timer = setTimeout(() => {
      // window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [step]);

  const handleNext = async () => {
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      if (!user) return;
      setIsSubmitting(true);
      try {
        await createBusinessApplication(user.uid, formData);
        onComplete();
      } catch (error) {
        console.error("Submission failed", error);
        alert("Failed to submit application. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
      if (step > 1) {
          setStep(prev => prev - 1);
      } else {
          onCancel();
      }
  }

  // Animation classes based on direction
  const animationClass = "animate-in fade-in slide-in-from-right-8 duration-500";

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100/50 overflow-hidden min-h-[650px] flex flex-col relative transition-all duration-500">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-50/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50/50 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>

      {/* Header with improved progress */}
      <div className="bg-white/80 backdrop-blur-md px-10 py-8 border-b border-gray-100 sticky top-0 z-20">
        <div className="flex justify-between items-end mb-6">
            <div>
                <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Business Verification</h3>
                <p className="text-sm text-gray-400 font-medium mt-1">Get certified in 4 simple steps</p>
            </div>
            <div className="text-right hidden md:block">
                 <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">Step {step}/4</p>
                 <p className="text-sm font-medium text-gray-900">
                     {step === 1 && "Business Details"}
                     {step === 2 && "Verification Docs"}
                     {step === 3 && "Certifications"}
                     {step === 4 && "Review & Pay"}
                 </p>
            </div>
        </div>

        {/* Custom Progress Bar */}
        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${(step / 4) * 100}%` }}
            >
                <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 animate-pulse"></div>
            </div>
        </div>
      </div>

      <div className="p-10 flex-grow relative z-10 overflow-y-auto custom-scrollbar">
        
        {/* STEP 1: BUSINESS PROFILE */}
        {step === 1 && (
          <div key="step1" className={animationClass}>
            <div className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-red-50 to-red-100 text-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-100 skew-y-0 hover:-skew-y-3 transition-transform duration-300">
                  <Building2 className="w-7 h-7" />
              </div>
              <div>
                  <h2 className="text-3xl font-bold text-gray-900">Business Details</h2>
                  <p className="text-gray-500 mt-1">Tell us about your organization.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 group">
                <label className="text-sm font-bold text-gray-700 ml-1 group-focus-within:text-red-600 transition-colors">Legal Business Name</label>
                <input 
                    type="text" 
                    value={formData.businessDetails.legalName}
                    onChange={(e) => updateDetails('legalName', e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium" 
                    placeholder="e.g. Maple Tech Solutions Inc." 
                    autoFocus
                />
              </div>
              <div className="space-y-3 group">
                <label className="text-sm font-bold text-gray-700 ml-1 group-focus-within:text-red-600 transition-colors">Business Number (BN)</label>
                <input 
                  type="text" 
                  value={formData.businessDetails.businessNumber}
                  onChange={(e) => updateDetails('businessNumber', e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium" placeholder="9 digits (CRA)" />
              </div>
              <div className="space-y-3 group md:col-span-2">
                <label className="text-sm font-bold text-gray-700 ml-1 group-focus-within:text-red-600 transition-colors">Headquarters Address</label>
                <input 
                  type="text" 
                  value={formData.businessDetails.address}
                  onChange={(e) => updateDetails('address', e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium" placeholder="Street, City, Province, Postal Code" />
              </div>
              <div className="space-y-3 group">
                <label className="text-sm font-bold text-gray-700 ml-1 group-focus-within:text-red-600 transition-colors">Website (Optional)</label>
                <input 
                  type="text" 
                  value={formData.businessDetails.website}
                  onChange={(e) => updateDetails('website', e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium" placeholder="https://" />
              </div>
              <div className="space-y-3 group">
                <label className="text-sm font-bold text-gray-700 ml-1 group-focus-within:text-red-600 transition-colors">Submitter Role</label>
                <div className="relative">
                    <select 
                      value={formData.businessDetails.submitterRole}
                      onChange={(e) => updateDetails('submitterRole', e.target.value)}
                      className="appearance-none w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all duration-300 font-medium text-gray-900 cursor-pointer hover:bg-white"
                    >
                      <option>Owner / Founder</option>
                      <option>Director</option>
                      <option>Authorized Manager</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <ChevronRight className="w-5 h-5 rotate-90" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: DOCUMENT UPLOAD */}
        {step === 2 && (
          <div key="step2" className={animationClass}>
            <div className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-red-50 to-red-100 text-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-100">
                  <FileText className="w-7 h-7" />
              </div>
              <div>
                  <h2 className="text-3xl font-bold text-gray-900">Proof of Ownership</h2>
                  <p className="text-gray-500 mt-1">Upload encrypted documents for verification (Max 500KB).</p>
              </div>
            </div>
            
            <div className="grid gap-6">
              {[
                  { key: 'incorporation', title: "Incorporation Articles", desc: "PDF or JPG", icon: Upload },
                  { key: 'governmentId', title: "Government ID", desc: "Driver's License or Passport", icon: UserIcon }
              ].map((item, idx) => {
                const Icon = item.icon;
                const isUploaded = formData.documents[item.key as 'incorporation' | 'governmentId'];

                return (
                <div key={idx} className="relative overflow-hidden border-2 border-dashed border-gray-200 rounded-[2rem] p-8 hover:bg-slate-50 hover:border-red-400 transition-all duration-300 cursor-pointer group flex flex-col md:flex-row items-center text-center md:text-left gap-6">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-50 to-transparent rounded-bl-full -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100"></div>
                    
                    <div className="h-16 w-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 z-10">
                       {isUploaded ? <CheckCircle className="w-7 h-7 text-green-500" /> : <Icon className="w-7 h-7 text-gray-400 group-hover:text-red-500 transition-colors" />}
                    </div>
                    <div className="flex-grow z-10">
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-red-700 transition-colors">{item.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    </div>
                    <div className="z-10 relative">
                        <input 
                          type="file" 
                          accept="image/*,application/pdf"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleFileSelect(item.key as 'incorporation' | 'governmentId', e.target.files[0]);
                          }}
                        />
                         <span className={`px-5 py-2.5 text-sm font-bold border rounded-xl transition-all shadow-sm ${isUploaded ? 'bg-green-100 text-green-700 border-green-200' : 'bg-white text-gray-700 border-gray-200 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600'}`}>
                           {isUploaded ? 'Uploaded' : 'Select File'}
                         </span>
                    </div>
                </div>
                );
              })}
            </div>
            
            <div className="mt-8 flex items-center gap-3 text-xs text-gray-400 bg-gray-50 p-3 rounded-lg border border-gray-100 max-w-fit mx-auto md:mx-0">
                 <ShieldCheck className="w-4 h-4" />
                 Documents are 256-bit encrypted and automatically deleted after verification.
            </div>
          </div>
        )}

        {/* STEP 3: BADGE SELECTION */}
        {step === 3 && (
          <div key="step3" className={animationClass}>
            <div className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-red-50 to-red-100 text-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-100">
                  <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                  <h2 className="text-3xl font-bold text-gray-900">Select Badges</h2>
                  <p className="text-gray-500 mt-1">Which certifications apply to you?</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start p-6 rounded-[2rem] border border-red-200 bg-red-50/50 cursor-not-allowed opacity-80 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">INCLUDED</div>
                <div className="flex items-center justify-center h-8 w-8 text-red-600 mr-5 mt-1 bg-white rounded-full border border-red-200 shadow-sm">
                     <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Base Certificate (Required)</h4>
                  <p className="text-sm text-gray-600 mt-1 font-medium">Verifies Canadian headquarters and registration.</p>
                </div>
              </label>

              {[
                { title: "Canadian Owned", desc: "≥51% Ownership by Canadian Citizens.", popular: true },
                { title: "Locally Owned", desc: "Owner lives within 25km of operations.", popular: false },
                { title: "Community Contributor", desc: "Donates to local charities or employs locals.", popular: false }
              ].map((badge, idx) => (
                <label key={idx} className="flex items-start p-6 rounded-[2rem] border border-gray-200 bg-white cursor-pointer hover:border-red-300 hover:shadow-lg hover:shadow-red-900/5 transition-all duration-300 group relative">
                   <div className={`absolute top-6 right-6 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${formData.badges.includes(badge.title) ? 'border-red-500' : 'border-gray-200 group-hover:border-red-400'}`}>
                        <div className={`w-3 h-3 bg-red-600 rounded-full transition-transform ${formData.badges.includes(badge.title) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}></div>
                   </div>
                   <input 
                    type="checkbox" 
                    className="hidden peer" 
                    checked={formData.badges.includes(badge.title)}
                    onChange={() => toggleBadge(badge.title)}
                   />
                   
                   <div className={`absolute inset-0 rounded-[2rem] -z-10 transition-colors ${formData.badges.includes(badge.title) ? 'bg-red-50' : ''}`}></div>
                   
                   {/* Custom Checkbox Placeholder */}
                   <div className={`h-8 w-8 mr-5 mt-1 rounded-full border-2 flex items-center justify-center transition-all ${formData.badges.includes(badge.title) ? 'border-red-500 bg-white' : 'border-gray-200 bg-gray-50 group-hover:bg-white group-hover:border-red-500'}`}>
                       <ShieldCheck className={`w-4 h-4 transition-colors ${formData.badges.includes(badge.title) ? 'text-red-500' : 'text-gray-300 group-hover:text-red-500'}`} />
                   </div>
                   
                   <div>
                    <div className="flex items-center gap-2">
                        <h4 className={`text-lg font-bold transition-colors ${formData.badges.includes(badge.title) ? 'text-red-700' : 'text-gray-900 group-hover:text-red-700'}`}>{badge.title}</h4>
                        {badge.popular && <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Popular</span>}
                    </div>
                    <p className="text-sm text-gray-500 mt-1 font-medium group-hover:text-gray-600">{badge.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & PAY */}
        {step === 4 && (
          <div key="step4" className={animationClass}>
            <div className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-red-50 to-red-100 text-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-100">
                  <CreditCard className="w-7 h-7" />
              </div>
              <div>
                  <h2 className="text-3xl font-bold text-gray-900">Review & Payment</h2>
                  <p className="text-gray-500 mt-1">Secure checkout via Stripe.</p>
              </div>
            </div>

            <div className="bg-gradient-to-b from-gray-50 to-white rounded-[2rem] p-8 space-y-5 border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full blur-2xl -mr-10 -mt-10"></div>
               
               <div className="relative z-10">
                    <div className="flex justify-between text-gray-600 font-medium">
                        <span>Annual Verification Fee</span>
                        <span className="font-bold text-gray-900">$49.00</span>
                    </div>
                    <div className="flex justify-between text-gray-600 font-medium pt-2">
                        <span>HST (13%)</span>
                        <span className="font-bold text-gray-900">$6.37</span>
                    </div>
                    <div className="h-px bg-gray-200 my-4"></div>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total (CAD)</span>
                        <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">$55.37</span>
                    </div>
               </div>
            </div>
            
            <div className="mt-8 flex items-start gap-4 p-5 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-100">
               <div className="bg-white p-2 rounded-full shadow-sm">
                   <ShieldCheck className="w-5 h-5 text-emerald-600" />
               </div>
               <div>
                    <h4 className="font-bold text-emerald-900">100% Secure & Refundable</h4>
                    <p className="text-sm mt-1 text-emerald-700/80 leading-relaxed">
                        Payment is held in escrow until initial document check is passed. 
                        If we cannot verify your business, 50% is automatically refunded.
                    </p>
               </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer Controls */}
      <div className="bg-white p-8 border-t border-gray-100 flex justify-between items-center relative z-20">
        <button 
          onClick={handleBack} 
          className="group flex items-center px-6 py-3 text-gray-500 font-bold hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {step === 1 ? "Cancel" : "Back"}
        </button>
        
        <button 
          onClick={handleNext}
          className="group relative overflow-hidden bg-gray-900 text-white px-10 py-4 rounded-xl font-bold shadow-xl shadow-gray-900/10 hover:shadow-2xl hover:shadow-gray-900/20 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
          disabled={isSubmitting}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center z-10">
            {isSubmitting ? (
               <>Processing...</> 
            ) : (
               <>
                 {step === 4 ? "Pay & Submit" : "Continue"}
                 <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
               </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

// Helper for the icon in step 2
const UserIcon = ({className}:{className?:string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
)
