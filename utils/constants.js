const urlRegex =
  /^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i;
const limiterSettings = {
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
};

const DB_URL = process.env.MONGODB_URI;

module.exports = {
  urlRegex,
  limiterSettings,
  DB_URL,
};
