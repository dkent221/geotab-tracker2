const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/locations', async (req, res) => {
  try {
    const response = await axios.post(
      'https://my.geotab.com/apiv1',
      {
        method: 'Get',
        params: {
          typeName: 'Device',
          resultsLimit: 10
        },
        credentials: {
          database: process.env.GEOTAB_DATABASE,
          username: process.env.GEOTAB_USERNAME,
          password: process.env.GEOTAB_PASSWORD
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicle data' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ======================= FRONTEND: public/index.html =======================
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Shuttle Tracker</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="root"></div>
</body>
</html>

// ======================= FRONTEND: src/index.js =======================
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ======================= FRONTEND: src/App.js =======================
import React from 'react';
import MapView from './MapView';

function App() {
  return (
    <div className="app">
      <h1>Shuttle Tracker</h1>
      <MapView />
    </div>
  );
}

export default App;

