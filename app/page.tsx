"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Bus, Car, ChevronDown, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import HeroSection from "@/components/hero-section"
import MobilitySection from "@/components/mobility-section"
import RideSharingSection from "@/components/ride-sharing-section"
import TransportSection from "@/components/transport-section"
import GameSection from "@/components/game-section"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import LoginModal from "@/components/login-modal"
import SignupModal from "@/components/signup-modal"
import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect('/landing');
}

