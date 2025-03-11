"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Leaf, ArrowLeft, Search, Bike, Car, Bus, Filter, Clock, DollarSign, Leaf as LeafIcon, MapPin, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock transport options data
const transportOptions = [
  {
    id: 1,
    type: "bike",
    name: "Yulu Miracle",
    distance: 0.3,
    price: 20,
    priceUnit: "per 30 min",
    ecoRating: 5,
    available: 8,
    image: "/images/yulu-bike.jpg",
    location: "Block A, Hauz Khas"
  },
  {
    id: 2,
    type: "bike",
    name: "Yulu Move",
    distance: 0.5,
    price: 15,
    priceUnit: "per 30 min",
    ecoRating: 5,
    available: 5,
    image: "/images/yulu-move.jpg",
    location: "IIT Campus Gate"
  },
  {
    id: 3,
    type: "scooter",
    name: "Zypp Electric",
    distance: 0.7,
    price: 25,
    priceUnit: "per 30 min",
    ecoRating: 4,
    available: 3,
    image: "/images/zypp-scooter.jpg",
    location: "Green Park Metro Station"
  },
  {
    id: 4,
    type: "car",
    name: "Zoomcar EV",
    distance: 1.2,
    price: 120,
    priceUnit: "per hour",
    ecoRating: 4,
    available: 2,
    image: "/images/zoomcar-ev.jpg",
    location: "Hauz Khas Market"
  },
  {
    id: 5,
    type: "car",
    name: "Blu-Smart Electric",
    distance: 1.5,
    price: 150,
    priceUnit: "per hour",
    ecoRating: 4,
    available: 1,
    image: "/images/blusmart.jpg",
    location: "SDA Market"
  },
  {
    id: 6,
    type: "bus",
    name: "DTC Electric Bus",
    distance: 0.4,
    price: 10,
    priceUnit: "per trip",
    ecoRating: 4,
    available: "Every 15 min",
    image: "/images/dtc-bus.jpg",
    location: "IIT Delhi Bus Stop"
  },
  {
    id: 7,
    type: "bus",
    name: "Delhi Metro",
    distance: 0.8,
    price: 30,
    priceUnit: "per trip",
    ecoRating: 5,
    available: "Every 5 min",
    image: "/images/delhi-metro.jpg",
    location: "Hauz Khas Metro Station"
  }
];

