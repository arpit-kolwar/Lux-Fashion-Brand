const createError = require("./Error");
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) return next(createError(403, "Token is not valid"));
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user.user._id);
    // console.log(req.params.id);

    if (req.user.user._id === req.params.id || req.user.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user.user._id);
    // console.log(req.user.user.isAdmin);
    if (req.user.user.isAdmin === true) {
      next();
    } else {
      return next(createError(403, "You are not admin"));
    }
  });
};

module.exports = { verifyUser, verifyAdmin };
