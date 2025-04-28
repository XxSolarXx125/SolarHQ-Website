const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const loginsFilePath = path.join(__dirname, 'public', 'logins.json');

// Ensure logins.json exists
if (!fs.existsSync(loginsFilePath)) {
  fs.writeFileSync(loginsFilePath, '{}');
}

// Register new account
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Missing fields.');
  }

  const logins = JSON.parse(fs.readFileSync(loginsFilePath, 'utf8'));

  if (logins[username]) {
    return res.status(409).send('Username already exists.');
  }

  logins[username] = password;
  fs.writeFileSync(loginsFilePath, JSON.stringify(logins, null, 2));
  
  res.status(200).send('Registered successfully.');
});

// Serve logins.json for frontend login checking
app.get('/logins.json', (req, res) => {
  res.sendFile(loginsFilePath);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
