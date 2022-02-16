// import { createStore } from "redux";

import reducers from "./reducers/index";

// const store = (typeof window === 'undefined') ? createStore(
//     reducers
// ) :  
//  createStore(
//     reducers,
//     {},
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

export function makeStore() {
  return configureStore({
    reducer: reducers,
  });
}

const store = makeStore()

// export var AppState = ReturnType<typeof store.getState>

// export var AppDispatch = typeof store.dispatch
// export AppDispatch;

// export var AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   Action<string>
// >

export default store;