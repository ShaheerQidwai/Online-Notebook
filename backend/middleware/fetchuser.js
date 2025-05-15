var jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
  try {
    const jwt_secret = "Shaheer@123";
    const data = jwt.verify(token, jwt_secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
