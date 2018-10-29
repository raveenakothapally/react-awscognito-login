import { css } from "emotion";
import { Link } from "react-router-dom";
import { HOME_PATH } from "../home";
import { Button, Form } from "react-bootstrap";
import React, { Fragment } from "react";

import { LOGIN_PATH } from "../login";
import { FORGOT_PASSWORD_PATH } from "../reset-password";

export default ({
  email,
  password,
  name,
  loading,
  errorMessage,
  isEmailInvalid,
  isPasswordInvalid,
  signup,
  onFieldChange
}) => (
  <Form
    className={css`
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 300px;
    `}
    onSubmit={e => {
      e.preventDefault();
      signup({ email, password, name });
    }}
  >
    <Form.Group controlId="formBasicName">
      <Form.Label>Full Name</Form.Label>
      <Form.Control
        type="fullName"
        placeholder="Your name"
        value={name}
        onChange={({ target: { value } }) => onFieldChange("name", value)}
      />
    </Form.Group>

    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={({ target: { value } }) => onFieldChange("email", value)}
        isInvalid={isEmailInvalid}
      />
      <Form.Control.Feedback type={isEmailInvalid ? "invalid" : "valid"}>
        {isEmailInvalid ? errorMessage : "Valid email"}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        value={password}
        onChange={({ target: { value } }) => onFieldChange("password", value)}
        isInvalid={isPasswordInvalid}
      />
      <Form.Control.Feedback type={isPasswordInvalid ? "invalid" : "valid"}>
        {isPasswordInvalid ? errorMessage : ""}
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
      {isEmailInvalid ? (
        <Fragment>
          <Link to={HOME_PATH}>Go to home page</Link>
          <Link to={FORGOT_PASSWORD_PATH}>Forgot Password</Link>
        </Fragment>
      ) : (
        <Link to={LOGIN_PATH}>Return to login</Link>
      )}
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
);
