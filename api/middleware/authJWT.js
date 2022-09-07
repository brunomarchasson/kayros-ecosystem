import { verifyToken } from "../core";

/**
 * middleware that checks the jwt provided in the x-access-token header
 */
const isAuth = (req, res, next) => {
  let token = req.headers?.['x-access-token'];
  if (token === 'undefined') token = null;
  // if no token is provided, deny access
  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }
  return verifyToken (token)
  .then((decoded) => {
    console.log('decoded', decoded)
    req.currentUser = decoded.user;
    return next();
  })
  .catch((e) => {
    return res.status(401).send({
      message: 'Unauthorized!',
    });
  })
};

export default isAuth;
