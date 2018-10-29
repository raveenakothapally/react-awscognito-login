export default store => next => action => {
  const { type, meta } = action;
  const state = store.getState();

  const serverRequestMatch = type.match(/^server:\/\/(.*)/);
  if (serverRequestMatch && meta && meta.private && state.auth.$auth) {
    action.payload = {
      data: action.payload,
      $auth: state.auth.$auth
    };
  }
  return next(action);
};
