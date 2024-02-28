const jwt = require("jsonwebtoken");
const { Unauthenticated } = require("../errors");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("Authentication Invalid", "Bearer Token not found");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId, email: payload.email };
    next();
  } catch (error) {
    throw new Unauthenticated("Authentication Invalid", "Could not parse token");
  }
};

module.exports = authenticateUser;
