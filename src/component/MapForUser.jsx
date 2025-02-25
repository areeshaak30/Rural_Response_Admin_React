import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, HeatmapLayer } from "@react-google-maps/api";
import { db } from "../firebaseConfig/firebase";
import { collection, getDocs } from "firebase/firestore";
import UserDetails from "../component/users/UserDetails";

const containerStyle = {
  width: "100%",
  height: "40vh",
};

const defaultCenter = { lat: 31.4391254, lng: 74.2838245 };

const MapForUser = () => {
  const [users, setUsers] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(15);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [visibleUserCount, setVisibleUserCount] = useState(0); 
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBewq-bhd3uc6GN6aFFavXtFfDmYJ6_o2c",
    libraries: ["visualization"], 
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log("Fetched Users:", userData);
        setUsers(userData);

        const heatmapPoints = userData
          .filter((user) => user.location?.latitude && user.location?.longitude)
          .map(
            (user) =>
              new window.google.maps.LatLng(user.location.latitude, user.location.longitude)
          );

        setHeatmapData(heatmapPoints);
        setVisibleUserCount(heatmapPoints.length); 
        console.log(`Users displayed on map: ${heatmapPoints.length}`);
      } catch (error) {
        console.error("Error fetching user locations:", error);
      }
    };

    fetchUsers();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log("Error Fetching current location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleMapClick = (event) => {
    const clickedLat = event.latLng.lat();
    const clickedLng = event.latLng.lng();

    let nearestUser = null;
    let minDistance = Infinity;

    users.forEach((user) => {
      if (user.location?.latitude && user.location?.longitude) {
        const userLat = user.location.latitude;
        const userLng = user.location.longitude;

        const distance = Math.sqrt(
          Math.pow(userLat - clickedLat, 2) + Math.pow(userLng - clickedLng, 2)
        );

        if (distance < minDistance) {
          minDistance = distance;
          nearestUser = user;
        }
      }
    });

    if (nearestUser) {
      setSelectedUserId(nearestUser.id);
    }
  };

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoom}
        onLoad={(map) => (mapRef.current = map)}
        onZoomChanged={() => {
          if (mapRef.current) setZoom(mapRef.current.getZoom());
        }}
        onClick={handleMapClick}
      >
        {heatmapData.length > 0 && (
          <HeatmapLayer
            data={heatmapData}
            options={{
              radius: 40,
              opacity: 0.7,
              gradient: [
                "rgba(0, 0, 255, 0)",
                "rgba(0, 0, 255, 1)",
                "rgba(255, 0, 0, 1)",
              ],
            }}
          />
        )}
      </GoogleMap>

      {selectedUserId && (
        <UserDetails userId={selectedUserId} onClose={() => setSelectedUserId(null)} />
      )}
    </>
  );
};

export default MapForUser;
