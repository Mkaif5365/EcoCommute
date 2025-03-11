"use client"

import { motion } from "framer-motion"
import { Bike, Bus, Car, Filter, Leaf, Search, Zap } from "lucide-react"
import Image from "next/image"

export default function MobilitySection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="relative py-24 overflow-hidden" id="features">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#1b1b1b] opacity-90"></div>
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
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">One App, Every Ride</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Stop searching different apps. Get all micro-mobility options in one place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-[#0a2540] rounded-2xl p-6 border border-white/10 shadow-xl">
              <div className="absolute -top-3 -right-3 bg-[#00ff88] rounded-full p-2">
                <Zap className="h-5 w-5 text-[#0a2540]" />
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 bg-white/10 rounded-full p-2 pl-4 mb-4">
                  <Search className="h-5 w-5 text-white/60" />
                  <input
                    type="text"
                    className="bg-transparent border-none outline-none text-white w-full"
                    placeholder="Where to?"
                    readOnly
                  />
                  <button className="bg-[#00ff88] text-[#0a2540] rounded-full p-2">
                    <Filter className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-[#00ff88]/20 p-2 rounded-full">
                        <Bike className="h-5 w-5 text-[#00ff88]" />
                      </div>
                      <span className="font-medium">Bikes</span>
                    </div>
                    <div className="text-sm text-white/60">12 nearby</div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-[#00ff88]/20 p-2 rounded-full">
                        <Car className="h-5 w-5 text-[#00ff88]" />
                      </div>
                      <span className="font-medium">Cars</span>
                    </div>
                    <div className="text-sm text-white/60">8 nearby</div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-[#00ff88]/20 p-2 rounded-full">
                        <Bus className="h-5 w-5 text-[#00ff88]" />
                      </div>
                      <span className="font-medium">Bus</span>
                    </div>
                    <div className="text-sm text-white/60">Route 42, 67</div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-[#00ff88]/20 p-2 rounded-full">
                        <Leaf className="h-5 w-5 text-[#00ff88]" />
                      </div>
                      <span className="font-medium">Green</span>
                    </div>
                    <div className="text-sm text-white/60">Eco options</div>
                  </div>
                </div>

                <div className="mt-6 bg-white/5 rounded-xl p-4">
                  <h3 className="font-medium mb-3">Popular Routes</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#00ff88]/20 p-2 rounded-full">
                          <Bike className="h-4 w-4 text-[#00ff88]" />
                        </div>
                        <div>
                          <div className="font-medium">Downtown</div>
                          <div className="text-xs text-white/60">15 min • 2.3 km</div>
                        </div>
                      </div>
                      <div className="text-[#00ff88] font-medium">$2.50</div>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#00ff88]/20 p-2 rounded-full">
                          <Bus className="h-4 w-4 text-[#00ff88]" />
                        </div>
                        <div>
                          <div className="font-medium">City Center</div>
                          <div className="text-xs text-white/60">22 min • 5.1 km</div>
                        </div>
                      </div>
                      <div className="text-[#00ff88] font-medium">$1.75</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* App interface animation */}
            <motion.div
              className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#00ff88]/20 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={item} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#00ff88]/20 rounded-full flex items-center justify-center">
                <Search className="h-6 w-6 text-[#00ff88]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Smart Search</h3>
                <p className="text-white/70">
                  Find the perfect ride based on time, cost, or eco-impact with our intelligent search algorithm.
                </p>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#00ff88]/20 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-[#00ff88]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Multiple Providers</h3>
                <p className="text-white/70">
                  Access Yulu, Zypp, Epick, Eveez, and public transport options all in one unified interface.
                </p>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#00ff88]/20 rounded-full flex items-center justify-center">
                <Leaf className="h-6 w-6 text-[#00ff88]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Eco Impact Tracking</h3>
                <p className="text-white/70">
                  See the carbon footprint of each journey and track your positive environmental impact over time.
                </p>
              </div>
            </motion.div>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-white/10 p-3 rounded-xl flex items-center gap-2 hover:bg-white/20 transition-colors">
                <Image
                  src="/placeholder.svg?height=30&width=30"
                  alt="Yulu"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span>Yulu</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl flex items-center gap-2 hover:bg-white/20 transition-colors">
                <Image
                  src="/placeholder.svg?height=30&width=30"
                  alt="Zypp"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span>Zypp</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl flex items-center gap-2 hover:bg-white/20 transition-colors">
                <Image
                  src="/placeholder.svg?height=30&width=30"
                  alt="Epick"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span>Epick</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl flex items-center gap-2 hover:bg-white/20 transition-colors">
                <Image
                  src="/placeholder.svg?height=30&width=30"
                  alt="Eveez"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span>Eveez</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

