const jwt = require("jsonwebtoken");

module.exports  = (user, res)=>{
  const token = jwt.sign({ 
    userId : user._id,
    Role : user.isAdmin },
    process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 30 days
  });
  return token;
};


