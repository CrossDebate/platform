const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

// Serve static files
app.use(express.static(__dirname));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
