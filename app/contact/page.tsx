"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Leaf, ArrowLeft, Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "feedback",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormState((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "feedback",
        message: "",
      })
    }, 1500)
  }

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
            <Link href="/#transport" className="text-sm font-medium hover:text-[#00aa55] transition-colors">
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
            <Link href="/contact" className="text-sm font-medium text-[#00aa55] transition-colors">
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
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get in <span className="text-[#00aa55]">Touch</span>
          </h1>
          <p className="text-xl text-gray-300">
            We'd love to hear from you! Send us your feedback or inquire about partnerships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-xl border border-[#00aa55]/20 shadow-lg flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#00aa55]/10 flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-[#00aa55]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-gray-300 mb-3">For general inquiries and support</p>
            <a href="mailto:contact@greencommuteplan.com" className="text-[#00aa55] hover:underline">
              contact@greencommuteplan.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-xl border border-[#00aa55]/20 shadow-lg flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#00aa55]/10 flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-[#00aa55]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <p className="text-gray-300 mb-3">Mon-Fri from 9am to 6pm</p>
            <a href="tel:+911234567890" className="text-[#00aa55] hover:underline">
              +91 123 456 7890
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-xl border border-[#00aa55]/20 shadow-lg flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#00aa55]/10 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-[#00aa55]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-300 mb-3">Our headquarters</p>
            <address className="text-[#00aa55] not-italic">
              IIT Delhi, Hauz Khas<br />
              New Delhi, India 110016
            </address>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-[#1b1b1b]/40 backdrop-blur-sm p-8 rounded-xl border border-[#00aa55]/20 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Send us a Message</h2>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#00aa55]/20 flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-[#00aa55]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-gray-300 mb-6">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
                <Button 
                  className="bg-[#00aa55] text-[#0a2540] hover:bg-[#00aa55]/90"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="bg-[#1b1b1b]/60 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#00aa55] focus:ring-[#00aa55]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Your Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="bg-[#1b1b1b]/60 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#00aa55] focus:ring-[#00aa55]"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-300">Subject</Label>
                  <RadioGroup 
                    value={formState.subject} 
                    onValueChange={handleRadioChange}
                    className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="feedback" id="feedback" className="border-[#00aa55] text-[#00aa55]" />
                      <Label htmlFor="feedback" className="text-gray-300">Feedback</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="partnership" id="partnership" className="border-[#00aa55] text-[#00aa55]" />
                      <Label htmlFor="partnership" className="text-gray-300">Partnership</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="support" id="support" className="border-[#00aa55] text-[#00aa55]" />
                      <Label htmlFor="support" className="text-gray-300">Support</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">Your Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    className="min-h-[150px] bg-[#1b1b1b]/60 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#00aa55] focus:ring-[#00aa55]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#00aa55] text-[#0a2540] hover:bg-[#00aa55]/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#0a2540]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1b1b1b] border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} EcoCommute+. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 