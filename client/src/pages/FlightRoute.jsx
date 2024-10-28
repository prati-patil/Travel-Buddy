import React, { useState, useEffect } from 'react';

function FlightRoute() {
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key='AIzaSyDtnPmw3rJGTqdCbNl_GAHvNK6XHEO-0aU'&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function initMap() {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 },
      zoom: 2
    });
    setMap(map);
  }

  function handleSearch() {
    if (!map) return;

    // Use Google Maps Directions Service to find flights route
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: startPoint,
        destination: endPoint,
        travelMode: 'FLIGHT'
      },
      (response, status) => {
        if (status === 'OK') {
          const flightPath = new window.google.maps.Polyline({
            path: response.routes[0].overview_path,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });
          flightPath.setMap(map);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Start Point"
          value={startPoint}
          onChange={(e) => setStartPoint(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination Point"
          value={endPoint}
          onChange={(e) => setEndPoint(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
}

export default FlightRoute;
