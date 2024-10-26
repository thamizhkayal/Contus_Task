
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];
  
const decoded = jwt.verify(token, process.env.API_SECRET_KEY)

  if (!decoded) {
    return res.status(403).json({ error: 'Invalid or missing API key' });
  }

  next();
}

module.exports = authMiddleware;
