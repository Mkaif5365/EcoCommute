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
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const apiKey = 'a6f5b905587a2e6ff31e4127f881783f' // Hardcoded API key for testing

  useEffect(() => {
    // Only run this effect once when the component mounts
    if (!mapRef.current) return;
    
    // Function to initialize map - exactly like the HTML test page
    function initMap() {
      if (typeof window.mappls === 'undefined') {
        console.error('Mappls API not loaded');
        return;
      }
      
      try {
        console.log('Initializing map...');
        
        // Check if mappls.Map exists
        if (!window.mappls.Map) {
          console.error('Mappls Map constructor not found');
          return;
        }
        
        // Create map with basic options only
        const mapOptions = {
          center: [28.61, 77.23],
          zoom: 12
        };
        
        // Initialize map with try-catch
        try {
          const map = new window.mappls.Map(mapRef.current, mapOptions);
          
          // Add traffic layer - Fix the traffic layer initialization
          try {
            // Check if traffic layer method exists
            if (window.mappls.traffic) {
              window.mappls.traffic({map: map});
              console.log('Traffic layer added successfully');
            } else if (window.mappls.trafficLayer) {
              window.mappls.trafficLayer({map: map});
              console.log('Traffic layer added successfully');
            } else {
              console.warn('Traffic layer method not found in Mappls API');
            }
          } catch (trafficError) {
            console.error('Error adding traffic layer:', trafficError);
            // Continue with map initialization even if traffic layer fails
          }
          
          // Add sample transport options with try-catch
          const transportOptions = [
            { position: [28.61, 77.23] as [number, number], title: "Metro Station" },
            { position: [28.62, 77.22] as [number, number], title: "Bus Stop" },
            { position: [28.60, 77.24] as [number, number], title: "Bike Rental" }
          ];
          
          transportOptions.forEach(option => {
            try {
              if (window.mappls.Marker) {
                new window.mappls.Marker({
                  map: map,
                  position: option.position,
                  title: option.title,
                  draggable: false
                });
              }
            } catch (markerError) {
              console.error('Error adding marker:', markerError);
            }
          });
          
          console.log('Map initialized successfully');
          setMapLoaded(true);
        } catch (mapError) {
          console.error('Error creating map instance:', mapError);
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }
    
    // Load the Mappls API script - exactly like the HTML test page
    function loadScript() {
      console.log('Loading Mappls API script...');
      const script = document.createElement('script');
      script.src = `https://apis.mappls.com/advancedmaps/api/${apiKey}/map_sdk?v=3.0&layer=vector`;
      script.async = true;
      script.onload = initMap;
      script.onerror = (error) => {
        console.error('Failed to load Mappls API script:', error);
      };
      document.head.appendChild(script);
    }
    
    // Call loadScript directly, not in a window.onload handler
    loadScript();
    
    // Cleanup function
    return () => {
      const script = document.querySelector('script[src*="mappls.com/advancedmaps/api"]');
      if (script) {
        script.remove();
      }
    };
  }, [apiKey]); // Only depend on apiKey

  // Sample transport options for markers
  const transportHubs = [
    { position: [28.6139, 77.2090] as [number, number], title: "New Delhi Railway Station" },
    { position: [28.5562, 77.1000] as [number, number], title: "IGI Airport" },
    { position: [28.6304, 77.2177] as [number, number], title: "ISBT Kashmere Gate" },
    { position: [28.6430, 77.0850] as [number, number], title: "Metro Interchange" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a2540] to-[#1b1b1b] text-white">
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
                className="transition-colors hover:text-[#00aa55] text-gray-300"
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
            <nav className="flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white">Welcome, {user?.name || 'User'}</span>
                  <Button variant="outline" size="sm" className="border-[#00aa55] text-[#00aa55] hover:bg-[#00aa55] hover:text-white">
                    Dashboard
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowLoginModal(true)}
                    className="text-gray-300 hover:text-white hover:bg-[#0a2540]"
                  >
                    Login
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => setShowSignupModal(true)}
                    className="bg-[#00aa55] hover:bg-[#008844] text-white"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Scroll Indicator */}
      <div className="container mx-auto flex justify-center pb-8 pt-4">
        <a
          href="#features"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#00aa55] transition-colors"
        >
          Scroll to explore
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>

      {/* Feature Highlights */}
      <section
        id="features"
        className="container space-y-6 py-8 md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl text-white">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-gray-300 sm:text-lg sm:leading-7">
            Our platform offers a comprehensive suite of features designed to make your commute greener, 
            more efficient, and more enjoyable.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-4">
          <div className="relative overflow-hidden rounded-lg border border-[#2a3a50] bg-[#0a2540]/50 p-2 transition-all hover:border-[#00aa55]/50 hover:shadow-[0_0_15px_rgba(0,170,85,0.15)]">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Map className="h-12 w-12 text-[#00aa55]" />
              <div className="space-y-2">
                <h3 className="font-bold text-white">Multi-Modal Transport</h3>
                <p className="text-sm text-gray-300">
                  Combine public transit, cycling, walking, and ride-sharing for optimal green commuting.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-[#2a3a50] bg-[#0a2540]/50 p-2 transition-all hover:border-[#00aa55]/50 hover:shadow-[0_0_15px_rgba(0,170,85,0.15)]">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Map className="h-12 w-12 text-[#00aa55]" />
              <div className="space-y-2">
                <h3 className="font-bold text-white">Smart Route Optimization</h3>
                <p className="text-sm text-gray-300">
                  AI-powered routes that minimize carbon footprint while optimizing for time and convenience.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-[#2a3a50] bg-[#0a2540]/50 p-2 transition-all hover:border-[#00aa55]/50 hover:shadow-[0_0_15px_rgba(0,170,85,0.15)]">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Users className="h-12 w-12 text-[#00aa55]" />
              <div className="space-y-2">
                <h3 className="font-bold text-white">Peer-to-Peer Ride Sharing</h3>
                <p className="text-sm text-gray-300">
                  Connect with commuters heading your way to share rides and reduce emissions.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-[#2a3a50] bg-[#0a2540]/50 p-2 transition-all hover:border-[#00aa55]/50 hover:shadow-[0_0_15px_rgba(0,170,85,0.15)]">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Trophy className="h-12 w-12 text-[#00aa55]" />
              <div className="space-y-2">
                <h3 className="font-bold text-white">Gamification & Rewards</h3>
                <p className="text-sm text-gray-300">
                  Earn points, badges, and real rewards for your contribution to sustainable commuting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Mobility Aggregation */}
      <MobilitySection />

      {/* Ride Sharing */}
      <RideSharingSection />

      {/* Public Transport Integration */}
      <TransportSection />

      {/* Gamification & Leaderboard */}
      <GameSection />

      {/* Map Section */}
      <section className="container py-8 md:py-12 lg:py-16">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
            Explore Transportation Options
          </h2>
          <p className="max-w-[46rem] text-muted-foreground sm:text-xl">
            Find the most efficient and eco-friendly ways to travel around Delhi.
          </p>
          
          <div className="mt-6 w-full">
            <MapplsMap 
              center={[28.6139, 77.2090]} // New Delhi Railway Station
              zoom={10}
              height="500px"
              markers={transportHubs}
              className="shadow-xl rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-8 md:py-12 lg:py-24">
        <div className="bg-gradient-to-r from-[#0a5540] to-[#004d40] mx-auto max-w-[58rem] rounded-lg px-8 py-12 border border-[#00aa55]/20 shadow-[0_0_30px_rgba(0,170,85,0.1)]">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] text-white sm:text-3xl md:text-4xl">
              Join the Green Commute Revolution
            </h2>
            <p className="max-w-[85%] leading-normal text-white/80 sm:text-lg sm:leading-7">
              Be part of the solution to urban congestion and pollution. Start your green commuting journey today.
            </p>
            <Button 
              className="mt-4 bg-[#00aa55] hover:bg-[#008844] text-white"
              size="lg"
              onClick={() => !isAuthenticated && setShowSignupModal(true)}
            >
              Find Your Green Ride <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

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
        <LoginModal onClose={() => setShowLoginModal(false)} onSignupClick={() => {
          setShowLoginModal(false)
          setShowSignupModal(true)
        }} />
      )}
      {showSignupModal && (
        <SignupModal onClose={() => setShowSignupModal(false)} onLoginClick={() => {
          setShowSignupModal(false)
          setShowLoginModal(true)
        }} />
      )}
    </div>
  )
} 