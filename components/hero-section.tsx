"use client"

import { useRef, useMemo } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, MeshReflectorMaterial, Float, PerspectiveCamera } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import * as THREE from "three"

interface FuturisticBuildingProps {
  position: [number, number, number];
  height: number;
  width: number;
  depth: number;
  color: string;
  emissive: string;
  rotation?: [number, number, number];
}

function FuturisticBuilding({ position, height, width, depth, color, emissive, rotation = [0, 0, 0] }: FuturisticBuildingProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main building structure */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshPhysicalMaterial 
          color={color} 
          emissive={emissive}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Glass panels */}
      <mesh position={[0, height / 2, depth / 2 + 0.01]}>
        <planeGeometry args={[width * 0.8, height * 0.8]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          roughness={0.1}
          metalness={1}
          transmission={0.5}
          transparent={true}
          opacity={0.3}
          envMapIntensity={2}
        />
      </mesh>
      
      {/* Emissive trim */}
      <mesh position={[0, height - 0.1, 0]}>
        <boxGeometry args={[width + 0.1, 0.1, depth + 0.1]} />
        <meshStandardMaterial 
          color={emissive} 
          emissive={emissive} 
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  )
}

interface FuturisticVehicleProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  scale?: number;
}

function FuturisticVehicle({ position, rotation = [0, 0, 0], color = "#00ff88", scale = 1 }: FuturisticVehicleProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Vehicle body */}
      <mesh position={[0, 0.2, 0]}>
        <capsuleGeometry args={[0.3, 0.8, 4, 16]} />
        <meshPhysicalMaterial 
          color={color}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* Cockpit */}
      <mesh position={[0, 0.4, -0.2]}>
        <sphereGeometry args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial 
          color="#111111"
          roughness={0}
          metalness={0}
          transmission={0.9}
          transparent={true}
          opacity={0.7}
          envMapIntensity={2}
        />
      </mesh>
      
      {/* Hover pads */}
      {[-0.4, 0.4].map((x, i) => (
        <mesh key={i} position={[x, -0.1, 0]}>
          <cylinderGeometry args={[0.2, 0.3, 0.1, 16]} />
          <meshStandardMaterial 
            color="#222222"
            emissive={color}
            emissiveIntensity={1}
          />
        </mesh>
      ))}
      
      {/* Light trail */}
      <mesh position={[0, 0, 0.6]}>
        <coneGeometry args={[0.1, 1, 16]} />
        <meshBasicMaterial 
          color={color}
          transparent={true}
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

function CityGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={15}
        depthScale={1}
        minDepthThreshold={0.85}
        color="#050505"
        metalness={0.6}
        roughness={1}
        mirror={0.75}
      />
    </mesh>
  )
}

interface VehicleData {
  radius: number;
  angle: number;
  height: number;
  color: string;
  speed: number;
  scale: number;
}

