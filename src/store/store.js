import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer}  from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
// import { thunk } from "redux-thunk";
import createSagaMiddle from 'redux-saga'

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";



const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] //does not want to store user locally because we r using onAuthStateChangedListener
}

const sagaMiddleware = createSagaMiddle()

const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(Boolean)

const composeEnhancer = (process.env.NODE_ENV !== 'production' && 
    window && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
    compose

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)