import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useUI } from '../context';

const CENTER = [35.715, 51.392];
const MARKERS = [
  { pos: [35.715, 51.392], label: { fa: 'هتل لاله تهران', en: 'Laleh Tehran Hotel' }, icon: '🏨' },
  { pos: [35.7155, 51.389], label: { fa: 'پارک لاله', en: 'Laleh Park' }, icon: '🌿' },
  { pos: [35.711, 51.391], label: { fa: 'موزه هنرهای معاصر', en: 'Museum of Contemporary Art' }, icon: '🎨' },
  { pos: [35.713, 51.387], label: { fa: 'موزه فرش', en: 'Carpet Museum' }, icon: '🕌' },
  { pos: [35.7, 51.386], label: { fa: 'میدان ولیعصر', en: 'Valiasr Square' }, icon: '📍' },
];

export default function HotelMap({ className = '' }) {
  const { lang, theme } = useUI();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const tileLayerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!mapInstance.current) {
      const map = L.map(mapRef.current, { zoomControl: false, attributionControl: false }).setView(CENTER, 14);
      const tileUrl = theme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
      const tileLayer = L.tileLayer(tileUrl, { maxZoom: 19 }).addTo(map);
      tileLayerRef.current = tileLayer;

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      MARKERS.forEach((m) => {
        const div = L.divIcon({
          html: `<div style="font-size:1.6rem;filter:drop-shadow(0 2px 8px rgba(0,0,0,.3))">${m.icon}</div>`,
          className: '',
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });
        L.marker(m.pos, { icon: div }).addTo(map)
          .bindPopup(`<strong style="font-size:.9rem">${m.label[lang]}</strong>`);
      });

      mapInstance.current = map;
      setTimeout(() => map.invalidateSize(), 300);
    } else {
      // Update tile layer on theme change
      const tileUrl = theme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
      if (tileLayerRef.current) {
        tileLayerRef.current.setUrl(tileUrl);
      }
      // Update popup language for markers
      mapInstance.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          const markerData = MARKERS.find(m => m.pos[0] === layer.getLatLng().lat && m.pos[1] === layer.getLatLng().lng);
          if (markerData) {
            layer.setPopupContent(`<strong style="font-size:.9rem">${markerData.label[lang]}</strong>`);
          }
        }
      });
    }
    return () => {
      // Cleanup handled only when component unmounts
    };
  }, [lang, theme]);

  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        tileLayerRef.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} className={`leaflet-map ${className}`} style={{ minHeight: 400 }} />;
}
