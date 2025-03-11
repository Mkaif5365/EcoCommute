"use client"

import { useRef, useState, useEffect } from "react"

// Add window.mappls type definition
declare global {
  interface Window {
    mappls: any;
  }
}

interface MapplsMapProps {
  apiKey?: string;
  center?: [number, number];
  zoom?: number;
  height?: string;
  width?: string;
  markers?: Array<{
    position: [number, number];
    title?: string;
    draggable?: boolean;
  }>;
  className?: string;
  onMapLoad?: (map: any) => void;
}

export default function MapplsMap({
  apiKey = 'a6f5b905587a2e6ff31e4127f881783f', // Default API key
  center = [28.61, 77.23], // Default center (Delhi)
  zoom = 12,
  height = '500px',
  width = '100%',
  markers = [],
  className = '',
  onMapLoad
}: MapplsMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scriptId] = useState(`mappls-script-${Math.random().toString(36).substring(2, 9)}`);
  
  useEffect(() => {
    // Don't run on server side
    if (typeof window === 'undefined') return;
    
    // Function to initialize map
    const initMap = () => {
      if (!mapContainerRef.current) return;
      if (!window.mappls) {
        setError('Mappls API not loaded correctly');
        setIsLoading(false);
        return;
      }
      
      try {
        // Create a simple map
        const map = new window.mappls.Map(mapContainerRef.current.id, {
          center: center,
          zoom: zoom
        });
        
        // Add markers if provided
        if (markers && markers.length > 0) {
          markers.forEach(marker => {
            try {
              new window.mappls.Marker({
                map: map,
                position: marker.position,
                title: marker.title || '',
                draggable: marker.draggable || false
              });
            } catch (err) {
              console.error('Error adding marker:', err);
            }
          });
        }
        
        // Call onMapLoad callback if provided
        if (onMapLoad && typeof onMapLoad === 'function') {
          onMapLoad(map);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to initialize map');
        setIsLoading(false);
      }
    };
    
    // Remove any existing scripts
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }
    
    // Set a unique ID for the map container
    if (mapContainerRef.current) {
      mapContainerRef.current.id = `mappls-map-${Math.random().toString(36).substring(2, 9)}`;
    }
    
    // Create and load the script
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://apis.mappls.com/advancedmaps/api/${apiKey}/map_sdk?v=3.0&layer=vector`;
    script.async = true;
    script.defer = true;
    
    script.onload = initMap;
    
    script.onerror = () => {
      setError('Failed to load Mappls API script');
      setIsLoading(false);
    };
    
    document.head.appendChild(script);
    
    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [apiKey, center, zoom, markers, onMapLoad, scriptId]);
  
  return (
    <div 
      ref={mapContainerRef}
      className={`mappls-map-container ${className}`}
      style={{ 
        height, 
        width,
        borderRadius: '8px',
        border: '1px solid #2a3a50',
        position: 'relative'
      }}
    >
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(10, 37, 64, 0.8)',
          color: 'white',
          zIndex: 10
        }}>
          <div style={{
            border: '4px solid rgba(0, 170, 85, 0.3)',
            borderRadius: '50%',
            borderTop: '4px solid #00aa55',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
            marginBottom: '15px'
          }} />
          <p>Loading map...</p>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
      
      {error && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          zIndex: 10
        }}>
          <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
            Error Loading Map
          </p>
          <p style={{ fontSize: '14px', color: '#ffcccc' }}>
            {error}
          </p>
        </div>
      )}
    </div>
  );
} 