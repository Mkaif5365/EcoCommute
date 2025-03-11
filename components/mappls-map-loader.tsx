"use client";

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface MapplsMapLoaderProps {
  onMapLoad?: () => void;
  children?: React.ReactNode;
}

export const MapplsMapLoader: React.FC<MapplsMapLoaderProps> = ({ 
  onMapLoad,
  children 
}) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // If the script is already loaded and window.mappls exists
    if (isScriptLoaded && typeof window !== 'undefined' && window.mappls) {
      onMapLoad?.();
    }
  }, [isScriptLoaded, onMapLoad]);

  const handleScriptLoad = () => {
    setIsScriptLoaded(true);
    onMapLoad?.();
  };

  return (
    <>
      <Script
        src={`https://apis.mappls.com/advancedmaps/api/${process.env.NEXT_PUBLIC_MAPPLS_API_KEY}/map_sdk?v=3.0&layer=vector&libraries=marker,trafficLayer`}
        onLoad={handleScriptLoad}
        strategy="afterInteractive"
      />
      {children}
    </>
  );
};

export default MapplsMapLoader; 