"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Leaf, Mail, Github, Linkedin, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a2540] to-[#1b1b1b] text-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Link 
          href="/landing" 
          className="inline-flex items-center text-[#00aa55] hover:text-[#00cc66] mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-6">About EcoCommute+</h1>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-8">
              EcoCommute+ is a revolutionary platform designed to transform urban mobility by making it more sustainable, efficient, and accessible for everyone.
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
            <p className="text-gray-300">
              Our mission is to reduce the carbon footprint of urban transportation by providing integrated, eco-friendly mobility solutions that connect various modes of transport seamlessly. We believe that by making sustainable transport options more accessible and convenient, we can contribute significantly to combating climate change while improving the quality of urban life.
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">Our Vision</h2>
            <p className="text-gray-300">
              We envision cities where sustainable mobility is the default choice, not because it's mandatory, but because it's the most convenient, affordable, and enjoyable option. We see a future where urban spaces are designed for people, not cars, and where the air is clean and streets are safe for everyone.
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">Our Approach</h2>
            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div className="bg-[#0a2540] p-6 rounded-lg border border-[#2a3a50]">
                <h3 className="text-xl font-bold mb-3 text-[#00aa55]">Integration</h3>
                <p className="text-gray-300">
                  We integrate various transport modes into a single platform, making it easy to plan multi-modal journeys that are both efficient and sustainable.
                </p>
              </div>
              
              <div className="bg-[#0a2540] p-6 rounded-lg border border-[#2a3a50]">
                <h3 className="text-xl font-bold mb-3 text-[#00aa55]">Innovation</h3>
                <p className="text-gray-300">
                  We leverage cutting-edge technology to provide real-time data, predictive analytics, and personalized recommendations that make sustainable transport more convenient.
                </p>
              </div>
              
              <div className="bg-[#0a2540] p-6 rounded-lg border border-[#2a3a50]">
                <h3 className="text-xl font-bold mb-3 text-[#00aa55]">Incentivization</h3>
                <p className="text-gray-300">
                  Our rewards system incentivizes sustainable transport choices, making it not just good for the planet, but good for your wallet too.
                </p>
              </div>
              
              <div className="bg-[#0a2540] p-6 rounded-lg border border-[#2a3a50]">
                <h3 className="text-xl font-bold mb-3 text-[#00aa55]">Inclusion</h3>
                <p className="text-gray-300">
                  We design our solutions to be accessible to everyone, regardless of age, ability, or socioeconomic status.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">Our Team</h2>
            <p className="text-gray-300 mb-6">
              EcoCommute+ is built by a passionate team of developers and designers who are committed to transforming urban mobility.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-6">
              <div className="bg-[#0a2540] p-6 rounded-lg border border-[#2a3a50] text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">HG</span>
                </div>
                <h3 className="text-xl font-bold mb-1">Hariom Gupta</h3>
                <p className="text-[#00aa55] mb-3">Lead Backend Developer & Project Manager</p>
                <p className="text-gray-300 text-sm mb-4">
                  Hariom manages the backend development and ensures smooth API integration. He oversees project execution, handles database management, and optimizes system performance.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-400 hover:text-[#00aa55]">
                    <Mail className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#00aa55]">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div className="bg-[#0a2540] p-6 rounded-lg border border-[#2a3a50] text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">MK</span>
                </div>
                <h3 className="text-xl font-bold mb-1">Mohammad Kaif</h3>
                <p className="text-[#00aa55] mb-3">Frontend & UI/UX Designer</p>
                <p className="text-gray-300 text-sm mb-4">
                  Kaif designs and develops the user interface, ensuring an intuitive and engaging experience. He focuses on creating responsive, visually appealing designs.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-400 hover:text-[#00aa55]">
                    <Mail className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#00aa55]">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div className="bg-[#0a2540] p-6 rounded-lg border border-[#2a3a50] text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">TY</span>
                </div>
                <h3 className="text-xl font-bold mb-1">Tushar Yadav</h3>
                <p className="text-[#00aa55] mb-3">System Architect & Optimization Specialist</p>
                <p className="text-gray-300 text-sm mb-4">
                  Tushar ensures the system remains efficient, scalable, and well-optimized. He specializes in database structuring, performance tuning, and debugging.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-400 hover:text-[#00aa55]">
                    <Mail className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#00aa55]">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">Join Us</h2>
            <p className="text-gray-300 mb-6">
              We're always looking for talented individuals who are passionate about sustainable urban mobility. If you're interested in joining our team, check out our careers page or get in touch with us.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="bg-[#00aa55] hover:bg-[#00cc66] text-white">
                View Careers
              </Button>
              <Link href="/contact">
                <Button variant="outline" className="border-[#00aa55] text-[#00aa55] hover:bg-[#00aa55]/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-[#2a3a50] py-6 bg-[#0a2540]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Leaf className="h-5 w-5 text-[#00aa55] mr-2" />
            <span className="text-sm text-gray-400">
              © {new Date().getFullYear()} EcoCommute+. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-[#00aa55]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-[#00aa55]">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
} 