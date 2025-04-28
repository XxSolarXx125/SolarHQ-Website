// Check if already logged in
window.onload = function() {
  const username = localStorage.getItem('username');
  if (username) {
    showWelcome(username);
  }
};

function login() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  fetch('/logins.json')
    .then(response => response.json())
    .then(data => {
      if (data[username] && data[username] === password) {
        localStorage.setItem('username', username);
        showWelcome(username);
      } else {
        alert('Invalid username or password.');
      }
    })
    .catch(() => alert('Login system unavailable.'));
}

function signup() {
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  if (username === '' || password === '') {
    alert('Please fill all fields.');
    return;
  }

  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => {
    if (response.ok) {
      localStorage.setItem('username', username);
      showWelcome(username);
    } else {
      alert('Username already taken.');
    }
  })
  .catch(() => alert('Signup system unavailable.'));
}

function showWelcome(username) {
  document.getElementById('auth-area').style.display = 'none';
  document.getElementById('welcome-area').style.display = 'block';
  document.getElementById('welcome-msg').innerText = `Welcome, ${username}!`;
}

function logout() {
  localStorage.removeItem('username');
  document.getElementById('auth-area').style.display = 'block';
  document.getElementById('welcome-area').style.display = 'none';
}
