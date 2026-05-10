'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pathname, setPathname] = useState('/');

  // In a real Next.js app, you would use: 
  // import { usePathname } from 'next/navigation';
  // const pathname = usePathname();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  const isActive = (path: string) => {
    // Exact match or sub-path match (e.g. /blog/post-1 matches /blog)
    return pathname === path || (path !== '/' && pathname.startsWith(path));
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer group">
            <div className="flex-shrink-0 flex items-center transition-transform group-hover:scale-105 duration-300 ease-out">
              <span className="text-red-700 text-4xl mr-3 drop-shadow-sm transform group-hover:rotate-12 transition-transform">🍁</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-none">OnlyMaple</h1>
                <p className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mt-0.5">Official Certification</p>
              </div>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <Link
              href="/search" 
              className={`text-sm transition-colors relative group ${isActive('/search') ? 'text-red-700 font-semibold' : 'text-gray-500 hover:text-red-700 font-medium'}`}
            >
              Directory
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-red-700 transform origin-left transition-transform duration-300 ${isActive('/search') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
            <Link
              href="/business" 
              className={`text-sm transition-colors relative group ${isActive('/business') ? 'text-red-700 font-semibold' : 'text-gray-500 hover:text-red-700 font-medium'}`}
            >
              For Business
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-red-700 transform origin-left transition-transform duration-300 ${isActive('/business') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
             <Link 
              href="/blog" 
              className={`text-sm transition-colors relative group ${isActive('/blog') ? 'text-red-700 font-semibold' : 'text-gray-500 hover:text-red-700 font-medium'}`}
            >
              Journal
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-red-700 transform origin-left transition-transform duration-300 ${isActive('/blog') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
            <Link href="/login">
            <button className="bg-red-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-800 transition-all shadow-md hover:shadow-lg active:scale-95 duration-200">
              Sign In
            </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-red-700 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-xl absolute w-full animate-fade-in-up">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a 
              href="/search" 
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium hover:bg-red-50 ${isActive('/search') ? 'text-red-700 bg-red-50' : 'text-gray-700 hover:text-red-700'}`}
            >
              Directory
            </a>
            <a 
              href="/business" 
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium hover:bg-red-50 ${isActive('/business') ? 'text-red-700 bg-red-50' : 'text-gray-700 hover:text-red-700'}`}
            >
              For Business
            </a>
            <a 
              href="/blog" 
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium hover:bg-red-50 ${isActive('/blog') ? 'text-red-700 bg-red-50' : 'text-gray-700 hover:text-red-700'}`}
            >
              Journal
            </a>
            <div className="pt-4 mt-2 border-t border-gray-100">
              <button className="w-full bg-red-700 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-red-800 transition-colors shadow-sm">
                Sign In / List Shop
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};