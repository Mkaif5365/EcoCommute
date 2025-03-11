"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Bus, Car, ChevronDown, Leaf, Bike, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import HeroSection from "@/components/hero-section"
import MobilitySection from "@/components/mobility-section"
import RideSharingSection from "@/components/ride-sharing-section"
import TransportSection from "@/components/transport-section"
import GameSection from "@/components/game-section"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import LoginModal from "@/components/login-modal"
import SignupModal from "@/components/signup-modal"
import { redirect } from 'next/navigation'
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-900 to-blue-900 py-20 px-4 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Sustainable Urban Mobility for a Greener Future
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                EcoCommute+ helps you find eco-friendly transportation options, share rides, and reduce your carbon footprint.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/transport-options">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Explore Transport Options
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/nearby-e-rides">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Find Nearby E-Rides
                    <Bike className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative h-80 w-full">
                <div className="absolute inset-0 bg-white/10 rounded-xl overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1556122071-e404eaedb77f?w=800&auto=format&fit=crop&q=80" 
                    alt="Sustainable urban mobility" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Our Sustainable Mobility Solutions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Bus className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transport Options</h3>
              <p className="text-gray-600 mb-4">
                Find and compare eco-friendly public transport options including buses, metros, and trains.
              </p>
              <Link href="/transport-options">
                <Button variant="link" className="p-0 text-green-600 hover:text-green-700">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Bike className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nearby E-Rides</h3>
              <p className="text-gray-600 mb-4">
                Discover electric bikes, scooters, and cars available for rent near your location.
              </p>
              <Link href="/nearby-e-rides">
                <Button variant="link" className="p-0 text-green-600 hover:text-green-700">
                  Find E-Rides <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ride Sharing</h3>
              <p className="text-gray-600 mb-4">
                Connect with others heading in the same direction to share rides and reduce emissions.
              </p>
              <Link href="/ride-sharing">
                <Button variant="link" className="p-0 text-green-600 hover:text-green-700">
                  Share Rides <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* E-Rides Highlight Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Discover E-Rides Near You</h2>
              <p className="text-gray-600 mb-6">
                Our platform integrates with popular e-mobility services like Yulu, Zypp, Epick, and Eveez to help you find the nearest available electric rides.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <Leaf className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">Real-time availability and battery status</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <Leaf className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">Compare prices across different providers</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <Leaf className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">Filter by ride type (bike, scooter, car)</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <Leaf className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">Book directly through our platform</span>
                </li>
              </ul>
              <Link href="/nearby-e-rides">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Explore Nearby E-Rides
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-xl overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1591291621164-2c6367723315?w=500&auto=format&fit=crop&q=80" 
                  alt="Electric bike" 
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1572162522099-7a2c3ade528b?w=500&auto=format&fit=crop&q=80" 
                  alt="Electric scooter" 
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1593765087349-f9633c33e271?w=500&auto=format&fit=crop&q=80" 
                  alt="Electric car" 
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1598818384697-45c381469441?w=500&auto=format&fit=crop&q=80" 
                  alt="Electric mobility" 
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 to-green-900 py-16 px-4 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Your Commute Greener?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-200">
            Join thousands of users who are reducing their carbon footprint with EcoCommute+.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-green-900 hover:bg-gray-100">
                Sign Up Now
              </Button>
            </Link>
            <Link href="/nearby-e-rides">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explore E-Rides
                <Bike className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

