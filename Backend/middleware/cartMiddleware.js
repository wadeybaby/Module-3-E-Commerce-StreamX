import jwt from 'jsonwebtoken';
export const cartMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader); // Add this line
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Authorization Header: Missing or invalid');
    return res.status(401).json({ message: 'Authorization required' });
  }
  const token = authHeader.split(' ')[1];
  console.log('Extracted Token:', token); //add this line.
  if (!token) {
    console.log('Extracted Token: null');
    return res.status(401).json({ message: 'Authorization required' });
  }
  try {
    const decoded = jwt.verify(token, 'your_super_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
  
};
export default cartMiddleware