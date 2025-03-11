"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Bus, Car, Train, MapPin, Leaf, Clock, Calendar, Search, Filter, Route } from "lucide-react"
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
    MapplsDirections: any;
  }
}

// Simple Map Placeholder Component as fallback
const MapPlaceholder = ({ height = '500px', markers = [] }: { height?: string, markers?: any[] }) => {
  return (
    <div 
      className="relative bg-[#1b1b1b] rounded-lg border border-[#2a3a50]"
      style={{ height }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 rounded-full bg-[#00aa55]/20 flex items-center justify-center mb-4">
          <MapPin className="h-8 w-8 text-[#00aa55]" />
        </div>
        <h3 className="text-xl font-bold mb-2">Map Placeholder</h3>
        <p className="text-gray-400 max-w-md">
          This is a placeholder for the map. In a production environment, this would display an interactive map with {markers.length} markers.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {markers.slice(0, 4).map((marker, index) => (
            <div key={index} className="bg-[#0a2540]/50 p-3 rounded-md border border-[#2a3a50]">
              <p className="font-medium">{marker.title || 'Location'}</p>
              <p className="text-sm text-gray-400">
                Lat: {marker.position[0].toFixed(4)}, Lng: {marker.position[1].toFixed(4)}
              </p>
            </div>
          ))}
          {markers.length > 4 && (
            <div className="bg-[#0a2540]/50 p-3 rounded-md border border-[#2a3a50]">
              <p className="font-medium">+ {markers.length - 4} more locations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function TransportOptionsPage() {
  const { user, isAuthenticated } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  
  // State for from and to locations
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")
  const [fromCoordinates, setFromCoordinates] = useState<[number, number] | null>(null)
  const [toCoordinates, setToCoordinates] = useState<[number, number] | null>(null)
  const [routeShown, setRouteShown] = useState(false)
  const [mapInstance, setMapInstance] = useState<any>(null)
  const [directionsInstance, setDirectionsInstance] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [activeInput, setActiveInput] = useState<'from' | 'to' | null>(null)
  
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

  // Function to handle map load
  const handleMapLoad = (map: any) => {
    setMapInstance(map);
    console.log("Map loaded successfully");
    setMapError(null);
  };

  // Function to handle map error
  const handleMapError = (error: any) => {
    console.error("Map error:", error);
    setMapError("Failed to load map. Using placeholder instead.");
  };

  // Function to search for a location
  const searchLocation = async (query: string) => {
    if (!query || query.length < 3) {
      setSearchResults([]);
      return;
    }
    
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call to Mappls Search API
      // For demo purposes, we'll simulate some results
      const simulatedResults = [
        { 
          placeName: "New Delhi Railway Station", 
          placeAddress: "New Delhi, Delhi", 
          coordinates: [28.6139, 77.2090] as [number, number] 
        },
        { 
          placeName: "Connaught Place", 
          placeAddress: "New Delhi, Delhi", 
          coordinates: [28.6289, 77.2074] as [number, number] 
        },
        { 
          placeName: "India Gate", 
          placeAddress: "New Delhi, Delhi", 
          coordinates: [28.6129, 77.2295] as [number, number] 
        },
        { 
          placeName: "Qutub Minar", 
          placeAddress: "Mehrauli, New Delhi", 
          coordinates: [28.5244, 77.1855] as [number, number] 
        },
        { 
          placeName: "Lotus Temple", 
          placeAddress: "Kalkaji, New Delhi", 
          coordinates: [28.5535, 77.2588] as [number, number] 
        }
      ].filter(item => 
        item.placeName.toLowerCase().includes(query.toLowerCase()) || 
        item.placeAddress.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(simulatedResults);
    } catch (error) {
      console.error("Error searching for location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to select a location from search results
  const selectLocation = (result: any) => {
    if (activeInput === 'from') {
      setFromLocation(result.placeName);
      setFromCoordinates(result.coordinates);
    } else if (activeInput === 'to') {
      setToLocation(result.placeName);
      setToCoordinates(result.coordinates);
    }
    
    setSearchResults([]);
    setActiveInput(null);
  };

  // Function to show route between from and to locations
  const showRoute = () => {
    if (!fromCoordinates || !toCoordinates) {
      alert("Please select both from and to locations");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // For demo purposes, we'll just set routeShown to true
      setRouteShown(true);
      
      // If we have a map instance, we can try to show the route on the map
      if (mapInstance) {
        // Clear previous route if any
        if (directionsInstance) {
          try {
            directionsInstance.remove();
          } catch (error) {
            console.error("Error removing previous route:", error);
          }
        }
        
        try {
          // Create a simple line between the two points
          const fromLatLng = { lat: fromCoordinates[0], lng: fromCoordinates[1] };
          const toLatLng = { lat: toCoordinates[0], lng: toCoordinates[1] };
          
          // Create a polyline between the two points
          const routeLine = new window.mappls.Polyline({
            map: mapInstance,
            path: [fromLatLng, toLatLng],
            strokeColor: '#00aa55',
            strokeOpacity: 0.8,
            strokeWeight: 5
          });
          
          // Add markers for from and to locations
          const fromMarker = new window.mappls.Marker({
            map: mapInstance,
            position: fromLatLng,
            title: fromLocation,
            icon: {
              url: 'https://apis.mapmyindia.com/map_v3/1.png',
              scaledSize: { width: 35, height: 35 }
            }
          });
          
          const toMarker = new window.mappls.Marker({
            map: mapInstance,
            position: toLatLng,
            title: toLocation,
            icon: {
              url: 'https://apis.mapmyindia.com/map_v3/2.png',
              scaledSize: { width: 35, height: 35 }
            }
          });
          
          // Store the directions instance for later removal
          setDirectionsInstance({
            remove: () => {
              try {
                routeLine.setMap(null);
                fromMarker.setMap(null);
                toMarker.setMap(null);
              } catch (error) {
                console.error("Error removing route elements:", error);
              }
            }
          });
          
          // Fit the map to show both markers
          const bounds = new window.mappls.LatLngBounds();
          bounds.extend(fromLatLng);
          bounds.extend(toLatLng);
          mapInstance.fitBounds(bounds, { padding: 100 });
        } catch (error) {
          console.error("Error creating route on map:", error);
        }
      }
      
      // Simulate a delay to show loading state
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error showing route:", error);
      alert("Error showing route. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a2540] to-[#1b1b1b] text-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/landing" className="inline-flex items-center text-[#00aa55] hover:text-[#00cc66]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-4">Find Transport Options</h1>
          <p className="text-gray-400 mt-2">Discover sustainable ways to get around the city</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-[#0a2540]/50 p-6 rounded-xl mb-8 border border-[#2a3a50]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="From" 
                className="w-full pl-10 pr-4 py-2 bg-[#1b1b1b] border border-[#2a3a50] rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00aa55]"
                value={fromLocation}
                onChange={(e) => {
                  setFromLocation(e.target.value);
                  searchLocation(e.target.value);
                }}
                onFocus={() => setActiveInput('from')}
              />
              {activeInput === 'from' && searchResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-[#1b1b1b] border border-[#2a3a50] rounded-md shadow-lg max-h-60 overflow-auto">
                  {searchResults.map((result, index) => (
                    <div 
                      key={index}
                      className="px-4 py-2 hover:bg-[#2a3a50] cursor-pointer"
                      onClick={() => selectLocation(result)}
                    >
                      <div className="font-medium">{result.placeName}</div>
                      <div className="text-sm text-gray-400">{result.placeAddress}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="To" 
                className="w-full pl-10 pr-4 py-2 bg-[#1b1b1b] border border-[#2a3a50] rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00aa55]"
                value={toLocation}
                onChange={(e) => {
                  setToLocation(e.target.value);
                  searchLocation(e.target.value);
                }}
                onFocus={() => setActiveInput('to')}
              />
              {activeInput === 'to' && searchResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-[#1b1b1b] border border-[#2a3a50] rounded-md shadow-lg max-h-60 overflow-auto">
                  {searchResults.map((result, index) => (
                    <div 
                      key={index}
                      className="px-4 py-2 hover:bg-[#2a3a50] cursor-pointer"
                      onClick={() => selectLocation(result)}
                    >
                      <div className="font-medium">{result.placeName}</div>
                      <div className="text-sm text-gray-400">{result.placeAddress}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input 
                type="datetime-local" 
                className="w-full pl-10 pr-4 py-2 bg-[#1b1b1b] border border-[#2a3a50] rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00aa55]"
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" className="border-[#2a3a50] text-gray-300 hover:bg-[#1b1b1b]">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button 
              className="bg-[#00aa55] hover:bg-[#00cc66] text-white"
              onClick={showRoute}
              disabled={!fromCoordinates || !toCoordinates || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Loading...
                </div>
              ) : (
                <>
                  <Route className="mr-2 h-4 w-4" />
                  Show Route
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Map and Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2 bg-[#0a2540]/50 rounded-xl border border-[#2a3a50] overflow-hidden">
            <div className="h-[500px]">
              {mapError ? (
                <MapPlaceholder 
                  height="500px"
                  markers={routeShown ? 
                    [
                      { position: fromCoordinates || [0, 0], title: fromLocation || "From" },
                      { position: toCoordinates || [0, 0], title: toLocation || "To" }
                    ] : 
                    allTransportMarkers
                  }
                />
              ) : (
                <MapplsMap 
                  center={[28.61, 77.23]}
                  zoom={12}
                  height="500px"
                  markers={routeShown ? [] : allTransportMarkers}
                  onMapLoad={handleMapLoad}
                  onError={handleMapError}
                />
              )}
            </div>
          </div>
          
          {/* Results */}
          <div className="bg-[#0a2540]/50 p-6 rounded-xl border border-[#2a3a50]">
            <h2 className="text-xl font-bold mb-4">Available Options</h2>
            <div className="space-y-4">
              {transportOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div key={option.id} className="bg-[#1b1b1b] p-4 rounded-lg border border-[#2a3a50] hover:border-[#00aa55] transition-colors">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-[#00aa55]/20 flex items-center justify-center mr-3">
                        <Icon className="h-5 w-5 text-[#00aa55]" />
                      </div>
                      <div>
                        <h3 className="font-bold">{option.type}</h3>
                        <p className="text-sm text-gray-400">{option.route}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className="text-xs text-gray-400">From</p>
                        <p className="text-sm">{option.from}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">To</p>
                        <p className="text-sm">{option.to}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Departure</p>
                        <p className="text-sm">{option.departureTime}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Arrival</p>
                        <p className="text-sm">{option.arrivalTime}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-lg font-bold text-[#00aa55]">{option.price}</span>
                        <span className="text-xs text-gray-400 ml-2">CO₂: {option.co2}</span>
                      </div>
                      <Button size="sm" className="bg-[#00aa55] hover:bg-[#00cc66] text-white">
                        Select
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Transport Types Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Sustainable Transport Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0a2540]/50 p-6 rounded-xl border border-[#2a3a50]">
              <div className="w-12 h-12 rounded-full bg-[#00aa55]/20 flex items-center justify-center mb-4">
                <Bus className="h-6 w-6 text-[#00aa55]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Public Transit</h3>
              <p className="text-gray-400">
                Buses, metros, and trains offer efficient mass transportation with lower carbon emissions per passenger.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-300">
                  <Leaf className="h-4 w-4 text-[#00aa55] mr-2" />
                  Reduces traffic congestion
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Leaf className="h-4 w-4 text-[#00aa55] mr-2" />
                  Lower cost per trip
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Leaf className="h-4 w-4 text-[#00aa55] mr-2" />
                  Reduced carbon footprint
                </li>
              </ul>
            </div>
            
            <div className="bg-[#0a2540]/50 p-6 rounded-xl border border-[#2a3a50]">
              <div className="w-12 h-12 rounded-full bg-[#00aa55]/20 flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-[#00aa55]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Shared Mobility</h3>
              <p className="text-gray-400">
                Carpooling and ride-sharing services help reduce the number of vehicles on the road.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-300">
                  <Leaf className="h-4 w-4 text-[#00aa55] mr-2" />
                  Share costs with other passengers
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Leaf className="h-4 w-4 text-[#00aa55] mr-2" />
                  Convenient door-to-door service
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Leaf className="h-4 w-4 text-[#00aa55] mr-2" />
                  Reduced emissions per passenger
                </li>
              </ul>
            </div>
            
            <div className="bg-[#0a2540]/50 p-6 rounded-xl border border-[#2a3a50]">
              <div className="w-12 h-12 rounded-full bg-[#00aa55]/20 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-[#00aa55]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-Modal</h3>
              <p className="text-gray-400">
                Combine different transport modes for the most efficient and sustainable journey.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-300">
                  <Leaf className="h-4 w-4 text-[#00aa55] mr-2" />
                  Optimized for efficiency
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Leaf className="h-4 w-4 text-[#00aa55] mr-2" />
                  Flexible transportation options
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Leaf className="h-4 w-4 text-[#00aa55] mr-2" />
                  Balanced between time and sustainability
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

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