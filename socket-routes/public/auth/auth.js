const {
  SIGNUP_FORM_SUBMIT_ERROR,
  SIGNUP_CHALLENGE,
  CHALLENGE_SUCCESS,
  CHALLENGE_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_VERIFICATION_SUCCESS,
  RESET_PASSWORD_VERIFICATION_ERROR
} = require("../../../shared/types/index");
const {
  registerUser,
  verifyVerificationCodeForUser,
  login,
  signOut
} = require("../../../util/sessions/index");

const handleUserRegistration = async (email, password, name) => {
  try {
    const { user, userConfirmed } = await registerUser(email, password, name);
    return {
      type: SIGNUP_CHALLENGE,
      payload: {
        userName: user.getUsername(),
        userConfirmed
      }
    };
  } catch (error) {
    return {
      type: SIGNUP_FORM_SUBMIT_ERROR,
      payload: error
    };
  }
};

const handleUserRegistrationChallenge = async (username, verificationCode) => {
  try {
    const resp = await verifyVerificationCodeForUser(
      username,
      verificationCode
    );
    const isVerificationSuccess = resp === "SUCCESS";
    return {
      type: CHALLENGE_SUCCESS,
      payload: {
        isVerificationSuccess
      }
    };
  } catch (error) {
    return {
      type: CHALLENGE_ERROR,
      payload: error
    };
  }
};

const loginUser = async (email, password) => {
  try {
    const resp = await login(email, password);
    return {
      type: LOGIN_SUCCESS,
      payload: resp
    };
  } catch (error) {
    return {
      type: LOGIN_ERROR,
      payload: error
    };
  }
};

const resetUserPassword = async (userName) => {
  try {
    // Reset logic
  } catch (error) {
    return {
      type: RESET_PASSWORD_ERROR,
      payload: error
    };
  }
};

const signOutUser = email => {
  signOut(email);
};

module.exports = {
  handleUserRegistration,
  handleUserRegistrationChallenge,
  loginUser,
  signOutUser,
  resetUserPassword
};
