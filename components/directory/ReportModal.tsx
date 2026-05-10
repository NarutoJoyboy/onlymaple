'use client';

import React, { useState } from 'react';
import { X, AlertTriangle, Send } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
}

export const ReportModal = ({ isOpen, onClose, businessName }: ReportModalProps) => {
  const [reason, setReason] = useState('fake_badge');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to Firebase
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setDetails('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        
        {isSubmitted ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
               <Send className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Report Submitted</h3>
            <p className="text-gray-500 mt-2">Thank you for helping keep OnlyMaple trustworthy.</p>
          </div>
        ) : (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-xl font-bold">Report Business</h3>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              Reporting <span className="font-bold">{businessName}</span> for suspicious activity or incorrect information.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Reason</label>
                <select 
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none text-sm"
                >
                  <option value="fake_badge">Fake/Misleading Badge</option>
                  <option value="foreign_owner">Foreign Ownership Suspicion</option>
                  <option value="closed">Business Closed</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Details</label>
                <textarea 
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none text-sm min-h-[100px]"
                  placeholder="Please provide evidence or details..."
                  required
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg font-bold text-gray-600 hover:bg-gray-50 text-sm">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 text-sm">Submit Report</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};