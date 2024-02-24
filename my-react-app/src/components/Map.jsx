import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
}

function Map() {
  const [initialPosition, setInitialPosition] = useState([51.505, -0.09]);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchMyIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const locationResponse = await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${data.ip}`);
        const locationData = await locationResponse.json();
        console.log('Location Data:', locationData);
        setInitialPosition([locationData.location.lat, locationData.location.lng]);
      } catch (error) {
        console.error('Error fetching IP or geolocation data:', error);
      }
    };

    fetchMyIp();
  }, [apiKey]);

  return (
    <MapContainer style={{ width: '50%', height: '600px' }} center={initialPosition} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}

export default Map;