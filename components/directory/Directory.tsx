'use client';

import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { RevealOnScroll } from '../animations/RevealOnScroll';

// Mock Data
const BUSINESSES = [
  {
    id: 1,
    name: "Northern Roots Coffee",
    location: "Toronto, ON",
    type: ["Canadian Owned", "Local"],
    category: "Food & Drink",
    desc: "Ethically sourced, roasted right here in Kensington Market. We partner with fair-trade farms and roast in small batches.",
    verified: true
  },
  {
    id: 2,
    name: "Maple Leaf Furniture",
    location: "Vancouver, BC",
    type: ["Canadian Based", "Independent"],
    category: "Retail",
    desc: "Handcrafted wood furniture using sustainable BC timber. Family owned and operated since 1985.",
    verified: true
  },
  {
    id: 3,
    name: "Rideau Canal Skates",
    location: "Ottawa, ON",
    type: ["Gold Member", "Contributor"],
    category: "Sports",
    desc: "Equipment for the true Canadian winter. We donate 5% of profits to local youth hockey leagues.",
    verified: true
  },
  {
    id: 4,
    name: "Halifax Harbour General",
    location: "Halifax, NS",
    type: ["Locally Owned"],
    category: "Retail",
    desc: "Maritime goods and gifts. Supporting over 50 local artisans and makers from Nova Scotia.",
    verified: true
  },
  {
    id: 5,
    name: "Prairie Grain Bakery",
    location: "Saskatoon, SK",
    type: ["Canadian Owned"],
    category: "Food & Drink",
    desc: "Baking bread the old fashioned way with 100% Saskatchewan wheat.",
    verified: true
  },
  {
    id: 6,
    name: "Rocky Mountain Gear",
    location: "Calgary, AB",
    type: ["Gold Member"],
    category: "Retail",
    desc: "Technical outerwear designed and tested in the Canadian Rockies.",
    verified: true
  },
];

const FILTERS = {
  provinces: ["Ontario", "British Columbia", "Alberta", "Nova Scotia", "Quebec", "Saskatchewan"],
  industries: ["Retail", "Food & Drink", "Services", "Tech", "Manufacturing", "Sports"],
  badges: ["Canadian Owned", "Locally Owned", "Gold Member", "Contributor"]
};

import { getVerifiedBusinesses, DirectoryBusiness } from '@/lib/db/businesses';

// ... (keep mock data as fallback or for seeding if needed, but for now let's just use it as initial state or remove it)
// actually, let's keep it as a fallback if DB is empty for demo purposes? 
// No, the goal is to use real data. Let's comment it out or move it to a seed script later.

export const Directory = () => {
  const [businesses, setBusinesses] = useState<DirectoryBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  React.useEffect(() => {
    const fetchBusinesses = async () => {
      const data = await getVerifiedBusinesses();
      setBusinesses(data);
      setLoading(false);
    };
    fetchBusinesses();
  }, []);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const filteredBusinesses = businesses.filter(biz => {
    const matchesSearch = biz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      biz.desc.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters = selectedFilters.length === 0 ||
      selectedFilters.some(f =>
        biz.location.includes(f) ||
        biz.category === f ||
        biz.type.includes(f)
      );

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Find Verified Businesses</h1>
          <p className="text-gray-500 text-lg">
            Search our directory of certified Canadian companies. Every listing has been manually verified for ownership.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12 relative z-20 animate-fade-in-up animation-delay-200">
          <div className="relative group">
            <div className="absolute inset-0 bg-red-200 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center p-2">
              <Search className="w-6 h-6 text-gray-400 ml-4" />
              <input
                type="text"
                placeholder="Search by name, industry, or keyword..."
                className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400 text-lg outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="md:hidden p-2 text-gray-500 hover:text-red-600"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              >
                <Filter className="w-6 h-6" />
              </button>
              <button className="hidden md:block bg-red-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-800 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading directory...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* Sidebar Filters */}
            <div className={`lg:col-span-3 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-32 lg:block ${mobileFiltersOpen ? 'block fixed inset-0 z-50 overflow-y-auto m-0 rounded-none' : 'hidden'}`}>
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h3 className="font-bold text-xl">Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)}><X className="w-6 h-6" /></button>
              </div>

              <div className="space-y-8">
                {Object.entries(FILTERS).map(([category, options]) => (
                  <div key={category}>
                    <h4 className="font-bold text-gray-900 mb-3 capitalize flex items-center">
                      {category}
                    </h4>
                    <div className="space-y-2">
                      {options.map(option => (
                        <label key={option} className="flex items-center cursor-pointer group">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors ${selectedFilters.includes(option) ? 'bg-red-600 border-red-600' : 'bg-white border-gray-300 group-hover:border-red-400'}`}>
                            {selectedFilters.includes(option) && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedFilters.includes(option)}
                            onChange={() => toggleFilter(option)}
                          />
                          <span className={`text-sm ${selectedFilters.includes(option) ? 'text-gray-900 font-medium' : 'text-gray-500 group-hover:text-gray-700'}`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 lg:hidden">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-red-700 text-white py-3 rounded-xl font-bold"
                >
                  Show Results
                </button>
              </div>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-9">
              <div className="flex justify-between items-center mb-6 px-2">
                <p className="text-gray-500 text-sm">Showing <span className="font-bold text-gray-900">{filteredBusinesses.length}</span> results</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="bg-transparent text-sm font-bold text-gray-900 border-none outline-none cursor-pointer focus:ring-0">
                    <option>Recommended</option>
                    <option>Newest</option>
                    <option>Name (A-Z)</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredBusinesses.map((biz, index) => (
                  <RevealOnScroll key={biz.id} delay={index * 50}>
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer h-full flex flex-col">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex-shrink-0 flex items-center justify-center text-gray-300 font-bold text-xs group-hover:bg-red-50 group-hover:text-red-300 transition-colors">
                          IMG
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-700 transition-colors flex items-center gap-2">
                            {biz.name}
                            {biz.verified && <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-50" />}
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <MapPin className="w-3.5 h-3.5 mr-1" /> {biz.location}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                        {biz.desc}
                      </p>

                      <div className="mt-auto pt-4 border-t border-gray-50 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                          {biz.category}
                        </span>
                        {biz.type.map(t => (
                          <Badge key={t} type={t} />
                        ))}
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}

                {filteredBusinesses.length === 0 && (
                  <div className="col-span-full py-20 text-center text-gray-400">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 opacity-50" />
                    </div>
                    <p>No businesses found matching your criteria.</p>
                    <button
                      onClick={() => { setSearchQuery(""); setSelectedFilters([]); }}
                      className="text-red-600 font-bold mt-2 hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>)}
        </div>


      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={async () => {
            const { seedBusinesses } = await import('@/lib/db/seed');
            await seedBusinesses();
            alert('Seeding complete! Refresh page.');
          }}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-bold opacity-50 hover:opacity-100 transition-opacity"
        >
          MapSeed
        </button>
      </div>

    </div>
  )
};