import '../../styles/globals.css'
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux'; 
import reducers from "../redux/reducers/index";
import nftReducer from "../redux/reducers/nftReducer";

const store = createStore(
    reducers
  // () => 
  // reducers, 
  // {}, 
  // applyMiddleware()
);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
