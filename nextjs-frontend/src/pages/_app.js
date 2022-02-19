import '../../styles/globals.css'
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux'; 
import reducers from "../redux/reducers/index";
import nftReducer from "../redux/reducers/nftReducer";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import React from 'react';
const store = createStore(
    reducers
);

function MyApp({ Component, pageProps }) {
  return (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
  )
}

export default MyApp
