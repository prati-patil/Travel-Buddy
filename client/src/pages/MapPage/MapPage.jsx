import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);
  const [places, setPlaces] = useState([]);
  const [map, setMap] = useState(null); // Add state for the map object

  const mapStyles = {
    height: "100vh",
    width: "100%"
  };

  useEffect(() => {
    // Fetch user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        error => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleNavigateToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        error => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handlePlaceSelect = () => {
    setSearchLocation(autocomplete.getPlace().formatted_address);
    setCurrentPosition({
      lat: autocomplete.getPlace().geometry.location.lat(),
      lng: autocomplete.getPlace().geometry.location.lng()
    });

    // Fetch nearby places (restaurants, hotels, etc.) within 5 kilometers
    if (map && window.google && window.google.maps) { // Check if map object exists
      const service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: autocomplete.getPlace().geometry.location,
        radius: 5000,
        type: ['lodging', 'tourist_attraction'] // Add 'tourist_attraction' type
      }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);
        } else {
          console.error("Places service nearby search failed:", status);
        }
      });
    }
  };

  const handleAutocompleteLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };
 
  const onLoad = (map) => {
    setMap(map); // Store the map object
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDtnPmw3rJGTqdCbNl_GAHvNK6XHEO-0aU" libraries={["places"]}>
      <div className='flex flex-col items-center'>
        <button onClick={handleNavigateToCurrentLocation} className="bg-[#33006F] flex   px-4 py-2 text-white rounded mt-1 mb-2 w-fit">Current Location</button>
        <Autocomplete
          onLoad={handleAutocompleteLoad}
          onPlaceChanged={handlePlaceSelect}
        >
          <input
            type="text"
            placeholder="Search for location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className='h-9 rounded '
          />
        </Autocomplete>
      </div>
      {currentPosition ? (
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition}
          onLoad={onLoad} // Add onLoad handler to store the map object
        >
          {/* Display markers for nearby places */}
          {places.map(place => (
            <Marker
              key={place.place_id}
              position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }}
              title={place.name}
            />
          ))}
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
    </LoadScript>
  );
};

export default MapContainer;