function CityMap() {
  const ref = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Create memoized building data
  const buildings = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const gridSize = 5;
      const gridX = Math.floor(i / gridSize) - Math.floor(gridSize / 2);
      const gridZ = (i % gridSize) - Math.floor(gridSize / 2);
      
      // Add some randomness to grid positions
      const x = gridX * 4 + (Math.random() * 1 - 0.5);
      const z = gridZ * 4 + (Math.random() * 1 - 0.5);
      
      // Vary building heights
      const height = Math.random() * 6 + 2;
      const width = Math.random() * 1 + 0.8;
      const depth = Math.random() * 1 + 0.8;
      
      // Create eco-friendly color palette
      const colorPalette = [
        { color: "#1a4d7e", emissive: "#3d8afe" }, // Blue
        { color: "#0a5540", emissive: "#00aa55" }, // Green
        { color: "#004d40", emissive: "#00bfa5" }, // Teal
        { color: "#0a2540", emissive: "#0088ff" }, // Blue-green
      ];
      
      const colorSet = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      
      return {
        position: [x, 0, z] as [number, number, number],
        height,
        width,
        depth,
        color: colorSet.color,
        emissive: colorSet.emissive,
        rotation: [0, Math.random() * Math.PI * 2, 0] as [number, number, number]
      };
    });
  }, []);
  
  // Create memoized vehicle data
  const vehicles = useMemo<VehicleData[]>(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const radius = 10 + Math.random() * 15;
      const angle = (i / 15) * Math.PI * 2;
      const height = Math.random() * 2 + 1;
      
      const colorOptions = ["#00aa55", "#00bfa5", "#3d8afe", "#0088ff"];
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      
      return {
        radius,
        angle,
        height,
        color,
        speed: 0.2 + Math.random() * 0.3,
        scale: 0.5 + Math.random() * 0.5
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Gentle rotation of the entire city
      ref.current.rotation.y += delta * 0.03;
    }
    
    // Update vehicle positions
    if (groupRef.current && groupRef.current.children) {
      groupRef.current.children.forEach((vehicle, i) => {
        if (vehicles[i] && vehicle instanceof THREE.Group) {
          const { radius, angle, speed } = vehicles[i];
          vehicles[i].angle += delta * speed;
          
          // Update position
          vehicle.position.x = Math.cos(vehicles[i].angle) * radius;
          vehicle.position.z = Math.sin(vehicles[i].angle) * radius;
          
          // Update rotation to face movement direction
          vehicle.rotation.y = vehicles[i].angle + Math.PI / 2;
        }
      });
    }
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      <CityGround />
      
      {/* Buildings */}
      {buildings.map((props, i) => (
        <FuturisticBuilding key={i} {...props} />
      ))}
      
      {/* Central landmark building */}
      <FuturisticBuilding 
        position={[0, 0, 0]} 
        height={12} 
        width={2} 
        depth={2} 
        color="#0a5540" 
        emissive="#00aa55"
      />
      
      {/* Neon grid roads */}
      <group position={[0, -1.95, 0]}>
        {/* Circular roads */}
        {[5, 10, 15, 20].map((radius, i) => (
          <mesh key={i} position={[0, 0, 0]}>
            <ringGeometry args={[radius - 0.1, radius, 64]} />
            <meshStandardMaterial 
              color="#00aa55" 
              emissive="#00aa55" 
              emissiveIntensity={3}
              transparent={true}
              opacity={0.7}
            />
          </mesh>
        ))}
        
        {/* Radial roads */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <group key={i} rotation={[0, angle, 0]}>
              <mesh position={[0, 0, 0]}>
                <planeGeometry args={[25, 0.1]} />
                <meshStandardMaterial 
                  color="#00aa55" 
                  emissive="#00aa55" 
                  emissiveIntensity={3}
                  transparent={true}
                  opacity={0.7}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          );
        })}
      </group>
      
      {/* Vehicles */}
      <group ref={groupRef}>
        {vehicles.map((vehicle, i) => (
          <FuturisticVehicle 
            key={i}
            position={[
              Math.cos(vehicle.angle) * vehicle.radius, 
              vehicle.height, 
              Math.sin(vehicle.angle) * vehicle.radius
            ]}
            rotation={[0, vehicle.angle + Math.PI / 2, 0]}
            color={vehicle.color}
            scale={vehicle.scale}
          />
        ))}
      </group>
      
      {/* Floating data points */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 3 + Math.random() * 18;
        const height = Math.random() * 5 + 1;
        
        return (
          <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh 
              position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius]}
              scale={0.2}
            >
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial 
                color="#ffffff" 
                emissive="#ffffff" 
                emissiveIntensity={2}
                transparent={true}
                opacity={0.8}
              />
            </mesh>
          </Float>
        );
      })}
      
      {/* Light beams */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 8;
        
        return (
          <mesh 
            key={i} 
            position={[Math.cos(angle) * radius, 10, Math.sin(angle) * radius]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.1, 5, 20, 8, 1, true]} />
            <meshBasicMaterial 
              color="#00aa55" 
              transparent={true}
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 z-0">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 10, 25]} fov={35} />
          <fog attach="fog" args={['#030303', 10, 50]} />
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 15, 0]} intensity={0.5} color="#ffffff" />
          <spotLight 
            position={[10, 20, 10]} 
            angle={0.3} 
            penumbra={1} 
            intensity={1} 
            castShadow 
            shadow-mapSize={[2048, 2048]}
            color="#ffffff"
          />
          <directionalLight 
            position={[-10, 15, -10]} 
            intensity={0.8} 
            color="#00aa55" 
            castShadow
          />
          <CityMap />
          <Environment preset="night" />
        </Canvas>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase mb-6 leading-tight">
              The Future of <span className="text-[#00aa55]">Green Mobility</span> is Here
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-xl md:text-2xl text-white/80 mb-10">Sustainable Urban Commuting. Reduce Your Carbon Footprint. Save the Planet.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button className="bg-[#00aa55] text-[#0a2540] hover:bg-[#00aa55]/90 text-lg px-8 py-6 h-auto rounded-full">
              Find Your Green Ride
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button 
              className="bg-[#00aa55] text-[#0a2540] hover:bg-[#00aa55]/90 text-lg px-8 py-6 h-auto rounded-full"
            >
              How It Works
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute bottom-20 right-10 hidden lg:block"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 bg-[#00aa55]/20 rounded-full blur-xl"></div>
          <div className="absolute inset-4 bg-[#00aa55]/20 rounded-full blur-lg"></div>
        </div>
      </motion.div>
    </section>
  )
}

