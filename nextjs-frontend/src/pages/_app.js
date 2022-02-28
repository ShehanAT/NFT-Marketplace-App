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
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Metaverse Marketplace</p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-pink-500">
              Home
            </a>
          </Link>
          <Link href="/create-item">
            <a className="mr-6 text-pink-500">
              Sell Digital Asset
            </a>
          </Link>
          <Link href="/my-assets">
            <a className="mr-6 text-pink-500">
              My Digital Assets
            </a>
          </Link>
          <Link href="/creator-dashboard">
            <a className="mr-6 text-pink-500">
              Creator Dashboard
            </a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
