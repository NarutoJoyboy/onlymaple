"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Users,
  Briefcase,
  Heart,
  Award,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { RevealOnScroll } from "../animations/RevealOnScroll";

const TIERS = [
  {
    title: "Canadian Based",
    subtitle: "The Foundation",
    desc: "The mandatory baseline for all OnlyMaple members. Ensures the business is physically present and legally liable in Canada.",
    icon: <MapPin className="w-6 h-6" />,
    requirements: [
      "Registered & Headquartered in Canada",
      "Physical Canadian address (No PO Boxes)",
      "Verified business registration documents",
    ],
  },
  {
    title: "Canadian Owned",
    subtitle: "Majority Stakeholder",
    desc: "Guarantees that the primary economic beneficiaries and decision-makers are Canadians.",
    icon: <Users className="w-6 h-6" />,
    requirements: [
      "≥51% Ownership by Canadian Citizens/PRs",
      "Control of voting shares",
      "Proof of citizenship or permanent residency",
    ],
  },
  {
    title: "Independent Owner",
    subtitle: "Solopreneur / Single Owner",
    desc: "For businesses completely owned and operated by a single individual without external corporate control.",
    icon: <Briefcase className="w-6 h-6" />,
    requirements: [
      "100% owned by one Canadian individual",
      "No foreign parent company",
      "Full operational autonomy",
    ],
  },
  {
    title: "Locally Owned",
    subtitle: "Community Rooted",
    desc: "Verifies that the owner is a true neighbor who lives within the same community they serve.",
    icon: <MapPin className="w-6 h-6" />,
    requirements: [
      "Owner lives within 25km of the business",
      "Verified utility bill or residency proof",
      "Keeps spending circulating locally",
    ],
  },
  {
    title: "Community Contributor",
    subtitle: "Social Impact",
    desc: "Recognizes businesses that go above and beyond to support the Canadian workforce or charities.",
    icon: <Heart className="w-6 h-6" />,
    requirements: [
      "Employs ≥5 Canadians on payroll",
      "OR Donates 2% of profits to local charities",
      "Verified by annual tax filings",
    ],
  },
];

