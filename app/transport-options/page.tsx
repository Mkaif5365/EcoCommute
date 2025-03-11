"use client"

import { useState } from "react"
import { ArrowLeft, Bus, Car, Train, MapPin, Leaf, Clock, Calendar, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import LoginModal from "@/components/login-modal"
import SignupModal from "@/components/signup-modal"
import MapplsMap from "@/components/mappls-map"

// Add window.mappls type definition
declare global {
  interface Window {
    mappls: any;
  }
}

export default function TransportOptionsPage() {
  const { user, isAuthenticated } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const apiKey = 'a6f5b905587a2e6ff31e4127f881783f' // Hardcoded API key for testing
  
  // Sample transport options data
  const transportOptions = [
    {
      id: 1,
      type: "Bus",
      icon: Bus,
      route: "DTC Route 423",
      from: "Connaught Place",
      to: "Nehru Place",
      departureTime: "10:00 AM",
      arrivalTime: "10:45 AM",
      price: "₹20",
      co2: "0.8 kg",
      position: [28.63, 77.22]
    },
    {
      id: 2,
      type: "Metro",
      icon: Train,
      route: "Blue Line",
      from: "Rajiv Chowk",
      to: "Noida Sector 62",
      departureTime: "10:15 AM",
      arrivalTime: "11:00 AM",
      price: "₹40",
      co2: "0.3 kg",
      position: [28.65, 77.23]
    },
    {
      id: 3,
      type: "Cab",
      icon: Car,
      route: "Direct",
      from: "Lajpat Nagar",
      to: "Gurugram Cyber City",
      departureTime: "10:30 AM",
      arrivalTime: "11:30 AM",
      price: "₹350",
      co2: "2.1 kg",
      position: [28.57, 77.24]
    }
  ]

  // Define different transport options with locations
  const busStops = [
    { position: [28.6139, 77.2090] as [number, number], title: "New Delhi Bus Stop" },
    { position: [28.6304, 77.2177] as [number, number], title: "ISBT Kashmere Gate" },
    { position: [28.5700, 77.1700] as [number, number], title: "South Delhi Bus Terminal" },
  ]
  
  const metroStations = [
    { position: [28.6181, 77.2272] as [number, number], title: "Chandni Chowk Metro" },
    { position: [28.6425, 77.0879] as [number, number], title: "Dwarka Metro" },
    { position: [28.5709, 77.3220] as [number, number], title: "Noida Metro" },
    { position: [28.6430, 77.0850] as [number, number], title: "Metro Interchange" },
  ]
  
  const trainStations = [
    { position: [28.6139, 77.2090] as [number, number], title: "New Delhi Railway Station" },
    { position: [28.6420, 77.2175] as [number, number], title: "Old Delhi Railway Station" },
    { position: [28.5828, 77.2295] as [number, number], title: "Hazrat Nizamuddin Railway Station" },
  ]
  
  // Combine all markers for the map
  const allTransportMarkers = [...busStops, ...metroStations, ...trainStations]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a2540] to-[#1b1b1b] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#2a3a50] bg-[#0a2540]/90 backdrop-blur supports-[backdrop-filter]:bg-[#0a2540]/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{user?.name}</span>
                <div className="h-8 w-8 rounded-full bg-[#00aa55] flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{user?.name?.charAt(0)}</span>
                </div>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-white hover:bg-[#2a3a50]"
                  onClick={() => setShowLoginModal(true)}
                >
                  Log in
                </Button>
                <Button 
                  className="bg-[#00aa55] text-white hover:bg-[#00aa55]/80"
                  onClick={() => setShowSignupModal(true)}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-8 md:py-12 lg:py-16">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Transport Options
            </h1>
            <p className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
              Find the most eco-friendly way to travel around the city.
            </p>
          </div>
          
          {/* Search Form */}
          <div className="mx-auto mt-8 max-w-[58rem] rounded-lg border border-[#2a3a50] bg-[#0f1729] p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">From</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Enter location" 
                    className="w-full rounded-md border border-[#2a3a50] bg-[#0a2540] px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00aa55] focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">To</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Enter destination" 
                    className="w-full rounded-md border border-[#2a3a50] bg-[#0a2540] px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00aa55] focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    className="w-full rounded-md border border-[#2a3a50] bg-[#0a2540] px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00aa55] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-[#00aa55] hover:bg-[#00aa55]/80">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <section className="container py-8 md:py-12">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
                Transport Hub Map
              </h2>
              <p className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
                Explore all available transport options across Delhi NCR
              </p>
            </div>
            <div className="mx-auto mt-8 flex max-w-[68rem] items-center justify-center">
              <MapplsMap 
                center={[28.6181, 77.2272]} // Chandni Chowk area
                zoom={12}
                height="600px"
                markers={allTransportMarkers}
                className="shadow-xl rounded-xl"
              />
            </div>
          </section>
          
          {/* Map and Results Grid */}
          <div className="mx-auto mt-8 grid max-w-[58rem] gap-8 md:grid-cols-[1fr_300px]">
            {/* Map */}
            <MapplsMap 
              apiKey={apiKey}
              center={[28.61, 77.23]}
              zoom={12}
              height="500px"
              markers={transportOptions.map(option => ({
                position: option.position as [number, number],
                title: `${option.type}: ${option.route}`,
                draggable: false
              }))}
              className="shadow-lg"
            />
            
            {/* Results List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Available Options</h2>
              {transportOptions.map(option => (
                <div key={option.id} className="bg-[#0f1729] rounded-lg border border-[#2a3a50] p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#00aa55]/20 flex items-center justify-center">
                      <option.icon className="h-5 w-5 text-[#00aa55]" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">{option.type}: {option.route}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">From:</span>
                          <span className="ml-2 text-white">{option.from}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">To:</span>
                          <span className="ml-2 text-white">{option.to}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Departure:</span>
                          <span className="ml-2 text-white">{option.departureTime}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Arrival:</span>
                          <span className="ml-2 text-white">{option.arrivalTime}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">CO2:</span>
                          <span className="ml-2 text-white">{option.co2}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Price:</span>
                          <span className="ml-2 font-bold text-[#00aa55]">{option.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button className="bg-[#00aa55] hover:bg-[#00aa55]/80">
                      Select
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onSignupClick={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />
      )}

      {/* Signup Modal */}
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
  );
} 