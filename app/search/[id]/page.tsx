import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CheckCircle,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingBackground } from "@/components/layout/FloatingBackground";
import { Badge } from "@/components/ui/Badge";
import { getBusinessById } from "@/lib/db/businesses";
import { getBusinessCategoryImage } from "@/lib/businessImages";

const DETAIL_STATS = [
  { label: "Verification", value: "Certified" },
  { label: "Registry", value: "Active" },
  { label: "Review Cycle", value: "Annual" },
];

export default async function StoreDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = getBusinessById(id);

  if (!business) {
    notFound();
  }

  const imageUrl = getBusinessCategoryImage(business.category);

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-gray-900 antialiased selection:bg-red-100 selection:text-red-900">
      <FloatingBackground />
      <Navbar />

      <div className="relative z-10 pt-32 pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-gray-400 hover:text-red-600 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Link>

          <section className="grid lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7 bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-slate-200/70 overflow-hidden">
              <div className="relative h-[360px] md:h-[520px]">
                <Image
                  src={imageUrl}
                  alt={`${business.name} ${business.category} image`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute left-8 right-8 bottom-8">
                  <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md text-emerald-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-5">
                    <CheckCircle className="w-4 h-4" />
                    Certified Authentic
                  </div>
                  <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                    {business.name}
                  </h1>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-gray-100 shadow-xl shadow-slate-200/50 h-full">
                <div className="flex items-start justify-between gap-6 mb-8">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-3">
                      Store Profile
                    </p>
                    <div className="flex items-center text-gray-500 font-bold text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-red-600" />
                      {business.location}
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-black text-xl border border-red-100">
                    {business.name[0]}
                  </div>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed font-medium mb-8">
                  {business.desc}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                      Province
                    </p>
                    <p className="font-black text-gray-900">{business.province}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                      Industry
                    </p>
                    <p className="font-black text-gray-900">{business.category}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-10">
                  {business.type.map((type) => (
                    <Badge key={type} type={type} size="lg" />
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {DETAIL_STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                    >
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">
                        {stat.label}
                      </p>
                      <p className="text-sm font-black text-gray-900">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </section>

          <section className="grid lg:grid-cols-3 gap-6 mt-10">
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
              <ShieldCheck className="w-8 h-8 text-red-600 mb-6" />
              <h2 className="text-xl font-black text-gray-900 mb-3">
                Verified Ownership
              </h2>
              <p className="text-gray-500 leading-relaxed font-medium">
                This listing is part of the OnlyMaple verified directory and has
                been marked as an authentic Canadian business profile.
              </p>
            </div>
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
              <Building2 className="w-8 h-8 text-red-600 mb-6" />
              <h2 className="text-xl font-black text-gray-900 mb-3">
                Business Category
              </h2>
              <p className="text-gray-500 leading-relaxed font-medium">
                Listed under {business.category}, with certification tags that
                help shoppers understand how the business supports local value.
              </p>
            </div>
            <div className="bg-gray-900 text-white rounded-[2rem] p-8 shadow-xl">
              <Sparkles className="w-8 h-8 text-red-400 mb-6" />
              <h2 className="text-xl font-black mb-3">Ready to Explore?</h2>
              <p className="text-gray-400 leading-relaxed font-medium mb-8">
                Browse more certified stores or save this business for your next
                local shopping trip.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-red-50 transition-colors"
              >
                More Stores
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
