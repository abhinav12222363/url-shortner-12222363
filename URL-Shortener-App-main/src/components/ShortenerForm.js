import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Paper } from "@mui/material";
import { generateShortCode, isValidUrl } from "../utils/helpers";
import { logEvent } from "../middleware/logger";

const ShortenerForm = ({ addUrl }) => {
  const [inputs, setInputs] = useState(
    Array.from({ length: 5 }, () => ({ longUrl: "", validity: "", shortcode: "" }))
  );
  const [errors, setErrors] = useState([]);

  const handleInputChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index] = {
      ...newInputs[index],
      [field]: value,
    };
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    const newErrors = [];
    const result = [];

    inputs.forEach((input, idx) => {
      if (!input.longUrl) return;

      if (!isValidUrl(input.longUrl)) {
        newErrors[idx] = "Invalid URL format";
        return;
      }

      let short = input.shortcode || generateShortCode();
      const validity = input.validity ? parseInt(input.validity) : 30;

      if (isNaN(validity)) {
        newErrors[idx] = "Validity must be a number";
        return;
      }

      const existing = JSON.parse(localStorage.getItem("shortUrls") || "{}");

      if (existing[short]) {
        newErrors[idx] = "Shortcode already exists";
        return;
      }

      const createdAt = new Date();
      const expiresAt = new Date(createdAt.getTime() + validity * 60000);

      const shortUrl = {
        id: short,
        longUrl: input.longUrl,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        clicks: [],
      };

      existing[short] = shortUrl;
      localStorage.setItem("shortUrls", JSON.stringify(existing));
      logEvent("URL_CREATED", shortUrl);

      result.push(shortUrl);
    });

    setErrors(newErrors);
    if (result.length > 0) {
      addUrl(result);
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
      <Typography variant="h4">Shorten up to 5 URLs</Typography>
      {inputs.map((input, idx) => (
        <Paper key={idx} style={{ padding: 10, marginTop: 10 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Long URL"
                value={input.longUrl}
                onChange={(e) => handleInputChange(idx, "longUrl", e.target.value)}
                error={!!errors[idx]}
                helperText={errors[idx]}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Validity (minutes)"
                value={input.validity}
                onChange={(e) => handleInputChange(idx, "validity", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Custom Shortcode"
                value={input.shortcode}
                onChange={(e) => handleInputChange(idx, "shortcode", e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: 20 }}
      >
        Shorten URLs
      </Button>
    </div>
  );
};

export default ShortenerForm;
