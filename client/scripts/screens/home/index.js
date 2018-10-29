import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Navbar, Form, Button } from "react-bootstrap";
import { css } from "emotion";
import * as AuthActionCreators from "../../redux/ducks/auth";

export const HOME_PATH = "/home";

class Home extends Component {
  render() {
    const { signOut } = this.props;

    return (
      <div
        className={css`
          display: flex;
          flex: 1;
          flex-direction: column;
        `}
      >
        <Navbar
          bg="light"
          variant="dark"
          className={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://uploads-ssl.webflow.com/5911c9453963fd7f6719341a/5a9007a119e7db0001fda5a5_wejo-logo-blue.svg"
              className="d-inline-block align-top"
              height="50"
              width="50"
            />
          </Navbar.Brand>
          <Form
            inline
            className={css`
              float: right;
            `}
            onSubmit={e => {
              e.preventDefault();
              signOut();
            }}
          >
            <Button size="sm" type="submit" variant="outline-dark">
              Sign Out
            </Button>
          </Form>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => {
  const authActionCreators = bindActionCreators(AuthActionCreators, dispatch);
  return {
    signOut: authActionCreators.signOut
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
