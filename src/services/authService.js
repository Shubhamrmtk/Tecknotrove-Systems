const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

const secretKey ='shubham'; 

async function authenticateUser(username, password) {
  try {
    // Find the user in the database by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return null; // User not found
    }

    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return null; // Passwords don't match
    }

    return user;
  } catch (error) {
    throw error;
  }
}

function generateToken(username) {
  return jwt.sign({ username }, secretKey, { expiresIn: '1h' });
}

module.exports = { authenticateUser, generateToken };
