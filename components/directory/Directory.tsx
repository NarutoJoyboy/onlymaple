"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  CheckCircle,
  Filter,
  X,
  ChevronRight,
  LayoutGrid,
  RotateCcw,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getVerifiedBusinesses, DirectoryBusiness } from "@/lib/db/businesses";
import { getBusinessCategoryImage } from "@/lib/businessImages";

const FILTERS = {
  provinces: ["Ontario", "British Columbia", "Alberta", "Nova Scotia", "Quebec", "Saskatchewan"],
  industries: ["Retail", "Food & Drink", "Services", "Tech", "Manufacturing", "Sports"],
  badges: ["Canadian Owned", "Locally Owned", "Gold Member", "Contributor"],
};

export const Directory = () => {
  const [businesses, setBusinesses] = useState<DirectoryBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery, selectedFilters]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        const data = await getVerifiedBusinesses();
        setBusinesses(data);
      } catch (error) {
        console.error("Failed to load directory:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((biz) => {
      const matchesSearch =
        biz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        biz.desc.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.some(
          (f) => biz.province === f || biz.category === f || biz.type.includes(f)
        );

      return matchesSearch && matchesFilters;
    });
  }, [businesses, searchQuery, selectedFilters]);

  const displayedBusinesses = filteredBusinesses.slice(0, visibleCount);
  const hasMore = visibleCount < filteredBusinesses.length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-32 relative z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="relative mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                <LayoutGrid className="w-3 h-3" />
                Verified Network v1.0
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-[0.85] tracking-tighter">
                Discover Local <br />
                <span className="text-red-600">Excellence.</span>
              </h1>
            </div>

            <div className="hidden md:block text-right">
              <div className="h-px w-24 bg-red-200 ml-auto mb-4" />
              <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">Live Directory</p>
              <div className="flex items-center justify-end gap-2 text-emerald-600 font-black text-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                {filteredBusinesses.length} STORES ACTIVE
              </div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-12">
            <div className="sticky top-32">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-gray-900 font-black text-xs uppercase tracking-[0.3em] flex items-center gap-2">
                  <Filter className="w-4 h-4 text-red-600" /> Filters
                </h3>
                {selectedFilters.length > 0 && (
                  <button onClick={() => setSelectedFilters([])} className="text-[10px] font-bold text-red-600 hover:underline flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              <div className="space-y-12">
                {Object.entries(FILTERS).map(([category, options]) => (
                  <div key={category} className="group">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-5 border-b border-gray-100 pb-2 group-hover:border-red-200 transition-colors">
                      {category}
                    </h4>
                    <div className="flex flex-wrap lg:flex-col gap-2">
                      {options.map((option) => (
                        <button
                          key={option}
                          onClick={() => toggleFilter(option)}
                          className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                            selectedFilters.includes(option)
                              ? "bg-red-600 border-red-600 text-white shadow-xl shadow-red-100"
                              : "bg-white border-transparent text-gray-500 hover:border-gray-200 hover:shadow-md"
                          }`}
                        >
                          {option}
                          {selectedFilters.includes(option) && <X className="w-3 h-3 ml-2" />}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Console */}
          <main className="lg:col-span-9">
            <div className="relative mb-16 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-400 rounded-[2rem] blur opacity-5 group-focus-within:opacity-15 transition-opacity" />
              <div className="relative bg-white rounded-[1.5rem] shadow-2xl shadow-slate-200/50 border border-gray-100 flex items-center p-3">
                <Search className="w-6 h-6 text-gray-400 ml-6" />
                <input
                  type="text"
                  placeholder="Search by name, industry, or keyword..."
                  className="w-full px-6 py-4 bg-transparent border-none focus:ring-0 text-gray-900 font-medium placeholder-gray-400 text-xl outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 opacity-50">
                <div className="animate-spin w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full mb-4" />
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">Updating Directory...</p>
              </div>
            ) : (
              <>
                <AnimatePresence mode="popLayout">
                  {/* overflow-anchor:none prevents the browser from jumping the scroll when content loads */}
                  <motion.div layout className="grid md:grid-cols-2 gap-10 [overflow-anchor:none]">
                    {displayedBusinesses.map((biz, index) => (
                      <motion.div
                        layout="position" // 🔥 Vital for preventing jiggles
                        key={biz.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          layout: { type: "spring", stiffness: 200, damping: 30 },
                          opacity: { duration: 0.2 },
                          scale: { duration: 0.2 },
                          delay: (index % 6) * 0.05 // Stagger only current batch
                        }}
                        className="group"
                      >
                        <Link
                          href={`/search/${biz.id}`}
                          className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-shadow flex flex-col h-full cursor-pointer relative"
                        >
                          <div className="flex justify-between items-start mb-10">
                            <div className="relative w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                              <Image
                                src={getBusinessCategoryImage(biz.category)}
                                alt={`${biz.name} thumbnail`}
                                fill
                                sizes="64px"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            </div>
                            {biz.verified && (
                              <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-emerald-100">
                                <CheckCircle className="w-3 h-3" /> Certified Authentic
                              </div>
                            )}
                          </div>

                          <div className="mb-6">
                            <h3 className="font-black text-2xl text-gray-900 group-hover:text-red-600 transition-colors mb-3 tracking-tight">
                              {biz.name}
                            </h3>
                            <div className="flex items-center text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                              <MapPin className="w-3.5 h-3.5 mr-2 text-red-600" /> {biz.location}
                            </div>
                          </div>

                          <p className="text-gray-500 leading-relaxed font-medium mb-10 flex-grow text-sm md:text-base line-clamp-3">
                            {biz.desc}
                          </p>

                          <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-gray-50 text-gray-400 rounded-md text-[9px] font-black uppercase tracking-tighter">
                                {biz.category}
                              </span>
                              {biz.type.slice(0, 1).map((t) => (
                                <Badge key={t} type={t} />
                              ))}
                            </div>
                            <motion.div whileHover={{ x: 5 }} className="text-gray-900 font-black text-[10px] uppercase tracking-widest flex items-center">
                              Details <ChevronRight className="w-4 h-4 ml-1 text-red-600" />
                            </motion.div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}

                    {filteredBusinesses.length === 0 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-32 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
                          <Search className="w-8 h-8" />
                        </div>
                        <h4 className="text-gray-900 font-black text-xl mb-2">No results found</h4>
                        <button onClick={() => { setSearchQuery(""); setSelectedFilters([]); }} className="px-8 py-3 bg-gray-900 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg">
                          Reset Console
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Progress & Pagination (Stable Container) */}
                {filteredBusinesses.length > 0 && (
                  <div className="flex flex-col items-center pt-24 pb-10">
                    <div className="flex flex-col items-center gap-3 mb-8">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                        Exploration: {displayedBusinesses.length} / {filteredBusinesses.length}
                      </p>
                      <div className="w-64 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={false}
                          animate={{ width: `${(displayedBusinesses.length / filteredBusinesses.length) * 100}%` }}
                          className="h-full bg-red-600"
                          transition={{ type: "spring", stiffness: 50, damping: 15 }}
                        />
                      </div>
                    </div>

                    {hasMore ? (
                      <button
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className="group relative px-14 py-5 bg-white border border-gray-200 rounded-full font-black text-xs uppercase tracking-[0.3em] text-gray-900 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 overflow-hidden"
                      >
                        <span className="relative z-10">Load More Stores</span>
                        <div className="absolute inset-0 bg-red-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-6 py-2 rounded-full border border-emerald-100">
                        <CheckCircle className="w-4 h-4" /> End of Directory
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
