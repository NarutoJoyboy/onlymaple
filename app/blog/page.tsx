"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingBackground } from "@/components/layout/FloatingBackground";
import  Journal  from "@/components/blog/journal";

export default function BlogRoute() {
  return (
    <>
      <FloatingBackground />
      <Navbar />
      <Journal />
      <Footer />
    </>
  );
}
