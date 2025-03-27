"use client"

import Head from "next/head"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ChevronRight, TrendingUp, BarChart2, Clock, Menu, X } from "lucide-react"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState({
    features: false,
    howItWorks: false,
    about: false,
  })

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Header transformation
      setIsScrolled(window.scrollY > 50)

      // Section visibility for animations
      const features = document.getElementById("features")
      const howItWorks = document.getElementById("how-it-works")
      const about = document.getElementById("about")

      if (features && isElementInViewport(features)) {
        setIsVisible((prev) => ({ ...prev, features: true }))
      }

      if (howItWorks && isElementInViewport(howItWorks)) {
        setIsVisible((prev) => ({ ...prev, howItWorks: true }))
      }

      if (about && isElementInViewport(about)) {
        setIsVisible((prev) => ({ ...prev, about: true }))
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Feature rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Check if element is in viewport
  const isElementInViewport = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
  }

  // Features data
  const features = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Scenario Simulation",
      description: "Test different financial decisions and see their long-term impact on your financial health.",
      color: "from-blue-500 to-blue-800", // Updated color
    },
    {
      icon: <BarChart2 className="h-6 w-6" />,
      title: "Visual Forecasting",
      description: "Interactive charts and visualizations that make complex financial projections easy to understand.",
      color: "from-blue-500 to-blue-800", // Updated color
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time-Travel Insights",
      description: "See how small changes today compound over time, helping you make better financial decisions now.",
      color: "from-blue-500 to-blue-800", // Updated color
    },
  ]

  return (
    <>
      <Head>
        <title>Financial Time Machine | Bree</title>
        <meta name="description" content="See your financial future with Bree's Financial Time Machine" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header */}
        <header
          className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
                  Bree
                </h1>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <motion.ul
                className="flex space-x-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 }}
              >
                <motion.li whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                  <a href="#features" className="text-blue-700 hover:text-teal-600 transition-colors font-medium">
                    Features
                  </a>
                </motion.li>
                <motion.li whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                  <a href="#how-it-works" className="text-blue-700 hover:text-teal-600 transition-colors font-medium">
                    How It Works
                  </a>
                </motion.li>
                <motion.li whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                  <a href="#about" className="text-blue-700 hover:text-teal-600 transition-colors font-medium">
                    About
                  </a>
                </motion.li>
              </motion.ul>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-blue-700 hover:text-teal-600 transition-colors"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white border-t border-gray-100 shadow-lg"
              >
                <div className="px-4 py-5 space-y-4">
                  <a
                    href="#features"
                    className="block text-blue-700 hover:text-teal-600 transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#how-it-works"
                    className="block text-blue-700 hover:text-teal-600 transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    How It Works
                  </a>
                  <a
                    href="#about"
                    className="block text-blue-700 hover:text-teal-600 transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-16 md:mb-0 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                    Your Financial{" "}
                    <span className="bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
                      Time Machine
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-10 max-w-lg">
                    See how today's financial decisions shape your tomorrow. Visualize your financial future and make
                    smarter choices with Bree.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      href="/simulator"
                      className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-800 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all group"
                    >
                      Try the Simulator
                      <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              <div className="md:w-1/2 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="relative z-10"
                >
                  {/* Decorative elements */}
                  <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                  <div className="absolute -bottom-8 -right-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                  <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                  {/* Dashboard mockup */}
                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-6 relative backdrop-blur-sm bg-white/80 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">Financial Timeline</h3>
                      <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                        Interactive Preview
                      </span>
                    </div>

                    {/* Chart visualization */}
                    <div className="h-72 bg-gradient-to-br from-slate-50 to-gray-100 rounded-lg p-4 relative">
                      <div className="absolute bottom-4 left-4 right-4 h-40">
                        {/* Chart lines */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
                        <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gray-200"></div>
                        <div className="absolute bottom-2/3 left-0 right-0 h-px bg-gray-200"></div>

                        {/* Chart data */}
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-full flex items-end"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1, delay: 1 }}
                        >
                          {[0.2, 0.4, 0.3, 0.5, 0.6, 0.7, 0.9].map((height, i) => (
                            <motion.div
                              key={i}
                              className="h-full flex-1 mx-1"
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                            >
                              <div
                                className="w-full rounded-t-sm bg-gradient-to-t from-blue-500 to-blue-800"
                                style={{ height: `${height * 100}%` }}
                              ></div>
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Animated line */}
                        <motion.div
                          className="absolute bottom-0 left-0 h-full w-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1, delay: 1.8 }}
                        >
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <motion.path
                              d="M0,100 C20,90 40,70 60,80 C80,90 100,70 100,60"
                              stroke="url(#gradient)"
                              strokeWidth="2"
                              fill="none"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 2, delay: 1.8 }}
                            />
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="oklch(0.707 0.165 254.624)" />
                                <stop offset="100%" stopColor="oklch(0.488 0.243 264.376)" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </motion.div>
                      </div>

                      <div className="absolute top-4 left-4">
                        <div className="text-sm font-medium text-gray-900">Projected Growth</div>
                        <div className="text-2xl font-bold text-blue-600">+127%</div>
                      </div>
                    </div>                    
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50 z-0"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible.features ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our Financial Time Machine helps you visualize and plan your financial future with powerful tools.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`rounded-2xl p-8 bg-white shadow-xl border border-gray-100 transition-all ${index === activeFeature ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isVisible.features
                      ? {
                          opacity: 1,
                          y: 0,
                          scale: index === activeFeature ? 1.05 : 1,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.1,
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div
                    className={`rounded-full bg-gradient-to-r ${feature.color} p-3 w-14 h-14 flex items-center justify-center mb-6 text-white shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white z-0"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible.howItWorks ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our Financial Time Machine is easy to use and provides powerful insights.
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0 md:space-x-8 relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform -translate-y-1/2 z-0"></div>

              {/* Steps with updated colors */}
              <motion.div
                className="flex flex-col items-center text-center md:w-1/3 bg-white rounded-2xl p-8 shadow-xl border border-gray-100 z-10"
                initial={{ opacity: 0, x: -50 }}
                animate={isVisible.howItWorks ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="rounded-full bg-gradient-to-r from-blue-500 to-blue-800 text-white w-16 h-16 flex items-center justify-center text-xl font-bold mb-6 shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Enter Your Information</h3>
                <p className="text-gray-600">Provide basic details about your current financial situation and goals.</p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="flex flex-col items-center text-center md:w-1/3 bg-white rounded-2xl p-8 shadow-xl border border-gray-100 z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible.howItWorks ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="rounded-full bg-gradient-to-r from-blue-500 to-blue-800 text-white w-16 h-16 flex items-center justify-center text-xl font-bold mb-6 shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Simulate Scenarios</h3>
                <p className="text-gray-600">
                  Test different financial decisions like taking a loan, saving, or investing.
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                className="flex flex-col items-center text-center md:w-1/3 bg-white rounded-2xl p-8 shadow-xl border border-gray-100 z-10"
                initial={{ opacity: 0, x: 50 }}
                animate={isVisible.howItWorks ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="rounded-full bg-gradient-to-r from-blue-500 to-blue-800 text-white w-16 h-16 flex items-center justify-center text-xl font-bold mb-6 shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Visualize Your Future</h3>
                <p className="text-gray-600">
                  See interactive projections of how your decisions impact your financial future.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible.howItWorks ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href="/simulator"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-800 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all group"
                >
                  Start Your Journey
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                className="md:w-1/2 mb-10 md:mb-0 pr-5"
                initial={{ opacity: 0, x: -50 }}
                animate={isVisible.about ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About This Project</h2>
                <p className="text-lg text-gray-600 mb-6">
                  This Financial Time Machine prototype was created as a job application for the Vibe Coder position at
                  Bree.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  It demonstrates how innovative financial visualization tools can help Canadians living paycheck to
                  paycheck make better financial decisions and improve their financial health.
                </p>
                <p className="text-lg text-gray-600">
                  Built with React, Next.js, and TypeScript, this prototype showcases both technical skills and product
                  thinking.
                </p>
              </motion.div>

              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                animate={isVisible.about ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-teal-100 shadow-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Why This Matters</h3>
                  <p className="text-gray-600 mb-6">
                    Over half of Canadians live paycheck to paycheck, often making financial decisions without fully
                    understanding their long-term impact.
                  </p>
                  <p className="text-gray-600 mb-6">
                    The Financial Time Machine bridges this gap by providing intuitive visualizations that make the
                    future consequences of today's financial choices clear and actionable.
                  </p>
                  <p className="text-gray-600">
                    This tool could be a game-changer for Bree's mission to bring better financial services to millions
                    of Canadians.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-blue-500 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.div
                className="mb-6 md:mb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
                  Bree
                </h2>
                <p className="text-white-200 mt-2">Financial Time Machine Prototype</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <p className="text-white-200">&copy; {new Date().getFullYear()} Job Application Demo</p>
              </motion.div>
            </div>
          </div>
        </footer>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  )
}

