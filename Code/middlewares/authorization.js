const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, nxt) => {
  try {
    const token = await req.header("x-auth-token");
    console.log(token);
    if (!token) {
      return res.status(400).json({
        message: "jwt is not defined",
        "status code": 400,
      });
    }
    const decodedpayload = await jwt.verify(token, config.get("jwtsec"));
    if (!decodedpayload.adminRole) {
      return res.status(401).json({
        message: "Unauthorized!",
        "status code": 401,
      });
    }
    nxt();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Please authenticate." });
  }
};

// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   token = req.cookies.jwt;

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       if (!decoded.adminRole) {
//         return res.status(401).json({
//           message: "Unauthorized!",
//           "status code": 401,
//         });
//       }

//       req.user = await User.findById(decoded.userId).select("-password");

//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error("Not authorized, token failed");
//     }
//   } else {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });

// module.exports = { protect };
