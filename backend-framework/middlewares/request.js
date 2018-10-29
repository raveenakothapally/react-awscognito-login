const { publicRoutes, privateRoutes } = require("../../socket-routes");

const isPrivateRoute = meta => meta && meta.private;

const isAuthorizedForPrivateRoute = (meta, context) => isPrivateRoute(meta) && context.isValidSession;

module.exports = async ({ type, payload, meta }, context, socket) => {
  if (typeof type !== 'string') {
    throw new Error("[BackendFramework][RequestMiddleware] Type is not valid", type);
  }

  let response;

  if (isAuthorizedForPrivateRoute(meta, context)) {
    response = await privateRoutes({ type, payload, meta }, socket);
  } else {
    response = await publicRoutes({ type, payload, meta }, socket);
  }

  context.response = response;
};
