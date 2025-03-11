"use client"

import { useState } from "react"
import Link from "next/link"
import MapplsMap from "@/components/mappls-map"

export default function MapTestPage() {
  const apiKey = 'a6f5b905587a2e6ff31e4127f881783f' // Hardcoded API key for testing
  const [selectedLocation, setSelectedLocation] = useState<string>("delhi")
  
  // Define different locations to showcase
  const locations = {
    delhi: {
      center: [28.6139, 77.2090] as [number, number],
      zoom: 12,
      title: "Delhi",
      markers: [
        { position: [28.6139, 77.2090] as [number, number], title: "New Delhi Railway Station", draggable: false },
        { position: [28.6181, 77.2272] as [number, number], title: "Chandni Chowk", draggable: false },
      ]
    },
    mumbai: {
      center: [19.0760, 72.8777] as [number, number],
      zoom: 12,
      title: "Mumbai",
      markers: [
        { position: [19.0760, 72.8777] as [number, number], title: "Mumbai Central", draggable: false },
        { position: [19.0895, 72.8656] as [number, number], title: "Bandra", draggable: false },
      ]
    },
    bangalore: {
      center: [12.9716, 77.5946] as [number, number],
      zoom: 12,
      title: "Bangalore",
      markers: [
        { position: [12.9716, 77.5946] as [number, number], title: "Majestic", draggable: false },
        { position: [12.9352, 77.6245] as [number, number], title: "Koramangala", draggable: false },
      ]
    },
    chennai: {
      center: [13.0827, 80.2707] as [number, number],
      zoom: 12,
      title: "Chennai",
      markers: [
        { position: [13.0827, 80.2707] as [number, number], title: "Chennai Central", draggable: false },
        { position: [13.0569, 80.2425] as [number, number], title: "T Nagar", draggable: false },
      ]
    }
  }
  
  // Get current location data
  const currentLocation = locations[selectedLocation as keyof typeof locations]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a2540] to-[#1b1b1b] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#2a3a50] bg-[#0a2540]/90 backdrop-blur supports-[backdrop-filter]:bg-[#0a2540]/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-white">
              Back to Home
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-8 md:py-12 lg:py-16">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Map Test Page
            </h1>
            <p className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
              This page is used to test the Mappls API integration.
            </p>
            
            <div className="w-full max-w-2xl rounded-lg border border-[#2a3a50] bg-[#0f1729] p-4">
              <h2 className="mb-2 text-xl font-semibold">API Information</h2>
              <p className="mb-1"><strong>API Key:</strong> {apiKey ? `${apiKey.substring(0, 8)}...` : 'Not found'}</p>
              <div className="mt-4">
                <a 
                  href="/simple-map-test.html" 
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
                >
                  Try Simple HTML Test
                </a>
              </div>
            </div>
            
            {/* Location selector */}
            <div className="mt-6 w-full max-w-2xl">
              <h2 className="mb-4 text-xl font-semibold">Select Location</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {Object.keys(locations).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={`rounded-md px-4 py-2 text-sm font-medium ${
                      selectedLocation === loc 
                        ? 'bg-[#00aa55] text-white' 
                        : 'bg-[#1f2937] text-gray-300 hover:bg-[#1f2937]/80'
                    }`}
                  >
                    {loc.charAt(0).toUpperCase() + loc.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mx-auto mt-8 flex max-w-[58rem] flex-col items-center justify-center">
            <h2 className="mb-4 text-2xl font-bold">{currentLocation.title}</h2>
            <MapplsMap 
              apiKey={apiKey}
              center={currentLocation.center}
              zoom={currentLocation.zoom}
              height="500px"
              markers={currentLocation.markers}
              className="shadow-lg w-full"
            />
            
            <div className="mt-6 w-full rounded-lg border border-[#2a3a50] bg-[#0f1729] p-4">
              <h3 className="mb-2 text-lg font-semibold">Location Information</h3>
              <p><strong>Center:</strong> {currentLocation.center.join(', ')}</p>
              <p><strong>Zoom Level:</strong> {currentLocation.zoom}</p>
              <p><strong>Markers:</strong> {currentLocation.markers.length}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 