"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll } from "../../components/animations/RevealOnScroll";
import {
  Calendar,
  User,
  ArrowRight,
  Clock,
  Filter,
} from "lucide-react";

// Insert the POSTS dummy data here or import it
import { POSTS } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
} as const;

export default function BlogPage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(POSTS.map((p) => p.category))];

  const filteredPosts = useMemo(() => {
    return filter === "All"
      ? POSTS
      : POSTS.filter((p) => p.category === filter);
  }, [filter]);

  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate an API call
    setIsSubscribed(true);
  };

  return (
    <div className="pt-40 pb-32 max-w-7xl mx-auto px-6 relative z-10">
      {/* Editorial Header */}
      <RevealOnScroll>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.85] tracking-tighter mb-6">
              The Maple <br />
              Leaf <span className="text-red-600">Log.</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              Stories of resilience, innovation, and the people building the
              Canadian future.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-16 pb-8 border-b border-gray-100">
          <Filter className="w-4 h-4 text-gray-400 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all
                ${
                  filter === cat
                    ? "bg-red-600 text-white shadow-lg shadow-red-200"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      {/* Dynamic Grid */}
      <motion.div
        layout
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-6 gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, idx) => {
            // Determine Layout Logic
            const isHero = idx === 0 && filter === "All";
            const isFeature = (idx === 1 || idx === 2) && filter === "All";

            const gridSpan = isHero
              ? "md:col-span-6"
              : isFeature
                ? "md:col-span-3"
                : "md:col-span-3 lg:col-span-2";

            return (
              <motion.div
                layout
                key={post.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                className={`${gridSpan} group`}
              >
                <Link
                  href={`/blog/${post.id}`}
                  className={`flex h-full bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 
                  ${isHero ? "flex-col lg:flex-row" : "flex-col"}`}
                >
                  {/* Image Window */}
                  <div
                    className={`relative overflow-hidden ${isHero ? "lg:w-3/5 h-80 lg:h-auto" : "h-64"} ${post.color}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <span className="font-black text-gray-900/5 text-6xl uppercase tracking-tighter rotate-12 select-none">
                        OnlyMaple
                      </span>
                    </motion.div>
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-red-600">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`p-10 flex flex-col justify-between ${isHero ? "lg:w-2/5" : "w-full"}`}
                  >
                    <div>
                      <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6">
                        <span className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-2 text-red-600" />{" "}
                          {post.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-2 text-red-600" />{" "}
                          {post.readTime}
                        </span>
                      </div>

                      <h3
                        className={`${isHero ? "text-3xl md:text-5xl" : isFeature ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} font-extrabold text-gray-900 mb-5 leading-tight group-hover:text-red-600 transition-colors`}
                      >
                        {post.title}
                      </h3>

                      <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 line-clamp-3 font-medium">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-gray-200 flex items-center justify-center text-gray-400">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[9px] uppercase font-black text-gray-400 tracking-tighter leading-none mb-1">
                            Writer
                          </p>
                          <p className="text-xs font-bold text-gray-900">
                            {post.author}
                          </p>
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-widest"
                      >
                        Read <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Senior Level Polish: Middle-of-the-page Newsletter Break */}
          {filter === "All" && filteredPosts.length > 6 && (
            <motion.div
              variants={itemVariants}
              className="md:col-span-6 bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden my-10"
            >
              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  // STATE 1: THE FORM
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative z-10 max-w-2xl mx-auto"
                  >
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                      Stay in the loop.
                    </h2>
                    <p className="text-gray-400 mb-10 text-lg">
                      Join 10,000+ Canadians receiving weekly insights on
                      building a stronger local economy.
                    </p>
                    <form
                      onSubmit={handleSubscribe}
                      className="flex flex-col md:flex-row gap-4"
                    >
                      <input
                        required
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-500 outline-none focus:border-red-500 transition-colors"
                      />
                      <button
                        type="submit"
                        className="px-10 py-4 bg-red-600 text-white font-black rounded-full hover:bg-red-700 transition-all uppercase tracking-widest text-sm active:scale-95"
                      >
                        Subscribe
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  // STATE 2: THE SUCCESS FEEDBACK
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 max-w-2xl mx-auto py-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 12,
                        delay: 0.2,
                      }}
                      className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-600/40"
                    >
                      <motion.svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          d="M20 6L9 17l-5-5"
                        />
                      </motion.svg>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter">
                      You&apos;re in!
                    </h2>
                    <p className="text-gray-400 text-lg">
                      Check your inbox. We&apos;ve just sent you the latest edition
                      of the Log.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
