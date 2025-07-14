import React, { useEffect, useState } from "react";
import { Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const Statistics = () => {
  const [urls, setUrls] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shortUrls") || "{}");
    setUrls(stored);
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>
      {Object.values(urls).map((url) => (
        <Paper key={url.id} style={{ marginBottom: 20, padding: 10 }}>
          <Typography><strong>Short:</strong> http://localhost:3000/{url.id}</Typography>
          <Typography><strong>Original:</strong> {url.longUrl}</Typography>
          <Typography><strong>Created:</strong> {url.createdAt}</Typography>
          <Typography><strong>Expires:</strong> {url.expiresAt}</Typography>
          <Typography><strong>Total Clicks:</strong> {url.clicks.length}</Typography>
          <List>
            {url.clicks.map((click, i) => (
              <ListItem key={i}>
                <ListItemText primary={`Time: ${click.time}, Source: ${click.source}, Location: ${click.location}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </div>
  );
};

export default Statistics;
