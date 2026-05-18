// src/components/directory/BusinessCard.tsx
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ChevronRight, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { DirectoryBusiness } from "@/lib/db/businesses";
import { getBusinessCategoryImage } from "@/lib/businessImages";

export const BusinessCard = ({ biz, index }: { biz: DirectoryBusiness; index: number }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: (index % 6) * 0.05, // Stagger based on position in current view
      }}
      className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full cursor-pointer relative"
    >
      {/* Design Polish: Subtle numbering for Discovery progress */}
      <span className="absolute top-8 right-10 text-[40px] font-black text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {index + 1}
      </span>

      <div className="flex justify-between items-start mb-10 relative z-10">
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

      <div className="mb-6 relative z-10">
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

      <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between relative z-10">
        <div className="flex flex-wrap gap-2">
          {/* ✅ Fixed: Removed variant="outline" to match the Badge component's props */}
          <Badge type={biz.category} />
          {biz.type.slice(0, 1).map((t) => (
            <Badge key={t} type={t} />
          ))}
        </div>
        <motion.div
          whileHover={{ x: 5 }}
          className="text-gray-900 font-black text-[10px] uppercase tracking-widest flex items-center"
        >
          Details <ChevronRight className="w-4 h-4 ml-1 text-red-600" />
        </motion.div>
      </div>
    </motion.div>
  );
};
