"use client";
import {Navbar} from "@/components/layout/Navbar";
import {Footer} from "@/components/layout/Footer";
import {FloatingBackground} from "@/components/layout/FloatingBackground";
import Home from "@/components/home/Home";
import { useState } from "react";

export default function HomeView() {
  const [activeTab, setActiveTab] = useState("home");
  const [activePost, setActivePost] = useState(null);

  return (
    <>
      <FloatingBackground />
      <Navbar  />
      <Home setView={setActiveTab} setActivePost={setActivePost} />

      <Footer />
    </>
  );
}
