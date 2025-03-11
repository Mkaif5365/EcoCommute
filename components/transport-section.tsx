"use client"

import { motion } from "framer-motion"
import { Bus, Clock, Map, Train } from "lucide-react"

export default function TransportSection() {
  return (
    <section className="relative py-24 overflow-hidden">
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
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">Seamless Public Transport Access</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Metro? Bus? We've got real-time tracking, multi-modal routes & smart planning!
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
                <Train className="h-5 w-5 text-[#0a2540]" />
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-4">Live Transit Updates</h3>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-500 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          P
                        </div>
                        <span className="font-medium">Purple Line</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>Every 4 min</span>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute top-3 left-4 bottom-3 w-0.5 bg-purple-500/30"></div>

                      <div className="ml-4 pl-4 py-2 relative">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-purple-500"></div>
                        <div className="flex justify-between">
                          <span>Majestic</span>
                          <span className="text-white/60">--</span>
                        </div>
                      </div>

                      <div className="ml-4 pl-4 py-2 relative">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-white/30"></div>
                        <div className="flex justify-between">
                          <span className="text-white/60">MG Road</span>
                          <span className="text-white/60">4 min</span>
                        </div>
                      </div>

                      <div className="ml-4 pl-4 py-2 relative">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-white/30"></div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Indiranagar</span>
                          <span className="text-white/60">9 min</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          G
                        </div>
                        <span className="font-medium">Green Line</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>Every 6 min</span>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute top-3 left-4 bottom-3 w-0.5 bg-green-500/30"></div>

                      <div className="ml-4 pl-4 py-2 relative">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="flex justify-between">
                          <span>Majestic</span>
                          <span className="text-white/60">--</span>
                        </div>
                      </div>

                      <div className="ml-4 pl-4 py-2 relative">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-white/30"></div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Mantri Square</span>
                          <span className="text-white/60">3 min</span>
                        </div>
                      </div>

                      <div className="ml-4 pl-4 py-2 relative">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-white/30"></div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Yeshwanthpur</span>
                          <span className="text-white/60">7 min</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          500
                        </div>
                        <span className="font-medium">Airport Express</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>Every 20 min</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Bus className="h-5 w-5 text-[#00ff88]" />
                        <span>Next: Majestic → Airport</span>
                      </div>
                      <div className="text-[#00ff88] font-medium">12 min</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map animation */}
            <motion.div
              className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#00ff88]/20 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.1, delayChildren: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-[#00ff88]/20 rounded-full flex items-center justify-center">
                <Map className="h-6 w-6 text-[#00ff88]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Real-Time Tracking</h3>
                <p className="text-white/70">
                  Know exactly when your bus or metro will arrive with live GPS tracking and accurate ETAs.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-[#00ff88]/20 rounded-full flex items-center justify-center">
                <Train className="h-6 w-6 text-[#00ff88]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Multi-Modal Routing</h3>
                <p className="text-white/70">
                  Combine metro, bus, and last-mile options for the most efficient door-to-door journey planning.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-[#00ff88]/20 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-[#00ff88]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Smart Scheduling</h3>
                <p className="text-white/70">
                  Plan your day with confidence using our predictive algorithms that account for traffic and delays.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <h3 className="font-medium mb-3">Did you know?</h3>
              <p className="text-white/70 mb-3">
                Using public transport instead of driving alone can reduce your carbon footprint by up to 30% per
                journey.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-full bg-white/10 rounded-full h-2.5">
                  <div className="bg-[#00ff88] h-2.5 rounded-full" style={{ width: "70%" }}></div>
                </div>
                <span className="text-sm text-[#00ff88] font-medium">70% cleaner</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

