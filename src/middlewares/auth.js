const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth = (...requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

const verifyAuthority = (requiredRole) => async (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];

  // Check if authorization header is missing or doesn't start with 'Bearer '
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is missing or invalid' });
  }

  // Extract token from header
  const token = authorizationHeader.split(' ')[1];

  // Verify the token using the async/await function
  const { valid, expired, decoded }  = await tokenService.verifyToken(token);

  if (!valid) {
    if (expired) {
      return res.status(401).json({ message: errorCode.expire.message, errorCode : errorCode.expire.code });
    } else {
      return res.status(401).json({ message: errorCode.invalid.message, errorCode : errorCode.invalid.code});
    }
  }

 let user = decoded;
  req.user = user;

  let userRole = user.role;
  // convert role to userRole object
  userRole = userRoles.getRole(userRole);
  user.role = userRole;

  if (userRole.level >= requiredRole.level) {
    next();
  } else {
    return res.status(httpStatus.FORBIDDEN).json({ message: 'You are not authorized to access the resource !' });
  }
};

module.exports = {auth,verifyAuthority};
