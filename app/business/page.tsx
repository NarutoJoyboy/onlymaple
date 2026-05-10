"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingBackground } from "@/components/layout/FloatingBackground";
import { BusinessPortal } from "@/components/business/BusinessPortal";
import { useState } from "react";

export default function HomeView() {

  return (
    <>
      <FloatingBackground />
      <Navbar />
      <BusinessPortal />

      <Footer />
    </>
  );
}
