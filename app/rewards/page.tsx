"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Trophy, Leaf, Star, Gift, Award, Users, ChevronDown, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import LoginModal from "@/components/login-modal"
import SignupModal from "@/components/signup-modal"

export default function RewardsPage() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const { user, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState("leaderboard")

  // Sample leaderboard data
  const leaderboardData = [
    { id: 1, name: "Rahul Sharma", points: 1250, co2Saved: "125kg", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: "Priya Patel", points: 980, co2Saved: "98kg", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, name: "Amit Kumar", points: 870, co2Saved: "87kg", avatar: "https://randomuser.me/api/portraits/men/67.jpg" },
    { id: 4, name: "Neha Singh", points: 760, co2Saved: "76kg", avatar: "https://randomuser.me/api/portraits/women/17.jpg" },
    { id: 5, name: "Vikram Mehta", points: 650, co2Saved: "65kg", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
    { id: 6, name: "Ananya Gupta", points: 540, co2Saved: "54kg", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
    { id: 7, name: "Rajesh Khanna", points: 430, co2Saved: "43kg", avatar: "https://randomuser.me/api/portraits/men/42.jpg" },
    { id: 8, name: "Meera Reddy", points: 320, co2Saved: "32kg", avatar: "https://randomuser.me/api/portraits/women/63.jpg" }
  ]

  // Sample rewards data
  const rewardsData = [
    { 
      id: 1, 
      title: "Free Metro Pass (1 Day)", 
      points: 200, 
      category: "transport",
      image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=150&auto=format&fit=crop",
      description: "Get a free one-day pass for unlimited metro rides in Delhi NCR."
    },
    { 
      id: 2, 
      title: "50% Off Bike Sharing", 
      points: 150, 
      category: "transport",
      image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=150&auto=format&fit=crop",
      description: "Enjoy 50% off on your next bike sharing ride (up to 60 minutes)."
    },
    { 
      id: 3, 
      title: "Eco-Friendly Water Bottle", 
      points: 300, 
      category: "merchandise",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=150&auto=format&fit=crop",
      description: "Stylish stainless steel water bottle with EcoCommute+ logo."
    },
    { 
      id: 4, 
      title: "Plant a Tree in Your Name", 
      points: 500, 
      category: "impact",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=150&auto=format&fit=crop",
      description: "We'll plant a tree in your name and send you the certificate."
    },
    { 
      id: 5, 
      title: "Coffee Shop Voucher", 
      points: 250, 
      category: "food",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=150&auto=format&fit=crop",
      description: "₹200 voucher for any participating eco-friendly coffee shop."
    },
    { 
      id: 6, 
      title: "Electric Car Ride (30 min)", 
      points: 400, 
      category: "transport",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba53b0998?q=80&w=150&auto=format&fit=crop",
      description: "Free 30-minute ride in an electric car sharing service."
    }
  ]

  // Sample badges data
  const badgesData = [
    { id: 1, name: "Green Starter", icon: <Leaf className="h-8 w-8 text-[#00aa55]" />, description: "Complete your first green commute", earned: true },
    { id: 2, name: "Carbon Cutter", icon: <Award className="h-8 w-8 text-[#00aa55]" />, description: "Save 10kg of CO2 emissions", earned: true },
    { id: 3, name: "Public Transit Pro", icon: <Users className="h-8 w-8 text-[#00aa55]" />, description: "Use public transit 10 times", earned: true },
    { id: 4, name: "Bike Enthusiast", icon: <Award className="h-8 w-8 text-[#00aa55]" />, description: "Complete 5 bike sharing rides", earned: false },
    { id: 5, name: "Ride Sharing Champion", icon: <Users className="h-8 w-8 text-[#00aa55]" />, description: "Share 10 rides with others", earned: false },
    { id: 6, name: "Green Warrior", icon: <Trophy className="h-8 w-8 text-[#00aa55]" />, description: "Save 100kg of CO2 emissions", earned: false }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a2540] to-[#1b1b1b] text-white">
      <div className="container py-8">
        <div className="flex items-center mb-8">
          <Link href="/landing" className="flex items-center text-sm text-gray-400 hover:text-[#00aa55] transition-colors mr-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-white">Rewards & Gamification</h1>
        </div>

        {/* User Stats */}
        <div className="bg-[#0a2540]/70 rounded-lg shadow-md p-6 border border-[#2a3a50] mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#00aa55]">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="User Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#00aa55] rounded-full p-1">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
              </div>
              <h2 className="mt-4 text-xl font-bold text-white">Rahul Sharma</h2>
              <p className="text-gray-300">Green Warrior</p>
            </div>
            
            <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0a2540] rounded-lg p-4 border border-[#2a3a50]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-300">Green Points</h3>
                  <Star className="h-5 w-5 text-[#00aa55]" />
                </div>
                <p className="text-3xl font-bold text-white">1,250</p>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">Next Reward: 1,500</p>
                  <Progress value={83} className="h-2 mt-1 bg-[#2a3a50]" />
                </div>
              </div>
              
              <div className="bg-[#0a2540] rounded-lg p-4 border border-[#2a3a50]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-300">CO₂ Saved</h3>
                  <Leaf className="h-5 w-5 text-[#00aa55]" />
                </div>
                <p className="text-3xl font-bold text-white">125 kg</p>
                <p className="text-sm text-gray-400 mt-2">Equivalent to planting 6 trees</p>
              </div>
              
              <div className="bg-[#0a2540] rounded-lg p-4 border border-[#2a3a50]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-300">Badges Earned</h3>
                  <Award className="h-5 w-5 text-[#00aa55]" />
                </div>
                <p className="text-3xl font-bold text-white">3/6</p>
                <p className="text-sm text-gray-400 mt-2">Next: Bike Enthusiast</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="leaderboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 bg-[#0a2540] border border-[#2a3a50]">
            <TabsTrigger 
              value="leaderboard" 
              className="data-[state=active]:bg-[#00aa55] data-[state=active]:text-white"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger 
              value="rewards" 
              className="data-[state=active]:bg-[#00aa55] data-[state=active]:text-white"
            >
              <Gift className="h-4 w-4 mr-2" />
              Rewards
            </TabsTrigger>
            <TabsTrigger 
              value="badges" 
              className="data-[state=active]:bg-[#00aa55] data-[state=active]:text-white"
            >
              <Award className="h-4 w-4 mr-2" />
              Badges
            </TabsTrigger>
          </TabsList>
          
          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="bg-[#0a2540]/70 rounded-lg shadow-md p-6 border border-[#2a3a50]">
              <h2 className="text-xl font-bold mb-4 text-white">Top Green Commuters</h2>
              <div className="space-y-4">
                {leaderboardData.map((user, index) => (
                  <div 
                    key={user.id} 
                    className={`flex items-center justify-between p-4 rounded-lg border ${index < 3 ? 'border-[#00aa55]/50 bg-[#0a2540]' : 'border-[#2a3a50] bg-[#0a2540]/50'}`}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center font-bold mr-4">
                        {index === 0 && <Trophy className="h-6 w-6 text-yellow-500" />}
                        {index === 1 && <Trophy className="h-6 w-6 text-gray-400" />}
                        {index === 2 && <Trophy className="h-6 w-6 text-amber-700" />}
                        {index > 2 && <span className="text-gray-400">{index + 1}</span>}
                      </div>
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{user.name}</h3>
                        <p className="text-sm text-gray-400">CO₂ Saved: {user.co2Saved}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-[#00aa55] mr-2" />
                      <span className="font-bold text-white">{user.points}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="bg-[#0a2540]/70 rounded-lg shadow-md p-6 border border-[#2a3a50]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Available Rewards</h2>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-[#00aa55] mr-2" />
                  <span className="font-bold text-white">1,250 points available</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewardsData.map((reward) => (
                  <div key={reward.id} className="bg-[#0a2540] rounded-lg border border-[#2a3a50] overflow-hidden hover:border-[#00aa55]/50 transition-all">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={reward.image} 
                        alt={reward.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-white">{reward.title}</h3>
                        <Badge className="bg-[#00aa55] text-white">{reward.points} pts</Badge>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">{reward.description}</p>
                      <Button 
                        className={`w-full ${reward.points <= 1250 ? 'bg-[#00aa55] hover:bg-[#008844]' : 'bg-gray-700 cursor-not-allowed'} text-white`}
                        disabled={reward.points > 1250}
                      >
                        {reward.points <= 1250 ? 'Redeem Reward' : 'Not Enough Points'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <div className="bg-[#0a2540]/70 rounded-lg shadow-md p-6 border border-[#2a3a50]">
              <h2 className="text-xl font-bold mb-6 text-white">Your Badges</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badgesData.map((badge) => (
                  <div 
                    key={badge.id} 
                    className={`p-6 rounded-lg border ${badge.earned ? 'border-[#00aa55]/50 bg-[#0a2540]' : 'border-[#2a3a50] bg-[#0a2540]/50 opacity-70'} flex flex-col items-center text-center`}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${badge.earned ? 'bg-[#00aa55]/20' : 'bg-gray-800'}`}>
                      {badge.icon}
                    </div>
                    <h3 className="font-bold text-white mb-2">{badge.name}</h3>
                    <p className="text-sm text-gray-300 mb-4">{badge.description}</p>
                    {badge.earned ? (
                      <Badge className="bg-[#00aa55] text-white">Earned</Badge>
                    ) : (
                      <Badge className="bg-gray-700 text-gray-300">In Progress</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#2a3a50] py-6 md:py-0 bg-[#0a2540]">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Leaf className="h-6 w-6 text-[#00aa55]" />
            <p className="text-center text-sm leading-loose text-gray-400 md:text-left">
              © {new Date().getFullYear()} Green Commute Planner. All rights reserved.
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