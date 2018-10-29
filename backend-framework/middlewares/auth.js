const logger = require("../../util/logger");
const { isValidSession } = require("../../util/sessions");

module.exports = async ({ meta }, context) => {
  if (meta && meta.sessionData) {
    context.isValidSession = await isValidSession(meta.sessionData);
    logger.info(`User session is ${context.isValidSession ? "" : "not "}valid`);
  } else {
    logger.info(`User request does not contain auth token`);
  }
};
