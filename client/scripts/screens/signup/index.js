import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import { css } from "emotion";
import * as AuthActionCreators from "../../redux/ducks/auth";

import SignUpInternal from "./signup";
import Challenge, { CHALLENGE_PATH } from "./challenge";

export const SIGNUP_PATH = "/signup";

const _isEmailInvalid = errorCode => {
  return errorCode === "UsernameExistsException";
};

const _isPasswordInvalid = errorCode => {
  return errorCode === "InvalidPasswordException";
};

const _isVerificationCodeInvalid = errorCode => {
  return errorCode === "CodeMismatchException";
};

class SignUp extends Component {
  componentDidMount = () => {
    this.props.signUpPageLoaded();
  };

  render() {
    const {
      email,
      password,
      name,
      errorMessage,
      errorCode,
      verificationCode,
      isVerificationSuccess,
      loading,
      userName,
      onFieldChange,
      signup,
      answerChallenge
    } = this.props;

    const isEmailInvalid = _isEmailInvalid(errorCode);
    const isPasswordInvalid = _isPasswordInvalid(errorCode);
    const isVerificationCodeInvalid = _isVerificationCodeInvalid(errorCode);

    const CHALLENGE_PATH_ACTUAL = `${SIGNUP_PATH}${CHALLENGE_PATH}`;

    return (
      <main
        className={css`
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        `}
      >
        <header
          className={css`
            margin-bottom: 2vh;
            display: grid;
            grid-template-columns: 1.5fr 0.5fr;
            justify-content: center;
            align-items: center;
          `}
        >
          <img
            className={css`
                            max-width: 100px;
              width: 100px;
            `}
            src="https://uploads-ssl.webflow.com/5911c9453963fd7f6719341a/5a9007a119e7db0001fda5a5_wejo-logo-blue.svg"
          />
          <span
            className={css`
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0;
              margin: 0;
              font-size: 2rem;
              line-height: 2rem;
            `}
          >
            Sign Up
          </span>
        </header>
        <section
          className={css`
            max-width: 300px;
            width: 300px;
          `}
        >
          <Switch>
            <Route
              exact
              path={SIGNUP_PATH}
              render={props =>
                userName ? (
                  <Redirect to={CHALLENGE_PATH_ACTUAL} />
                ) : (
                  <SignUpInternal
                    email={email}
                    password={password}
                    name={name}
                    loading={loading}
                    errorMessage={errorMessage}
                    isEmailInvalid={isEmailInvalid}
                    isPasswordInvalid={isPasswordInvalid}
                    signup={signup}
                    onFieldChange={onFieldChange}
                    {...props}
                  />
                )
              }
            />
            <Route
              path={CHALLENGE_PATH_ACTUAL}
              render={props => (
                <Challenge
                  userName={userName}
                  verificationCode={verificationCode}
                  errorMessage={errorMessage}
                  isVerificationSuccess={isVerificationSuccess}
                  answerChallenge={answerChallenge}
                  isVerificationCodeInvalid={isVerificationCodeInvalid}
                  onFieldChange={onFieldChange}
                  loading={loading}
                  {...props}
                />
              )}
            />
          </Switch>
        </section>
      </main>
    );
  }
}

const mapStateToProps = ({
  auth: {
    email,
    password,
    name,
    errorMessage,
    errorCode,
    loading,
    userName,
    verificationCode,
    isVerificationSuccess
  }
}) => ({
  email,
  password,
  name,
  errorMessage,
  errorCode,
  verificationCode,
  loading,
  userName,
  isVerificationSuccess
});

const mapDispatchToProps = dispatch => {
  const authActionCreators = bindActionCreators(AuthActionCreators, dispatch);
  return {
    onFieldChange: authActionCreators.onFieldChange,
    signup: authActionCreators.signup,
    signUpPageLoaded: authActionCreators.authPageLoaded,
    answerChallenge: authActionCreators.answerChallenge
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUp)
);
