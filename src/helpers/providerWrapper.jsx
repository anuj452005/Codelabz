import React from "react";
import { Router } from "react-router";
import { Provider } from "react-redux";
import store, { rrfProps } from "../store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { ThemeContextProvider } from "../ThemeContext";

const ProviderWrapper = ({ children }) => (
  <Provider store={store}>
    <ThemeContextProvider>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {children}
      </ReactReduxFirebaseProvider>
    </ThemeContextProvider>
  </Provider>
);

export default ProviderWrapper;
