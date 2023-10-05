

const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const authService = require('../services/authService');
async function registerUser(req, res) {
  const { name, username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await userService.getUserByUsername(username);

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await userService.createUser(name, username, hashedPassword);
    const token =await authService.generateToken(newUser.username)
    

    res.status(201).json({message:'user registered successfuly',token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering user' });
  }
}




async function getUser(req, res) {


  try {
    // Get user details for the authenticated user
    const user = await userService.getUserDetails();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user details as a response
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching user details' });
  }
}

module.exports = { getUser,registerUser };
