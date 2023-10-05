const authService = require('../services/authService');

async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Authenticate the user using the provided username and password
    const user = await authService.authenticateUser(username, password);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token for the authenticated user
    const token = authService.generateToken(username);

    // Return the token as a response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
}

module.exports = { login };
