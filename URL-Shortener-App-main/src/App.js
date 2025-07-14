import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ShortenerForm from "./components/ShortenerForm";
import Statistics from "./components/Statistics";
import RedirectHandler from "./components/RedirectHandler";
import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";

function App() {
  const [shortened, setShortened] = useState([]);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/stats">Statistics</Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: 20 }}>
        <Routes>
          <Route path="/" element={<ShortenerForm addUrl={setShortened} />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/:shortcode" element={<RedirectHandler />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
