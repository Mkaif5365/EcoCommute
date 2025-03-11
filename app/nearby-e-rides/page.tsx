"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import MapplsMap from "@/components/mappls-map"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  Search, 
  MapPin, 
  Bike, 
  Zap, 
  Filter, 
  ChevronDown, 
  Battery, 
  Navigation, 
  Clock, 
  CreditCard,
  RefreshCw,
  Locate
} from "lucide-react"

// Define types for e-ride services
interface ERide {
  id: string;
  provider: string;
  logo: string;
  type: "bike" | "scooter" | "car";
  available: number;
  price: {
    currency: string;
    value: number;
    unit: string;
  };
  battery: number;
  distance: number;
  status: "available" | "low-battery" | "in-use";
  position: [number, number];
}

// Sample data for e-ride services
const sampleRides: ERide[] = [
  {
    id: "yulu-1",
    provider: "Yulu",
    logo: "/images/e-rides/yulu-logo.svg",
    type: "bike",
    available: 5,
    price: {
      currency: "₹",
      value: 3,
      unit: "per minute"
    },
    battery: 80,
    distance: 500,
    status: "available",
    position: [28.6139, 77.2090]
  },
  {
    id: "zypp-1",
    provider: "Zypp",
    logo: "/images/e-rides/zypp-logo.svg",
    type: "scooter",
    available: 3,
    price: {
      currency: "₹",
      value: 10,
      unit: "per km"
    },
    battery: 65,
    distance: 800,
    status: "available",
    position: [28.6150, 77.2100]
  },
  {
    id: "epick-1",
    provider: "Epick",
    logo: "/images/e-rides/epick-logo.svg",
    type: "car",
    available: 2,
    price: {
      currency: "₹",
      value: 15,
      unit: "per km"
    },
    battery: 90,
    distance: 1200,
    status: "available",
    position: [28.6160, 77.2110]
  },
  {
    id: "eveez-1",
    provider: "Eveez",
    logo: "/images/e-rides/eveez-logo.svg",
    type: "scooter",
    available: 4,
    price: {
      currency: "₹",
      value: 8,
      unit: "per km"
    },
    battery: 45,
    distance: 650,
    status: "low-battery",
    position: [28.6145, 77.2095]
  },
  {
    id: "yulu-2",
    provider: "Yulu",
    logo: "/images/e-rides/yulu-logo.svg",
    type: "bike",
    available: 2,
    price: {
      currency: "₹",
      value: 3,
      unit: "per minute"
    },
    battery: 75,
    distance: 950,
    status: "available",
    position: [28.6135, 77.2085]
  },
  {
    id: "bounce-1",
    provider: "Bounce",
    logo: "/images/e-rides/bounce-logo.svg",
    type: "scooter",
    available: 6,
    price: {
      currency: "₹",
      value: 5,
      unit: "per km"
    },
    battery: 85,
    distance: 750,
    status: "available",
    position: [28.6155, 77.2105]
  }
];

