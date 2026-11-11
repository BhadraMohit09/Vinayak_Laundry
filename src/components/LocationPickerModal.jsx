import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Locate, MapPin, Check, Loader2 } from 'lucide-react';

// Jamnagar default center
const DEFAULT_COORDS = [22.4707, 70.0577];

// Fix Leaflet's default icon path issue with bundlers
const customPinIcon = L.divIcon({
  className: 'custom-leaflet-marker',
  html: `
    <div style="
      position: relative;
      width: 36px;
      height: 36px;
      transform: translate(-50%, -100%);
      filter: drop-shadow(0 4px 10px rgba(0,0,0,0.35));
    ">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="#a44222" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3" fill="#ffffff"></circle>
      </svg>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0]
});

export default function LocationPickerModal({
  isOpen,
  onClose,
  initialCoords = null,
  onSelectLocation
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const [coords, setCoords] = useState(initialCoords || DEFAULT_COORDS);
  const [addressPreview, setAddressPreview] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isResolving, setIsResolving] = useState(false);

  // Reverse geocode lat/lng to get a readable address
  const fetchAddress = async (lat, lng) => {
    setIsResolving(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      if (response.ok) {
        const data = await response.json();
        const fullAddr = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        setAddressPreview(fullAddr);
      } else {
        setAddressPreview(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
      }
    } catch {
      setAddressPreview(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    } finally {
      setIsResolving(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    // Small delay to allow modal DOM rendering
    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;

      const startingCoords = coords && coords.length === 2 ? coords : DEFAULT_COORDS;

      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: startingCoords,
          zoom: 15,
          zoomControl: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }).addTo(map);

        const marker = L.marker(startingCoords, {
          icon: customPinIcon,
          draggable: true
        }).addTo(map);

        marker.on('dragend', (e) => {
          const pos = e.target.getLatLng();
          const newPos = [pos.lat, pos.lng];
          setCoords(newPos);
          fetchAddress(pos.lat, pos.lng);
        });

        map.on('click', (e) => {
          const { lat, lng } = e.latlng;
          marker.setLatLng([lat, lng]);
          setCoords([lat, lng]);
          fetchAddress(lat, lng);
        });

        mapInstanceRef.current = map;
        markerRef.current = marker;

        fetchAddress(startingCoords[0], startingCoords[1]);
      } else {
        mapInstanceRef.current.invalidateSize();
      }
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  // Clean up map when component unmounts
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        const newCoords = [latitude, longitude];
        setCoords(newCoords);

        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.setView(newCoords, 16);
          markerRef.current.setLatLng(newCoords);
        }
        fetchAddress(latitude, longitude);
      },
      (error) => {
        setIsLocating(false);
        console.warn('Geolocation error:', error);
        alert('Could not fetch GPS location. Please drag the pin on the map to set your location.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleConfirm = () => {
    const lat = coords[0];
    const lng = coords[1];
    const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;

    onSelectLocation({
      coords,
      mapsLink,
      readableAddress: addressPreview
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(26, 24, 21, 0.7)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 'min(100%, 640px)',
          background: '#ffffff',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 24px 48px -12px rgba(26, 24, 21, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-card)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} color="var(--accent-rust)" />
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 600, color: 'var(--ink)' }}>
                Pin Pickup Location (Zomato Style)
              </h3>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>
              Click or drag the red pin to your exact doorstep or building
            </p>
          </div>

          <button
            type="button"
            onClick={handleGetCurrentLocation}
            disabled={isLocating}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              background: 'var(--accent-rust-light)',
              color: 'var(--accent-rust)',
              border: '1px solid rgba(164, 66, 34, 0.2)',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: isLocating ? 'wait' : 'pointer'
            }}
            title="Use current GPS location"
          >
            {isLocating ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Locate size={14} />
            )}
            <span>Locate Me</span>
          </button>
        </div>

        {/* Map Container */}
        <div style={{ position: 'relative', width: '100%', height: '360px', background: '#f1f1f1' }}>
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

          {/* Floating hint pill */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '6px 14px',
              borderRadius: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--ink)',
              zIndex: 1000,
              pointerEvents: 'none'
            }}
          >
            📍 Tap anywhere on map or drag pin
          </div>
        </div>

        {/* Bottom Bar: Pinned Address Details + Actions */}
        <div style={{ padding: '16px 20px', background: '#fafaf9', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ marginBottom: '14px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--accent-rust)', letterSpacing: '0.5px' }}>
              Selected Pickup Coordinates
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <div style={{ fontSize: '0.88rem', color: 'var(--ink)', fontWeight: 500, lineHeight: 1.4, flex: 1 }}>
                {isResolving ? (
                  <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                    Resolving nearby address...
                  </span>
                ) : (
                  addressPreview || `${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`
                )}
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '2px', fontFamily: 'monospace' }}>
              Lat: {coords[0].toFixed(6)}, Lng: {coords[1].toFixed(6)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', alignItems: 'center' }}>
            <button
              type="button"
              onClick={onClose}
              className="soft-button"
              style={{ border: 'none', padding: '10px 18px', fontSize: '0.88rem' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="ink-button"
              style={{ padding: '10px 22px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Check size={16} /> Confirm Marked Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
