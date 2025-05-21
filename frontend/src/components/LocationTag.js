import { useGeolocated } from 'react-geolocated';

const LocationTag = ({ lat, lng }) => {
  const { coords } = useGeolocated();
  
  const distance = (lat1, lon1, lat2, lon2) => {
    // Haversine formula implementation
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  if (!lat || !lng) return null;
  
  let distanceText = '';
  if (coords) {
    const dist = distance(coords.latitude, coords.longitude, lat, lng);
    distanceText = ` • ${dist.toFixed(1)}km from you`;
  }

  return (
    <small className="text-muted">
      📍 Posted from this location{distanceText}
    </small>
  );
};