// Custom badge component to avoid type issues
const StatusBadge = ({ status }: { status: "available" | "low-battery" | "in-use" }) => {
  const getVariantClass = () => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "low-battery":
        return "bg-amber-100 text-amber-800";
      case "in-use":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getVariantClass()}`}>
      {status === 'available' ? 'Available' : status === 'low-battery' ? 'Low Battery' : 'In Use'}
    </div>
  );
};

export default function NearbyERidesPage() {
  const [userLocation, setUserLocation] = useState<[number, number]>([28.6139, 77.2090]); // Default to Delhi
  const [rides, setRides] = useState<ERide[]>(sampleRides);
  const [filteredRides, setFilteredRides] = useState<ERide[]>(sampleRides);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20]);
  const [isLoading, setIsLoading] = useState(false);
  const [mapInstance, setMapInstance] = useState<any>(null);
  
  // Function to handle map load
  const handleMapLoad = (map: any) => {
    setMapInstance(map);
    console.log("Map loaded successfully");
  };
  
  // Function to get user's current location
  const getUserLocation = () => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          
          // Center map on user location
          if (mapInstance) {
            mapInstance.setCenter([latitude, longitude]);
          }
          
          // Recalculate distances
          const updatedRides = rides.map(ride => {
            // Simple distance calculation (this would be more complex in a real app)
            const distance = Math.sqrt(
              Math.pow(latitude - ride.position[0], 2) + 
              Math.pow(longitude - ride.position[1], 2)
            ) * 111000; // Rough conversion to meters
            
            return {
              ...ride,
              distance: Math.round(distance)
            };
          });
          
          setRides(updatedRides);
          applyFilters(updatedRides, searchQuery, selectedType, priceRange);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
          alert("Could not get your location. Please check your browser permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setIsLoading(false);
    }
  };
  
  // Function to apply filters
  const applyFilters = (
    ridesData: ERide[], 
    query: string, 
    type: string | null, 
    prices: [number, number]
  ) => {
    let filtered = ridesData;
    
    // Apply search query filter
    if (query) {
      filtered = filtered.filter(ride => 
        ride.provider.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply type filter
    if (type) {
      filtered = filtered.filter(ride => ride.type === type);
    }
    
    // Apply price filter
    filtered = filtered.filter(ride => 
      ride.price.value >= prices[0] && ride.price.value <= prices[1]
    );
    
    setFilteredRides(filtered);
  };
  
  // Effect to apply filters when any filter changes
  useEffect(() => {
    applyFilters(rides, searchQuery, selectedType, priceRange);
  }, [searchQuery, selectedType, priceRange]);
  
  // Function to refresh ride data
  const refreshRides = () => {
    setIsLoading(true);
    
    // In a real app, this would fetch from an API
    // For demo, we'll just simulate a delay and randomize some values
    setTimeout(() => {
      const updatedRides = rides.map(ride => ({
        ...ride,
        available: Math.max(1, Math.floor(Math.random() * 8)),
        battery: Math.floor(Math.random() * 50) + 50, // 50-100%
        status: Math.random() > 0.8 ? "low-battery" as const : "available" as const
      }));
      
      setRides(updatedRides);
      applyFilters(updatedRides, searchQuery, selectedType, priceRange);
      setIsLoading(false);
    }, 1000);
  };
  
  // Prepare markers for the map
  const mapMarkers = filteredRides.map(ride => ({
    position: ride.position,
    title: `${ride.provider} - ${ride.available} available`,
    draggable: false
  }));
  
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a2540] to-[#1b1b1b] text-white pt-8">
      {/* Hero Section with Search & Filters */}
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-[#0a2540] to-[#00aa55]/30 rounded-xl p-6 mb-8 shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-2">Nearby E-Rides</h1>
          <p className="text-gray-200 mb-6">Find and book electric rides near you for sustainable urban commuting</p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search by provider or location..."
                className="pl-10 bg-white/10 text-white border-white/20 focus:border-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-300" />
            </div>
            
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={getUserLocation}
            >
              <Locate className="mr-2 h-4 w-4" />
              Use My Location
            </Button>
            
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={refreshRides}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Filters</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white"
                onClick={() => {
                  setSelectedType(null);
                  setPriceRange([0, 20]);
                  setSearchQuery("");
                }}
              >
                Reset
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-300 text-sm mb-2">Ride Type</p>
                <div className="flex gap-2">
                  <Button 
                    variant={selectedType === "bike" ? "default" : "outline"}
                    size="sm"
                    className={selectedType === "bike" ? "bg-green-600" : "bg-white/10 border-white/20 text-white"}
                    onClick={() => setSelectedType(selectedType === "bike" ? null : "bike")}
                  >
                    <Bike className="mr-1 h-4 w-4" />
                    Bike
                  </Button>
                  <Button 
                    variant={selectedType === "scooter" ? "default" : "outline"}
                    size="sm"
                    className={selectedType === "scooter" ? "bg-green-600" : "bg-white/10 border-white/20 text-white"}
                    onClick={() => setSelectedType(selectedType === "scooter" ? null : "scooter")}
                  >
                    <Zap className="mr-1 h-4 w-4" />
                    Scooter
                  </Button>
                  <Button 
                    variant={selectedType === "car" ? "default" : "outline"}
                    size="sm"
                    className={selectedType === "car" ? "bg-green-600" : "bg-white/10 border-white/20 text-white"}
                    onClick={() => setSelectedType(selectedType === "car" ? null : "car")}
                  >
                    <Zap className="mr-1 h-4 w-4" />
                    Car
                  </Button>
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-2">
                <p className="text-gray-300 text-sm mb-2">Price Range (₹{priceRange[0]} - ₹{priceRange[1]})</p>
                <Slider
                  defaultValue={[0, 20]}
                  max={20}
                  step={1}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="py-4"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-[#2a3a50] bg-[#0a2540]/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center text-white">
                  <MapPin className="mr-2 h-5 w-5 text-[#00aa55]" />
                  E-Rides Near You
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {isLoading ? "Updating map..." : `Showing ${filteredRides.length} available rides`}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  <MapplsMap
                    center={userLocation}
                    zoom={14}
                    height="600px"
                    markers={mapMarkers}
                    onMapLoad={handleMapLoad}
                    className="rounded-b-lg"
                  />
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Ride List Section */}
          <div>
            <Card className="shadow-xl border-[#2a3a50] bg-[#0a2540]/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center text-white">
                  <Bike className="mr-2 h-5 w-5 text-[#00aa55]" />
                  Available E-Rides
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {filteredRides.length} rides within your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
                  {filteredRides.length > 0 ? (
                    filteredRides.map((ride) => (
                      <Card key={ride.id} className="overflow-hidden border-l-4 hover:shadow-md transition-shadow duration-200" style={{ borderLeftColor: ride.status === 'available' ? '#10b981' : '#f59e0b' }}>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                                <Image 
                                  src={ride.logo} 
                                  alt={`${ride.provider} logo`} 
                                  width={40} 
                                  height={40}
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold">{ride.provider} {ride.type.charAt(0).toUpperCase() + ride.type.slice(1)}</h3>
                                <div className="flex items-center text-sm text-gray-500">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{ride.distance}m away</span>
                                </div>
                              </div>
                            </div>
                            <StatusBadge status={ride.status} />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                            <div className="flex items-center">
                              <Bike className="h-4 w-4 mr-1 text-gray-500" />
                              <span>Available: <strong>{ride.available}</strong></span>
                            </div>
                            <div className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-1 text-gray-500" />
                              <span>{ride.price.currency}{ride.price.value} {ride.price.unit}</span>
                            </div>
                            <div className="flex items-center">
                              <Battery className="h-4 w-4 mr-1 text-gray-500" />
                              <span>Battery: <strong>{ride.battery}%</strong></span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-gray-500" />
                              <span>~{Math.round(ride.distance / 80)} min walk</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button className="flex-1 bg-green-600 hover:bg-green-700">
                              Reserve Now
                            </Button>
                            <Button variant="outline" className="flex-1">
                              <Navigation className="h-4 w-4 mr-1" />
                              Directions
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No rides found</h3>
                      <p className="text-gray-500 text-sm">Try adjusting your filters or search criteria</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Additional Information Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-[#2a3a50] bg-[#0a2540]/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#00aa55]/20 flex items-center justify-center mb-2">
                  <Locate className="h-6 w-6 text-[#00aa55]" />
                </div>
                <CardTitle className="text-white">Find Nearby</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Use your current location or search for a specific area to find available e-rides nearby. Filter by type, price, and availability.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-[#2a3a50] bg-[#0a2540]/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#00aa55]/20 flex items-center justify-center mb-2">
                  <CreditCard className="h-6 w-6 text-[#00aa55]" />
                </div>
                <CardTitle className="text-white">Book & Pay</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Reserve your ride directly through our platform. Payment is handled securely through the respective service provider's system.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-[#2a3a50] bg-[#0a2540]/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#00aa55]/20 flex items-center justify-center mb-2">
                  <Bike className="h-6 w-6 text-[#00aa55]" />
                </div>
                <CardTitle className="text-white">Ride & Return</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Enjoy your eco-friendly ride! Return the vehicle to any designated parking spot when you're done to help keep our cities organized.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 