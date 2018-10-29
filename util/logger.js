const winston = require("winston");
const { logFile, isProduction } = require("./app-env");

const logger = winston.createLogger({
  level: "info",
  transports: [new winston.transports.File({ filename: logFile })]
});

if (!isProduction) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

module.exports = logger;
