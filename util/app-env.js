const path = require("path");

const { name: appName } = require(path.join(__dirname, "..", "package.json"));
const isProduction = process.env.NODE_ENV !== "production";

module.exports = {
  appName,
  logFile: `${path.join(__dirname, "..", `${appName}.log`)}`,
  isProduction
};
