const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_KEY,
//   api_secret: process.env.CLOUD_KEY_SECRET,
// });

cloudinary.config({
  cloud_name: "dmua4axn3",
  api_key: "218658178575793",
  api_secret: "Hkt1AUnBiaG0NYrXssvVCYf1AgU",
  //   secure: true,
});

module.exports = { cloudinary };
