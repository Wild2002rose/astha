import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import locationIcon from '../home/loc2.png'; 

// Create a custom icon
const customIcon = new L.Icon({
  iconUrl: locationIcon,
  iconSize: [30, 30], 
  iconAnchor: [15, 30], 
  popupAnchor: [0, -30], 
  className: 'loc_icon'
});

// Update the cities array with new cities
const cities = [
  { name: 'Astha Health & Healing,Bagnan', position: [22.4707, 87.9686] },
  { name: 'Astha Family Health Clinic,Uluberia', position: [22.4710, 88.1142] },
  { name: 'Astha Health Partners,Howrah', position: [22.5958, 88.2636] },
  { name: 'Astha Medical Services,Santragachi', position: [22.5836, 88.2928] },
  { name: 'Astha Health Network,Budge Budge', position: [22.4757, 88.1803] },
  { name: 'Astha Wellness Center,Kharagpur', position: [22.3460, 87.2319] },
  { name: 'Astha Primary Care Center,Siliguri', position: [26.7271, 88.3953] },
  { name: 'Astha Health Association,Nadia', position: [23.4710, 88.5565] },
  { name: 'Astha Health Group,Sealdah', position: [22.5667, 88.3697] },
  { name: 'Astha Healing Institute,Berhampur', position: [24.1007, 88.2510] },
];

const MapComponent = () => {
  const [popupOpenIndex, setPopupOpenIndex] = useState(null);

  return (
    <MapContainer 
      center={[23.6850, 87.8560]} 
      zoom={7} 
      style={{ height: '380px', width: '380px', borderRadius:'5px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((city, index) => (
        <Marker 
          key={index} 
          position={city.position} 
          icon={customIcon} 
          eventHandlers={{
            click: () => {
              setPopupOpenIndex(index);
            },
          }}
        >
          {popupOpenIndex === index && (
            <Popup onClose={() => setPopupOpenIndex(null)}
            style={{ backgroundColor: 'white', color: 'black' }}
            className='custom-popup'>
              <h1 className="text-black font-semibold text-sm bg-white">{city.name}</h1>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
