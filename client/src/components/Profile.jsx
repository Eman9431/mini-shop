import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Profile() {
  const { userName, userId } = useSelector((state) => state.auth);
  const [ip, setIp] = useState(null);
  const [country, setCountry] = useState(null);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getGeoLocation = async () => {
    try {
      const response = await axios.get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_CQsTmpQxMJfYmtlNWj5PFQ5tCuzAW"
      );
      
      setIp(response.data.ip);
      setCountry(response.data.location?.country || "Unknown");
      setRegion(response.data.location?.region || "Unknown");
      setLoading(false);
    } catch (err) {
      console.error("Error fetching geolocation data:", err.message);
      setError("Failed to load location data");
      setLoading(false);
    }
  };

  useEffect(() => {
    getGeoLocation();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Profile</h2>
      <hr />
      <div style={{ marginBottom: "20px" }}>
        <h5>Account Information</h5>
        <p><strong>Username:</strong> {userName}</p>
        <p><strong>User ID:</strong> {userId}</p>
      </div>
      
      <h5>Location Information</h5>
      {loading ? (
        <p>Loading location data...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div>
          <p><strong>IP Address:</strong> {ip}</p>
          <p><strong>Country:</strong> {country}</p>
          <p><strong>Region:</strong> {region}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;