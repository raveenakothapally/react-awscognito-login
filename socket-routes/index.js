const path = require("path");
const fs = require("fs");

const publicDirectoryPath = path.join(__dirname, "public");
const privateDirectoryPath = path.join(__dirname, "private");

const publicRouteHandlers = fs
  .readdirSync(publicDirectoryPath)
  .map(file => require(path.join(publicDirectoryPath, file)))
  .reduce(
    (acc, next) => ({
      ...acc,
      ...next
    }),
    {}
  );
const privateRouteHandlers = fs
  .readdirSync(privateDirectoryPath)
  .map(file => require(path.join(privateDirectoryPath, file)))
  .reduce(
    (acc, next) => ({
      ...acc,
      ...next
    }),
    {}
  );

const handleRequest = async (handler, payload, socket) => {
  if (handler) {
    return await handler(payload, socket);
  }
};

module.exports = {
  publicRoutes: async ({ type, payload }, socket) => {
    return handleRequest(publicRouteHandlers[type], payload, socket);
  },
  privateRoutes: async ({ type, payload }, socket) => {
    return handleRequest(privateRouteHandlers[type], payload, socket);
  }
};
