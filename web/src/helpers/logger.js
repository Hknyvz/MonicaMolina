const winston = require("winston");
require("winston-mongodb");

const mongodbOptions = {
  level: "error",
  db: process.env.MONGODB_LOG,
  options: {
    useUnifiedTopology: true,
  },
  collection: "logs",
  expireAfterSeconds: 2592000,
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // Konsola loglama
    new winston.transports.MongoDB(mongodbOptions), // MongoDB'ye loglama
  ],
});

module.exports = logger;
