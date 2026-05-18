"use client";
import {Navbar} from "@/components/layout/Navbar";
import {Footer} from "@/components/layout/Footer";
import {FloatingBackground} from "@/components/layout/FloatingBackground";
import Home from "@/components/home/Home";
import { useState } from "react";
import type { BLOG_POSTS } from "@/lib/constants";

type BlogPreviewPost = (typeof BLOG_POSTS)[number];

export default function HomeView() {
  const [, setActiveTab] = useState("home");
  const [, setActivePost] = useState<BlogPreviewPost | null>(null);

  return (
    <>
      <FloatingBackground />
      <Navbar  />
      <Home setView={setActiveTab} setActivePost={setActivePost} />

      <Footer />
    </>
  );
}
