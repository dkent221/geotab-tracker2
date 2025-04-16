import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const vehicleIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
function MapView() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://your.backend.onrender.com/-api/locations');
        const data = await response.json();
        setVehicles(data.result);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };

    fetchLocations();
    const interval = setInterval(fetchLocations, 15000); // refresh every 15 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={[43.6532, -79.3832]} zoom={12} style={{ height: '600px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {vehicles.map((vehicle, index) => (
        <Marker
          key={index}
          position={[vehicle.lastKnownPosition.latitude, vehicle.lastKnownPosition.longitude]}
          icon={vehicleIcon}
        >
          <Popup>
            <b>{vehicle.name}</b><br />
            Speed: {vehicle.speed} km/h
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;

