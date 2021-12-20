import {applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

//
// const persistConfig = {
//     key: 'root',
//     storage,
// }
//
//
// const persist = persistReducer(persistConfig, reducers);
//
// export const store = createStore(persist, applyMiddleware(reduxThunk));
// export const persistor = persistStore(store)

export const store = createStore(reducers, applyMiddleware(reduxThunk));

