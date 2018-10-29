const logger = require("../../util/logger");

module.exports = async (_, context, socket) => {
  const { response } = context;
  if (response) {
    logger.info(`Sending response`);
    socket.emit('action', response);
  }
};
