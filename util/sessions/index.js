const { registerUser, verifyVerificationCodeForUser, login, signOut } = require("./aws-cognito");

const isValidSession = async () => {
  return false;
};

module.exports = {
  isValidSession,
  registerUser,
  verifyVerificationCodeForUser,
  login,
  signOut
};