export const CertificationTiers = () => {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate logic
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % TIERS.length);
      }, 5000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handleManualClick = (index: number) => {
    setActive(index);
    // Reset timer on click
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % TIERS.length);
      }, 5000);
    }
  };

  return (
    <section
      className="bg-slate-50/80 backdrop-blur-sm py-20 sm:py-24 md:py-32 border-y border-gray-200 relative z-10 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4">
              <ShieldCheck className="w-4 h-4 mr-2 flex-shrink-0" />
              Rigorous Verification
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 sm:mb-6">
              Our Certification Standards
            </h2>
            <p className="text-base sm:text-xl text-gray-500 leading-relaxed">
              Select a badge below to see the strict requirements every
              OnlyMaple business must meet.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT COLUMN: Navigation List */}
            <div className="lg:col-span-5 flex flex-col space-y-3 sm:space-y-4">
              {TIERS.map((tier, i) => (
                <button
                  key={i}
                  onClick={() => handleManualClick(i)}
                  className={`group flex items-center justify-between p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border relative overflow-hidden ${
                    active === i
                      ? "bg-white border-red-200 shadow-lg scale-[1.02] ring-1 ring-red-50"
                      : "bg-transparent border-transparent hover:bg-white/60 hover:border-gray-200"
                  }`}
                >
                  {/* Animated Progress Bar */}
                  {active === i && !isPaused && (
                    <div className="absolute bottom-0 left-0 h-1 bg-red-50 w-full">
                      <div
                        className="h-full bg-red-600 animate-[progress_5s_linear_1]"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 sm:gap-5 relative z-10 min-w-0">
                    <div
                      className={`p-3 sm:p-3.5 rounded-2xl transition-colors duration-300 shadow-sm flex-shrink-0 ${
                        active === i
                          ? "bg-red-600 text-white"
                          : "bg-white text-gray-400 group-hover:text-red-600 border border-gray-100"
                      }`}
                    >
                      {tier.icon}
                    </div>
                    <div>
                      <h4
                        className={`font-bold text-base sm:text-lg leading-tight mb-1 ${
                          active === i
                            ? "text-gray-900"
                            : "text-gray-500 group-hover:text-gray-900"
                        }`}
                      >
                        {tier.title}
                      </h4>
                      <p
                        className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                          active === i
                            ? "text-red-600"
                            : "text-gray-400 group-hover:text-red-400"
                        }`}
                      >
                        {tier.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`hidden sm:block w-5 h-5 transition-all relative z-10 ${
                      active === i
                        ? "text-red-600 translate-x-0 opacity-100"
                        : "text-gray-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* RIGHT COLUMN: Active Detail View */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[1.75rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl shadow-red-900/5 border border-gray-100 relative overflow-hidden min-h-[auto] lg:min-h-[520px] flex flex-col justify-center group transition-all duration-500">
                {/* Decorative Background Watermark */}
                <div className="absolute -right-16 -bottom-16 text-gray-50 opacity-50 pointer-events-none transform rotate-[-15deg] scale-125 sm:scale-150 transition-transform duration-700 group-hover:scale-[1.6]">
                  <ShieldCheck strokeWidth={0.5} className="w-72 h-72 sm:w-96 sm:h-96" />
                </div>

                {/* Content - Animated Key for re-render */}
                <div key={active} className="relative z-10 animate-fade-in-up">
                  <div className="flex items-center justify-between mb-8 sm:mb-10">
                    <div className="flex items-center gap-4">
                      <div className="p-3 sm:p-4 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl shadow-lg shadow-red-600/20">
                        {TIERS[active].icon}
                      </div>
                      <div className="h-8 w-px bg-gray-200/80 mx-1 sm:mx-2"></div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                          Badge Type
                        </span>
                        <span className="text-sm font-bold text-red-600 tracking-tight">
                          {TIERS[active].subtitle}
                        </span>
                      </div>
                    </div>
                    {/* Official Seal Graphic */}
                    <div className="hidden sm:flex h-12 w-12 rounded-full border-2 border-red-100 items-center justify-center bg-red-50">
                      <CheckCircle2 className="w-6 h-6 text-red-600" />
                    </div>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
                    {TIERS[active].title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-8 sm:mb-10 max-w-lg">
                    {TIERS[active].desc}
                  </p>

                  <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gray-100 relative overflow-hidden">
                    {/* Subtle side accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600"></div>

                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-2 text-red-600" />
                      Verification Criteria
                    </h4>
                    <ul className="space-y-4">
                      {TIERS[active].requirements.map((req, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-sm sm:text-base text-gray-700 group/item"
                        >
                          <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center mr-4 mt-0.5 shadow-sm group-hover/item:border-red-200 group-hover/item:shadow-md transition-all">
                            <CheckCircle2 className="w-3.5 h-3.5 text-red-600 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 scale-50 group-hover/item:scale-100" />
                          </div>
                          <span className="font-medium leading-snug pt-0.5">
                            {req}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM: Gold Member Banner */}
          <RevealOnScroll delay={200}>
            <div className="mt-10 sm:mt-16 relative rounded-[1.75rem] sm:rounded-[2.5rem] bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-100/50 p-6 sm:p-10 md:p-14 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500 group">
              <div className="absolute inset-0 bg-white/40 transform -skew-x-12 -translate-x-full group-hover:animate-shimmer z-0"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-16">
                <div className="flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-amber-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                  <div className="relative p-5 sm:p-6 bg-gradient-to-br from-amber-300 to-orange-500 rounded-full text-white shadow-2xl shadow-amber-600/30 group-hover:scale-110 transition-transform duration-500 rotate-3 ring-4 ring-white/50">
                    <Award className="w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                      Gold Member Status
                    </h3>
                    <span className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-amber-200 shadow-sm">
                      Elite
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg max-w-2xl">
                    The ultimate standard of trust. Awarded exclusively to
                    businesses that meet{" "}
                    <span className="font-bold text-gray-900 border-b-2 border-amber-200">
                      ALL 5 certification criteria
                    </span>{" "}
                    and complete an annual audit.
                  </p>
                </div>
                <button className="hidden md:flex px-8 py-4 bg-white text-amber-950 border border-amber-100 rounded-2xl font-bold shadow-md hover:shadow-lg hover:bg-amber-50 transition-all items-center group/btn">
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-2 text-amber-600 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </RevealOnScroll>
        </RevealOnScroll>
      </div>

      {/* Animation Style */}
      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
