const jwt = require('jsonwebtoken');
const secretKey ='shubham';

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  console.log(req.headers)

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
console.log(token.split(' ')[1])
  jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = { authenticateToken };
