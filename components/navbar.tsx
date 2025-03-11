"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  Info, 
  Phone, 
  Bus, 
  Users, 
  Award, 
  Menu, 
  X, 
  Bike,
  LogIn
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/lib/auth-context"

const navLinks = [
  { name: "Home", href: "/landing", icon: Home },
  { name: "Transport Options", href: "/transport-options", icon: Bus },
  { name: "Ride Sharing", href: "/ride-sharing", icon: Users },
  { name: "Nearby E-Rides", href: "/nearby-e-rides", icon: Bike },
  { name: "Rewards", href: "/rewards", icon: Award },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Phone },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white border-gray-200">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/landing" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">EC</span>
            </div>
            <span className="font-bold text-lg text-gray-900">
              EcoCommute+
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  pathname === link.href ? "text-green-600" : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-gray-700">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white">
                <Link href="/landing" className="flex items-center gap-2 mb-8">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">EC</span>
                  </div>
                  <span className="font-bold text-xl text-gray-900">EcoCommute+</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => {
                    const LinkIcon = link.icon
                    const isActive = pathname === link.href
                    
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${
                          isActive 
                            ? "bg-green-50 text-green-600" 
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <LinkIcon className="h-5 w-5" />
                        {link.name}
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          
          <nav className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm hidden md:inline text-gray-600">Welcome, {user?.name || 'User'}</span>
                <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                  Dashboard
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-600"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button 
                    variant="default" 
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
} 