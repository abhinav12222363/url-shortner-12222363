import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { logEvent } from "../middleware/logger";

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("shortUrls") || "{}");
    const entry = data[shortcode];

    if (entry) {
      const now = new Date();
      const expiry = new Date(entry.expiresAt);

      if (now < expiry) {
        const clickInfo = {
          time: now.toISOString(),
          source: "Direct/Manual", // Simulate source
          location: "Unknown", // Simulated, as client-only
        };

        entry.clicks.push(clickInfo);
        logEvent("URL_CLICKED", { shortcode, clickInfo });
        localStorage.setItem("shortUrls", JSON.stringify(data));
        window.location.href = entry.longUrl;
      } else {
        alert("Link has expired.");
      }
    } else {
      alert("Invalid shortcode.");
    }
  }, [shortcode]);

  return <div>Redirecting...</div>;
};

export default RedirectHandler;
