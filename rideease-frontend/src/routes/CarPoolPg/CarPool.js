import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Autocomplete, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import "./CarPool.css";
import { createRide, searchRide } from "../../service/RideService";
import { Alert } from "../../components/Alert";
import loadingImg from "../../assets/car_loading1.gif";

const containerStyle = {
  width: "100vw",
  height: "70vh", // Adjusted to allow space for the form and list below
  position: "relative",
};

const MAPS_API = process.env.REACT_APP_MAPS_API || "";

// RidesList component that renders a static list of rides.
const RidesList = ({ rides }) => {
  return (
    <div className="rides-list" style={{ marginTop: "20px" }}>
      <h3>Available Rides</h3>
      {rides.length === 0 ? (
        <p>No rides available</p>
      ) : (
        <ul>
          {rides.map((ride, index) => (
            <li key={index}>{ride}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const CarPool = () => {
  const user_type = sessionStorage.getItem("user_type");
  const [start, setStart] = useState({ lat: null, lng: null });
  const [end, setEnd] = useState({ lat: null, lng: null });
  const [mapCenter, setMapCenter] = useState(
    JSON.parse(sessionStorage.getItem("mapCenter")) || { lat: 40.7113, lng: -74.0052 }
  );
  const [value, setValue] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ridesList, setRidesList] = useState([]);
  const [showRidesList, setShowRidesList] = useState(false);
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAPS_API,
    libraries: ["places"],
  });

  useEffect(() => {
    sessionStorage.setItem("mapCenter", JSON.stringify(mapCenter));
  }, [mapCenter]);

  const handlePlaceSelected = (place, type) => {
    if (!place || !place.geometry) {
      console.warn("Invalid place or geometry missing");
      return;
    }
    const location = place.geometry.location;
    const coordinates = { lat: location.lat(), lng: location.lng() };
    if (type === "start") {
      setStart(coordinates);
    } else if (type === "end") {
      setEnd(coordinates);
    }
    setMapCenter(coordinates);
  };

  const handleDecrement = () => {
    if (value > 1) setValue(value - 1);
  };

  const handleIncrement = () => {
    if (value < 5) setValue(value + 1);
  };

  const joinCarPool = async () => {
    const res = await searchRide(start.lat, start.lng, end.lat, end.lng, value);
    if (typeof res.data === "string") {
      Alert.error(res.data);
    } else {
      Alert.success("Ride found Successfully");
    }
  };

  const createCarPool = async () => {
    const res = await createRide(start.lat, start.lng, end.lat, end.lng, value);
    Alert.success(res.message);
  };

  const handleSearchRide = async () => {
    if (!start.lat || !end.lat) {
      Alert.error("Select start and end location");
      return;
    }
    setIsLoading(true);

    // Enforce a minimum loading delay for better UX.
    const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      await Promise.all([
        user_type === "commuter" ? joinCarPool() : createCarPool(),
        minLoadingTime,
      ]);
      // Set a static rides list.
      setRidesList(["Ride 1", "Ride 2", "Ride 3"]);
      setShowRidesList(true);
    } catch (error) {
      Alert.error("Error processing your request");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ position: "relative", padding: "20px" }}>
      <div
        style={{
          filter: isLoading ? "blur(5px)" : "none",
          transition: "filter 0.3s ease",
        }}
      >
        <GoogleMap
          key={JSON.stringify(mapCenter)}
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={13}
        >
          {start.lat && <Marker position={start} />}
          {end.lat && <Marker position={end} />}
        </GoogleMap>

        <div className="form-container" style={{ marginTop: "20px" }}>
          <Autocomplete
            onPlaceChanged={() =>
              handlePlaceSelected(window.autocompleteStart.getPlace(), "start")
            }
            onLoad={(autocomplete) => (window.autocompleteStart = autocomplete)}
          >
            <input
              type="text"
              placeholder="Enter Start Location"
              className="input-field"
            />
          </Autocomplete>

          <Autocomplete
            onPlaceChanged={() =>
              handlePlaceSelected(window.autocompleteEnd.getPlace(), "end")
            }
            onLoad={(autocomplete) => (window.autocompleteEnd = autocomplete)}
          >
            <input
              type="text"
              placeholder="Enter End Location"
              className="input-field"
            />
          </Autocomplete>

          {sessionStorage.getItem("user_type") !== "commuter" && (
            <div className="seat-selection">
              <label>No of Seats</label>
              <div className="seat-controls">
                <button onClick={handleDecrement}>-</button>
                <p>{value}</p>
                <button onClick={handleIncrement}>+</button>
              </div>
            </div>
          )}

          <button className="search-button" onClick={handleSearchRide}>
            {sessionStorage.getItem("user_type") === "commuter"
              ? "Search Ride"
              : "Create Ride"}
          </button>

          {/* Rides list appears in the same container, below the search button */}
          {showRidesList && <RidesList rides={ridesList} />}
        </div>
      </div>

      {isLoading && (
        <div className="loading-screen">
          <img
            src={loadingImg}
            alt="Loading..."
            style={{ width: "500px", height: "auto" }}
            className="loading-gif"
          />
          <p style={{ color: "#fff", marginTop: "10px", fontSize: "18px" }}>
            Finding your ride...
          </p>
        </div>
      )}
    </div>
  );
};

export default CarPool;
