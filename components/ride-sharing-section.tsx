"use client"

import { motion } from "framer-motion"
import { Car, Coins, MapPin, Users } from "lucide-react"
import Image from "next/image"

export default function RideSharingSection() {
  return (
    <section className="relative py-24 overflow-hidden" id="how-it-works">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a2540] opacity-90"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">Share Rides, Earn Rewards</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Going the same way? Offer a ride & earn Green Coins for discounts & rewards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#00ff88]/20 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-[#00ff88]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Community Carpooling</h3>
                  <p className="text-white/70">
                    Connect with people heading your way and share the ride cost while reducing traffic congestion.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#00ff88]/20 rounded-full flex items-center justify-center">
                  <Coins className="h-6 w-6 text-[#00ff88]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Green Coin Rewards</h3>
                  <p className="text-white/70">
                    Earn digital tokens for every shared ride that can be redeemed for discounts on future trips or
                    partner offers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#00ff88]/20 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-[#00ff88]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Smart Route Matching</h3>
                  <p className="text-white/70">
                    Our AI matches riders and drivers with minimal detours, optimizing for time and fuel efficiency.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#00ff88]">30%</div>
                <div className="text-sm text-white/70">Cost Savings</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#00ff88]">45%</div>
                <div className="text-sm text-white/70">CO₂ Reduction</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#00ff88]">10K+</div>
                <div className="text-sm text-white/70">Daily Rides</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative bg-[#1b1b1b] rounded-2xl p-6 border border-white/10 shadow-xl">
              <div className="absolute -top-3 -right-3 bg-[#00ff88] rounded-full p-2">
                <Car className="h-5 w-5 text-[#0a2540]" />
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-4">Available Rides</h3>

                <div className="space-y-4">
                  <motion.div
                    className="bg-white/5 rounded-xl p-4 border border-white/10"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Driver"
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-[#00ff88]"
                        />
                        <div>
                          <div className="font-medium">Rahul S.</div>
                          <div className="flex items-center text-xs text-white/60">
                            <span className="flex items-center">★★★★★ 4.9</span>
                            <span className="mx-2">•</span>
                            <span>Tesla Model 3</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#00ff88]/20 px-2 py-1 rounded text-xs font-medium text-[#00ff88]">
                        +120 coins
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-[#00ff88]"></div>
                        <div className="w-0.5 h-10 bg-white/20"></div>
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">Koramangala</div>
                        <div className="mt-6 text-sm">Whitefield</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">8:30 AM</div>
                        <div className="mt-6 text-sm font-medium">9:15 AM</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-white/60" />
                        <span className="text-sm text-white/60">2 seats left</span>
                      </div>
                      <div className="text-lg font-medium text-[#00ff88]">₹120</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-white/5 rounded-xl p-4 border border-white/10"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Driver"
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-[#00ff88]"
                        />
                        <div>
                          <div className="font-medium">Priya M.</div>
                          <div className="flex items-center text-xs text-white/60">
                            <span className="flex items-center">★★★★☆ 4.7</span>
                            <span className="mx-2">•</span>
                            <span>Honda City</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#00ff88]/20 px-2 py-1 rounded text-xs font-medium text-[#00ff88]">
                        +90 coins
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-[#00ff88]"></div>
                        <div className="w-0.5 h-10 bg-white/20"></div>
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">HSR Layout</div>
                        <div className="mt-6 text-sm">MG Road</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">9:00 AM</div>
                        <div className="mt-6 text-sm font-medium">9:40 AM</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-white/60" />
                        <span className="text-sm text-white/60">1 seat left</span>
                      </div>
                      <div className="text-lg font-medium text-[#00ff88]">₹90</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating coins animation */}
            <motion.div
              className="absolute -top-6 -left-6 w-16 h-16"
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="w-full h-full bg-[#00ff88] rounded-full flex items-center justify-center text-[#0a2540] font-bold text-lg">
                GC
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 right-12 w-10 h-10"
              animate={{ y: [0, -15, 0], rotate: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            >
              <div className="w-full h-full bg-[#00ff88] rounded-full flex items-center justify-center text-[#0a2540] font-bold text-sm">
                GC
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

