import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider as ReactReduxProvider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import store, { persistor, history } from "./redux/store";
import App from "./screens/app";

import "./global-styles";

class Wejo extends Component {
  static KEY_DOWN_EVENT = "keydown";
  static ASCII_R = 82;

  registerPersistorPurge = async e => {
    if (e.keyCode === Wejo.ASCII_R && e.ctrlKey) {
      await persistor.purge();
      location.reload();
    }
  };

  componentDidMount = () => {
    document.addEventListener(Wejo.KEY_DOWN_EVENT, this.registerPersistorPurge);
  };

  componentWillUnmount() {
    document.removeEventListener(
      Wejo.KEY_DOWN_EVENT,
      this.registerPersistorPurge
    );
  }

  render() {
    return (
      <ReactReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </PersistGate>
      </ReactReduxProvider>
    );
  }
}

ReactDOM.render(<Wejo />, document.getElementById("wejo-root"));
