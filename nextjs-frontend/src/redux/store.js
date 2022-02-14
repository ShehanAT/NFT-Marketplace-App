import { createStore } from "redux";

import reducers from "./reducers/index";

const store = (typeof window === 'undefined') ? createStore(
    reducers
) :  
 createStore(
    reducers,
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;