import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import index from './reducers/index';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = 
{
    key: 'root',
    storage : AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, index);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk) 
);

export const persistor = persistStore(store);
