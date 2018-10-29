import {
  VALUE_CHANGE,
  SIGNOUT_USER,
  shouldShowloader,
  resetError
} from "../ducks/auth";

import {
  CHALLENGE_ERROR,
  CHALLENGE_FORM_SUBMIT,
  CHALLENGE_SUCCESS,
  LOGIN_ERROR,
  LOGIN_FORM_SUBMIT,
  LOGIN_SUCCESS,
  SIGNUP_CHALLENGE,
  SIGNUP_FORM_SUBMIT,
  SIGNUP_FORM_SUBMIT_ERROR,
  SIGNOUT
} from "../../../../shared/types";

const showShowLoaderFor = [
  LOGIN_FORM_SUBMIT,
  SIGNUP_FORM_SUBMIT,
  CHALLENGE_FORM_SUBMIT
];

const showHideLoaderFor = [
  VALUE_CHANGE,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_CHALLENGE,
  SIGNUP_FORM_SUBMIT_ERROR,
  CHALLENGE_SUCCESS,
  CHALLENGE_ERROR
];

export default ({ getState, dispatch }) => next => action => {
  next(action);
  const { type } = action;
  const { auth: { email } } = getState();

  if (showHideLoaderFor.indexOf(type) !== -1) {
    dispatch(shouldShowloader(false));
  } else if (showShowLoaderFor.indexOf(type) !== -1) {
    dispatch(shouldShowloader(true));
  }
  if (type === LOGIN_FORM_SUBMIT) {
    dispatch(resetError(true));
  }
  if (type === SIGNOUT_USER) {
    dispatch({
      type: SIGNOUT,
      payload: email
    })
  }
};
