import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { css } from "emotion";

import * as AuthActionCreators from "../../redux/ducks/auth";
import Challenge, { CHALLENGE_PATH } from "../signup/challenge";
import { Button, Form } from "react-bootstrap";
import { LOGIN_PATH } from "../login";

export const FORGOT_PASSWORD_PATH = "/forgotPassword";

const _isEmailInvalid = errorCode => {
  return errorCode === "UsernameExistsException";
};

const _isCodeInvalid = errorCode => {
  return errorCode === "CodeMismatchException";
};

class ForgotPassword extends Component {
  componentDidMount = () => {
    this.props.resetData();
  };

  render() {
    const {
      email,
      userName,
      verificationCode,
      isVerificationSuccess,
      errorMessage,
      errorCode,
      loading,
      resetPassword,
      onFieldChange,
      resetPasswordVerifyCode
    } = this.props;

    const isEmailInvalid = _isEmailInvalid(errorCode);
    const isVerificationCodeInvalid = _isCodeInvalid(errorCode);

    const CHALLENGE_PATH_ACTUAL = `${FORGOT_PASSWORD_PATH}${CHALLENGE_PATH}`;

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
              font-size: 1.5rem;
              line-height: 1.5rem;
            `}
          >
            Reset Password
          </span>
        </header>
        <section
          className={css`
            min-width: 300px;
          `}
        >
          <Switch>
            <Route
              exact
              path={FORGOT_PASSWORD_PATH}
              render={() =>
                userName ? (
                  <Redirect to={CHALLENGE_PATH_ACTUAL} />
                ) : (
                  <Form
                    className={css`
                      display: flex;
                      flex-direction: column;
                      flex: 1;
                      min-width: 300px;
                    `}
                    onSubmit={e => {
                      e.preventDefault();
                      resetPassword(email);
                    }}
                  >
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Email..."
                        value={email}
                        onChange={({ target: { value } }) =>
                          onFieldChange("email", value)
                        }
                        isInvalid={isEmailInvalid}
                      />
                      <Form.Control.Feedback
                        type={isEmailInvalid ? "invalid" : "valid"}
                      >
                        {isEmailInvalid ? errorMessage : ""}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div
                      className={css`
                        display: flex;
                        justify-content: space-between;
                        margin-top: -1vh;
                        margin-bottom: 1vh;
                        flex: 1;
                        font-size: 0.8rem;
                      `}
                    >
                      <Link to={LOGIN_PATH}>Return to login</Link>
                    </div>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={loading}
                      className={css`
                        flex: 1;
                      `}
                    >
                      {loading ? "Processing Request..." : "Submit"}
                    </Button>
                  </Form>
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
                  resetPasswordChallenge={resetPasswordVerifyCode}
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
    userName,
    verificationCode,
    errorMessage,
    errorCode,
    loading,
    isVerificationSuccess
  }
}) => ({
  email,
  userName,
  verificationCode,
  isVerificationSuccess,
  errorMessage,
  errorCode,
  loading
});

const mapDispatchToProps = dispatch => {
  const authActionCreators = bindActionCreators(AuthActionCreators, dispatch);
  return {
    onFieldChange: authActionCreators.onFieldChange,
    resetPassword: authActionCreators.resetPassword,
    resetPasswordVerifyCode: authActionCreators.resetPasswordVerifyCode,
    resetData: authActionCreators.authPageLoaded
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ForgotPassword)
);
