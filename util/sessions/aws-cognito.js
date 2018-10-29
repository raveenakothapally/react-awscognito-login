const {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} = require("amazon-cognito-identity-js");
const { amazon_aws_cognito } = require("../../secret.json");

const userPool = new CognitoUserPool(amazon_aws_cognito);

const registerUser = (email, password, name) => {
  const attributeList = [];
  attributeList.push(
    new CognitoUserAttribute({
      Name: "name",
      Value: name
    })
  );

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const verifyVerificationCodeForUser = async (username, verificationCode) => {
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool
  });

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const login = (email, password) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password
  });

  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userPool
  });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        resolve({
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken()
        });
      },
      onFailure: err => {
        reject(err);
      }
    });
  });
};

const signOut = email => {

  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userPool
  });

  cognitoUser.signOut();
};

module.exports = {
  registerUser,
  verifyVerificationCodeForUser,
  login,
  signOut
};
