const prisma = require('../prisma');

async function getUserByUsername(username) {
  try {
    return await prisma.user.findUnique({
      where: { username },
    });
  } catch (error) {
    throw error;
  }
}

async function createUser(name, username, password) {
  try {
    return await prisma.user.create({
      data: {
        name,
        username,
        password,
      },
    });
  } catch (error) {
    throw error;
  }
}


async function getUserDetails() {
    try {
      return await prisma.user.findMany({
      
      });
    } catch (error) {
      throw error;
    }
  }

module.exports = { getUserByUsername, createUser,getUserDetails };
