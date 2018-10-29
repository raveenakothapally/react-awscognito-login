import createReducer from "../../library/createReducer";
import {
  LOGIN_FORM_SUBMIT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,

  SIGNUP_FORM_SUBMIT,
  SIGNUP_FORM_SUBMIT_ERROR,
  SIGNUP_CHALLENGE,

  CHALLENGE_FORM_SUBMIT,
  CHALLENGE_SUCCESS,
  CHALLENGE_ERROR,

  RESET_PASSWORD_FORM_SUBMIT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,

  RESET_PASSWORD_VERIFICATION_FORM_SUBMIT,
  RESET_PASSWORD_VERIFICATION_SUCCESS,
  RESET_PASSWORD_VERIFICATION_ERROR

} from "../../../../shared/types";

export const SIGNOUT_USER = "auth/user/signout";
export const VALUE_CHANGE = "auth/field/change";
export const AUTH_PAGE_LOADED = "auth/page/loaded";
export const SHOULD_SHOW_LOADER = "auth/page/loader";
export const RESET_ERROR = "auth/page/error/reset";

const initialState = {
  $auth: null,
  email: "",
  password: "",
  name: "",
  errorMessage: "",
  errorCode: "",
  userName: "",
  verificationCode: "",
  userConfirmed: "",
  isVerificationSuccess: false,
  loading: false
};

export default createReducer(initialState, {
  [SHOULD_SHOW_LOADER]: (state, { payload }) => ({
    ...state,
    loading: payload
  }),
  [RESET_ERROR]: state => ({
    ...state,
    errorMessage: "",
    errorCode: ""
  }),
  [LOGIN_SUCCESS]: (state, { payload }) => ({
    ...state,
    $auth: payload
  }),
  [LOGIN_ERROR]: (
    state,
    { payload: { code: errorCode, message: errorMessage } }
  ) => ({
    ...state,
    errorCode,
    errorMessage
  }),
  [VALUE_CHANGE]: (state, { payload: { name, value } }) => ({
    ...state,
    errorMessage: "",
    errorCode: "",
    [name]: value
  }),
  [SIGNUP_FORM_SUBMIT_ERROR]: (
    state,
    { payload: { code: errorCode, message: errorMessage } }
  ) => ({
    ...state,
    errorCode,
    errorMessage
  }),
  [SIGNUP_CHALLENGE]: (state, { payload: { userName, userConfirmed } }) => ({
    ...state,
    userName,
    userConfirmed
  }),
  [CHALLENGE_SUCCESS]: (state, { payload: { isVerificationSuccess } }) => ({
    ...state,
    isVerificationSuccess
  }),
  [CHALLENGE_ERROR]: (
    state,
    { payload: { code: errorCode, message: errorMessage } }
  ) => ({
    ...state,
    errorCode,
    errorMessage
  }),
  [SIGNOUT_USER]: state => ({
    ...state,
    ...initialState
  })
});

export const shouldShowloader = shouldShow => ({
  type: SHOULD_SHOW_LOADER,
  payload: shouldShow
});

export const resetError = () => ({
  type: RESET_ERROR
});

export const signOut = () => ({
  type: SIGNOUT_USER
});

export const authPageLoaded = () => ({
  type: AUTH_PAGE_LOADED
});

export const login = credentials => ({
  type: LOGIN_FORM_SUBMIT,
  payload: credentials
});

export const resetPassword = userName => ({
  type: RESET_PASSWORD_FORM_SUBMIT,
  payload: userName
});

export const resetPasswordVerifyCode = verificationCode => ({
  type: LOGIN_FORM_SUBMIT,
  payload: verificationCode
});


export const signup = credentials => ({
  type: SIGNUP_FORM_SUBMIT,
  payload: credentials
});

export const answerChallenge = credentials => ({
  type: CHALLENGE_FORM_SUBMIT,
  payload: credentials
});

export const onFieldChange = (name, value) => ({
  type: VALUE_CHANGE,
  payload: { name, value }
});
