"use client"

import { motion } from "framer-motion"
import { Award, Coffee, Gift, Leaf, Trophy, Users } from "lucide-react"
import Image from "next/image"

export default function GameSection() {
  return (
    <section className="relative py-24 overflow-hidden" id="rewards">
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
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">Travel Green, Win Big</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Rank up by reducing your carbon footprint & get exclusive rewards!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#00ff88]/20 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-[#00ff88]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Weekly Leaderboards</h3>
                <p className="text-white/70">
                  Compete with friends and your city to top the eco-friendly commuter charts and earn bonus rewards.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#00ff88]/20 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-[#00ff88]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Achievement Badges</h3>
                <p className="text-white/70">
                  Unlock special badges for milestones like "100 Green Rides," "Carbon Saver," and "Public Transit Pro."
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#00ff88]/20 rounded-full flex items-center justify-center">
                <Gift className="h-6 w-6 text-[#00ff88]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Exclusive Rewards</h3>
                <p className="text-white/70">
                  Redeem your Green Coins for free rides, partner discounts, and exclusive merchandise from sustainable
                  brands.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <Image
                  src="/placeholder.svg?height=50&width=50"
                  alt="Partner"
                  width={50}
                  height={50}
                  className="mx-auto mb-2"
                />
                <div className="text-sm">Eco Cafe</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <Image
                  src="/placeholder.svg?height=50&width=50"
                  alt="Partner"
                  width={50}
                  height={50}
                  className="mx-auto mb-2"
                />
                <div className="text-sm">Green Gear</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <Image
                  src="/placeholder.svg?height=50&width=50"
                  alt="Partner"
                  width={50}
                  height={50}
                  className="mx-auto mb-2"
                />
                <div className="text-sm">Eco Store</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-[#1b1b1b] rounded-2xl p-6 border border-white/10 shadow-xl">
              <div className="absolute -top-3 -right-3 bg-[#00ff88] rounded-full p-2">
                <Users className="h-5 w-5 text-[#0a2540]" />
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-4">This Week's Leaderboard</h3>

                <div className="space-y-4">
                  <div className="bg-[#00ff88]/20 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#00ff88] text-[#0a2540] w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-[#00ff88]"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Aditya K.</div>
                        <div className="flex items-center text-xs">
                          <Leaf className="h-3 w-3 mr-1 text-[#00ff88]" />
                          <span>Saved 32.4 kg CO₂</span>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-[#00ff88]">1,240</div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-white/20"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Neha S.</div>
                        <div className="flex items-center text-xs text-white/60">
                          <Leaf className="h-3 w-3 mr-1" />
                          <span>Saved 28.7 kg CO₂</span>
                        </div>
                      </div>
                      <div className="text-lg font-medium">1,120</div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-white/20"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Vikram J.</div>
                        <div className="flex items-center text-xs text-white/60">
                          <Leaf className="h-3 w-3 mr-1" />
                          <span>Saved 25.1 kg CO₂</span>
                        </div>
                      </div>
                      <div className="text-lg font-medium">980</div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        8
                      </div>
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-white/20"
                      />
                      <div className="flex-1">
                        <div className="font-medium">You</div>
                        <div className="flex items-center text-xs text-white/60">
                          <Leaf className="h-3 w-3 mr-1" />
                          <span>Saved 18.3 kg CO₂</span>
                        </div>
                      </div>
                      <div className="text-lg font-medium">720</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-white/5 rounded-xl p-4">
                  <h4 className="font-medium mb-3">Your Rewards</h4>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-[#00ff88]/20 rounded-full flex items-center justify-center">
                        <Gift className="h-5 w-5 text-[#00ff88]" />
                      </div>
                      <div>
                        <div className="font-medium">50% Off Next Ride</div>
                        <div className="text-xs text-white/60">Expires in 3 days</div>
                      </div>
                    </div>
                    <button className="text-xs bg-[#00ff88] text-[#0a2540] px-3 py-1 rounded-full font-medium">
                      Use
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-[#00ff88]/20 rounded-full flex items-center justify-center">
                        <Coffee className="h-5 w-5 text-[#00ff88]" />
                      </div>
                      <div>
                        <div className="font-medium">Free Coffee at Eco Cafe</div>
                        <div className="text-xs text-white/60">Unlock at 1000 points</div>
                      </div>
                    </div>
                    <div className="text-xs bg-white/10 text-white/60 px-3 py-1 rounded-full">280 more</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trophy animation */}
            <motion.div
              className="absolute -top-6 -left-6"
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <Trophy className="h-16 w-16 text-[#00ff88]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

