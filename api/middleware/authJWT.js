
/**
 * middleware that checks the jwt provided in the x-access-token header
 */
const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];
  if (token === 'undefined') token = null;
  // if no token is provided, deny access
  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }
  verifyToken (token)
  .then((decoded) => {
    req.currentUser = decoded.user;
    return next();
  })
  .catch(() => {
    return res.status(401).send({
      message: 'Unauthorized!',
    });
  })
};

export default verifyToken;
