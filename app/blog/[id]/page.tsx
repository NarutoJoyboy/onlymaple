import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingBackground } from "@/components/layout/FloatingBackground";
import BlogPostPage from "@/components/blog/BlogPostPage";
import { POSTS } from "@/lib/constants";
import { notFound } from "next/navigation";

export default async function BlogPostRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = POSTS.find((item) => String(item.id) === id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <FloatingBackground />
      <Navbar />
      <BlogPostPage post={post} />
      <Footer />
    </>
  );
}
