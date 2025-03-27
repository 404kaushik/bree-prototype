import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Financial Time Machine | Bree</title>
        <meta name="description" content="See your financial future with Bree's Financial Time Machine" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">Bree</h1>
            </div>
            <nav>
              <ul className="flex space-x-8">
                <li><a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition-colors">How It Works</a></li>
                <li><a href="#about" className="text-gray-600 hover:text-primary-600 transition-colors">About</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-white to-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                    Your Financial <span className="text-primary-600">Time Machine</span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8">
                    See how today's financial decisions shape your tomorrow. Visualize your financial future and make smarter choices with Bree.
                  </p>
                  <Link href="/simulator" className="btn-primary text-lg px-8 py-3">
                    Try the Simulator
                  </Link>
                </motion.div>
              </div>
              <div className="md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">Financial Timeline</h3>
                      <span className="text-sm font-medium text-primary-600">Interactive Preview</span>
                    </div>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 text-center">
                        [Interactive Financial Timeline Visualization]<br />
                        <span className="text-sm">Click "Try the Simulator" to experience it</span>
                      </p>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-secondary-100 rounded-full opacity-50 z-0"></div>
                  <div className="absolute -top-6 -left-6 w-48 h-48 bg-primary-100 rounded-full opacity-50 z-0"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our Financial Time Machine helps you visualize and plan your financial future with powerful tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="card hover:shadow-lg transition-all"
              >
                <div className="rounded-full bg-primary-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Scenario Simulation</h3>
                <p className="text-gray-600">
                  Test different financial decisions and see their long-term impact on your financial health.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="card hover:shadow-lg transition-all"
              >
                <div className="rounded-full bg-secondary-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Visual Forecasting</h3>
                <p className="text-gray-600">
                  Interactive charts and visualizations that make complex financial projections easy to understand.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="card hover:shadow-lg transition-all"
              >
                <div className="rounded-full bg-primary-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Time-Travel Insights</h3>
                <p className="text-gray-600">
                  See how small changes today compound over time, helping you make better financial decisions now.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our Financial Time Machine is easy to use and provides powerful insights.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0 md:space-x-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center md:w-1/3">
                <div className="rounded-full bg-primary-600 text-white w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Enter Your Information</h3>
                <p className="text-gray-600">
                  Provide basic details about your current financial situation and goals.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center md:w-1/3">
                <div className="rounded-full bg-primary-600 text-white w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Simulate Scenarios</h3>
                <p className="text-gray-600">
                  Test different financial decisions like taking a loan, saving, or investing.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center md:w-1/3">
                <div className="rounded-full bg-primary-600 text-white w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Visualize Your Future</h3>
                <p className="text-gray-600">
                  See interactive projections of how your decisions impact your financial future.
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link href="/simulator" className="btn-primary text-lg px-8 py-3">
                Start Your Journey
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0 pr-5">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">About This Project</h2>
                <p className="text-lg text-gray-600 mb-6">
                  This Financial Time Machine prototype was created as a job application for the Vibe Coder position at Bree.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  It demonstrates how innovative financial visualization tools can help Canadians living paycheck to paycheck make better financial decisions and improve their financial health.
                </p>
                <p className="text-lg text-gray-600">
                  Built with React, Next.js, and TypeScript, this prototype showcases both technical skills and product thinking.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Why This Matters</h3>
                  <p className="text-gray-600 mb-6">
                    Over half of Canadians live paycheck to paycheck, often making financial decisions without fully understanding their long-term impact.
                  </p>
                  <p className="text-gray-600 mb-6">
                    The Financial Time Machine bridges this gap by providing intuitive visualizations that make the future consequences of today's financial choices clear and actionable.
                  </p>
                  <p className="text-gray-600">
                    This tool could be a game-changer for Bree's mission to bring better financial services to millions of Canadians.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold">Bree</h2>
                <p className="text-gray-400 mt-2">Financial Time Machine Prototype</p>
              </div>
              <div>
                <p className="text-gray-400">&copy; {new Date().getFullYear()} Job Application Demo</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}