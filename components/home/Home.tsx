import {
  ArrowDown,
  ArrowRight,
  Award,
  Briefcase,
  Heart,
  HeartHandshake,
  MapPin,
  Search,
  Star,
  Users,
  ShoppingBag,
} from "lucide-react";
import { RevealOnScroll } from "../animations/RevealOnScroll";
import PageTransition from "../animations/PageTransition";
import CountUp from "../animations/CountUp";
import { Badge } from "../ui/Badge";
import { BLOG_POSTS } from "@/lib/constants";
import MapleLeaf from "@/public/MapleLeaf.svg";
import Image from "next/image";
import { CertificationTiers } from "./CertificationTiers";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const MagneticButton = ({ children, className, onClick }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the movement with a spring
  const springConfig = { damping: 15, stiffness: 150 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Pull the button 15% towards the mouse
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      whileHover={{ scale: 1.02 }}
      className="transition-all duration-100 ease-out"
    >
      {children}
    </motion.div>
  );
};

const Home = ({
  setView,
  setActivePost,
}: {
  setView: any;
  setActivePost: any;
}) => {
  const handlePostClick = (post: any) => {
    setActivePost(post);
    setView("blog-post");
    window.scrollTo(0, 0);
  };

  const { scrollYProgress } = useScroll();
  const leafY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const leafRotate = useTransform(scrollYProgress, [0, 1], [12, 45]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each step appearing
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <PageTransition>
      <div className="min-h-screen relative z-10">
        {/* Hero Section */}
        <div className="relative bg-red-700 overflow-hidden min-h-[600px] flex items-center">
          {/* Background Container */}
          <div className="absolute inset-0">
            {/* Base gradient layers */}
            <div className="absolute inset-0 bg-red-900 mix-blend-multiply opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-transparent to-transparent" />

            {/* Giant Background Maple Leaves */}
            <motion.div
              className="absolute -left-20 -bottom-20 text-red-900 opacity-20 "
              style={{ y: leafY, rotate: leafRotate }}
            >
              <Image priority src={MapleLeaf} alt="My SVG Icon" />
            </motion.div>
            <motion.div
              style={{ y: leafY, rotate: leafRotate }}
              className="absolute -right-20 top-20 text-red-900 opacity-20"
            >
              <Image priority src={MapleLeaf} alt="Maple Leaf" />
            </motion.div>

            {/* Abstract shapes */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-6 py-24 text-center z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-red-400 bg-red-800/30 text-red-100 text-sm font-medium mb-8 backdrop-blur-sm animate-fade-in-up">
              <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current animate-pulse" />
              The Gold Standard for Canadian Authenticity
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight animate-fade-in-up">
              Shop Local.{" "}
              <span className="text-red-200">Verify Authentic.</span>
              <br />
              Build Canada.
            </h1>

            <p className="mt-4 max-w-2xl mx-auto text-xl md:text-2xl text-red-100 font-light leading-relaxed animate-fade-in-up">
              Canada's official hub for certifying business ownership.
              <span className="font-medium text-white ml-2">
                Every $100 spent here keeps $66 in our community.
              </span>
            </p>

            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5 animate-fade-in-up">
              <button
                className="px-10 py-4 border border-white/20 text-lg font-semibold rounded-full text-white bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 active:scale-95 flex items-center justify-center"
                onClick={() => setView("search")}
              >
                <Search className="w-5 h-5 mr-2 inline-block" />
                Find Businesses
              </button>
              <MagneticButton
                children="Get Certified"
                onClick={() => setView("business")}
                className="px-10 py-4 text-lg font-semibold rounded-full text-red-900 bg-white hover:bg-red-50 shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-95 relative overflow-hidden"
              />
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 animate-scroll">
              <ArrowDown className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Quick Stats Banner - Floating */}
        <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 animate-fade-in-up animation-delay-400">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 gap-8 md:gap-0">
              <div className="text-center px-4 group">
                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                  <CountUp end={94} suffix="%" />
                </div>
                <div className="text-gray-500 font-medium tracking-wide text-sm uppercase">
                  Canadians Check Origin
                </div>
              </div>
              <div className="text-center px-4 group">
                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                  <CountUp end={66} prefix="$" />
                </div>
                <div className="text-gray-500 font-medium tracking-wide text-sm uppercase">
                  Retained Locally per $100
                </div>
              </div>
              <div className="text-center px-4 group">
                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                  <CountUp end={18} suffix="%" />
                </div>
                <div className="text-gray-500 font-medium tracking-wide text-sm uppercase">
                  Business Growth
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white/90 py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <RevealOnScroll>
              <div className="text-center mb-24">
                <h2 className="text-red-700 font-bold tracking-widest uppercase text-sm mb-4">
                  Transparent Process
                </h2>
                <p className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                  How OnlyMaple Works
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* For Shoppers */}
                <div className="bg-slate-50 p-10 md:p-12 rounded-[2.5rem] border border-gray-100 relative group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute top-10 right-10 w-20 h-20 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 animate-float">
                    <ShoppingBag className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-10 pr-20">
                    For Shoppers
                  </h3>
                  <motion.div
                    className="space-y-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    {[
                      {
                        title: "Search Directory",
                        desc: "Filter by province, industry, or certification level.",
                      },
                      {
                        title: "Scan to Verify",
                        desc: "Instantly confirm authenticity via QR code in-store.",
                      },
                      {
                        title: "Support Local",
                        desc: "Buy with confidence and support Canadian jobs.",
                      },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        variants={itemVariants}
                        className="flex group/item"
                      >
                        <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-lg font-bold text-gray-900 shadow-sm mr-6 group-hover/item:bg-red-600 group-hover/item:text-white transition-colors">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">
                            {item.title}
                          </h4>
                          <p className="text-gray-500 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  <div className="mt-12">
                    <button
                      onClick={() => setView("search")}
                      className="w-full py-4 border-2 border-red-100 text-red-700 rounded-2xl font-bold hover:bg-red-50 hover:border-red-200 transition-colors tracking-wide active:scale-95"
                    >
                      Start Browsing
                    </button>
                  </div>
                </div>

                {/* For Businesses */}
                <div className="bg-gray-900 p-10 md:p-12 rounded-[2.5rem] relative group hover:shadow-2xl transition-all duration-500 text-white hover:-translate-y-2">
                  <div className="absolute top-10 right-10 w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 animate-float">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-10 pr-20">
                    For Businesses
                  </h3>
                  <motion.div
                    className="space-y-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    {[
                      {
                        title: "Submit Credentials",
                        desc: "Upload ownership docs. We verify every application.",
                      },
                      {
                        title: "Get Certified",
                        desc: "Receive your digital badge and unique verification QR.",
                      },
                      {
                        title: "Stand Out",
                        desc: "Gain trust. 76% of Canadians prefer local businesses.",
                      },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        variants={itemVariants}
                        className="flex group/item"
                      >
                        <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-lg font-bold shadow-sm mr-6 group-hover/item:bg-white group-hover/item:text-red-900 transition-colors">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="text-xl font-bold mb-2">
                            {item.title}
                          </h4>
                          <p className="text-gray-400 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  <div className="mt-12">
                    <button
                      onClick={() => setView("business")}
                      className="w-full py-4 bg-red-700 text-white rounded-2xl font-bold hover:bg-red-600 transition-colors tracking-wide shadow-lg shadow-red-900/30 active:scale-95 relative overflow-hidden group/btn"
                    >
                      <span className="relative z-10">Apply Now</span>
                      <div className="absolute inset-0 w-full h-full bg-red-600 transform translate-y-full group-hover/btn:translate-y-0 transition-transform"></div>
                    </button>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
        <CertificationTiers />

        {/* Latest from the Log (Blog Section) */}

        <div className="py-32 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <RevealOnScroll>
              <div className="flex justify-between items-end mb-16">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 text-red-700 font-bold mb-4">
                    <div className="h-px w-8 bg-red-700"></div>
                    <span className="uppercase tracking-widest text-xs">
                      The Maple Leaf Log
                    </span>
                  </div>
                  <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    Latest Stories & Insights
                  </h2>
                </div>
                <button
                  onClick={() => setView("blog")}
                  className="hidden md:flex group text-gray-900 font-bold hover:text-red-700 transition-colors items-center tracking-wide"
                >
                  VIEW ALL
                  <span className="ml-3 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-red-50 group-hover:border-red-100 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {BLOG_POSTS.slice(0, 3).map((post, idx) => (
                  <RevealOnScroll key={post.id} delay={idx * 100}>
                    <TiltCard>
                      <div
                        onClick={() => handlePostClick(post)}
                        className="group cursor-pointer flex flex-col h-full transition-shadow duration-300"
                      >
                        <div
                          className={`aspect-[4/3] rounded-3xl ${post.imageColor} mb-6 flex items-center justify-center text-gray-500 overflow-hidden shadow-sm relative`}
                        >
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 z-10"></div>
                          <span className="text-sm font-medium group-hover:scale-105 transition-transform duration-700">
                            Article Image
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">
                            {post.category}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-gray-500 leading-relaxed line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center text-sm font-bold text-gray-900 group-hover:text-red-700 transition-colors">
                            Read Story{" "}
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </RevealOnScroll>
                ))}
              </div>

              <div className="mt-12 md:hidden">
                <button
                  onClick={() => setView("blog")}
                  className="w-full bg-white text-gray-900 border border-gray-200 px-6 py-4 rounded-xl font-bold hover:bg-gray-50 active:scale-95 transition-transform"
                >
                  View All Articles
                </button>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Featured Businesses Carousel */}
        <div className="py-32 bg-slate-50/80 backdrop-blur-sm border-t border-gray-100 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <RevealOnScroll>
              <div className="flex justify-between items-end mb-16">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    New Arrivals
                  </h2>
                  <p className="text-gray-500 text-lg">
                    Discover who just joined the OnlyMaple network.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  {
                    name: "Muskoka Chair Co.",
                    loc: "Bracebridge, ON",
                    tag: "Independent Owner",
                  },
                  {
                    name: "Prairie Grain Bakery",
                    loc: "Saskatoon, SK",
                    tag: "Locally Owned",
                  },
                  {
                    name: "Atlantic Fisheries",
                    loc: "St. John's, NL",
                    tag: "Canadian Owned",
                  },
                ].map((biz, i) => (
                  <RevealOnScroll key={i} delay={i * 100}>
                    <TiltCard>
                      <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 h-full">
                        <div className="h-64 bg-gray-100 group-hover:bg-red-50/50 transition-colors flex items-center justify-center text-gray-400 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <span className="text-sm font-medium relative z-10">
                            Image Placeholder
                          </span>
                        </div>
                        <div className="p-8">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-red-700 transition-colors">
                                {biz.name}
                              </h3>
                              <p className="text-sm text-gray-500 flex items-center font-medium">
                                <MapPin className="w-3 h-3 mr-1.5" /> {biz.loc}
                              </p>
                            </div>
                          </div>
                          <div className="pt-4 border-t border-gray-50">
                            <Badge type={biz.tag} />
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </RevealOnScroll>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Social Impact / Mission */}
        <div className="bg-gray-900 text-white py-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <RevealOnScroll>
              <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-8 backdrop-blur-sm">
                <HeartHandshake className="w-12 h-12 text-red-500 animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                More Than Just a Directory
              </h2>
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-12 font-light">
                OnlyMaple is committed to giving back. We donate{" "}
                <span className="text-white font-medium border-b border-red-500">
                  5-10% of our profits
                </span>{" "}
                to women's entrepreneurship programs and small business grants
                across Canada.
              </p>
              <button className="bg-white text-gray-900 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg active:scale-95 relative overflow-hidden group">
                <span className="relative z-10">Partner With Us</span>
                <div className="absolute inset-0 bg-red-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
