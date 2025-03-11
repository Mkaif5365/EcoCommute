import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nearby E-Rides | EcoCommute+',
  description: 'Find and book electric rides near you for sustainable urban commuting',
}

export default function NearbyERidesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
} 