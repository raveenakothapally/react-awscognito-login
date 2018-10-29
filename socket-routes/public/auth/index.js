const {
  SIGNUP_FORM_SUBMIT,
  CHALLENGE_FORM_SUBMIT,
  LOGIN_FORM_SUBMIT,
  RESET_PASSWORD_FORM_SUBMIT,
  SIGNOUT
} = require("../../../shared/types/index");
const {
  handleUserRegistration,
  handleUserRegistrationChallenge,
  loginUser,
  resetUserPassword,
  signOutUser
} = require("./auth");

module.exports = {
  [SIGNUP_FORM_SUBMIT]: async ({ email, password, name }) => {
    return await handleUserRegistration(email, password, name);
  },
  [CHALLENGE_FORM_SUBMIT]: async ({ userName, verificationCode }) => {
    return await handleUserRegistrationChallenge(userName, verificationCode);
  },
  [LOGIN_FORM_SUBMIT]: async ({ email, password }) => {
    return await loginUser(email, password);
  },
  [RESET_PASSWORD_FORM_SUBMIT]: async (userName) => {
    return await resetUserPassword(userName);
  },
  [SIGNOUT]: async email => {
    signOutUser(email);
  }
};
