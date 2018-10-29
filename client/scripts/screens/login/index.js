import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { css } from "emotion";
import { Alert, Button, Form } from "react-bootstrap";
import * as AuthActionCreators from "../../redux/ducks/auth";
import { SIGNUP_PATH } from "../signup";
import { FORGOT_PASSWORD_PATH } from "../reset-password";

const _isCredInvalid = errorCode => {
  return errorCode === "NotAuthorizedException";
};

const _isEmailInvalid = errorCode => {
  return errorCode === "UserNotFoundException";
};

export const LOGIN_PATH = "/login";

class Login extends Component {
  render() {
    const {
      loginEmail,
      loginPassword,
      loading,
      errorCode,
      errorMessage,
      login,
      onFieldChange
    } = this.props;
    const isEmailInvalid = _isEmailInvalid(errorCode);
    const isCredInvalid = _isCredInvalid(errorCode);

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
            justify-content: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          <img
            className={css`
              width: 20vw;
              margin-bottom: 2vh;
            `}
            src="https://uploads-ssl.webflow.com/5911c9453963fd7f6719341a/5a9007a119e7db0001fda5a5_wejo-logo-blue.svg"
          />
          <h3
            className={css`
              text-align: center;
              margin-bottom: 2vh;
            `}
          >
            Portal Login
          </h3>
        </header>
        <section>
          <Form
            className={css`
              display: flex;
              flex-direction: column;
              flex: 1;
              min-width: 300px;
            `}
            onSubmit={e => {
              e.preventDefault();
              login({ email: loginEmail, password: loginPassword });
            }}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={loginEmail}
                onChange={({ target: { value } }) =>
                  onFieldChange("loginEmail", value)
                }
                isInvalid={isEmailInvalid || isCredInvalid}
              />
              <Form.Control.Feedback
                type={isEmailInvalid ? "invalid" : "valid"}
              >
                {isEmailInvalid ? errorMessage : "Valid email"}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={({ target: { value } }) =>
                  onFieldChange("loginPassword", value)
                }
                isInvalid={isCredInvalid}
              />
            </Form.Group>

            {isCredInvalid ? (
              <Alert variant="danger">{errorMessage}</Alert>
            ) : null}

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
              <Link to={SIGNUP_PATH}>Sign Up</Link>
              <Link to={FORGOT_PASSWORD_PATH}>Forgot Password</Link>
            </div>

            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className={css`
                flex: 1;
              `}
            >
              {loading ? "Logging you in..." : "Submit"}
            </Button>
          </Form>
        </section>
      </main>
    );
  }
}

const mapStateToProps = ({
  auth: { loginEmail, loginPassword, loading, errorCode, errorMessage }
}) => ({
  loginEmail,
  loginPassword,
  loading,
  errorCode,
  errorMessage
});

const mapDispatchToProps = dispatch => {
  const authActionCreators = bindActionCreators(AuthActionCreators, dispatch);
  return {
    login: authActionCreators.login,
    onFieldChange: authActionCreators.onFieldChange
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