export default function TransportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 150])
  const [ecoFilter, setEcoFilter] = useState(false)
  const [sortBy, setSortBy] = useState("distance") // distance, price, eco
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter and sort transport options
  const filteredOptions = transportOptions
    .filter(option => {
      // Filter by search query
      if (searchQuery && !option.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !option.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by type
      if (activeTab !== "all" && option.type !== activeTab) {
        return false;
      }
      
      // Filter by price range
      if (option.price < priceRange[0] || option.price > priceRange[1]) {
        return false;
      }
      
      // Filter by eco rating
      if (ecoFilter && option.ecoRating < 4) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "distance") {
        return a.distance - b.distance;
      } else if (sortBy === "price") {
        return a.price - b.price;
      } else if (sortBy === "eco") {
        return b.ecoRating - a.ecoRating;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a5540] to-[#1b1b1b] text-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1b1b1b]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#00aa55] rounded-full p-2">
              <Leaf className="h-5 w-5 text-[#0a2540]" />
            </div>
            <span className="font-bold text-xl text-[#00aa55]">EcoCommute+</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#transport" className="text-sm font-medium text-[#00aa55] transition-colors">
              Transport Options
            </Link>
            <Link href="/#ride-sharing" className="text-sm font-medium hover:text-[#00aa55] transition-colors">
              Ride Sharing
            </Link>
            <Link href="/#rewards" className="text-sm font-medium hover:text-[#00aa55] transition-colors">
              Rewards
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-[#00aa55] transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-[#00aa55] transition-colors">
              Contact
            </Link>
          </nav>

          <Link href="/">
            <Button variant="outline" className="border-[#00aa55] text-[#00aa55]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find <span className="text-[#00aa55]">Green Transport</span>
          </h1>
          <p className="text-xl text-gray-300">
            Discover eco-friendly transportation options near you
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="bg-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-xl border border-[#00aa55]/20 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#1b1b1b]/60 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#00aa55] focus:ring-[#00aa55]"
              />
            </div>
            <Button 
              variant="outline" 
              className="border-[#00aa55] text-[#00aa55] hover:bg-[#00aa55]/10"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <div className="flex gap-2">
              <Button 
                variant={sortBy === "distance" ? "default" : "outline"}
                className={sortBy === "distance" 
                  ? "bg-[#00aa55] text-[#0a2540] hover:bg-[#00aa55]/90" 
                  : "border-gray-700 text-gray-300 hover:border-[#00aa55] hover:text-[#00aa55]"}
                size="sm"
                onClick={() => setSortBy("distance")}
              >
                <Clock className="mr-2 h-4 w-4" />
                Nearest
              </Button>
              <Button 
                variant={sortBy === "price" ? "default" : "outline"}
                className={sortBy === "price" 
                  ? "bg-[#00aa55] text-[#0a2540] hover:bg-[#00aa55]/90" 
                  : "border-gray-700 text-gray-300 hover:border-[#00aa55] hover:text-[#00aa55]"}
                size="sm"
                onClick={() => setSortBy("price")}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Cheapest
              </Button>
              <Button 
                variant={sortBy === "eco" ? "default" : "outline"}
                className={sortBy === "eco" 
                  ? "bg-[#00aa55] text-[#0a2540] hover:bg-[#00aa55]/90" 
                  : "border-gray-700 text-gray-300 hover:border-[#00aa55] hover:text-[#00aa55]"}
                size="sm"
                onClick={() => setSortBy("eco")}
              >
                <LeafIcon className="mr-2 h-4 w-4" />
                Greenest
              </Button>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-700 pt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Price Range (₹)</h3>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      min={0}
                      max={200}
                      step={5}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Other Filters</h3>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="eco-filter"
                      checked={ecoFilter}
                      onCheckedChange={setEcoFilter}
                    />
                    <Label htmlFor="eco-filter" className="text-gray-300">Show only high eco-rating options</Label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-[#1b1b1b]/60 border border-gray-700 p-1">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-[#00aa55] data-[state=active]:text-[#0a2540]"
            >
              All Options
            </TabsTrigger>
            <TabsTrigger 
              value="bike" 
              className="data-[state=active]:bg-[#00aa55] data-[state=active]:text-[#0a2540]"
            >
              <Bike className="mr-2 h-4 w-4" />
              Bikes
            </TabsTrigger>
            <TabsTrigger 
              value="scooter" 
              className="data-[state=active]:bg-[#00aa55] data-[state=active]:text-[#0a2540]"
            >
              <Zap className="mr-2 h-4 w-4" />
              E-Scooters
            </TabsTrigger>
            <TabsTrigger 
              value="car" 
              className="data-[state=active]:bg-[#00aa55] data-[state=active]:text-[#0a2540]"
            >
              <Car className="mr-2 h-4 w-4" />
              Cars
            </TabsTrigger>
            <TabsTrigger 
              value="bus" 
              className="data-[state=active]:bg-[#00aa55] data-[state=active]:text-[#0a2540]"
            >
              <Bus className="mr-2 h-4 w-4" />
              Public Transit
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Transport Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#1b1b1b]/40 backdrop-blur-sm rounded-xl border border-[#00aa55]/20 shadow-lg overflow-hidden group hover:border-[#00aa55]/50 transition-all duration-300"
              >
                <div className="h-48 bg-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1b1b1b]/60">
                    {option.type === "bike" && <Bike className="h-16 w-16 text-[#00aa55]/50" />}
                    {option.type === "scooter" && <Zap className="h-16 w-16 text-[#00aa55]/50" />}
                    {option.type === "car" && <Car className="h-16 w-16 text-[#00aa55]/50" />}
                    {option.type === "bus" && <Bus className="h-16 w-16 text-[#00aa55]/50" />}
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-[#00aa55] text-[#0a2540]">
                      {Array(option.ecoRating).fill(0).map((_, i) => (
                        <LeafIcon key={i} className="h-3 w-3 inline-block" />
                      ))}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold">{option.name}</h3>
                    <div className="text-right">
                      <div className="text-[#00aa55] font-bold">₹{option.price}</div>
                      <div className="text-xs text-gray-400">{option.priceUnit}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-300 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    {option.location}
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                    <div>{option.distance} km away</div>
                    <div>{typeof option.available === 'number' ? `${option.available} available` : option.available}</div>
                  </div>
                  <Button className="w-full bg-[#00aa55] text-[#0a2540] hover:bg-[#00aa55]/90">
                    Book Now
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">No transport options found matching your criteria</div>
              <Button 
                variant="outline" 
                className="border-[#00aa55] text-[#00aa55]"
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                  setPriceRange([0, 150]);
                  setEcoFilter(false);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1b1b1b] border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Green Commute Planner. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 