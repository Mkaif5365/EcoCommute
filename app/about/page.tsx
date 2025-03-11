"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Leaf, Mail, Github, Linkedin, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a2540] to-[#1b1b1b] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#2a3a50] bg-[#0a2540]/90 backdrop-blur supports-[backdrop-filter]:bg-[#0a2540]/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/landing" className="mr-6 flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-[#00aa55]" />
              <span className="hidden font-bold sm:inline-block text-white">
                EcoCommute+
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link
                href="/transport-options"
                className="transition-colors hover:text-[#00aa55] text-gray-300"
              >
                Transport Options
              </Link>
              <Link
                href="/ride-sharing"
                className="transition-colors hover:text-[#00aa55] text-gray-300"
              >
                Ride Sharing
              </Link>
              <Link
                href="/rewards"
                className="transition-colors hover:text-[#00aa55] text-gray-300"
              >
                Rewards
              </Link>
              <Link
                href="/about"
                className="transition-colors hover:text-[#00aa55] text-white"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-[#00aa55] text-gray-300"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
            </div>
            <Link href="/landing">
              <Button variant="outline" size="sm" className="border-[#00aa55] text-[#00aa55] hover:bg-[#00aa55] hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-20">
        {/* About Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-[#00aa55]">EcoCommute+</span>
            </h1>
            <p className="text-xl text-gray-300">
              Revolutionizing urban mobility with sustainable, smart commuting solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-[#1b1b1b]/40 backdrop-blur-sm p-8 rounded-xl border border-[#00aa55]/20 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-[#00aa55]">Our Mission</h2>
                <p className="text-gray-300 mb-6">
                  At EcoCommute+, we're on a mission to transform urban transportation by making sustainable commuting options more accessible, convenient, and rewarding for everyone.
                </p>
                <p className="text-gray-300">
                  We believe that by integrating multiple transport options into a single platform and incentivizing eco-friendly choices, we can significantly reduce carbon emissions while improving the overall commuting experience.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-[#1b1b1b]/40 backdrop-blur-sm p-8 rounded-xl border border-[#00aa55]/20 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-[#00aa55]">Our Vision</h2>
                <p className="text-gray-300 mb-6">
                  We envision a future where cities are cleaner, greener, and more livable, with reduced traffic congestion and improved air quality thanks to widespread adoption of sustainable transportation options.
                </p>
                <p className="text-gray-300">
                  Our goal is to create a community of environmentally conscious commuters who make a positive impact on the planet every day through their transportation choices.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet Our <span className="text-[#00aa55]">Team</span>
            </h2>
            <p className="text-xl text-gray-300">
              The passionate individuals behind EcoCommute+
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
          
            
            {/* Team Member 5 - Hariom Gupta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-[#1b1b1b]/40 backdrop-blzur-sm rounded-xl border border-[#00aa55]/20 shadow-lg overflow-hidden group"
            >
              <div className="h-48 bg-gradient-to-br from-[#0a5540] to-[#00aa55] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-3xl font-bold text-white">
                  HG
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Hariom Gupta</h3>
                <p className="text-[#00aa55] text-sm mb-4">Lead Backend Developer & Project Manager</p>
                <p className="text-gray-300 text-sm mb-4">
                Hariom manages the backend development and ensures smooth API integration. He oversees project execution, handles database management, and optimizes system performance. His expertise ensures a scalable, efficient, and well-structured backend, keeping everything on track for seamless functionality.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="text-gray-400 hover:text-[#00aa55]">
                    <Mail className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#00aa55]">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#00aa55]">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Team Member 6 - Tushar Yadav */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-[#1b1b1b]/40 backdrop-blur-sm rounded-xl border border-[#00aa55]/20 shadow-lg overflow-hidden group"
            >
              <div className="h-48 bg-gradient-to-br from-[#0a5540] to-[#00aa55] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-3xl font-bold text-white">
                  TY
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Tushar Yadav</h3>
                <p className="text-[#00aa55] text-sm mb-4">System Architect & Optimization Specialist</p>
                <p className="text-gray-300 text-sm mb-4">
                Tushar ensures the system remains efficient, scalable, and well-optimized. He specializes in database structuring, performance tuning, and debugging. His expertise helps in optimizing workflows, enhancing speed, and ensuring seamless user experience.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="text-gray-400 hover:text-[#00aa55]">
                    <Mail className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#00aa55]">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#00aa55]">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Team Member 7 - Mohammad Kaif */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-[#1b1b1b]/40 backdrop-blur-sm rounded-xl border border-[#00aa55]/20 shadow-lg overflow-hidden group"
            >
              <div className="h-48 bg-gradient-to-br from-[#0a5540] to-[#00aa55] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-3xl font-bold text-white">
                  MK
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Mohammad Kaif</h3>
                <p className="text-[#00aa55] text-sm mb-4">Frontend & UI/UX Designer</p>
                <p className="text-gray-300 text-sm mb-4">
                Kaif designs and develops the user interface, ensuring an intuitive and engaging experience. He focuses on creating responsive, visually appealing designs while maintaining smooth functionality. His skills in modern frontend technologies enhance usability and interactivity.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="text-gray-400 hover:text-[#00aa55]">
                    <Mail className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#00aa55]">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#00aa55]">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#2a3a50] py-6 md:py-0 bg-[#0a2540]">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Leaf className="h-6 w-6 text-[#00aa55]" />
            <p className="text-center text-sm leading-loose text-gray-400 md:text-left">
              © {new Date().getFullYear()} EcoCommute+. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-6 md:px-0">
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/about" className="text-gray-400 hover:text-[#00aa55] transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-[#00aa55] transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-[#00aa55] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#00aa55] transition-colors">
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
} 