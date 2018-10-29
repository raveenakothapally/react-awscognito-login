import React from "react";
import { css } from "emotion";
import { Redirect } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";

import { SIGNUP_PATH } from "./index";
import { HOME_PATH } from "../home";
export const CHALLENGE_PATH = "/challenge";

export default ({
  userName,
  verificationCode,
  isVerificationSuccess,
  errorMessage,
  answerChallenge,
  isVerificationCodeInvalid,
  onFieldChange,
  loading
}) => {

  if (!userName) {
    return <Redirect to={SIGNUP_PATH} />
  } else if (isVerificationSuccess) {
    return <Redirect to={HOME_PATH} />
  }

  return (
    <Form
      className={css`
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 300px;
      `}
      onSubmit={e => {
        e.preventDefault();
        answerChallenge({ userName, verificationCode });
      }}
    >
      <Alert variant="success">Check your email for verification code!</Alert>
      <Form.Group controlId="formBasicVerificationCode">
        <Form.Label>Verification Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Code..."
          value={verificationCode}
          onChange={({ target: { value } }) =>
            onFieldChange("verificationCode", value)
          }
          isInvalid={isVerificationCodeInvalid}
        />
        <Form.Control.Feedback type={isVerificationCodeInvalid ? "invalid" : "valid"}>
          {isVerificationCodeInvalid ? errorMessage : ""}
        </Form.Control.Feedback>
      </Form.Group>

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
};
