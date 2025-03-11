"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Bus, Car, ChevronDown, Leaf, Map, Users, Trophy, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import HeroSection from "@/components/hero-section"
import MobilitySection from "@/components/mobility-section"
import RideSharingSection from "@/components/ride-sharing-section"
import TransportSection from "@/components/transport-section"
import GameSection from "@/components/game-section"
import { useAuth } from "@/lib/auth-context"
import LoginModal from "@/components/login-modal"
import SignupModal from "@/components/signup-modal"
import MapplsMap from "@/components/mappls-map"

export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const targetRef = useRef(null)
  const { user, isAuthenticated } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  
  // Sample transport options for markers
  const transportMarkers = [
    { position: [28.6139, 77.2090] as [number, number], title: "New Delhi Railway Station" },
    { position: [28.5562, 77.1000] as [number, number], title: "IGI Airport" },
    { position: [28.6304, 77.2177] as [number, number], title: "ISBT Kashmere Gate" },
    { position: [28.6430, 77.0850] as [number, number], title: "Metro Interchange" },
    { position: [28.61, 77.23] as [number, number], title: "Metro Station" },
    { position: [28.62, 77.22] as [number, number], title: "Bus Stop" },
    { position: [28.60, 77.24] as [number, number], title: "Bike Rental" }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a2540] to-[#1b1b1b] text-white">
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Map Section */}
        <section className="py-20 bg-[#0a2540]" id="map-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Explore Transport Options</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Find the most sustainable and efficient routes with our interactive map. 
                Discover public transit, bike-sharing, and eco-friendly transport options.
              </p>
            </div>
            
            <div className="bg-[#1b2838] p-4 rounded-xl shadow-xl">
              <MapplsMap 
                apiKey="a6f5b905587a2e6ff31e4127f881783f"
                center={[28.61, 77.23]}
                zoom={12}
                height="500px"
                markers={transportMarkers}
              />
              <div className="mt-4 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-300">Metro Stations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-300">Bus Stops</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm text-gray-300">Bike Rentals</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-sm text-gray-300">EV Charging</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Sections */}
        <MobilitySection />
        <TransportSection />
        <RideSharingSection />
        <GameSection />
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#0a2540] to-[#00aa55]/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Green Journey?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of eco-conscious commuters who are making a difference one trip at a time.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                className="bg-[#00aa55] text-[#0a2540] hover:bg-[#00aa55]/90 text-lg px-8 py-6 h-auto"
                onClick={() => setShowSignupModal(true)}
              >
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-[#00aa55] text-[#00aa55] hover:bg-[#00aa55]/10 text-lg px-8 py-6 h-auto"
                onClick={() => setShowLoginModal(true)}
              >
                Log In
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2a3a50] py-6 md:py-0 bg-[#0a2540]">
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

      {/* Modals */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onSignupClick={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />
      )}
      
      {showSignupModal && (
        <SignupModal 
          onClose={() => setShowSignupModal(false)} 
          onLoginClick={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </div>
  )
} 