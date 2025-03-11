"use client"

import { useState } from "react"
import { ArrowLeft, Car, ChevronDown, Leaf, Map, Users, Trophy, Clock, Calendar, Search, Filter, Plus, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import LoginModal from "@/components/login-modal"
import SignupModal from "@/components/signup-modal"
import MapplsMap from "@/components/mappls-map"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Add window.mappls type definition
declare global {
  interface Window {
    mappls: any;
  }
}

export default function RideSharingPage() {
  const { user, isAuthenticated } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [activeTab, setActiveTab] = useState("find")
  const [cabDetails, setCabDetails] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seats: "1",
    carType: "",
    price: "",
    description: ""
  })
  const apiKey = 'a6f5b905587a2e6ff31e4127f881783f' // Hardcoded API key for testing
  
  // Define ride sharing pickup and dropoff points
  const rideSharePoints = [
    { position: [28.6139, 77.2090] as [number, number], title: "Pickup: New Delhi Railway Station", draggable: true },
    { position: [28.5562, 77.1000] as [number, number], title: "Dropoff: IGI Airport", draggable: true },
  ]
  
  // Define popular ride sharing locations
  const popularLocations = [
    { position: [28.6304, 77.2177] as [number, number], title: "ISBT Kashmere Gate" },
    { position: [28.6181, 77.2272] as [number, number], title: "Chandni Chowk" },
    { position: [28.6129, 77.2295] as [number, number], title: "Red Fort" },
    { position: [28.5535, 77.2588] as [number, number], title: "Humayun's Tomb" },
  ]
  
  // Combine all markers
  const allRideShareMarkers = [...rideSharePoints, ...popularLocations]
  
  // Sample search results for available rides
  const searchResults = [
    {
      id: 1,
      name: "Rahul S.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.8,
      from: "New Delhi Railway Station",
      to: "IGI Airport",
      date: "Today",
      time: "14:30",
      seats: 2,
      carType: "Maruti Swift",
      price: "₹350",
      position: [28.6139, 77.2090] as [number, number]
    },
    {
      id: 2,
      name: "Priya M.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.9,
      from: "New Delhi Railway Station",
      to: "IGI Airport",
      date: "Today",
      time: "15:15",
      seats: 3,
      carType: "Honda City",
      price: "₹400",
      position: [28.6139, 77.2090] as [number, number]
    },
    {
      id: 3,
      name: "Amit K.",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 4.7,
      from: "New Delhi Railway Station",
      to: "IGI Airport",
      date: "Today",
      time: "16:00",
      seats: 1,
      carType: "Hyundai i20",
      price: "₹380",
      position: [28.6139, 77.2090] as [number, number]
    }
  ]

  // Handle cab details form change
  const handleCabDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCabDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setCabDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle cab share form submission
  const handleShareCabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a server
    alert("Your cab has been listed for sharing!");
    console.log("Cab details:", cabDetails);
  };

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
              Ride Sharing
            </h1>
            <p className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
              Find and share rides with people going your way.
            </p>
          </div>
          
          {/* Tabs for Find/Share */}
          <div className="mx-auto mt-8 max-w-[58rem]">
            <Tabs defaultValue="find" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-[#0f1729] border border-[#2a3a50]">
                <TabsTrigger value="find" className="data-[state=active]:bg-[#00aa55]">
                  <Users className="mr-2 h-4 w-4" />
                  Find a Ride
                </TabsTrigger>
                <TabsTrigger value="share" className="data-[state=active]:bg-[#00aa55]">
                  <Car className="mr-2 h-4 w-4" />
                  Share Your Cab
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="find">
                {/* Search Form */}
                <div className="rounded-lg border border-[#2a3a50] bg-[#0f1729] p-6">
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
              </TabsContent>
              
              <TabsContent value="share">
                {/* Share Your Cab Form */}
                <div className="rounded-lg border border-[#2a3a50] bg-[#0f1729] p-6">
                  <form onSubmit={handleShareCabSubmit}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">From</label>
                        <Input 
                          name="from"
                          value={cabDetails.from}
                          onChange={handleCabDetailsChange}
                          placeholder="Enter pickup location" 
                          className="border-[#2a3a50] bg-[#0a2540] text-white placeholder-gray-500 focus:border-[#00aa55]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">To</label>
                        <Input 
                          name="to"
                          value={cabDetails.to}
                          onChange={handleCabDetailsChange}
                          placeholder="Enter destination" 
                          className="border-[#2a3a50] bg-[#0a2540] text-white placeholder-gray-500 focus:border-[#00aa55]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Date</label>
                        <Input 
                          name="date"
                          value={cabDetails.date}
                          onChange={handleCabDetailsChange}
                          type="date" 
                          className="border-[#2a3a50] bg-[#0a2540] text-white placeholder-gray-500 focus:border-[#00aa55]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Time</label>
                        <Input 
                          name="time"
                          value={cabDetails.time}
                          onChange={handleCabDetailsChange}
                          type="time" 
                          className="border-[#2a3a50] bg-[#0a2540] text-white placeholder-gray-500 focus:border-[#00aa55]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Available Seats</label>
                        <Select 
                          value={cabDetails.seats} 
                          onValueChange={(value) => handleSelectChange("seats", value)}
                        >
                          <SelectTrigger className="border-[#2a3a50] bg-[#0a2540] text-white">
                            <SelectValue placeholder="Select seats" />
                          </SelectTrigger>
                          <SelectContent className="border-[#2a3a50] bg-[#0a2540] text-white">
                            <SelectItem value="1">1 seat</SelectItem>
                            <SelectItem value="2">2 seats</SelectItem>
                            <SelectItem value="3">3 seats</SelectItem>
                            <SelectItem value="4">4 seats</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Car Type</label>
                        <Input 
                          name="carType"
                          value={cabDetails.carType}
                          onChange={handleCabDetailsChange}
                          placeholder="e.g. Maruti Swift, Honda City" 
                          className="border-[#2a3a50] bg-[#0a2540] text-white placeholder-gray-500 focus:border-[#00aa55]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Price per Person</label>
                        <Input 
                          name="price"
                          value={cabDetails.price}
                          onChange={handleCabDetailsChange}
                          placeholder="e.g. ₹350" 
                          className="border-[#2a3a50] bg-[#0a2540] text-white placeholder-gray-500 focus:border-[#00aa55]"
                          required
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-300">Additional Information</label>
                        <Textarea 
                          name="description"
                          value={cabDetails.description}
                          onChange={handleCabDetailsChange}
                          placeholder="Add any details about your ride, luggage space, etc." 
                          className="border-[#2a3a50] bg-[#0a2540] text-white placeholder-gray-500 focus:border-[#00aa55]"
                          rows={3}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex flex-col space-y-4">
                      <div className="rounded-md bg-[#00aa55]/10 p-4 border border-[#00aa55]/30">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <Info className="h-5 w-5 text-[#00aa55]" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-[#00aa55]">Important Information</h3>
                            <div className="mt-2 text-sm text-gray-300">
                              <p>
                                By sharing your cab, you agree to our terms and conditions. You are responsible for the safety of your passengers and must follow all traffic rules.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full bg-[#00aa55] hover:bg-[#00aa55]/80">
                        <Plus className="mr-2 h-4 w-4" />
                        List Your Cab
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Map Section - Only show for Find a Ride tab */}
          {activeTab === "find" && (
            <section className="container py-8 md:py-12 w-full">
              <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
                  Find Shared Rides
                </h2>
                <p className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
                  Drag the markers to set your pickup and dropoff locations
                </p>
              </div>
              
              {/* Map and Results Grid */}
              <div className="mx-auto mt-8 grid max-w-[68rem] gap-8 md:grid-cols-[1fr_350px]">
                {/* Map */}
                <MapplsMap 
                  center={[28.6139, 77.2090]} // New Delhi Railway Station
                  zoom={13}
                  height="600px"
                  markers={allRideShareMarkers}
                  className="shadow-xl rounded-xl"
                />
                
                {/* Results List */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white">Available Rides</h2>
                  {searchResults.map(ride => (
                    <div key={ride.id} className="bg-[#0f1729] rounded-lg border border-[#2a3a50] p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-full">
                          <img 
                            src={ride.avatar} 
                            alt={ride.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-white">{ride.name}</h3>
                            <div className="flex items-center">
                              <span className="text-yellow-500">★</span>
                              <span className="ml-1 text-white">{ride.rating}</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div>
                              <span className="text-gray-400">From:</span>
                              <span className="ml-2 text-white">{ride.from}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">To:</span>
                              <span className="ml-2 text-white">{ride.to}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">When:</span>
                              <span className="ml-2 text-white">{ride.date}, {ride.time}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Seats:</span>
                              <span className="ml-2 text-white">{ride.seats} available</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Car:</span>
                              <span className="ml-2 text-white">{ride.carType}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Price:</span>
                              <span className="ml-2 font-bold text-[#00aa55]">{ride.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button className="bg-[#00aa55] hover:bg-[#00aa55]/80">
                          Book Ride
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mx-auto mt-8 max-w-[58rem]">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg border border-[#2a3a50] bg-[#0f1729] p-6">
                    <h3 className="mb-4 text-xl font-semibold">Pickup Location</h3>
                    <p className="text-muted-foreground">New Delhi Railway Station</p>
                    <p className="mt-2 text-sm text-muted-foreground">Drag the marker on the map to change</p>
                  </div>
                  <div className="rounded-lg border border-[#2a3a50] bg-[#0f1729] p-6">
                    <h3 className="mb-4 text-xl font-semibold">Dropoff Location</h3>
                    <p className="text-muted-foreground">IGI Airport</p>
                    <p className="mt-2 text-sm text-muted-foreground">Drag the marker on the map to change</p>
                  </div>
                </div>
              </div>
            </section>
          )}
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