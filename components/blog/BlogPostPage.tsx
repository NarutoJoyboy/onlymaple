'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Clock, Bookmark, Twitter, Linkedin } from 'lucide-react';
import type { POSTS } from '@/lib/constants';

type BlogPost = typeof POSTS[number];

export default function BlogPostPage({ post }: { post: BlogPost }) {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-white"
    >
      {/* 1. Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-red-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* 2. Floating Action Bar (Sticky) */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 z-50">
        <button onClick={() => router.push('/blog')} className="p-3 bg-gray-50 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all shadow-sm border border-gray-100 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="h-20 w-px bg-gray-100 mx-auto" />
        <button className="p-3 text-gray-400 hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></button>
        <button className="p-3 text-gray-400 hover:text-blue-700 transition-colors"><Linkedin className="w-5 h-5" /></button>
        <button className="p-3 text-gray-400 hover:text-red-600 transition-colors"><Bookmark className="w-5 h-5" /></button>
      </div>

      {/* 3. Cinematic Hero Section */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden bg-slate-50">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              {post.category}
            </span>
            <span className="text-gray-400 text-sm font-bold flex items-center">
              <Clock className="w-4 h-4 mr-2" /> {post.readTime}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.95] mb-10"
          >
            {post.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-6 border-t border-gray-200 pt-10"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gray-200 border-2 border-white shadow-md flex items-center justify-center text-gray-400">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-0.5">Written By</p>
                <p className="text-lg font-bold text-gray-900">{post.author}</p>
              </div>
            </div>
            <div className="h-10 w-px bg-gray-200" />
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Published On</p>
              <p className="text-lg font-bold text-gray-900">{post.date}</p>
            </div>
          </motion.div>
        </div>

        {/* Decorative Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#B91C1C_0%,_transparent_70%)]" />
        </div>
      </header>

      {/* 4. Article Body */}
      <article className="max-w-3xl mx-auto px-6 py-24">
        {/* Intro Dropcap */}
        <p className="text-2xl text-gray-600 leading-relaxed mb-12 font-medium">
          {post.excerpt}
        </p>

        {/* Dynamic Image Window */}
        <div className={`w-full aspect-video rounded-[3rem] ${post.color} mb-16 relative overflow-hidden group shadow-2xl shadow-gray-900/10`}>
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 opacity-60 group-hover:opacity-30 transition-opacity" />
        </div>

        <div className="prose prose-xl prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-gray-600 prose-p:leading-extra-relaxed prose-strong:text-gray-900">
          <p>
            Canada’s economic landscape is shifting rapidly. In this era of global uncertainty, the importance of 
            the local supply chain has never been more evident. But &quot;shopping local&quot; is more than just a 
            sentimental gesture—it’s a data-backed strategy for national resilience.
          </p>
          
          {/* Pull Quote - High End Designer Touch */}
          <blockquote className="my-16 border-l-4 border-red-600 pl-10 py-4 not-italic">
            <p className="text-4xl font-black text-gray-900 leading-tight tracking-tight">
              &quot;Building Canada starts with the decision of where you spend your next hundred dollars.&quot;
            </p>
            <cite className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-6 block">— Economic Board of OnlyMaple</cite>
          </blockquote>

          <p>
            When we analyze the flow of capital within our communities, we see a multiplier effect. Every dollar 
            spent at a certified Canadian-owned business generates nearly triple the economic value of a dollar 
            spent at a global conglomerate. This isn&apos;t just about profit; it&apos;s about infrastructure, healthcare, 
            and the very fabric of our society.
          </p>

          <h2 className="text-3xl font-black text-gray-900 mt-16 mb-8">The Path Forward</h2>
          <p>
            As we look toward 2027, the OnlyMaple certification serves as a beacon for consumers who want their 
            values to align with their transactions. By verifying ownership and local impact, we provide the 
            transparency needed to rebuild our industrial base from the ground up.
          </p>
        </div>

        {/* 5. Article Footer / Tags */}
        <div className="mt-24 pt-12 border-t border-gray-100 flex flex-wrap gap-3">
          {['Economy', 'Local Impact', 'Small Business', 'Canada 2026'].map(tag => (
            <span key={tag} className="px-5 py-2 bg-gray-50 text-gray-500 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* 6. "Next Up" Section */}
      <footer className="bg-gray-50 py-24 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-black text-red-600 uppercase tracking-[0.3em] mb-4">Up Next</p>
          <h3 className="text-4xl font-black text-gray-900 mb-10 tracking-tighter">Spotlight: The Muskoka Chair Co.</h3>
          <button className="bg-gray-900 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-red-600 transition-all active:scale-95 shadow-xl">
            Continue Reading
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
