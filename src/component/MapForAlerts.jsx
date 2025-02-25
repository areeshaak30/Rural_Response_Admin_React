import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import searchIcon from "../assets/Search.svg";
import { db } from "../firebaseConfig/firebase";
import { collection, getDocs } from "firebase/firestore";

const defaultProps = {
  center: { lat: 31.4391254, lng: 74.2838245 },
  zoom: 15,
};

const MapForAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [mapCenter, setMapCenter] = useState(defaultProps.center);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBewq-bhd3uc6GN6aFFavXtFfDmYJ6_o2c",
  });

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "alerts"));
        const newData = querySnapshot.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .filter((alert) => {
            const loc = alert.location?.[0]; 
            return loc?.latitude && loc?.longitude;
          });

        console.log("Fetched Alerts:", newData);
        setAlerts(newData);
      } catch (error) {
        console.error("Error fetching alerts: ", error);
      }
    };

    fetchAlerts();
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="relative h-[50vh] w-full">
      <GoogleMap
        center={mapCenter}
        zoom={defaultProps.zoom}
        mapContainerClassName="h-full w-full"
        options={{
          gestureHandling: "greedy",
          minZoom: 2,
          maxZoom: 21,
          mapTypeId: "roadmap",
        }}
      >
        {alerts.map((alert) => {
          const loc = alert.location?.[0]; // Extract first location
          if (!loc?.latitude || !loc?.longitude) return null; // Skip if invalid

          return (
            <Marker
              key={alert.id}
              position={{
                lat: loc.latitude,
                lng: loc.longitude,
              }}
              icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              onClick={() => setSelectedAlert(alert)}
            />
          );
        })}
      </GoogleMap>

      {/* Search Bar */}
      {/* <input
        type="text"
        className="w-[98%] py-2 pl-12 absolute top-2 left-2 rounded-md outline-none border border-solid border-[#CDCECE] placeholder:text-sm placeholder:text-[#CDCECE]"
        placeholder="Search User"
      />
      <img src={searchIcon} alt="Search" className="absolute top-5 left-6" /> */}

      {/* Alert Details Modal */}
      {selectedAlert && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-2xl w-[90%] max-w-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 pl-24">Alert Details</h2>
          <p><strong>Type:</strong> {selectedAlert.alertTitle || "Unknown"}</p>
          <p><strong>Description:</strong> {selectedAlert.alertDescription[0] || "No description available."}</p>
          <p><strong>Location:</strong> {selectedAlert.alertAddress}</p>
          <button
            className="mt-4 w-full bg-[#3B9F9A] text-white py-2 rounded-md transition"
            onClick={() => setSelectedAlert(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MapForAlerts;
