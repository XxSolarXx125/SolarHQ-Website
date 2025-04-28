// server.js

const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Serve static files (index.html, login.js, etc.)

const LOGINS_FILE = __dirname + '/logins.json';

// Create the logins file if it doesn't exist
if (!fs.existsSync(LOGINS_FILE)) {
  fs.writeFileSync(LOGINS_FILE, JSON.stringify({}, null, 2));
}

// Endpoint to register new users
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ success: false, message: 'Username and password required.' });
  }

  let logins = JSON.parse(fs.readFileSync(LOGINS_FILE));

  if (logins[username]) {
    return res.json({ success: false, message: 'Username already exists.' });
  }

  logins[username] = password;
  fs.writeFileSync(LOGINS_FILE, JSON.stringify(logins, null, 2));
  
  res.json({ success: true, message: 'User registered successfully.' });
});

// Start server
app.listen(PORT, () => {
  console.log(`SolarHQ server running at http://localhost:${PORT}`);
});
