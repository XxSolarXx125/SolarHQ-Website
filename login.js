// login.js

// Check if user is already logged in
window.onload = function() {
  const username = localStorage.getItem('username');
  if (username) {
    showWelcome(username);
  }
};

function login() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!username || !password) {
    alert('Please fill in both fields.');
    return;
  }

  fetch('/logins.json')
    .then(res => res.json())
    .then(data => {
      if (data[username] && data[username] === password) {
        localStorage.setItem('username', username);
        showWelcome(username);
      } else {
        alert('Incorrect username or password.');
      }
    })
    .catch(() => {
      alert('Login system error.');
    });
}

function signup() {
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  if (!username || !password) {
    alert('Please fill in both fields.');
    return;
  }

  fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(response => {
    if (response.success) {
      localStorage.setItem('username', username);
      showWelcome(username);
    } else {
      alert(response.message);
    }
  })
  .catch(() => {
    alert('Signup system error.');
  });
}

function logout() {
  localStorage.removeItem('username');
  document.getElementById('auth-section').style.display = 'block';
  document.getElementById('welcome-section').style.display = 'none';
}

function showWelcome(username) {
  document.getElementById('auth-section').style.display = 'none';
  document.getElementById('welcome-msg').textContent = `Welcome, ${username}!`;
  document.getElementById('welcome-section').style.display = 'block';
}
